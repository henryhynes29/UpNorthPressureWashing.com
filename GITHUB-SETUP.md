# GitHub + Netlify setup

Local git is initialized and the first commit is done (`main` branch, 608 files).

## One-time: push to GitHub

1. **Approve any Windows installer prompts** if Git / GitHub CLI installs are still waiting.
2. Open PowerShell in this folder and run:

```powershell
cd "C:\Users\henry\Downloads\up-north-pressure-washing"
.\push-github.ps1
```

3. When `gh auth login` runs, choose **GitHub.com** → **HTTPS** → **Login with a web browser** and paste the code.

That creates a **private** repo `up-north-pressure-washing` and pushes `main`.

### Manual alternative (no script)

```powershell
cd "C:\Users\henry\Downloads\up-north-pressure-washing"
& "C:\Program Files\GitHub CLI\gh.exe" auth login
& "C:\Program Files\GitHub CLI\gh.exe" repo create up-north-pressure-washing --private --source=. --remote=origin --push
```

## Connect Netlify to GitHub

1. [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**
2. **GitHub** → authorize → select `up-north-pressure-washing`
3. Build settings:
   - **Branch:** `main`
   - **Build command:** *(empty)*
   - **Publish directory:** `.`
4. Deploy → add custom domain → enable form email notifications

## Connect Cursor to GitHub

1. Cursor **Settings** → sign in / connect **GitHub**
2. **File → Open Folder** → this project folder

After that, ask the agent to commit and push changes when you update the site.

## Regenerate site after edits

```bash
node build-netlify.mjs
git add .
git commit -m "Describe your change"
git push
```

Netlify redeploys automatically on push.
