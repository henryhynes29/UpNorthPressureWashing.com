# Push Up North Pressure Washing site to GitHub
# Run once in PowerShell from this folder:
#   .\push-github.ps1

$ErrorActionPreference = "Stop"
$Site = $PSScriptRoot
$git = "C:\Program Files\Git\bin\git.exe"
$gh = "C:\Program Files\GitHub CLI\gh.exe"

if (-not (Test-Path $git)) {
  Write-Host "Git not found. Install from https://git-scm.com/download/win then re-run." -ForegroundColor Red
  exit 1
}

if (-not (Test-Path $gh)) {
  Write-Host "GitHub CLI not found. Install: winget install GitHub.cli" -ForegroundColor Red
  Write-Host "Or push manually — see GITHUB-SETUP.md" -ForegroundColor Yellow
  exit 1
}

Write-Host "Checking GitHub login..."
& $gh auth status 2>&1 | Out-String | Write-Host
if ($LASTEXITCODE -ne 0) {
  Write-Host "`nLog in to GitHub (browser will open):"
  & $gh auth login --web --git-protocol https
}

Set-Location $Site

$repoName = "up-north-pressure-washing"
$user = (& $gh api user -q .login 2>$null)
if (-not $user) {
  Write-Host "Could not read GitHub username. Run: gh auth login" -ForegroundColor Red
  exit 1
}

Write-Host "`nGitHub user: $user"
Write-Host "Creating repo $user/$repoName (private) and pushing..."

& $gh repo view "$user/$repoName" 2>$null
if ($LASTEXITCODE -ne 0) {
  & $gh repo create $repoName --private --source=. --remote=origin --description "Up North Pressure Washing — static site"
} else {
  $remote = & $git remote get-url origin 2>$null
  if (-not $remote) {
    & $git remote add origin "https://github.com/$user/$repoName.git"
  }
}

& $git push -u origin main

Write-Host "`nDone! Repo: https://github.com/$user/$repoName" -ForegroundColor Green
Write-Host "Next: Netlify → Import from Git → select this repo → publish directory '.'"
