# My AI Twin

A cutting-edge web application that transforms your photo and voice into a lifelike digital persona capable of delivering personalized messages.

## Features

- **Photo Upload**: Drag-and-drop interface for easy photo uploading
- **Welcome Video**: Integrated MP4 video player with modal view
- **Voice Input**: Multiple options including recording, uploading, or selecting prebuilt voices
- **Script Creation**: Intuitive text editor with sample scripts and writing tips
- **AI Video Generation**: Advanced AI processing to create lifelike avatar videos
- **Payment Integration**: Flexible pricing plans with Stripe integration
- **Modern UI**: Cinematic design with smooth animations and responsive layout

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: ESLint, TypeScript strict mode

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/my-ai-twin.git
cd my-ai-twin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Adding Your Welcome Video

To add your custom welcome video:

1. **Prepare your video file**:
   - Format: MP4 (H.264 codec recommended)
   - Resolution: 1920x1080 or 1280x720
   - Duration: 30-60 seconds for optimal user experience
   - File size: Under 50MB for fast loading
   - Aspect ratio: 16:9 (widescreen)

2. **Add the video file**:
   ```bash
   # Place your video file in the public directory
   cp your-welcome-video.mp4 public/welcome-video.mp4
   ```

3. **Video optimization tips**:
   - Use tools like HandBrake or FFmpeg to optimize file size
   - Consider creating multiple formats (MP4, WebM) for better browser support
   - Add captions/subtitles for accessibility

4. **Alternative video sources**:
   - You can also use external video URLs (YouTube, Vimeo, etc.)
   - Update the `videoSrc` prop in the Hero component
   - For streaming videos, consider using video.js or similar libraries

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Landing page hero section
│   ├── VideoModal.tsx      # Full-screen video modal
│   ├── AvatarCreator.tsx   # Main avatar creation flow
│   ├── PhotoUpload.tsx     # Photo upload component
│   ├── VoiceInput.tsx      # Voice recording/selection
│   ├── ScriptInput.tsx     # Script writing interface
│   ├── VideoPreview.tsx    # Video preview and download
│   ├── Pricing.tsx         # Pricing plans
│   └── Footer.tsx          # Site footer
├── App.tsx                 # Main app component
├── main.tsx               # App entry point
└── index.css              # Global styles
```

### Video Integration Features

- **Inline Video Player**: Embedded video in the hero section with custom controls
- **Modal Video Player**: Full-screen video experience with keyboard controls
- **Responsive Design**: Video adapts to all screen sizes
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized loading with poster images and lazy loading

## Features Overview

### 1. Photo Upload
- Drag-and-drop interface
- Support for JPG, PNG, WebP
- Real-time preview
- File size validation

### 2. Voice Input
- Real-time voice recording
- Audio file upload support
- Prebuilt voice selection
- Audio playback controls

### 3. Script Creation
- Rich text editor
- Character count and limits
- Sample scripts library
- Writing tips and suggestions

### 4. Video Generation
- AI-powered video creation
- Real-time processing status
- High-quality output options
- Share and download functionality

### 5. Pricing Plans
- Free tier with basic features
- Pro plan with advanced capabilities
- Enterprise solutions
- Flexible payment options

## Payment Integration

To integrate payments, you'll need to:

1. Set up a Stripe account
2. Add your Stripe keys to environment variables
3. Configure webhook endpoints
4. Test payment flows

For detailed payment setup instructions, visit: https://bolt.new/setup/stripe

## Deployment

The application is ready for deployment on modern hosting platforms:

- **Netlify**: Automatic deployment from Git
- **Vercel**: Zero-config deployment
- **GitHub Pages**: Static site hosting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@myaitwin.com or join our community Discord server.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS