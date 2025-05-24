
// GitHub Pages SPA Router Helper
export const setupGitHubPagesRouting = () => {
  // Check if we're on GitHub Pages and handle the redirect
  if (window.location.search.includes('/?/')) {
    const redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    
    if (redirect && redirect !== window.location.href) {
      window.history.replaceState(null, '', redirect);
    }
  }
  
  // Store redirect for 404 handling
  if (window.location.pathname !== '/') {
    sessionStorage.redirect = window.location.href;
  }
};

// Call this function when the app initializes
if (typeof window !== 'undefined') {
  setupGitHubPagesRouting();
}
