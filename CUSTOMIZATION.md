# Customization Guide

This guide will help you quickly customize the portfolio to make it your own.

## Quick Customization Steps

### 1. Personal Information (5 minutes)

**File: `src/app/layout.tsx`**
```typescript
// Update these fields:
title: 'Your Name - Your Title'
description: 'Your professional description'
url: 'https://yourwebsite.com'
twitter: '@yourhandle'
```

**File: `src/components/home/Hero.tsx`**
```typescript
// Line ~45: Update your name
<span className="heading-gradient">Your Name</span>

// Line ~50: Update your tagline
A Full Stack Developer passionate about...

// Line ~60: Update your specialization
Specializing in React, Next.js, and...
```

**Files: `src/components/navigation/Navbar.tsx` and `Footer.tsx`**
```typescript
// Update logo/brand
<span className="heading-gradient">{'<YN />'}</span>
// Change 'YN' to your initials or brand
```

### 2. About Section (10 minutes)

**File: `src/components/home/About.tsx`**

Replace the profile image:
```typescript
// Line ~75
src="YOUR_IMAGE_URL"
```

Update your bio (lines ~95-115):
```typescript
<p>Your introduction...</p>
<p>Your experience and skills...</p>
<p>Your interests and hobbies...</p>
```

### 3. Projects (20 minutes)

**File: `src/data/projects.ts`**

Add your projects:
```typescript
{
  id: 'project-url-slug',           // lowercase-with-hyphens
  title: 'Project Name',
  description: 'One sentence description',
  longDescription: 'Detailed description (2-3 sentences)',
  image: 'main-screenshot-url',
  images: [
    'screenshot-1-url',
    'screenshot-2-url',
    'screenshot-3-url'
  ],
  tags: ['Web Development', 'SaaS'],  // Categories
  technologies: [                      // Tech stack
    'Next.js',
    'TypeScript',
    'PostgreSQL'
  ],
  liveUrl: 'https://live-demo.com',   // Optional
  githubUrl: 'https://github.com/...',// Optional
  featured: true,                     // Show on homepage
  challenge: 'What problem did you solve?',
  solution: 'How did you solve it?',
  outcome: 'What were the results? (include metrics)',
  demoVideo: 'https://youtube.com/...' // Optional
}
```

**Pro Tips for Projects:**
- Use high-quality screenshots (1200x800px recommended)
- Include metrics in outcomes (e.g., "increased performance by 40%")
- Be specific about your role and contributions
- Show 3-4 projects as featured on the homepage

### 4. Skills (10 minutes)

**File: `src/data/skills.ts`**

Add your skills:
```typescript
{
  name: 'Technology Name',
  icon: 'SiIconName',        // From Simple Icons
  category: 'Frontend',       // Frontend, Backend, or Tools
  proficiency: 90            // 1-100 (affects progress bar)
}
```

