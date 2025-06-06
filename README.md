# 🎵 TikTok Downloader

A modern, web-based TikTok video downloader that removes watermarks and preserves HD quality. Built with Next.js 15, TypeScript, and Tailwind CSS with advanced video processing capabilities.

## ✨ Features

### 🎥 Video Downloads

- 🚫 **Watermark-free downloads** - Remove TikTok watermarks automatically
- 🎥 **HD Quality preservation** - Download videos in their original quality
- 👀 **Video preview** - Preview videos before downloading
- 🔄 **Multiple download sources** - Uses Snaptik, SSSTik, Tikwm, and direct scraping for maximum success rate
- 📹 **Multiple video formats** - Support for MP4, WebM, and other video formats
- 🎞️ **Video metadata extraction** - Extract title, author, duration, and thumbnail information

### 🖼️ Image Downloads

- 📸 **Image slideshow support** - Download images from TikTok photo carousels
- 🖼️ **High-resolution images** - Preserve original image quality
- 📦 **Batch image download** - Download all images from a single post
- 🎨 **Image preview** - Preview images before downloading

### 🔧 Advanced Processing

- 🗜️ **Gzip compression** - Compress responses for faster transfers
- ⚡ **Parallel processing** - Process multiple requests simultaneously
- 🔄 **Retry mechanism** - Automatic retry on failed requests
- 🛡️ **Error handling** - Robust error handling with fallback methods
- 🌐 **CORS proxy** - Built-in proxy to handle cross-origin requests
- 📊 **Progress tracking** - Real-time download progress indicators

### 🌐 URL Support

- 📱 **Multiple URL formats** - Supports all TikTok URL formats:
  - `tiktok.com/@username/video/`
  - `vm.tiktok.com/`
  - `m.tiktok.com/`
  - `www.tiktok.com/t/`
  - Photo slideshow URLs
- 🔗 **URL validation** - Smart URL parsing and validation
- 🔄 **URL normalization** - Automatic URL format conversion

### 🎨 User Experience

- 🎨 **Modern UI** - Beautiful gradient interface with smooth animations
- 📱 **Responsive design** - Works seamlessly on desktop and mobile
- 🌙 **Dark/Light themes** - Toggle between theme modes
- ⚡ **Fast processing** - Quick video extraction and processing
- 🌐 **No registration required** - Use immediately without creating accounts
- 📋 **One-click copy** - Easy URL copying functionality

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios with interceptors
- **Web Scraping**: Cheerio for DOM parsing
- **Video Processing**: Custom processor with multiple API integrations
- **Compression**: Gzip middleware for response optimization
- **State Management**: React useReducer with custom hooks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd tiktok-downloader
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 How to Use

### For Videos

1. **Copy a TikTok video URL** - Copy the link from any TikTok video
2. **Paste the URL** - Paste it into the input field on the homepage
3. **Click "Download Video"** - The app will process the video
4. **Preview (Optional)** - Click "Show Preview" to watch the video
5. **Download** - Click "Download Video File" to save it to your device

### For Images (Photo Slideshows)

1. **Copy a TikTok photo URL** - Copy the link from any TikTok photo post
2. **Paste the URL** - Paste it into the input field
3. **Click "Download"** - The app will extract all images
4. **Preview Images** - View all images in the slideshow
5. **Download** - Download individual images or all at once

### Supported Content Types

- **Videos**: Standard TikTok videos with or without watermarks
- **Images**: Photo slideshow posts with multiple images
- **Live Photos**: Animated photo content
- **Duets**: Duet videos with multiple participants
- **Stitches**: Stitched video content

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── download/      # Video/image download endpoint
│   │   ├── video/         # Video proxy endpoint
│   │   └── image/         # Image proxy endpoint
│   ├── components/        # React components
│   │   ├── ui/           # UI components
│   │   └── features/     # Feature-specific components
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/                   # Utility libraries
│   ├── appReducer.ts      # React useReducer state management
│   ├── downloader.ts      # Core download logic with multiple APIs
│   ├── imageProcessor.ts  # Image processing utilities
│   ├── types.ts           # TypeScript type definitions
│   ├── validator.ts       # URL validation and parsing
│   ├── videoProcessor.ts  # Video processing utilities
│   └── compression.ts     # Gzip compression utilities
└── middleware.ts          # Next.js middleware for compression
```

## 🔧 API Endpoints

### POST `/api/download`

Processes TikTok URLs and returns video/image metadata with download links.

**Request:**

```json
{
  "url": "https://www.tiktok.com/@username/video/1234567890"
}
```

**Response for Videos:**

```json
{
  "success": true,
  "type": "video",
  "downloadUrl": "/api/video?url=...",
  "metadata": {
    "title": "Video Title",
    "author": "Username",
    "duration": 30,
    "thumbnail": "https://...",
    "quality": "HD"
  }
}
```

**Response for Images:**

```json
{
  "success": true,
  "type": "images",
  "images": [
    {
      "url": "/api/image?url=...",
      "thumbnail": "https://...",
      "index": 0
    }
  ],
  "metadata": {
    "title": "Photo Post Title",
    "author": "Username",
    "imageCount": 5
  }
}
```

### GET `/api/video`

Proxies video files from external sources with gzip compression.

**Query Parameters:**

- `url`: The video URL to proxy
- `quality`: Optional quality parameter (hd, sd)

### GET `/api/image`

Proxies image files from external sources with optimization.

**Query Parameters:**

- `url`: The image URL to proxy
- `compress`: Optional compression level (1-100)

## 🔄 Download Methods

The app uses multiple fallback methods for maximum reliability:

### Video Downloads

1. **Snaptik API** - Primary method for watermark removal
2. **SSSTik API** - Alternative with good quality preservation
3. **Tikwm API** - Backup method with HD support
4. **Direct Scraping** - Fallback for when APIs are unavailable
5. **Native Extraction** - Direct TikTok API scraping

### Image Downloads

1. **Direct Image URLs** - Extract high-resolution image URLs
2. **Slideshow API** - Specialized slideshow image extraction
3. **Thumbnail Upscaling** - Enhance thumbnail quality when needed

## 🚀 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to a Git repository
2. Import your project to Vercel
3. Configure environment variables if needed
4. Vercel will automatically detect Next.js and deploy

### Environment Variables

```env
# Optional: Configure API endpoints
NEXT_PUBLIC_API_BASE_URL=your-api-url
COMPRESSION_LEVEL=6
MAX_FILE_SIZE=100mb
```

### Other Deployment Options

- **Netlify**: Supports Next.js with serverless functions
- **Railway**: Simple deployment with automatic HTTPS
- **Docker**: Use the included Dockerfile for containerized deployment
- **AWS**: Deploy with Lambda functions for serverless operation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Add tests for new features
- Update documentation for API changes
- Ensure responsive design compatibility

## ⚠️ Legal Notice

This tool is for educational purposes only. Please respect TikTok's Terms of Service and copyright laws. Only download videos and images you have permission to download.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing problems
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce
4. Mention the type of content (video/image) and TikTok URL format

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - For beautiful styling
- [Vercel](https://vercel.com/) - For seamless deployment
- [Cheerio](https://cheerio.js.org/) - Server-side HTML parsing
- Various TikTok download APIs for making this possible

## 📊 Performance Features

- **Gzip Compression**: Reduces response sizes by up to 70%
- **Parallel Processing**: Handle multiple downloads simultaneously
- **Caching**: Smart caching for frequently accessed content
- **Progressive Loading**: Stream large files for better user experience
- **Error Recovery**: Automatic retry with exponential backoff

---

Made with ❤️ for the community
