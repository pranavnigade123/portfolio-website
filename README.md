# Pranav Nigade - Portfolio

A modern, terminal-inspired portfolio website built with Next.js 15, featuring interactive elements and smooth animations.

## 🚀 Features

- **Boot Sequence Animation** - Linux-style boot animation on first visit
- **Interactive Terminal** - Working terminal with custom commands and mobile-friendly interface
- **Certificate Showcase** - Display your certifications with modal view
- **Responsive Design** - Fully responsive across all devices
- **Modern Tech Stack** - Built with Next.js 15, TypeScript, Tailwind CSS
- **3D Elements** - Three.js animations and effects
- **Smooth Animations** - Framer Motion for buttery smooth transitions

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **3D Graphics:** Three.js, React Three Fiber
- **Icons:** Lucide React

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## ⚙️ Configuration

1. **EmailJS Setup** (for contact form):
   - Create an account at [EmailJS](https://www.emailjs.com/)
   - Set up an email service (Gmail or EmailJS service)
   - Create an email template with variables: `{{name}}`, `{{email}}`, `{{message}}`
   - Copy `.env.local.example` to `.env.local`
   - Add your EmailJS credentials:
     ```env
     NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
     ```
   - For production (Vercel), add these as environment variables in project settings
   - Restart dev server after adding credentials

2. **Certifications** (optional):
   - Add your certification images (PNG/JPG) to `public/certs/`
   - Update the certifications array in `components/about-section.tsx`
   - Certificates are displayed with modal view on click

3. **Resume**:
   - Add your resume PDF as `public/Pranav-Nigade-Resume.pdf`
   - Or update the path in `components/footer.tsx` and `components/interactive-terminal.tsx`

## 📝 Terminal Commands

Open the terminal (click the floating terminal icon) and try these commands:

- `help` - Show all available commands
- `about` - Learn about me
- `skills` - List technical skills
- `projects` - View my projects
- `education` - Show education background
- `contact` - Get contact information
- `neofetch` - Display system information
- `github` - Open GitHub profile
- `linkedin` - Open LinkedIn profile
- `resume` - Download resume


## � Acknowledgments

- **Modifications & Enhancements:** Pranav Nigade - Added interactive terminal, boot sequence, and various UX improvements

> Inspired by [Rakesh Yadav's portfolio](https://github.com/Rakeshyadav-19)

## �👤 Author

**Pranav Nigade**
- GitHub: [@pranavnigade123](https://github.com/pranavnigade123)
- LinkedIn: [pranav-nigade](https://linkedin.com/in/pranav-nigade)
- Email: pranavv.nigade@gmail.com

---

