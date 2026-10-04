# Local preview and homepage editing

Run this from the repository folder:

```sh
npm run preview
```

Alternatively, run `sh scripts/preview.sh` without Node.js or npm.

Open **http://localhost:4000** in your browser. The first run downloads Bundler and
the Jekyll dependencies into ignored local folders and can take a few minutes.
Ruby 3.1 or newer and an internet connection are required for the initial setup.
On macOS, install Ruby with `brew install ruby@3.3` if needed. The preview script
automatically detects Homebrew Ruby; the macOS system Ruby is too old for this
site's current dependencies.

Keep the terminal running while you edit. Saving content, project data, or CSS
rebuilds the site and refreshes the browser automatically. Stop with `Ctrl+C`.
Restart the command after changing `_config.yml` or `_config.local.yml`.
If port 4000 is occupied, stop the other preview process before restarting.

This preview uses the same Jekyll templates as GitHub Pages. It does not commit,
push, or deploy anything. `_config.local.yml` is used only by the preview command;
the production URL in `_config.yml` remains unchanged. Generated `_site/`,
`local/`, `vendor/`, and `.bundle/` files are ignored by Git.

## Edit the homepage

| File | What to change |
| --- | --- |
| `_pages/about.md` | Biography and news |
| `_data/research.yml` | Project order, titles, TL;DRs, venues, images, and links |
| `assets/css/home.css` | Homepage typography, colors, spacing, and responsive layout |
| `_data/navigation.yml` | Header navigation |
| `_config.yml` | Profile photo, name, affiliation, and contact links |

## Replace a project image

1. Put the image in `images/research/`, for example `images/research/glide.png`.
2. In `_data/research.yml`, replace the project's empty `image` value:

   ```yaml
   image: "/images/research/glide.png"
   image_alt: "Overview of GliDe's reasoning and temporal grounding pipeline."
   ```

3. Save the file and check the preview.

An empty `image: ""` shows a construction illustration labeled "Figure in progress"
with the project name. An 8:5 image ratio and a width
of at least 640 pixels work well. Images are fitted without cropping so diagrams
remain readable. Supply meaningful English alt text for each figure.

To add another project, copy an entry in `_data/research.yml` and use a unique
`id`. Projects appear in file order. On desktop, figures appear on the left and
text on the right; on narrow screens, figures stack above the text.

## Before pushing

Review the desktop and mobile layouts, replace the placeholders when ready, and
check project links. The theme toggle in the header also lets you review dark
mode. Push using your usual Git workflow when you are satisfied.
