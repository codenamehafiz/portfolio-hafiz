# Modern Portfolio Website

A beautiful, modern portfolio website built with Next.js 14+, TypeScript, Tailwind CSS, and Framer Motion. Features a clean design with dark mode support, smooth animations, and a fully responsive layout.

![Portfolio Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop)

## Features

- **Modern Tech Stack**: Built with Next.js 14+ App Router, TypeScript, and Tailwind CSS
- **Beautiful Animations**: Smooth page transitions and scroll animations using Framer Motion
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **SEO Optimized**: Proper metadata, Open Graph tags, and semantic HTML
- **Project Showcase**: Filterable project gallery with detailed project pages
- **Contact Form**: Integrated contact form ready for services like Resend or FormSpree
- **Performance**: Optimized images, lazy loading, and efficient rendering

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Inter & JetBrains Mono)

## Color Palette

The portfolio uses a modern, professional color scheme:

- **Primary**: Blue tones (#0ea5e9 to #0c4a6e)
- **Accent**: Purple tones (#d946ef to #701a75)
- **Background**: White / Slate-900 (light/dark mode)
- **Text**: Slate tones for optimal readability

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Contact Form Configuration
RESEND_API_KEY=your_resend_api_key_here
# or
FORMSPREE_ENDPOINT=your_formspree_endpoint_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization Guide

### 1. Personal Information

Update your personal information in the following files:

**Layout Metadata** (`src/app/layout.tsx`):
```typescript
export const metadata: Metadata = {
  title: {
    default: 'Your Name - Full Stack Developer',
    template: '%s | Your Name',
  },
  description: 'Your professional description...',
  // ... update other metadata
};
```

**Hero Section** (`src/components/home/Hero.tsx`):
- Update name, tagline, and description
- Modify tech stack preview
- Update resume download link

**Footer & Navbar** (`src/components/navigation/`):
- Update logo/brand name
- Update social media links
- Update contact information

### 2. Projects

Edit `src/data/projects.ts` to add/modify your projects:

```typescript
export const projects: Project[] = [
  {
    id: 'unique-project-id',
    title: 'Project Title',
    description: 'Short description',
    longDescription: 'Detailed description',
    image: 'main-image-url',
    images: ['image1-url', 'image2-url'],
    tags: ['Category', 'Type'],
    technologies: ['React', 'Node.js'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/user/repo',
    featured: true, // Show on homepage
    challenge: 'Problem description',
    solution: 'Solution description',
    outcome: 'Results and metrics',
  },
];
```

### 3. Skills

Edit `src/data/skills.ts` to customize your skills:

```typescript
export const skills: Skill[] = [
  {
    name: 'React',
    icon: 'SiReact', // Simple Icons name
    category: 'Frontend', // Frontend, Backend, or Tools
    proficiency: 95, // 1-100
  },
];
```

Find icon names at [Simple Icons](https://simpleicons.org/).

### 4. About Section

Update `src/components/home/About.tsx`:
- Replace the profile image URL
- Modify bio text
- Update highlights/values

### 5. Contact Information

Update `src/components/home/Contact.tsx`:
- Email address
- Phone number
- Location
- Social media links

### 6. Theme & Colors

Customize colors in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Your primary color shades
  },
  accent: {
    // Your accent color shades
  },
}
```

### 7. Resume

Replace `public/resume.pdf` with your actual resume file.

## Project Structure

```
portfolio/
├── public/
│   └── resume.pdf              # Your resume PDF
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Global styles
│   │   ├── loading.tsx         # Loading state
│   │   ├── not-found.tsx       # 404 page
│   │   └── projects/
│   │       ├── page.tsx        # Projects listing with filters
│   │       └── [id]/
│   │           └── page.tsx    # Individual project page
│   ├── components/
│   │   ├── home/
│   │   │   ├── Hero.tsx        # Hero section
│   │   │   ├── About.tsx       # About section
│   │   │   ├── FeaturedProjects.tsx
│   │   │   ├── Skills.tsx      # Skills section
│   │   │   └── Contact.tsx     # Contact form
│   │   ├── navigation/
│   │   │   ├── Navbar.tsx      # Navigation bar
│   │   │   └── Footer.tsx      # Footer
│   │   ├── projects/
│   │   │   └── ProjectDetail.tsx
│   │   └── ui/
│   │       └── LoadingSpinner.tsx
│   ├── data/
│   │   ├── projects.ts         # Project data
│   │   └── skills.ts           # Skills data
│   ├── providers/
│   │   └── theme-provider.tsx  # Dark mode provider
│   └── utils/
│       └── animations.ts       # Framer Motion variants
├── .env.example                # Environment variables template
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Contact Form Setup

### Option 1: Resend

1. Sign up at [Resend](https://resend.com/)
2. Get your API key
3. Add to `.env.local`:
```env
RESEND_API_KEY=your_api_key
```
4. Create API route at `src/app/api/contact/route.ts`

### Option 2: FormSpree

1. Sign up at [FormSpree](https://formspree.io/)
2. Create a form and get the endpoint
3. Add to `.env.local`:
```env
FORMSPREE_ENDPOINT=your_endpoint
```
4. Update form action in `Contact.tsx`

### Option 3: Email Service

Integrate with services like:
- SendGrid
- Mailgun
- AWS SES
- Nodemailer

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com/)
3. Import your repository
4. Add environment variables
5. Deploy

### Netlify

1. Push your code to GitHub
2. Visit [Netlify](https://www.netlify.com/)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Add environment variables
7. Deploy

### Other Platforms

The portfolio can be deployed to any platform that supports Next.js:
- AWS Amplify
- Cloudflare Pages
- Railway
- Render

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Contact Form
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_CONTACT_EMAIL=your.email@example.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourwebsite.com
```

## Performance Optimization

The portfolio is optimized for performance:

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic code splitting with App Router
- **Font Optimization**: Google Fonts with `next/font`
- **CSS Optimization**: Tailwind CSS purging unused styles
- **Animations**: GPU-accelerated Framer Motion animations
- **SEO**: Metadata API for optimal search engine indexing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators
- Color contrast compliance

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or run into issues, please:
- Open an issue on GitHub
- Contact me at your.email@example.com

## Acknowledgments

- Design inspiration from modern portfolio websites
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Images from [Unsplash](https://unsplash.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

**Built with ❤️ using Next.js and TypeScript**

## Quick Start Checklist

- [ ] Install dependencies
- [ ] Update personal information in layout.tsx
- [ ] Add your projects to projects.ts
- [ ] Add your skills to skills.ts
- [ ] Update About section with your bio and photo
- [ ] Update contact information
- [ ] Add your resume PDF to public folder
- [ ] Update social media links
- [ ] Configure contact form (Resend/FormSpree)
- [ ] Test locally
- [ ] Deploy to Vercel/Netlify
- [ ] Update domain and environment variables
- [ ] Test live site

## Tips for Success

1. **Use High-Quality Images**: Use professional images for your projects
2. **Write Clear Descriptions**: Be concise but informative in project descriptions
3. **Keep It Updated**: Regularly update your projects and skills
4. **Test Thoroughly**: Test on multiple devices and browsers
5. **Monitor Performance**: Use Lighthouse to check performance scores
6. **SEO Matters**: Update metadata for better search visibility
7. **Mobile First**: Ensure excellent mobile experience

## Common Issues

### Images not loading
- Check image URLs are correct
- Add domains to `next.config.js` for external images
- Ensure images are optimized

### Dark mode not persisting
- Check localStorage is enabled in browser
- Verify ThemeProvider is wrapping app

### Contact form not working
- Verify environment variables are set
- Check API route is correctly configured
- Test form submission in browser console

---

Happy coding! If you use this template, I'd love to see what you build. Feel free to share! 🚀
