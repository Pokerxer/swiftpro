# Swift Professional Solutions Limited - Website Development Instructions

You are an expert full-stack web developer. Your task is to build a complete,
professional, and production-ready website for a Nigerian ICT firm called
"Swift Professional Solutions Limited". Follow every instruction below precisely
and do not skip any step.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧱 TECH STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Framework: Next.js 14+ (App Router)
- Styling: Tailwind CSS v3+
- State Management: Redux Toolkit (RTK)
- Language: TypeScript (strict mode)
- UI Components: shadcn/ui
- Icons: Lucide React
- Animations: Framer Motion
- Forms: React Hook Form + Zod validation
- Email: Nodemailer or Resend (for contact form)
- HTTP Client: Axios with RTK Query
- Database (optional CMS): Sanity.io or Contentlayer for blog
- Deployment Target: Vercel
- Package Manager: pnpm
- Linting: ESLint + Prettier
- Git: Initialize a clean Git repo with a proper .gitignore

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📁 PROJECT STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Follow this exact folder structure:

/app
  /layout.tsx              → Root layout with metadata, fonts, Redux Provider
  /page.tsx                → Home page
  /about/page.tsx
  /services/page.tsx
  /services/[slug]/page.tsx
  /portfolio/page.tsx
  /portfolio/[slug]/page.tsx
  /blog/page.tsx
  /blog/[slug]/page.tsx
  /contact/page.tsx
  /privacy-policy/page.tsx
  /terms/page.tsx
  /api/contact/route.ts    → API route for contact form submission

/components
  /layout
    Navbar.tsx
    Footer.tsx
    MobileMenu.tsx
  /ui                      → shadcn/ui components live here
  /sections
    HeroSection.tsx
    ServicesSection.tsx
    AboutSection.tsx
    StatsSection.tsx
    TestimonialsSection.tsx
    PortfolioSection.tsx
    CTASection.tsx
    BlogSection.tsx
    ContactSection.tsx
    WhatsAppButton.tsx
  /shared
    SectionHeader.tsx
    ServiceCard.tsx
    PortfolioCard.tsx
    BlogCard.tsx
    TestimonialCard.tsx
    AnimatedCounter.tsx
    PageHeader.tsx
    SEOHead.tsx

/store
  /index.ts                → Redux store configuration
  /slices
    uiSlice.ts             → mobile menu, modal, theme state
    contactSlice.ts        → contact form submission state
    portfolioSlice.ts      → portfolio filter state

/lib
  constants.ts             → All site-wide content (services, nav links, etc.)
  utils.ts
  validations.ts           → Zod schemas
  metadata.ts              → generateMetadata helpers

/hooks
  useScrollPosition.ts
  useAnimateOnScroll.ts
  useContactForm.ts

/types
  index.ts                 → All TypeScript interfaces & types

/public
  /images
  /icons
  /og                      → Open Graph images

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 DESIGN SYSTEM & BRANDING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Brand Identity:
- Company Name: Swift Professional Solutions Limited
- Tagline: "Driving Digital Transformation Across Nigeria"
- Brand Colors:
    Primary:   #0A2463 (Deep Navy Blue — trust, professionalism)
    Secondary: #E63946 (Bold Red — energy, action)
    Accent:    #3A86FF (Light Blue — technology, innovation)
    Neutral:   #F8F9FA (Off White), #1C1C1E (Near Black)
- Typography:
    Headings: Inter or Plus Jakarta Sans (Google Fonts)
    Body: Inter
    Monospace (code/tech elements): JetBrains Mono
- Border Radius: rounded-xl as default
- Design Style: Clean, modern, corporate tech.
  Use glassmorphism cards, subtle gradients, and smooth
  Framer Motion animations throughout.

Tailwind config (tailwind.config.ts) must extend the theme
with the brand colors above as named tokens
(e.g., primary, secondary, accent).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 PAGES & CONTENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Build the following pages with full content (do not use lorem ipsum):

