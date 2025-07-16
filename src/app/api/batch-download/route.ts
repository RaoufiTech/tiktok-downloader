import { NextRequest, NextResponse } from 'next/server'
import { Downloader } from '@/lib/downloader'
import JSZip from 'jszip'

export async function POST(req: NextRequest) {
  const { urls = [], asZip = false } = await req.json()

  if (!Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json({ success: false, error: 'No URLs provided' }, { status: 400 })
  }

  const downloader = new Downloader()
  const results: any[] = []
  const zip = new JSZip()

  for (const url of urls) {
    try {
      const videoData = await downloader.downloadVideo(url)

      if (videoData?.downloadUrl) {
        const proxiedDownloadUrl = `/api/video?url=${encodeURIComponent(videoData.downloadUrl)}`

        results.push({
          success: true,
          url,
          downloadUrl: proxiedDownloadUrl,
          metadata: {
            title: videoData.title,
            author: videoData.author,
            duration: videoData.duration,
            thumbnail: videoData.thumbnail,
          },
        })

        if (asZip) {
          const videoBuffer = await fetch(videoData.downloadUrl).then(res => res.arrayBuffer())
          const safeTitle = videoData.title.replace(/[^\w\s-]/g, '_').slice(0, 50)
          zip.file(`${safeTitle || 'video'}.mp4`, videoBuffer)
        }
      } else {
        results.push({ success: false, url, error: 'No download URL found' })
      }
    } catch (err: any) {
      results.push({ success: false, url, error: err.message })
    }
  }

  // Return ZIP file if requested
  if (asZip) {
    const zipBuffer = await zip.generateAsync({ type: 'arraybuffer' })
    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="tiktok-batch-${Date.now()}.zip"`,
      },
    })
  }

  return NextResponse.json({ success: true, results })
}
