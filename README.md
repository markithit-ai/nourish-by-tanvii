# Nourish by Tanvi — Official Website

A premium, modern, responsive website for **Nourish by Tanvi** (Dr. Tanvi, Nutritionist & Dietician), tailored for practical, sustainable nutrition guidance in weight loss, thyroid and lifestyle management, PCOD, and diabetes.

This website is built with pure, static **HTML5, CSS3, and JavaScript**. It does not require Node.js, databases, PHP, or backends at runtime, making it 100% ready to host on **GitHub Pages**, Netlify, Vercel, or any static web host.

---

## Folder Structure

```text
/
├── index.html            # Main website markup & SEO metadata
├── style.css             # Complete design system & responsive styling
├── script.js             # Vanilla JS for navigation, accordion, carousel & WhatsApp
├── README.md             # This setup and modification guide
└── assets/
    ├── NBT Logo.png      # Official brand logo
    └── Tanvi Photo.jpg   # Dr. Tanvi's main hero portrait
```

---

## 1. How to Upload the Project to GitHub

1. Log into your [GitHub account](https://github.com/).
2. Click the **+** (plus icon) in the top-right corner and select **New repository**.
3. Name your repository (for example: `nourish-by-tanvi`).
4. Set the visibility to **Public** (required for free GitHub Pages).
5. Click **Create repository**.
6. On the repository page, click **Upload an existing file** (or push using Git command line):
   - Drag and drop `index.html`, `style.css`, `script.js`, `README.md`, and the `assets/` folder (with `NBT Logo.png` and `Tanvi Photo.jpg` inside).
7. Type a commit message like `Initial website commit` and click **Commit changes**.

---

## 2. How to Enable GitHub Pages

Once your files are uploaded to GitHub:

1. In your repository, click the **Settings** tab at the top.
2. In the left sidebar, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
4. Under **Branch**, select `main` (or `master`) and keep the folder as `/ (root)`.
5. Click **Save**.
6. Wait 1–2 minutes. Refresh the page until GitHub displays:
   > *"Your site is live at `https://<your-username>.github.io/<repository-name>/`"*
7. Click the link to view your live website!

---

## 3. Where to Replace the Brand Logo

The official logo is located at:
```text
assets/NBT Logo.png
```
- To update or replace the logo with a higher-resolution version, simply overwrite the file in the `assets/` folder named `NBT Logo.png`.
- Keep the exact file name `NBT Logo.png` so that `index.html` references it automatically without changing code.

---

## 4. Where to Replace Tanvi's Portrait Image

The hero and about section photo is located at:
```text
assets/Tanvi Photo.jpg
```
- To update Dr. Tanvi's portrait photo, place your new photo into the `assets/` folder with the exact filename `Tanvi Photo.jpg`.
- The website uses modern CSS `object-fit: cover` with rounded borders, so vertical or square portraits look crisp and well-proportioned across all screen sizes.

---

## 5. Where to Change the WhatsApp Number

Open `script.js` in any text editor. Near the top of the file, you will find:

```javascript
const CONFIG = {
  // Official WhatsApp phone number (with country code, no + or spaces)
  WHATSAPP_PHONE: '919667221287',
  ...
};
```
Change `'919667221287'` to your new WhatsApp number. Keep the country code (e.g. `91` for India) with no spaces, dashes, or `+` signs.

---

## 6. Where to Edit the ₹99 Consultation CTA & Messages

In `script.js`, you can customize the pre-filled messages sent when users click consultation buttons:

```javascript
MESSAGES: {
  consultation: "Hi Tanvi! I'd like to book the ₹99 nutrition consultation. Please share the details and payment process.",
  inquiry: "Hi Tanvi! I came across Nourished by Tanvi and would like to know more about your nutrition consultation and services.",
  weightLoss: "Hi Tanvi! I'm interested in personalized nutrition guidance for Weight Loss. Could you share consultation details?",
  thyroid: "Hi Tanvi! I'd like to consult with you regarding Thyroid & Lifestyle Management. Please share consultation details.",
  pcod: "Hi Tanvi! I'd like guidance for PCOD Management and sustainable lifestyle routines. Please share consultation details.",
  diabetes: "Hi Tanvi! I'd like guidance for Diabetes nutrition and lifestyle management. Please share consultation details.",
  final: "Hi Tanvi! I'd like to know more about your nutrition services and would like to book a consultation."
}
```

If you ever change the price (e.g., from ₹99 to another amount), search for `99` in `index.html` and update the button and heading text.

---

## 7. Where to Replace Testimonials

In `index.html`, find the section `<section id="testimonials" ...>`.

Each review card has this structure:

```html
<div class="testimonial-card">
  <div class="testimonial-stars">★★★★★</div>
  <p class="testimonial-text">
    "Paste your real client review or quote here."
  </p>
  <div class="testimonial-client">
    <div class="client-avatar-placeholder">Initials</div>
    <div class="client-info">
      <span class="client-name">Client Name</span>
      <span class="client-tag">Weight Loss / PCOD Guidance</span>
    </div>
  </div>
</div>
```
Simply replace the placeholder quotes with your genuine client reviews.

---

## 8. Where to Edit the Instagram URL

The Instagram profile is linked in multiple spots (`index.html` and footer). Search for:
```html
https://www.instagram.com/nourishbytanviii/
```
and replace with your updated URL if your username ever changes.

---

## 9. How to Add a Future Payment Link (Razorpay, Instamojo, Stripe)

Right now, clicking **"Book ₹99 Consultation"** opens WhatsApp directly so clients can request payment details from Dr. Tanvi.

When you are ready to connect an automated payment gateway:
1. Open `script.js`.
2. Look for `PAYMENT_URL: null` inside `CONFIG`.
3. Paste your payment link:
   ```javascript
   PAYMENT_URL: 'https://rzp.io/l/your-consultation-link',
   ```
4. Save the file. All consultation CTA buttons will immediately redirect clients directly to your checkout page without any extra configuration!

---

## 10. CDN Dependencies Used

This project intentionally minimizes external dependencies for blazing-fast loading speeds, reliability, and security:
- **Google Fonts (Montserrat)**:
  `https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap`
- **Zero JavaScript Frameworks**: Built using standard Vanilla JS that runs in 100% of modern browsers with zero build steps or compilation needed.

---

## Brand Colors Reference

- **Primary Green**: `#3D7C65`
- **Accent Yellow**: `#F7E11D`
- **Dark Forest Shade**: `#1A3B30` / `#275243`
- **Light Tint Background**: `#FAF9F6` / `#EAF4F0`
- **Charcoal Text**: `#1C2723` / `#4F5E58`
