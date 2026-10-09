# Yatra Kits

A lightweight, configuration-driven static website for a small business selling Yatra Kits and pilgrimage travel essentials. It uses plain HTML, CSS and browser JavaScript; there is no build step, backend, database, shopping cart or form submission service.

The kit catalogue and business information are sample content. Confirm all product details and replace every bracketed placeholder before publishing as a live business site.

## Project files

```text
yatrakits/
├── index.html
├── css/style.css
├── js/config.js       # Business, product, gallery and FAQ content
├── js/main.js         # Rendering and interactions
├── assets/
│   ├── icons/favicon.svg
│   └── images/
│       ├── hero/
│       ├── products/
│       └── gallery/
├── netlify.toml
├── .gitignore
└── LICENSE
```

## Update the site

Edit `js/config.js` to change the business name and tagline, company introduction, story, mission, values, team, contact details, service area, social links, product catalogue, optional prices, availability labels, contents prompts, gallery and FAQ. The page reads these values at load time. The configuration is public: never put passwords, API keys or private information in it.

The three initial products are explicitly sample concepts. Their availability is not stock confirmation. Prices are blank and display “Contact us for pricing”. Confirm all actual items, prices, availability, customization and delivery details with the business before publishing claims.

Contact fields start blank. Add WhatsApp as an international number containing digits only, for example `919876543210` (replace it with the real business number). The number is visible in source and is used to construct `https://wa.me/` links. Email and phone are optional. WhatsApp and email enquiries open the visitor's app; they do not submit an order to this website. Email links rely on a configured email application. There is no contact form, payment processing, checkout, analytics or personal-data collection.

Replace all `[Add ...]` values with verified business details, or leave them as clear placeholders until confirmed. Social links are omitted unless a valid HTTP(S) URL is configured.

## Add product photographs

The site contains no third-party or stock photos. Add photographs that the business owns or has permission to use; keep each configured filename and path in sync.

| Purpose | Suggested file | Suggested dimensions |
| --- | --- | --- |
| Hero | `assets/images/hero/yatra-kit-hero.jpg` | About 1600 × 1800 px |
| Essential sample | `assets/images/products/essential-kit.jpg` | About 1200 × 1000 px |
| Family sample | `assets/images/products/family-kit.jpg` | About 1200 × 1000 px |
| Custom sample | `assets/images/products/custom-kit.jpg` | About 1200 × 1000 px |
| Gallery | `assets/images/gallery/product-detail-1.jpg` and the other configured gallery paths | About 1600 × 1200 px |

Use optimized JPG, PNG or WebP files. Keep the hero reasonably small (ideally under 500 KB) and product/gallery images around 300 KB or less when practical. The browser preserves the design's aspect ratios and crops with `object-fit: cover`; frame the subject with some space around it. If using a different filename or format, update the corresponding `image` or `src` in `js/config.js`. Update each product's `imageAlt` and each gallery `alt` to describe the actual photograph, not just the filename. Missing images show a designed fallback rather than a broken-image icon. The social preview image in `index.html` also points to the hero file; add that photo or change/remove the Open Graph image before launch.

## Run locally

No Node.js installation or build command is needed. Install Git only if you need to clone or push the repository. On macOS, Git may already be available; check with `git --version`. If it is missing, install Apple's Command Line Tools with `xcode-select --install`, or install Git from the official Git website.

1. Open this project folder (`yatrakits`) in VS Code using **File → Open Folder**.
2. For a basic preview, open `index.html` in a browser. A local server is preferable because it behaves more like hosting.
3. From the project root, start Python's built-in static server (Python must already be installed):

	```sh
	python3 -m http.server 8000
	```

