Write-Host "🛠  Building React app..."
npm run build

if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Build failed. Fix errors before deploying."
  exit 1
}

Write-Host "🚀 Uploading dist/* to server..."
scp -r dist/* root@66.179.82.188:/var/www/beanchain-dist

if ($LASTEXITCODE -eq 0) {
  Write-Host "✅ Deployment successful!"
} else {
  Write-Host "❌ Deployment failed. Check SCP connection or permissions."
}