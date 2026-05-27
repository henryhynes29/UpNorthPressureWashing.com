$imgDir = "C:\Users\henry\Downloads\up-north-pressure-washing\images"
Add-Type -AssemblyName System.Drawing

function Optimize-Jpeg($path, [int]$maxWidth, [int]$quality = 82) {
  $before = (Get-Item $path).Length
  $img = [System.Drawing.Image]::FromFile($path)
  try {
    $w = $img.Width
    $h = $img.Height
    if ($w -le $maxWidth) { return }
    $ratio = $maxWidth / $w
    $nw = $maxWidth
    $nh = [int]($h * $ratio)
    $bmp = New-Object System.Drawing.Bitmap $nw, $nh
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $nw, $nh)
    $g.Dispose()
    $img.Dispose()
    $img = $null
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
    $tmp = Join-Path (Split-Path $path) ("opt-" + (Split-Path $path -Leaf))
    $bmp.Save($tmp, $codec, $ep)
    $bmp.Dispose()
    Remove-Item -Force $path -ErrorAction SilentlyContinue
    Move-Item -Force $tmp $path
    $after = (Get-Item $path).Length
    Write-Host "$(Split-Path $path -Leaf): $([math]::Round($before/1KB))KB -> $([math]::Round($after/1KB))KB (${w}x${h} -> ${nw}x${nh})"
  } finally {
    if ($img) { $img.Dispose() }
  }
}

function Optimize-Logo($path) {
  $before = (Get-Item $path).Length
  $img = [System.Drawing.Image]::FromFile($path)
  try {
    $maxW = 240
    $w = $img.Width
    $h = $img.Height
    if ($w -gt $maxW) {
      $nw = $maxW
      $nh = [int]($h * ($maxW / $w))
    } else { $nw = $w; $nh = $h }
    $bmp = New-Object System.Drawing.Bitmap $nw, $nh
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $nw, $nh)
    $g.Dispose()
    $img.Dispose()
    $img = $null
    $tmp = Join-Path (Split-Path $path) ("opt-" + (Split-Path $path -Leaf))
    $bmp.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Remove-Item -Force $path -ErrorAction SilentlyContinue
    Move-Item -Force $tmp $path
    $after = (Get-Item $path).Length
    Write-Host "logo.png: $([math]::Round($before/1KB))KB -> $([math]::Round($after/1KB))KB"
  } finally {
    if ($img) { $img.Dispose() }
  }
}

Get-ChildItem $imgDir -Recurse -Filter *.jpg | ForEach-Object {
  $max = 1200
  if ($_.Name -eq 'hero-bg.jpg') { $max = 1920 }
  elseif ($_.Name -eq 'duluth-lift-bridge.jpg') { $max = 1400 }
  Optimize-Jpeg $_.FullName $max
}

$logo = Join-Path $imgDir 'logo.png'
if (Test-Path $logo) { Optimize-Logo $logo }

Write-Host 'Done.'
