# Sodaro GitHub Pages Popup Site

A responsive, mobile-friendly Sodaro microsite built with HTML, CSS, JavaScript, and p5.js.

## Publish with GitHub Pages

1. Create a new GitHub repository, for example `sodaro`.
2. Upload all files from this folder to the repository root.
3. In GitHub, open **Settings > Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose the `main` branch and `/root`, then save.
6. Your link will look like:

   `https://YOUR-USERNAME.github.io/sodaro/`

## Connect it to your portfolio button

Use the published GitHub Pages URL as the button link in GoDaddy.

Open in a new tab:

```html
<a href="https://YOUR-USERNAME.github.io/sodaro/" target="_blank" rel="noopener">Explore Sodaro</a>
```

Open as a popup window:

```html
<a href="https://YOUR-USERNAME.github.io/sodaro/"
   onclick="window.open(this.href,'sodaro','width=1200,height=850,resizable=yes,scrollbars=yes'); return false;">
  Explore Sodaro
</a>
```

## Edit the content

- Main page content: `index.html`
- Colors and layout: `styles.css`
- Popup feature descriptions: `script.js`
- Interactive particle background: `sketch.js`
