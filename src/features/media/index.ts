import { cloudinaryFetchUrl, cloudinaryUrl } from '@/lib/cloudinary/url';

/** Placeholder photos until real assets are uploaded to public IDs under velora/. */
const remoteByPublicId: Record<string, string> = {
  'velora/linen-overshirt': 'https://picsum.photos/id/1011/1200/1500',
  'velora/ceramic-pourer': 'https://picsum.photos/id/1060/1200/1500',
  'velora/suede-slip-on': 'https://picsum.photos/id/103/1200/1500',
  'velora/brass-cuff': 'https://picsum.photos/id/1071/1200/1500',
  'velora/vetiver-oil': 'https://picsum.photos/id/326/1200/1500',
  'velora/wool-throw': 'https://picsum.photos/id/292/1200/1500',
};

export function productImageSrc(publicId: string, width = 900): string {
  const height = Math.round(width * 1.25);
  const options = { width, height, crop: 'fill' as const };
  const remote = remoteByPublicId[publicId];
  if (remote) {
    return cloudinaryFetchUrl(remote, options) ?? '';
  }
  return cloudinaryUrl(publicId, options) ?? '';
}
