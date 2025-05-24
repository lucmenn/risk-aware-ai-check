
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building for GitHub Pages...');

// Set production environment
process.env.NODE_ENV = 'production';

try {
  // Run the build
  execSync('npm run build', { stdio: 'inherit' });
  
  // Copy .nojekyll to dist
  const nojekyllSrc = path.join(__dirname, '../public/.nojekyll');
  const nojekyllDest = path.join(__dirname, '../dist/.nojekyll');
  
  if (fs.existsSync(nojekyllSrc)) {
    fs.copyFileSync(nojekyllSrc, nojekyllDest);
    console.log('✅ .nojekyll copied to dist');
  }
  
  // Create a 404.html that redirects to index.html for SPA routing
  const html404 = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>CyberRiskScore</title>
  <script type="text/javascript">
    // GitHub Pages SPA redirect
    var pathSegmentsToKeep = 1;
    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );
  </script>
</head>
<body>
</body>
</html>`;
  
  fs.writeFileSync(path.join(__dirname, '../dist/404.html'), html404);
  console.log('✅ 404.html created for SPA routing');
  
  console.log('🎉 GitHub Pages build completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
