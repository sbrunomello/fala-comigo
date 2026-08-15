export function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function safeImageSrc(value) {
  const src = String(value || '');
  return /^data:image\/(png|jpeg|webp|gif);base64,/i.test(src) ? src : '';
}

export function formatDateTime(iso) {
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(new Date(iso));
  } catch {
    return '';
  }
}

export function announce(message) {
  const live = document.querySelector('#live-region');
  if (!live) return;
  live.textContent = '';
  requestAnimationFrame(() => { live.textContent = message; });
}
