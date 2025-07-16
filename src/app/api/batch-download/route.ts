import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';

import { Downloader } from '@/lib/downloader';
import { AudioExtractor } from '@/lib/audioExtractor';
import { DOWNLOAD_METHODS } from '@/lib/methods';

/**
 * POST  /api/batch-download
 * Body: { urls: string[] }
 * Returns: application/zip   (videos/, audio/, images/, results.json)
 */
export async function POST(req: NextRequest) {
  const { urls } = await req.json();

  if (!Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json(
      { success: false, error: 'No URLs provided' },
      { status: 400 },
    );
  }

  const zip          = new JSZip();
  const downloader   = new Downloader();

  /** Utility: sanitise a value for use as part of a file name. */
  const safe = (s: string) =>
    (s || 'tiktok')
      .replace(/[^\w\s-]/g, '_')
      .trim()
      .slice(0, 60)
      || 'tiktok';

  /**
   * Process a single TikTok URL:
   *   – downloads the video
   *   – extracts audio
   *   – downloads slideshow images
   *   – drops everything into the ZIP
   * Returns summary for results.json
   */
  async function handleUrl(url: string) {
    try {
      const data  = await downloader.downloadVideo(url);
      const label = safe(data.title ?? data.id);

      /* ---------- Video ---------- */
      if (data.downloadUrl) {
        const videoBuf = await fetch(data.downloadUrl).then(r => r.arrayBuffer());
        zip.file(`videos/${label}.mp4`,  videoBuf);
      }

      /* ---------- Audio ---------- */
      try {
        const audioBuf = await AudioExtractor.extractAudio(data.downloadUrl);
        zip.file(`audio/${label}.mp3`, audioBuf);
      } catch (err) {
        // Failure to extract audio should not abort the batch.
        zip.file(`audio/${label}-FAILED.txt`, String(err));
      }

      /* ---------- Images ---------- */
      if (data.images?.length) {
        await Promise.allSettled(
          data.images.map(async (img, idx) => {
            try {
              const imgBuf = await fetch(img.url).then(r => r.arrayBuffer());
              zip.file(`images/${label}/img-${idx + 1}.jpg`, imgBuf);
            } catch (e) {
              zip.file(`images/${label}/img-${idx + 1}-FAILED.txt`, String(e));
            }
          }),
        );
      }

      return {
        success   : true,
        url,
        id        : data.id,
        title     : data.title,
        author    : data.author,
        methodUsed: data.description?.match(/\(([^)]+)\)/)?.[1] ?? 'unknown',
      };
    } catch (error: any) {
      return { success: false, url, error: error?.message ?? 'Unknown error' };
    }
  }

  /* -------- Parallel processing of all URLs -------- */
  const results = await Promise.all(urls.map(handleUrl));

  /* ---------- Summaries & meta ---------- */
  zip.file('results.json', JSON.stringify({
    generatedAt : new Date().toISOString(),
    methodsTried: DOWNLOAD_METHODS,
    results,
  }, null, 2));

  const zipBuf = await zip.generateAsync({ type: 'arraybuffer' });

  return new NextResponse(zipBuf, {
    headers: {
      'Content-Type'       : 'application/zip',
      'Content-Disposition': `attachment; filename="tiktok-batch-${Date.now()}.zip"`,
    },
  });
}