4. Visit [http://localhost:8000](http://localhost:8000/). Stop the server with `Ctrl+C` in its terminal.
5. Check every navigation link, open/close product details and gallery images, expand FAQ answers, and inspect missing-image fallbacks. At this stage contact actions should be absent or show the unconfigured setup message. After entering real contact details, confirm the WhatsApp URL contains the selected kit name and test the link on a device with WhatsApp. Test email links with an email app configured.
6. Use browser responsive/device emulation at narrow phone, tablet and desktop widths. Check that the mobile menu opens and closes with its button, a navigation choice and Escape; check keyboard focus and reduced-motion settings.

Run the server command from the project root, not the parent directory, or the URL will serve the wrong files. If Python is unavailable, direct-open `index.html` for a basic preview or install Python 3; Node is not required.

## Git and GitHub

This working copy was cloned from a GitHub repository and already has a remote. Check it first:

```sh
git status
git remote -v
```

Review the changes, then commit and push to the current branch:

```sh
git add .
git status
git commit -m "Build Yatra Kits static website"
git push origin main
```

Verify the commit and files in the GitHub repository in your browser. If you are starting from a new local folder instead, initialize it with `git init`, create an empty GitHub repository, and connect it (replace the placeholders):

```sh
git init
git add .
git commit -m "Build Yatra Kits static website"
git branch -M main
git remote add origin https://github.com/<GITHUB_USERNAME>/<REPOSITORY>.git
git push -u origin main
```

Authenticate through GitHub's normal browser/credential flow or SSH. Do not put access tokens in files, URLs, or commands saved in shell history.

## Deploy to Netlify

`netlify.toml` sets the repository root (`.`) as the publish directory. There is no build command. The site uses ordinary static hosting features; Netlify plan names, limits and terms can change, so check the current Free plan details before relying on a particular quota or feature. No custom domain is required.

### A. Git-connected deployment (recommended)

1. Create or sign in to a Netlify account and connect your GitHub account.
2. In Netlify, choose **Add new site** / **Import an existing project** and select GitHub (interface labels can change).
3. Choose this repository and the branch to deploy (normally `main`).
4. Confirm the publish directory is `.` / repository root. Leave the build command empty; do not add a build step.
5. Deploy the site. Wait for Netlify to report a successful publish, then open the generated `*.netlify.app` address and verify the page and HTTPS lock.
6. Test that public URL from a phone over mobile data, not only from your local network.
7. To update the site, edit and test the files, then commit and push to the connected branch. Netlify should start a new deploy; confirm it completes and inspect the published result.

### B. Manual deployment

In the Netlify dashboard, use the manual deploy / Netlify Drop workflow offered for static sites. Upload or drop the built site directory contents (the folder containing `index.html`, `css/`, `js/` and `assets/`) using the current Netlify interface. There is no build output folder: publish the project root. Open the assigned `*.netlify.app` URL after the upload and test it. Manual uploads do not automatically follow Git commits; upload the updated site again when publishing changes. Dashboard labels and manual deployment availability may change with Netlify's current terms.

### Deployment troubleshooting

- A 404 or blank page usually means the publish directory is not the folder containing `index.html`; select the repository root (`.`).
- Missing CSS, scripts or photos commonly come from altered paths or letter-case differences. Keep the relative paths and filenames in `js/config.js` exactly aligned with repository files; hosted paths are case-sensitive.
- A missing photograph should show the built-in fallback. Confirm the matching local file exists and was committed/published.
- After a successful deploy, use a hard refresh or private browser window if an old version appears. Check the deploy's published files and status before changing configuration.
- If a Git push does not deploy, confirm Netlify is connected to the intended repository and branch, then inspect the deploy log for the specific failure.

## Owner launch checklist

- Replace business introduction, reason for starting, mission, values, founder/team, service area and all bracketed placeholders in `js/config.js`.
- Confirm all product names, descriptions, intended uses, contents, prices and availability labels; remove or rename sample concepts that are not offered.
- Add real contact details and test WhatsApp/email/phone links.
- Add licensed product photos, update their alt text and confirm the paths and Open Graph image.
- Review FAQ answers against the actual business policies. Do not publish unconfirmed shipping, payment, returns or delivery promises.
- Add a privacy policy only if the business begins collecting data or otherwise needs one; this site currently collects none.
- Check mobile and desktop, keyboard navigation, contrast, links, browser console and the deployed HTTPS site.

## Test checklist

Use this list for each release; items are not pre-marked as passed.

- [ ] Homepage loads from a local server and from the deployed URL.
- [ ] All sections appear and every navigation link reaches the correct section.
- [ ] Mobile navigation opens/closes by button, Escape and link activation.
- [ ] Product cards render from configuration; blank prices say “Contact us for pricing”.
- [ ] Product details open, close by button, Escape and backdrop, and return focus to the opener.
- [ ] Product enquiry message names the selected kit after a real WhatsApp number is configured.
- [ ] Existing photos load; missing photos show a fallback; alt text describes real images.
- [ ] Gallery opens a larger view and closes by button, Escape and backdrop.
- [ ] FAQ questions expand and collapse by keyboard and pointer.
- [ ] With contact fields blank, WhatsApp actions are hidden, no fake confirmation appears, and the development setup message is visible.
- [ ] With details configured, WhatsApp, email and phone URLs are correct; copy controls work in a secure browser context.
- [ ] No browser console errors, missing internal targets or unexpected broken links.
- [ ] Phone, tablet, laptop and desktop layouts have no horizontal scrolling or overlapping content.
- [ ] Reduced-motion preference is respected.
- [ ] Netlify deploy succeeds, HTTPS works, and a GitHub push triggers a new deploy for Git-connected hosting.

## License and content

Website source code is offered under the MIT License in `LICENSE`. The license does not grant reuse rights for product photos, business content, logos or brand assets; obtain permission from their owners

python3 -m http.server 8000