export interface VideoData {
  id: string
  title: string
  url: string
  thumbnail: string
  duration: number
  author: string
  description: string
  downloadUrl: string
}

export interface ProcessedVideo {
  id: string
  url: string
  size?: number
  format: string
  quality?: string
  watermarkRemoved: boolean
}

export interface DownloadResponse {
  success: boolean
  message: string
  downloadUrl?: string
  video?: ProcessedVideo
}
