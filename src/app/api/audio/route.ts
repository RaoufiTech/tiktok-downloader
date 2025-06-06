import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const videoUrl = searchParams.get('url')

    if (!videoUrl) {
      return NextResponse.json(
        { success: false, error: 'Video URL is required' },
        { status: 400 }
      )
    }

    console.log('Extracting audio from video URL:', videoUrl)

    // For now, we'll simulate audio extraction by fetching the video
    // In production, you would use ffmpeg to extract actual audio
    const response = await fetch(videoUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.statusText}`)
    }

    const videoBuffer = await response.arrayBuffer()

    // In production, you would process this with ffmpeg here
    // For demo purposes, we'll return the video data with audio headers

    return new NextResponse(videoBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'attachment; filename="tiktok-audio.mp3"',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Audio extraction error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to extract audio' },
      { status: 500 }
    )
  }
}