── HOME PAGE (/):
  1. Hero Section
     - Bold headline: "Empowering Businesses with Cutting-Edge ICT Solutions"
     - Subheadline: "Swift Professional Solutions Limited delivers world-class
       IT services across Nigeria — from Lagos to Abuja and beyond."
     - Two CTA buttons: "Get a Free Consultation" (primary)
       and "View Our Services" (secondary/outline)
     - Animated background: subtle floating tech particles or gradient mesh
     - Hero image: a professional Nigerian tech workspace illustration or mockup

  2. Trusted By / Stats Section
     - Animated counters: 200+ Clients, 500+ Projects, 10+ Years Experience,
       98% Client Satisfaction
     - Logos bar of trusted partner/client brand placeholders

  3. Services Overview Section
     - Grid of 6 service cards with icons, title, and short description
     - Each card links to /services/[slug]
     - Services: IT Infrastructure, Software Development, Cybersecurity,
       Cloud Solutions, IT Consulting, Managed IT Support

  4. About Snippet Section
     - Left: text block with company overview, mission, and RC number mention
     - Right: professional image placeholder
     - CTA: "Learn More About Us"

  5. Portfolio Highlights
     - 3 featured project cards with image, title, tags, and link

  6. Testimonials Section
     - Auto-scrolling carousel with 5 client testimonials
     - Each has: name, company, role, rating (stars), and quote

  7. Blog / Insights Preview
     - Latest 3 blog post cards

  8. CTA Banner
     - "Ready to Transform Your Business?"
     - WhatsApp and Contact Us buttons

── ABOUT PAGE (/about):
  - Company story, founding year, mission, vision, core values
  - Leadership team cards (name, role, photo placeholder, LinkedIn icon)
  - Why Choose Us section (6 value proposition cards)
  - CAC Registration notice with RC number placeholder
  - Nigeria map showing office locations (use SVG or static map image)

── SERVICES PAGE (/services):
  - Header with intro paragraph
  - All 6 service cards in a grid, each linking to dynamic detail page

── SERVICE DETAIL PAGE (/services/[slug]):
  - Dynamically rendered from constants.ts
  - Full description, features list, process steps, related services, CTA

── PORTFOLIO PAGE (/portfolio):
  - Filterable grid (by category: Web, Infrastructure, Software, Security)
  - Redux handles active filter state
  - Project cards with image, title, tech stack tags, and modal or link

── BLOG PAGE (/blog):
  - List of blog posts with search and category filter
  - Blog data sourced from Contentlayer markdown files or Sanity CMS

── CONTACT PAGE (/contact):
  - Contact form: Name, Email, Phone (Nigerian format validation),
    Company, Service Interest (dropdown), Message
  - Form validated with React Hook Form + Zod
  - On submit: POST to /api/contact/route.ts which sends email via Resend
  - Show success/error toast using shadcn/ui Toast
  - Sidebar: Office address, phone numbers, email,
    Google Map embed (Lagos or Abuja office)
  - WhatsApp direct link button