**Finding Icon Names:**
1. Visit [Simple Icons](https://simpleicons.org/)
2. Search for the technology
3. Use the name with 'Si' prefix (e.g., 'React' → 'SiReact')

### 5. Contact Information (5 minutes)

**File: `src/components/home/Contact.tsx`**

Update contact details (lines ~15-25):
```typescript
const socialLinks = [
  { name: 'GitHub', icon: FaGithub, href: 'https://github.com/yourname' },
  { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com/in/yourname' },
  { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com/yourname' },
  { name: 'Email', icon: FaEnvelope, href: 'mailto:your.email@example.com' },
];

const contactInfo = [
  { icon: HiMail, label: 'Email', value: 'your.email@example.com' },
  { icon: HiPhone, label: 'Phone', value: '+1 (555) 123-4567' },
  { icon: HiLocationMarker, label: 'Location', value: 'Your City, Country' },
];
```

**File: `src/components/navigation/Footer.tsx`**

Update social links (lines ~7-12).

### 6. Resume (2 minutes)

Replace `public/resume.pdf` with your actual resume file.

### 7. Colors & Theme (Optional, 15 minutes)

**File: `tailwind.config.ts`**

Customize colors:
```typescript
colors: {
  primary: {
    50: '#f0f9ff',   // Lightest
    100: '#e0f2fe',
    // ... to ...
    900: '#0c4a6e',  // Darkest
  },
  accent: {
    // Same structure for accent color
  },
}
```

**Color Palette Tools:**
- [Tailwind Color Generator](https://uicolors.app/create)
- [Coolors](https://coolors.co/)
- [Adobe Color](https://color.adobe.com/)

### 8. SEO & Metadata (5 minutes)

**File: `src/app/layout.tsx`**

Update Open Graph image:
```typescript
openGraph: {
  images: [
    {
      url: 'https://yourwebsite.com/og-image.jpg',  // 1200x630px
      width: 1200,
      height: 630,
    },
  ],
}
```

Create your OG image:
- Use [Canva](https://www.canva.com/)
- Or [OG Image Generator](https://og-image.vercel.app/)

## Image Guidelines

### Profile Photo
- **Recommended size**: 500x500px
- **Format**: JPG or PNG
- **Style**: Professional headshot

### Project Screenshots
- **Recommended size**: 1200x800px (3:2 ratio)
- **Format**: JPG or PNG
- **Quality**: High-quality, clear, well-lit

### Project Gallery
- 2-4 images per project
- Show different features/views
- Use consistent aspect ratios

### OG Image
- **Size**: 1200x630px
- **Safe zone**: Keep text/important elements in center 1200x600px
- **File size**: Under 1MB

## Content Writing Tips

### Project Descriptions
**Short (for cards):**
- 1-2 sentences
- Focus on what it does
- Include key technology

**Long (for detail pages):**
- 2-3 paragraphs
- Explain the context
- Highlight your role
- Include technical details

### Challenge/Solution/Outcome Format

**Challenge:**
- What problem existed?
- Why was it important?
- What were the constraints?

**Solution:**
- How did you approach it?
- What technologies did you use?
- What was unique about your solution?

**Outcome:**
- What were the results?
- Include specific metrics
- Business impact or user feedback

**Example:**
```
Challenge: "Users were experiencing 5+ second load times, causing a 40% bounce rate."

Solution: "Implemented code splitting, image optimization, and Redis caching, reducing bundle size by 60% and database queries by 75%."

Outcome: "Achieved sub-2-second load times, reducing bounce rate to 15% and increasing user engagement by 50%."
```

## Common Customizations

### Change Font

**File: `src/app/layout.tsx`**
```typescript
import { YourFont } from 'next/font/google';

const yourFont = YourFont({
  subsets: ['latin'],
  variable: '--font-your-font',
});
```

### Add a New Section

1. Create component in `src/components/home/YourSection.tsx`
2. Import in `src/app/page.tsx`
3. Add to page between other sections
4. Update navigation if needed

### Change Animation Speed

**File: `src/components/**/*.tsx`**
```typescript
// Find transition prop
transition={{ duration: 0.6 }}
// Adjust duration (in seconds)
```

### Add Analytics

**Google Analytics:**
1. Install: `npm install @next/third-parties`
2. Add to `layout.tsx`:
```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

// In return statement
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

## Testing Your Changes

1. **Visual Testing**: Check all pages in browser
2. **Responsive Testing**: Test on mobile, tablet, desktop
3. **Dark Mode**: Toggle and verify appearance
4. **Links**: Click all links to ensure they work
5. **Forms**: Test contact form submission
6. **Performance**: Run Lighthouse audit

## Deployment Checklist

Before deploying:

- [ ] All personal information updated
- [ ] Projects added with working links
- [ ] Skills section customized
- [ ] Contact information updated
- [ ] Resume PDF added
- [ ] Social media links verified
- [ ] Images optimized (<500KB each)
- [ ] Environment variables configured
- [ ] Tested in production build (`npm run build`)
- [ ] No console errors
- [ ] Meta tags updated
- [ ] OG image created and added

## Need Help?

- Check the [README.md](README.md) for detailed setup instructions
- Review the code comments in each file
- Search for similar portfolios on GitHub for inspiration
- Open an issue if you encounter problems

---

Remember: Your portfolio should reflect **you**. Don't be afraid to customize beyond these suggestions to make it truly unique!
