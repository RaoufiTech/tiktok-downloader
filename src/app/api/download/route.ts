import { NextRequest, NextResponse } from 'next/server'
import { Downloader } from '../../../lib/downloader'
import { validateUrl } from '../../../lib/validator'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      )
    }

    if (!validateUrl(url)) {
      return NextResponse.json(
        { success: false, error: 'Invalid TikTok URL' },
        { status: 400 }
      )
    }

    console.log('Processing TikTok URL:', url)

    const downloader = new Downloader()
    const videoData = await downloader.downloadVideo(url)

    if (!videoData || !videoData.downloadUrl) {
      return NextResponse.json(
        { success: false, error: 'Failed to extract video download URL' },
        { status: 500 }
      )
    }

    // Create proxy URL for video download
    const proxyUrl = `/api/video?url=${encodeURIComponent(
      videoData.downloadUrl
    )}`

    return NextResponse.json({
      success: true,
      downloadUrl: proxyUrl,
      metadata: {
        title: videoData.title,
        author: videoData.author,
        duration: videoData.duration,
        thumbnail: videoData.thumbnail,
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to process video',
      },
      { status: 500 }
    )
  }
}
