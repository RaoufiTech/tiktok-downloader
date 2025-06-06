'use client'

import { useReducer } from 'react'
import { appReducer, initialState } from '@/lib/appReducer'

export default function Home() {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const handleDownload = async () => {
    if (!state.url.trim()) {
      dispatch({ type: 'SET_MESSAGE', payload: 'Please enter a TikTok URL' })
      return
    }

    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'RESET_DOWNLOAD_STATE' })

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: state.url }),
      })

      const data = await response.json()

      if (data.success) {
        dispatch({
          type: 'SET_DOWNLOAD_SUCCESS',
          payload: {
            downloadUrl: data.downloadUrl,
            metadata: data.metadata,
          },
        })
      } else {
        dispatch({
          type: 'SET_MESSAGE',
          payload: data.error || 'Failed to download video',
        })
      }
    } catch (err) {
      console.error('Download error:', err)
      dispatch({
        type: 'SET_MESSAGE',
        payload: 'An error occurred while processing the video',
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const handleDownloadClick = async () => {
    if (!state.downloadUrl) return

    dispatch({ type: 'SET_DOWNLOADING', payload: true })

    try {
      // Fetch the video file with progress indication
      const response = await fetch(state.downloadUrl)

      if (!response.ok) {
        throw new Error('Failed to download video')
      }

      // Get the blob data
      const blob = await response.blob()

      // Create a download URL from the blob
      const blobUrl = URL.createObjectURL(blob)

      // Create and trigger download
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `tiktok-video-${Date.now()}.mp4`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up the blob URL
      URL.revokeObjectURL(blobUrl)

      dispatch({
        type: 'SET_MESSAGE',
        payload: 'Video downloaded successfully! 🎉',
      })
    } catch (error) {
      console.error('Download failed:', error)
      dispatch({
        type: 'SET_MESSAGE',
        payload: 'Failed to download video file',
      })
    } finally {
      dispatch({ type: 'SET_DOWNLOADING', payload: false })
    }
  }

  const togglePreview = () => {
    dispatch({ type: 'TOGGLE_PREVIEW' })
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4'>
      <div className='max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20'>
        <div className='text-center mb-8'>
          <div className='flex justify-center mb-4'>
            <div className='w-16 h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center'>
              <svg
                className='w-8 h-8 text-white'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.93a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.36z' />
              </svg>
            </div>
          </div>
          <h1 className='text-3xl font-bold text-white mb-2'>
            TikTok Downloader
          </h1>
          <p className='text-white/70'>
            Download TikTok videos without watermarks
          </p>
        </div>

        <div className='space-y-4'>
          <div>
            <input
              type='text'
              placeholder='Paste TikTok URL here...'
              value={state.url}
              onChange={(e) =>
                dispatch({ type: 'SET_URL', payload: e.target.value })
              }
              className='w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
            />
          </div>

          <button
            onClick={handleDownload}
            disabled={state.loading || state.downloading}
            className='w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center'
          >
            {state.loading ? (
              <>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              'Download Video'
            )}
          </button>

          {state.message && (
            <div
              className={`p-3 rounded-xl text-center transition-all duration-300 ${
                state.message.includes('success') ||
                state.message.includes('🎉')
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}
            >
              {state.message}
            </div>
          )}

          {state.videoMetadata && (
            <div className='p-4 bg-white/10 rounded-xl border border-white/20 space-y-4'>
              <div className='flex items-start space-x-3'>
                {state.videoMetadata.thumbnail && (
                  <img
                    src={state.videoMetadata.thumbnail}
                    alt='Video thumbnail'
                    className='w-16 h-16 rounded-lg object-cover'
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                )}
                <div className='flex-1 min-w-0'>
                  <h3 className='text-white font-medium text-sm truncate'>
                    {state.videoMetadata.title}
                  </h3>
                  <p className='text-white/70 text-xs mt-1'>
                    by {state.videoMetadata.author}
                  </p>
                  {state.videoMetadata.duration > 0 && (
                    <p className='text-white/50 text-xs mt-1'>
                      {Math.floor(state.videoMetadata.duration / 60)}:
                      {(state.videoMetadata.duration % 60)
                        .toString()
                        .padStart(2, '0')}
                    </p>
                  )}
                </div>
              </div>

              {/* Preview Toggle Button */}
              <button
                onClick={togglePreview}
                className='w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center'
              >
                {state.showPreview ? (
                  <>👁️ Hide Preview</>
                ) : (
                  <>👀 Show Preview</>
                )}
              </button>

              {/* Video Preview */}
              {state.showPreview && state.downloadUrl && (
                <div className='space-y-3'>
                  <div className='bg-black/50 rounded-lg overflow-hidden'>
                    <video
                      src={state.downloadUrl}
                      controls
                      className='w-full h-auto max-h-64 object-contain'
                      preload='metadata'
                      onError={(e) => {
                        console.error('Video preview error:', e)
                        dispatch({
                          type: 'SET_MESSAGE',
                          payload:
                            'Preview unavailable, but download should work',
                        })
                      }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <p className='text-white/50 text-xs text-center'>
                    ⚡ Preview loaded - ready to download!
                  </p>
                </div>
              )}
            </div>
          )}

          {state.downloadUrl && (
            <div className='p-4 bg-white/10 rounded-xl border border-white/20'>
              <button
                onClick={handleDownloadClick}
                disabled={state.downloading}
                className='w-full py-3 px-4 bg-green-500 hover:bg-green-600 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg text-center transition-all duration-200 flex items-center justify-center'
              >
                {state.downloading ? (
                  <>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-4 w-4 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Downloading...
                  </>
                ) : (
                  <>📥 Download Video File</>
                )}
              </button>
              <p className='text-white/50 text-xs text-center mt-2'>
                {state.downloading
                  ? 'Please wait while we prepare your download...'
                  : 'Click to download the video without watermarks'}
              </p>
            </div>
          )}
        </div>

        <div className='mt-8 text-center text-white/50 text-sm'>
          <p>✅ Watermark-free downloads</p>
          <p className='mt-1'>✅ HD quality preservation</p>
          <p className='mt-1'>✅ Video preview before download</p>
          <p className='mt-1'>✅ Multiple TikTok URL formats supported</p>
        </div>
      </div>
    </div>
  )
}
