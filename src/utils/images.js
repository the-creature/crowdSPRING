window.URL = window.URL || window.webkitURL;

export function createImageUrl(blob) {
  return window.URL.createObjectURL(blob);
}
