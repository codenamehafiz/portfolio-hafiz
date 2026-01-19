# Quick Start Guide

Get your portfolio up and running in under 30 minutes!

## Prerequisites Check

Before starting, ensure you have:

- [ ] Node.js 18+ installed ([Download here](https://nodejs.org/))
- [ ] Git installed ([Download here](https://git-scm.com/))
- [ ] A code editor (VS Code recommended)
- [ ] Your resume as a PDF file
- [ ] 2-3 project screenshots ready

Check Node.js version:
```bash
node --version
# Should show v18 or higher
```

## Step-by-Step Setup

### Step 1: Install Dependencies (3 minutes)

```bash
# Navigate to the project folder
cd codenamehafiz

# Install all dependencies
npm install
```

Wait for installation to complete. This might take 2-3 minutes.

### Step 2: Start Development Server (1 minute)

```bash
npm run dev
```

Open http://localhost:3000 in your browser. You should see the portfolio!

### Step 3: Update Personal Information (5 minutes)

**Open `src/app/layout.tsx`** and update:
```typescript
// Lines 20-35
title: {
  default: 'YOUR NAME - YOUR TITLE',
  template: '%s | YOUR NAME',
},
description: 'YOUR PROFESSIONAL DESCRIPTION',
```

**Open `src/components/home/Hero.tsx`** and update:
```typescript
// Line 45
<span className="heading-gradient">YOUR NAME</span>

// Line 50
A Full Stack Developer passionate about YOUR PASSION

// Line 60
Specializing in YOUR SPECIALIZATIONS
```

**Save files** and check http://localhost:3000 - your name should appear!

### Step 4: Add Your Photo (2 minutes)

**Option A: Use an external URL**

In `src/components/home/About.tsx`, line 75:
```typescript
src="https://your-image-url.com/photo.jpg"
```

**Option B: Use a local image**

1. Create `public/images/` folder
2. Add your photo: `public/images/profile.jpg`
3. Update in `About.tsx`:
```typescript
src="/images/profile.jpg"
```

### Step 5: Add Your First Project (5 minutes)

Open `src/data/projects.ts` and replace the first project:

```typescript
{
  id: 'my-awesome-project',
  title: 'My Awesome Project',
  description: 'A brief one-line description of what it does',
  longDescription: 'A longer 2-3 sentence description explaining the project in detail',
  image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
  images: [
    'https://your-screenshot-1.jpg',
    'https://your-screenshot-2.jpg',
  ],
  tags: ['Web Development'],
  technologies: ['React', 'Node.js', 'MongoDB'],
  liveUrl: 'https://yourproject.com',
  githubUrl: 'https://github.com/you/project',
  featured: true,
  challenge: 'What problem did this solve?',
  solution: 'How did you solve it?',
  outcome: 'What were the results?',
}
```

**Save** and check http://localhost:3000 - scroll to see your project!

### Step 6: Update Skills (3 minutes)

Open `src/data/skills.ts` and keep only your actual skills:

```typescript
export const skills: Skill[] = [
  { name: 'React', icon: 'SiReact', category: 'Frontend', proficiency: 90 },
  { name: 'Node.js', icon: 'SiNodedotjs', category: 'Backend', proficiency: 85 },
  // Add more of YOUR skills
];
```

Find icon names at [Simple Icons](https://simpleicons.org/)

### Step 7: Add Contact Information (3 minutes)

Open `src/components/home/Contact.tsx` and update:

```typescript
// Line 15
const socialLinks = [
  { name: 'GitHub', icon: FaGithub, href: 'https://github.com/YOURUSERNAME' },
  { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com/in/YOURUSERNAME' },
  { name: 'Email', icon: FaEnvelope, href: 'mailto:YOUR.EMAIL@example.com' },
];

// Line 25
const contactInfo = [
  { icon: HiMail, label: 'Email', value: 'YOUR.EMAIL@example.com', ... },
  { icon: HiPhone, label: 'Phone', value: 'YOUR PHONE', ... },
  { icon: HiLocationMarker, label: 'Location', value: 'YOUR CITY', ... },
];
```

### Step 8: Add Your Resume (1 minute)

Replace `public/resume.pdf` with your actual resume PDF file.

### Step 9: Test Everything (3 minutes)

Test checklist:
- [ ] Homepage loads correctly
- [ ] Your name appears in hero section
- [ ] Your photo shows in about section
- [ ] Project cards display
- [ ] Click on a project - detail page works
- [ ] Skills section shows your skills
- [ ] Contact form displays correctly
- [ ] Dark mode toggle works
- [ ] Mobile menu works (resize browser)

### Step 10: Deploy to Vercel (5 minutes)

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio setup"
   git branch -M main
   git remote add origin https://github.com/YOURUSERNAME/portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com/)
   - Sign in with GitHub
   - Click "Import Project"
   - Select your portfolio repository
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your portfolio is live!

## You're Done! 🎉

Your portfolio is now:
- ✅ Running locally
- ✅ Customized with your information
- ✅ Deployed to the web

## Next Steps

Now that the basics are set up, you can:

1. **Add more projects** (see CUSTOMIZATION.md)
2. **Customize colors** in `tailwind.config.ts`
3. **Write better project descriptions**
4. **Take better screenshots**
5. **Set up contact form** with Resend/FormSpree
6. **Add Google Analytics**
7. **Custom domain** on Vercel

## Common Issues & Solutions

### Port 3000 already in use
```bash
# Kill the process using port 3000 or use different port
npm run dev -- -p 3001
```

### Images not loading
- Check image URLs are correct and accessible
- For external images, add domain to `next.config.js`

### Dark mode not working
- Clear browser cache
- Check localStorage is enabled

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### TypeScript errors
- Make sure all required fields in data files are filled
- Check imports are correct
- Restart dev server

## Keyboard Shortcuts (Development)

- **Save file**: Auto-reload browser
- **Ctrl+C**: Stop dev server
- **Ctrl+Shift+R**: Hard refresh browser

## Helpful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/)
- [Vercel Deployment](https://vercel.com/docs)

## Getting Help

If you're stuck:

1. Check the error message carefully
2. Read [CUSTOMIZATION.md](CUSTOMIZATION.md)
3. Review [README.md](README.md)
4. Search the error on Google/Stack Overflow
5. Check Next.js documentation
6. Open an issue on GitHub

## Pro Tips

1. **Save often**: Changes auto-reload in dev mode
2. **Use dark mode**: Toggle and check both themes
3. **Test mobile**: Use browser dev tools
4. **Commit regularly**: Save your progress with git
5. **Keep it simple**: Don't over-customize initially

## Customization Priority

Do these in order for best results:

**High Priority** (Do first):
1. Personal information (name, title, bio)
2. Contact information
3. At least 3 good projects
4. Your actual skills
5. Resume PDF

**Medium Priority** (Do second):
1. Better project screenshots
2. More detailed project descriptions
3. Custom colors
4. About section highlights
5. Social media links

**Low Priority** (Do later):
1. Contact form integration
2. Analytics
3. Custom domain
4. Advanced animations
5. Blog integration

## Deployment Checklist

Before deploying:

- [ ] All placeholder text replaced
- [ ] Real projects added (minimum 3)
- [ ] Contact info updated
- [ ] Social links work
- [ ] Resume PDF added
- [ ] Tested in production build: `npm run build`
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] All images load

## What to Do After Deployment

1. **Share your portfolio** on social media
2. **Add to resume** and LinkedIn
3. **Get feedback** from friends/colleagues
4. **Keep updating** with new projects
5. **Monitor analytics** (if set up)

## Time Estimates

- Initial setup: 30 minutes
- Adding all projects: 1-2 hours
- Writing good content: 2-3 hours
- Fine-tuning design: 1-2 hours
- **Total for great portfolio**: 5-7 hours

Spread this over a few days for best results!

---

**Congratulations on building your portfolio!** 🚀

Now go show the world what you can do!

Questions? Check [README.md](README.md) or [CUSTOMIZATION.md](CUSTOMIZATION.md)
