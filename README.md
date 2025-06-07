# ResearchAI - Transform Your Research with AI Power

A comprehensive AI-powered platform that transforms research papers into engaging presentations, podcasts, and visual content.

## Features

### 🎯 Core Functionality
- **Smart Paper Analysis**: AI-powered analysis extracts key insights and methodologies
- **Auto Presentations**: Generate professional slide decks with visual elements
- **Podcast Generation**: Transform research into engaging audio content
- **Visual Summaries**: Create animated explainer videos and infographics
- **Intelligent Insights**: Discover hidden patterns across multiple papers

### 🖼️ Image Upload System
- **Drag & Drop**: Simply drag images onto upload areas
- **Click to Upload**: Traditional file picker interface
- **Real-time Preview**: Instant image preview with error handling
- **File Validation**: Automatic validation for file type and size
- **Multiple Formats**: Support for JPG, PNG, GIF, and WebP images
- **Size Limits**: Maximum 5MB file size for optimal performance

### 🎨 User Interface
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark Theme**: Modern dark interface with purple/pink gradients
- **Smooth Animations**: Framer Motion powered transitions
- **Interactive Elements**: Hover effects and loading states

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/research-ai.git
   cd research-ai
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
research-ai/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── upload/           # Upload functionality
│   ├── results/          # Results dashboard
│   └── auth/             # Authentication pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── about.tsx         # About section
│   ├── hero.tsx          # Hero section
│   ├── features.tsx      # Features section
│   ├── image-upload.tsx  # Image upload component
│   ├── ml-presentation.tsx # Presentation viewer
│   ├── presentation-editor.tsx # Presentation editor
│   ├── audio-player.tsx  # Audio player
│   ├── video-player.tsx  # Video player
│   ├── chatbot.tsx       # AI chatbot
│   └── navbar.tsx        # Navigation
├── lib/                  # Utility functions
│   └── hooks/            # Custom React hooks
└── public/               # Static assets
    └── images/           # Image assets
\`\`\`

## Image Upload Implementation

### Basic Usage

\`\`\`tsx
import ImageUpload from '@/components/image-upload'

function MyComponent() {
  const [image, setImage] = useState<string | null>(null)

  return (
    <ImageUpload
      onImageChange={setImage}
      currentImage={image}
      size="lg"
      shape="circle"
      placeholder="Upload your photo"
    />
  )
}
\`\`\`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onImageChange` | `(url: string \| null) => void` | Required | Callback when image changes |
| `currentImage` | `string \| null` | `null` | Current image URL |
| `size` | `'sm' \| 'md' \| 'lg'` | `'lg'` | Upload area size |
| `shape` | `'circle' \| 'square'` | `'circle'` | Upload area shape |
| `placeholder` | `string` | `'Upload Image'` | Placeholder text |
| `className` | `string` | `''` | Additional CSS classes |

### Features

- **File Validation**: Automatically validates file type and size
- **Error Handling**: Shows user-friendly error messages
- **Loading States**: Visual feedback during upload process
- **Drag & Drop**: Native drag and drop support
- **Remove Functionality**: Easy image removal with confirmation
- **Responsive**: Works on all screen sizes

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Add image upload functionality"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically deploy on every push
   - Your app will be live at `https://your-app.vercel.app`

### Manual Deployment

1. **Build the project**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start production server**
   \`\`\`bash
   npm start
   \`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Technologies Used

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **File Handling**: FileReader API
- **Image Processing**: Canvas API
- **State Management**: React useState/useEffect

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@researchai.com or join our Discord community.

## Acknowledgments

- Built with ❤️ by Stuti Gupta
- Powered by Next.js and Vercel
- UI components from shadcn/ui
- Icons from Lucide React
