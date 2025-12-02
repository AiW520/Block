# Clean build helper for Windows PowerShell
# Usage: Open PowerShell in project root and run:
#   powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\clean-and-build.ps1

Write-Output "Running clean-and-build.ps1..."
$pathsToRemove = @('.\dist', '.\.gh-pages-temp', '.\.vite', '.\node_modules\.vite')

foreach ($p in $pathsToRemove) {
  if (Test-Path $p) {
    Write-Output "Removing $p"
    try {
      Remove-Item -Recurse -Force -LiteralPath $p -ErrorAction Stop
    } catch {
      Write-Warning ("Failed to remove {0}: {1}" -f $p, $_)
    }
  } else {
    Write-Output "$p not found, skipping"
  }
}

# Run pnpm build:client
Write-Output "Running pnpm build:client..."
$exitCode = & pnpm run build:client
if ($LASTEXITCODE -ne 0) {
  Write-Error "pnpm build:client failed with exit code $LASTEXITCODE"
  exit $LASTEXITCODE
}
Write-Output "Build finished successfully." 

# Print a short preview of generated CSS first line to help quick inspection
$cssFiles = Get-ChildItem -Path .\dist -Filter "*.css" -Recurse -ErrorAction SilentlyContinue
if ($cssFiles) {
  foreach ($f in $cssFiles) {
    Write-Output "--- Preview: $($f.FullName) ---"
    Get-Content -Path $f.FullName -TotalCount 1
  }
} else {
  Write-Warning "No CSS files found in dist."
}

exit 0
