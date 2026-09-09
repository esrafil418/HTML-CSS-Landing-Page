import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function loadEnv(name) {
  const text = readFileSync(resolve(root, '.env.local'), 'utf8');
  const line = text.split(/\r?\n/).find((entry) => entry.startsWith(`${name}=`));
  return line ? line.slice(name.length + 1).trim() : '';
}

const cloudName = loadEnv('VITE_CLOUDINARY_CLOUD_NAME') || loadEnv('CLOUDINARY_CLOUD_NAME');
const apiKey = loadEnv('CLOUDINARY_API_KEY');
const apiSecret = loadEnv('CLOUDINARY_API_SECRET');

const assets = [
  { publicId: 'velora/linen-overshirt', file: 'https://picsum.photos/id/1011/1200/1500' },
  { publicId: 'velora/ceramic-pourer', file: 'https://picsum.photos/id/1060/1200/1500' },
  { publicId: 'velora/suede-slip-on', file: 'https://picsum.photos/id/103/1200/1500' },
  { publicId: 'velora/brass-cuff', file: 'https://picsum.photos/id/1071/1200/1500' },
  { publicId: 'velora/vetiver-oil', file: 'https://picsum.photos/id/326/1200/1500' },
  { publicId: 'velora/wool-throw', file: 'https://picsum.photos/id/292/1200/1500' },
];

function sign(params) {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return createHash('sha1').update(`${toSign}${apiSecret}`).digest('hex');
}

async function upload({ publicId, file }) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = sign({ public_id: publicId, timestamp });
  const body = new FormData();
  body.set('file', file);
  body.set('public_id', publicId);
  body.set('api_key', apiKey);
  body.set('timestamp', String(timestamp));
  body.set('signature', signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body,
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(`${publicId}: ${json.error?.message ?? response.status}`);
  }
  console.log('uploaded', json.public_id);
}

if (!cloudName || !apiKey || !apiSecret) {
  console.error('Missing Cloudinary env in .env.local');
  process.exit(1);
}

for (const asset of assets) {
  await upload(asset);
}
