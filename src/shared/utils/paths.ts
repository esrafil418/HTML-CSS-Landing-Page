export function siteRoot(): string {
  const path = window.location.pathname.replace(/\\/g, '/');
  if (path.includes('/pages/admin/')) return '../../';
  if (path.includes('/pages/')) return '../';
  return './';
}

export function href(page: string): string {
  const root = siteRoot();
  if (page === 'home' || page === 'index.html') {
    return `${root}index.html`;
  }
  if (page.startsWith('admin/')) {
    return `${root}pages/${page}`;
  }
  return `${root}pages/${page}`;
}
