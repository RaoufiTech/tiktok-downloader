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
  message: string
  downloadUrl: string
  videoMetadata: VideoMetadata | null
  showPreview: boolean
}

export type AppAction =
  | { type: 'SET_URL'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_DOWNLOADING'; payload: boolean }
  | { type: 'SET_MESSAGE'; payload: string }
  | { type: 'SET_DOWNLOAD_URL'; payload: string }
  | { type: 'SET_VIDEO_METADATA'; payload: VideoMetadata | null }
  | { type: 'TOGGLE_PREVIEW' }
  | { type: 'RESET_DOWNLOAD_STATE' }
  | {
      type: 'SET_DOWNLOAD_SUCCESS'
      payload: { downloadUrl: string; metadata: VideoMetadata }
    }

export const initialState: AppState = {
  url: '',
  loading: false,
  downloading: false,
  message: '',
  downloadUrl: '',
  videoMetadata: null,
  showPreview: false,
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_URL':
      return { ...state, url: action.payload }

    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'SET_DOWNLOADING':
      return { ...state, downloading: action.payload }

    case 'SET_MESSAGE':
      return { ...state, message: action.payload }

    case 'SET_DOWNLOAD_URL':
      return { ...state, downloadUrl: action.payload }

    case 'SET_VIDEO_METADATA':
      return { ...state, videoMetadata: action.payload }

    case 'TOGGLE_PREVIEW':
      return { ...state, showPreview: !state.showPreview }

    case 'RESET_DOWNLOAD_STATE':
      return {
        ...state,
        message: '',
        downloadUrl: '',
        videoMetadata: null,
        showPreview: false,
      }

    case 'SET_DOWNLOAD_SUCCESS':
      return {
        ...state,
        message: 'Video processed successfully!',
        downloadUrl: action.payload.downloadUrl,
        videoMetadata: action.payload.metadata,
        showPreview: true,
      }

    default:
      return state
  }
}