── PRIVACY POLICY & TERMS PAGES:
  - Full NDPA (Nigeria Data Protection Act) compliant
    privacy policy text
  - Terms of Service page

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 WHATSAPP FLOATING BUTTON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Fixed bottom-right floating WhatsApp button on ALL pages
- Green color (#25D366)
- Opens wa.me link with pre-filled message:
  "Hello Swift Professional Solutions, I'd like to enquire about your services."
- Animate it with a pulse ring effect using Framer Motion
- Show a small tooltip on hover: "Chat with us on WhatsApp"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗃️ REDUX STORE SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Configure Redux Toolkit with the following slices:

uiSlice.ts:
  - State: { isMobileMenuOpen: boolean, activeModal: string | null, theme: 'light' | 'dark' }
  - Actions: toggleMobileMenu, closeMenu, openModal, closeModal, setTheme

contactSlice.ts:
  - State: { status: 'idle' | 'loading' | 'success' | 'error', errorMessage: string | null }
  - Use RTK createAsyncThunk for form submission

portfolioSlice.ts:
  - State: { activeFilter: string, filteredProjects: Project[] }
  - Actions: setFilter, resetFilter

Wrap the entire app with a ReduxProvider component inside app/layout.tsx.
The ReduxProvider must be a client component ('use client')
wrapping the children.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ PERFORMANCE & SEO RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Every page must have a generateMetadata() function with:
    title, description, keywords, openGraph (image, title, description),
    twitter card, canonical URL
- Use Next.js Image component for all images with proper
  width, height, and alt text
- Implement dynamic sitemap.xml via /app/sitemap.ts
- Implement robots.txt via /app/robots.ts
- Use next/font for Google Fonts (no external font CDN calls)
- Lazy load all below-the-fold sections using dynamic imports
  with Suspense boundaries
- Target Lighthouse score: 90+ on Performance, SEO, Accessibility
- Add structured data (JSON-LD) on Home and Service pages
  for Google rich snippets
- Include local business schema for Nigerian SEO:
  addressLocality: "Lagos", addressCountry: "NG"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 RESPONSIVE DESIGN RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Mobile-first design. Every component must look perfect on:
    Mobile: 375px – 639px
    Tablet: 640px – 1023px
    Desktop: 1024px and above
- Hamburger menu on mobile using Redux uiSlice for open/close state
- Tap targets must be minimum 44x44px on mobile
- No horizontal scroll on any screen size
- Use Tailwind responsive prefixes (sm:, md:, lg:, xl:) consistently

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎞️ ANIMATIONS (Framer Motion)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Hero section: fade-in + slide-up on load
- Section headers: fade-in on scroll using whileInView
- Service cards: staggered fade-in-up on scroll
- Stats counters: count up animation when section enters viewport
- Portfolio cards: scale-up on hover
- Navbar: hide on scroll down, show on scroll up (useScrollPosition hook)
- Page transitions: subtle fade between route changes
- Keep animations subtle and professional — avoid anything flashy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 SECURITY & COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Add HTTP security headers in next.config.ts:
    X-Frame-Options: DENY
    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
    Permissions-Policy: camera=(), microphone=(), geolocation=()
    Content-Security-Policy (basic)
- Sanitize all contact form inputs before sending email
- Rate-limit the /api/contact route (use upstash/ratelimit or basic IP check)
- Use environment variables for all API keys and secrets
  (Resend key, WhatsApp number, etc.)
- Add .env.local.example file documenting all required env vars:
    RESEND_API_KEY=
    CONTACT_EMAIL=
    WHATSAPP_NUMBER=
    NEXT_PUBLIC_SITE_URL=

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧩 ADDITIONAL COMPONENTS & FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Dark/Light mode toggle using Redux uiSlice + Tailwind dark: classes
- Cookie consent banner (simple, NDPA-aware)
- 404 custom page (not-found.tsx) with brand styling and back-home button
- Loading skeleton screens for dynamic content
- Back-to-top button (appears after scrolling 400px)
- Breadcrumb navigation on inner pages
- Active nav link highlighting based on current route
- Smooth scroll behavior (add to globals.css: scroll-behavior: smooth)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 FINAL DELIVERABLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When done, make sure the following are complete:

✅ All pages built and fully responsive
✅ Redux store fully wired with all slices
✅ Contact form submits and sends email successfully
✅ All TypeScript types defined — zero 'any' types
✅ ESLint passes with zero errors
✅ No console.log statements in production code
✅ README.md with: project overview, setup instructions,
   env variables guide, deployment steps to Vercel
✅ All images use next/image with alt text
✅ Every page has proper metadata
✅ Sitemap and robots.txt generated
✅ Build runs successfully: pnpm build with zero errors
✅ WhatsApp floating button visible on all pages
✅ Dark mode works correctly on all pages

Do not ask for clarification. Use your best judgment for any
missing details. Begin by scaffolding the full project structure,
then build each section methodically. Prioritize correctness,
clean code, and a visually impressive result.