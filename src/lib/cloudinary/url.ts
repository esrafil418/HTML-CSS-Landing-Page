const cloudName = () => import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';

export function isCloudinaryConfigured(): boolean {
  return Boolean(cloudName());
}

function transformSegment(options: { width?: number; height?: number; crop?: string } = {}): string {
  const transforms: string[] = ['f_auto', 'q_auto'];
  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.crop) transforms.push(`c_${options.crop}`);
  return transforms.join(',');
}

/** Delivery URL for an asset already in this Cloudinary cloud. */
export function cloudinaryUrl(
  publicId: string,
  options: { width?: number; height?: number; crop?: string } = {},
): string | null {
  if (!isCloudinaryConfigured()) {
    return null;
  }

  return `https://res.cloudinary.com/${cloudName()}/image/upload/${transformSegment(options)}/${publicId}`;
}

/** Fetch + transform a remote image through this Cloudinary cloud (no API secret). */
export function cloudinaryFetchUrl(
  remoteUrl: string,
  options: { width?: number; height?: number; crop?: string } = {},
): string | null {
  if (!isCloudinaryConfigured()) {
    return null;
  }

  return `https://res.cloudinary.com/${cloudName()}/image/fetch/${transformSegment(options)}/${encodeURIComponent(remoteUrl)}`;
}
