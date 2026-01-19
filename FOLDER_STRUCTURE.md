# Folder Structure Explained

This document explains the organization and purpose of each folder and key file in the portfolio.

```
portfolio/
│
├── public/                          # Static assets served at root
│   └── resume.pdf                   # Downloadable resume (replace with yours)
│
├── src/                             # Source code
│   │
│   ├── app/                         # Next.js 14 App Router
│   │   ├── layout.tsx               # Root layout (wraps all pages)
│   │   │                            # - Defines fonts, metadata
│   │   │                            # - Includes Navbar, Footer, ThemeProvider
│   │   │
│   │   ├── page.tsx                 # Homepage (/)
│   │   │                            # - Combines all homepage sections
│   │   │
│   │   ├── globals.css              # Global styles & Tailwind imports
│   │   │                            # - Custom CSS classes
│   │   │                            # - Animations
│   │   │                            # - Utility classes
│   │   │
│   │   ├── loading.tsx              # Global loading state
│   │   │                            # - Shows while pages load
│   │   │
│   │   ├── not-found.tsx            # 404 error page
│   │   │                            # - Custom 404 design
│   │   │
│   │   └── projects/                # Projects section
│   │       │
│   │       ├── page.tsx             # All projects listing (/projects)
│   │       │                        # - Filterable project grid
│   │       │                        # - Search functionality
│   │       │
│   │       └── [id]/                # Dynamic route for each project
│   │           └── page.tsx         # Individual project page (/projects/[id])
│   │                                # - Detailed project view
│   │                                # - Image gallery
│   │                                # - Challenge/Solution/Outcome
│   │
│   ├── components/                  # React components
│   │   │
│   │   ├── home/                    # Homepage sections
│   │   │   ├── Hero.tsx             # Hero section with intro
│   │   │   ├── About.tsx            # About me section
│   │   │   ├── FeaturedProjects.tsx # Featured projects grid
│   │   │   ├── Skills.tsx           # Skills showcase
│   │   │   └── Contact.tsx          # Contact form & info
│   │   │
│   │   ├── navigation/              # Navigation components
│   │   │   ├── Navbar.tsx           # Top navigation bar
│   │   │   │                        # - Logo, menu, theme toggle
│   │   │   │                        # - Mobile responsive menu
│   │   │   └── Footer.tsx           # Bottom footer
│   │   │                            # - Links, social media, copyright
│   │   │
│   │   ├── projects/                # Project-related components
│   │   │   └── ProjectDetail.tsx    # Individual project detail view
│   │   │                            # - Image gallery with navigation
│   │   │                            # - Tech stack display
│   │   │                            # - Challenge/Solution/Outcome cards
│   │   │
│   │   └── ui/                      # Reusable UI components
│   │       └── LoadingSpinner.tsx   # Loading spinner component
│   │
│   ├── data/                        # Data files (customize these!)
│   │   │
│   │   ├── projects.ts              # All project data
│   │   │                            # - Project information
│   │   │                            # - Images, links, descriptions
│   │   │                            # - Technologies used
│   │   │
│   │   └── skills.ts                # Skills data
│   │                                # - Skill categories
│   │                                # - Proficiency levels
│   │                                # - Icons
│   │
│   ├── providers/                   # React Context providers
│   │   └── theme-provider.tsx       # Dark mode context
│   │                                # - Theme state management
│   │                                # - localStorage persistence
│   │
│   └── utils/                       # Utility functions
│       └── animations.ts            # Framer Motion animation variants
│                                    # - Reusable animation configs
│
├── .env.example                     # Environment variables template
│                                    # - Copy to .env.local and fill in
│
├── .eslintrc.json                   # ESLint configuration
│                                    # - Code quality rules
│
├── .gitignore                       # Git ignore rules
│                                    # - node_modules, .env, .next, etc.
│
├── next.config.js                   # Next.js configuration
│                                    # - Image domains
│                                    # - Build settings
│
├── package.json                     # Dependencies & scripts
│                                    # - npm install reads this
│                                    # - Scripts: dev, build, start
│
├── postcss.config.js                # PostCSS configuration
│                                    # - Tailwind CSS processing
│
├── tailwind.config.ts               # Tailwind CSS configuration
│                                    # - Custom colors, fonts
│                                    # - Animation utilities
│                                    # - Dark mode settings
│
├── tsconfig.json                    # TypeScript configuration
│                                    # - Compiler options
│                                    # - Path aliases (@/...)
│
├── LICENSE                          # MIT License
│
├── README.md                        # Main documentation
│                                    # - Setup instructions
│                                    # - Features overview
│                                    # - Deployment guide
│
├── CUSTOMIZATION.md                 # This guide you're reading!
│
└── FOLDER_STRUCTURE.md              # This file
```

