# Three Day Weekend, LLC

Premium landing page for automation and back-office solutions for the tree care industry.

## 🌲 Features

- **Premium Design**: Awwwards/Dribbble quality with advanced animations
- **Animated Hero**: Canvas-based particle system with gradient orbs
- **Scroll Animations**: Intersection Observer-based reveal effects
- **3D Card Tilts**: Mouse-responsive card interactions
- **Number Counters**: Animated statistics on scroll
- **Fully Responsive**: Mobile-first design, optimized for all devices
- **Performance Optimized**: Lazy loading, throttled scroll handlers
- **Smooth Interactions**: Ripple effects, parallax, gradient animations

## 🚀 Deployment to GitHub Pages

### Option 1: Deploy via GitHub Website

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Add landing page"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select `main` branch
   - Select `/ (root)` folder
   - Click **Save**

3. **Access Your Site**:
   - Your site will be live at: `https://yourusername.github.io/repository-name/`
   - It may take a few minutes to deploy

### Option 2: Deploy via GitHub CLI

```bash
# Ensure you're in the repository
cd /path/to/website

# Push your changes
git add .
git commit -m "Add landing page"
git push origin main

# Enable GitHub Pages (requires gh CLI)
gh repo edit --enable-pages --pages-branch main --pages-path /
```

### Option 3: Custom Domain

1. Add a `CNAME` file to the root:
   ```bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. Configure DNS:
   - Add an A record pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or add a CNAME record pointing to `yourusername.github.io`

3. Update GitHub Pages settings to use your custom domain

## 📁 Project Structure

```
website/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Core styles and layout
│   └── animations.css     # Animation definitions
├── js/
│   ├── main.js            # Main JavaScript (scroll, interactions)
│   └── canvas-effects.js  # Hero canvas animations
└── README.md              # This file
```

## 🎨 Customization

### Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --color-primary: #024F4F;      /* Deep teal */
    --color-secondary: #00BFFF;    /* Electric blue */
    --color-accent: #FF6B35;       /* Bright orange */
}
```

### Content

- **Company Name**: Update in `index.html` (search for "Three Day Weekend")
- **Email**: Update `info@threeday.llc` in `index.html`
- **Taglines**: Edit hero title, section headings, and copy in `index.html`

### Features

- **Add/Remove Sections**: Edit `index.html` section blocks
- **Modify Statistics**: Update `data-target` attributes in stats section
- **Change Icons**: Modify SVG shapes in card icons

## 🔧 Local Development

### Option 1: Python Server
```bash
# Python 3
python -m http.server 8000

# Visit http://localhost:8000
```

### Option 2: Node.js Server
```bash
# Install serve globally
npm install -g serve

# Run server
serve .

# Visit http://localhost:3000
```

### Option 3: VS Code Live Server
- Install "Live Server" extension
- Right-click `index.html`
- Select "Open with Live Server"

## ⚡ Performance Tips

- **Images**: Add images to `/assets/images/` and use lazy loading
- **Fonts**: Currently using Google Fonts (Montserrat, Inter)
- **Animations**: Reduce if targeting low-end devices (edit `animations.css`)

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
- **Canvas API**: Hero background animations
- **Intersection Observer**: Scroll-triggered animations

## 📧 Contact

For questions about this landing page, reach out to info@threeday.llc

---

**Built with ❤️ for Three Day Weekend, LLC**
