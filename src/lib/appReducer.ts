export interface VideoMetadata {
  title: string
  author: string
  duration: number
  thumbnail: string
}

export interface AppState {
  url: string
  loading: boolean
  downloading: boolean
  downloadingAudio: boolean
  message: string
  downloadUrl: string
  audioUrl: string
  videoMetadata: VideoMetadata | null
  showPreview: boolean
  downloadType: 'video' | 'audio'
}

export type AppAction =
  | { type: 'SET_URL'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_DOWNLOADING'; payload: boolean }
  | { type: 'SET_DOWNLOADING_AUDIO'; payload: boolean }
  | { type: 'SET_MESSAGE'; payload: string }
  | { type: 'SET_DOWNLOAD_URL'; payload: string }
  | { type: 'SET_AUDIO_URL'; payload: string }
  | { type: 'SET_VIDEO_METADATA'; payload: VideoMetadata | null }
  | { type: 'SET_DOWNLOAD_TYPE'; payload: 'video' | 'audio' }
  | { type: 'TOGGLE_PREVIEW' }
  | { type: 'RESET_DOWNLOAD_STATE' }
  | {
      type: 'SET_DOWNLOAD_SUCCESS'
      payload: {
        downloadUrl: string
        metadata: VideoMetadata
        audioUrl?: string
      }
    }

export const initialState: AppState = {
  url: '',
  loading: false,
  downloading: false,
  downloadingAudio: false,
  message: '',
  downloadUrl: '',
  audioUrl: '',
  videoMetadata: null,
  showPreview: false,
  downloadType: 'video',
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_URL':
      return { ...state, url: action.payload }

    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'SET_DOWNLOADING':
      return { ...state, downloading: action.payload }

    case 'SET_DOWNLOADING_AUDIO':
      return { ...state, downloadingAudio: action.payload }

    case 'SET_MESSAGE':
      return { ...state, message: action.payload }

    case 'SET_DOWNLOAD_URL':
      return { ...state, downloadUrl: action.payload }

    case 'SET_AUDIO_URL':
      return { ...state, audioUrl: action.payload }

    case 'SET_VIDEO_METADATA':
      return { ...state, videoMetadata: action.payload }

    case 'SET_DOWNLOAD_TYPE':
      return { ...state, downloadType: action.payload }

    case 'TOGGLE_PREVIEW':
      return { ...state, showPreview: !state.showPreview }

    case 'RESET_DOWNLOAD_STATE':
      return {
        ...state,
        message: '',
        downloadUrl: '',
        audioUrl: '',
        videoMetadata: null,
        showPreview: false,
      }

    case 'SET_DOWNLOAD_SUCCESS':
      return {
        ...state,
        message: 'Content processed successfully!',
        downloadUrl: action.payload.downloadUrl,
        audioUrl: action.payload.audioUrl || '',
        videoMetadata: action.payload.metadata,
        showPreview: true,
      }

    default:
      return state
  }
}