## Key Directories Explained

### `/public`
- Served directly at the root URL
- Put static assets here (images, fonts, resume.pdf)
- Files here don't go through webpack/bundler
- Accessible via `/filename.ext` in code

### `/src/app`
- Next.js 14 App Router structure
- Each folder can have a `page.tsx` (becomes a route)
- `layout.tsx` wraps all child pages
- Special files: `loading.tsx`, `error.tsx`, `not-found.tsx`

### `/src/components`
- Reusable React components
- Organized by feature/section
- Each component is self-contained
- Import where needed

### `/src/data`
- **This is where you'll spend most time customizing!**
- Static data for projects and skills
- Easy to edit without touching component code
- TypeScript interfaces ensure data consistency

### `/src/providers`
- React Context providers
- Wrap app to provide global state
- Theme provider handles dark mode

### `/src/utils`
- Helper functions and constants
- Shared utilities across components
- Animations, formatters, etc.

## File Naming Conventions

- **Components**: PascalCase (e.g., `Hero.tsx`, `ProjectDetail.tsx`)
- **Utilities**: camelCase (e.g., `animations.ts`)
- **App Router**: lowercase (e.g., `page.tsx`, `layout.tsx`)
- **Data files**: camelCase (e.g., `projects.ts`)

## Import Aliases

The project uses TypeScript path aliases:

```typescript
import Component from '@/components/...'  // → src/components/
import { projects } from '@/data/...'     // → src/data/
import { useTheme } from '@/providers/...'// → src/providers/
```

Benefits:
- Cleaner imports (no `../../../`)
- Easy to move files
- Configured in `tsconfig.json`

## Component Architecture

### Page Components (`page.tsx`)
- Entry point for routes
- Fetch data (if needed)
- Compose smaller components
- Handle metadata

### Section Components (`components/home/*`)
- Self-contained page sections
- Own data and logic
- Responsive design
- Framer Motion animations

### UI Components (`components/ui/*`)
- Reusable across project
- No business logic
- Styled with Tailwind
- Accessible

## Data Flow

```
Data (src/data/*.ts)
    ↓
Page Component (src/app/*/page.tsx)
    ↓
Section Component (src/components/*/Section.tsx)
    ↓
UI Component (src/components/ui/*.tsx)
```

## Styling Strategy

1. **Tailwind Classes**: Primary styling method
2. **Global CSS**: Custom utilities in `globals.css`
3. **CSS Modules**: Not used (Tailwind preferred)
4. **Inline Styles**: Only for dynamic values

## State Management

- **Local State**: `useState` for component-specific state
- **Context**: Theme provider for global dark mode
- **URL State**: Search params for filters
- **No Redux/Zustand**: Not needed for this portfolio

## Best Practices

### Adding a New Component

1. Create file in appropriate folder
2. Use TypeScript interfaces for props
3. Add Framer Motion animations
4. Make it responsive (mobile-first)
5. Support dark mode
6. Export default

### Adding a New Page

1. Create folder in `src/app`
2. Add `page.tsx`
3. Add metadata for SEO
4. Import necessary components
5. Test routing

### Adding New Data

1. Update interface in data file
2. Add new entry to array
3. TypeScript will catch missing fields
4. Verify in UI

## Performance Considerations

- **Images**: Use Next.js `<Image>` component
- **Lazy Loading**: Framer Motion's viewport detection
- **Code Splitting**: Automatic with App Router
- **Fonts**: Optimized with `next/font`

## Development Workflow

1. **Start dev server**: `npm run dev`
2. **Edit files**: Changes hot-reload
3. **Check types**: `npm run type-check` (if configured)
4. **Build**: `npm run build`
5. **Test build**: `npm run start`

## Common Modifications

### Add a new homepage section
1. Create component in `src/components/home/`
2. Import in `src/app/page.tsx`
3. Add between existing sections

### Add a new page route
1. Create folder in `src/app/`
2. Add `page.tsx` in that folder
3. Add link in navigation

### Modify styling
1. Global styles → `src/app/globals.css`
2. Theme colors → `tailwind.config.ts`
3. Component styles → Tailwind classes in component

### Update content
1. Personal info → `src/app/layout.tsx` and component files
2. Projects → `src/data/projects.ts`
3. Skills → `src/data/skills.ts`

## Questions?

Refer to:
- [README.md](README.md) - Setup and features
- [CUSTOMIZATION.md](CUSTOMIZATION.md) - How to customize
- Component comments - Inline documentation
- Next.js docs - https://nextjs.org/docs
