# 🎵 TikTok Downloader

A modern, web-based TikTok video downloader that removes watermarks and preserves HD quality. Built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

- 🚫 **Watermark-free downloads** - Remove TikTok watermarks automatically
- 🎥 **HD Quality preservation** - Download videos in their original quality
- 👀 **Video preview** - Preview videos before downloading
- 📱 **Multiple URL formats** - Supports all TikTok URL formats (tiktok.com, vm.tiktok.com, m.tiktok.com)
- 🔄 **Multiple download sources** - Uses Snaptik, SSSTik, Tikwm, and direct scraping for maximum success rate
- 🎨 **Modern UI** - Beautiful gradient interface with smooth animations
- ⚡ **Fast processing** - Quick video extraction and processing
- 🌐 **No registration required** - Use immediately without creating accounts

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Web Scraping**: Cheerio
- **Video Processing**: Custom processor with multiple API integrations

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

1. **Copy a TikTok URL** - Copy the link from any TikTok video
2. **Paste the URL** - Paste it into the input field on the homepage
3. **Click "Download Video"** - The app will process the video
4. **Preview (Optional)** - Click "Show Preview" to watch the video
5. **Download** - Click "Download Video File" to save it to your device

### Supported URL Formats

- `https://www.tiktok.com/@username/video/1234567890`
- `https://vm.tiktok.com/ABC123`
- `https://m.tiktok.com/v/1234567890`
- `https://www.tiktok.com/t/ABC123`

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── download/      # Video download endpoint
│   │   └── video/         # Video proxy endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
└── lib/                   # Utility libraries
    ├── appReducer.ts      # React useReducer state management
    ├── downloader.ts      # Core download logic with multiple APIs
    ├── types.ts           # TypeScript type definitions
    ├── validator.ts       # URL validation and parsing
    └── videoProcessor.ts  # Video processing utilities
```

## 🔧 API Endpoints

### POST `/api/download`

Processes TikTok URLs and returns video metadata with download links.

**Request:**

```json
{
  "url": "https://www.tiktok.com/@username/video/1234567890"
}
```

**Response:**

```json
{
  "success": true,
  "downloadUrl": "/api/video?url=...",
  "metadata": {
    "title": "Video Title",
    "author": "Username",
    "duration": 30,
    "thumbnail": "https://..."
  }
}
```

### GET `/api/video`

Proxies video files from external sources to avoid CORS issues.

**Query Parameters:**

- `url`: The video URL to proxy

## 🔄 Download Methods

The app uses multiple fallback methods for maximum reliability:

1. **Snaptik API** - Primary method for watermark removal
2. **SSSTik API** - Alternative with good quality preservation
3. **Tikwm API** - Backup method with HD support
4. **Direct Scraping** - Fallback for when APIs are unavailable

## 🚀 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to a Git repository
2. Import your project to Vercel
3. Vercel will automatically detect Next.js and deploy

### Other Deployment Options

- **Netlify**: Supports Next.js with serverless functions
- **Railway**: Simple deployment with automatic HTTPS
- **Docker**: Use the included Dockerfile for containerized deployment

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚠️ Legal Notice

This tool is for educational purposes only. Please respect TikTok's Terms of Service and copyright laws. Only download videos you have permission to download.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing problems
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - For beautiful styling
- [Vercel](https://vercel.com/) - For seamless deployment
- Various TikTok download APIs for making this possible

---

Made with ❤️ for the community
