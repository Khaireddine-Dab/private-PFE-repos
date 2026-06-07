const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function testUpload() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) throw new Error("Missing cloudName");

  // Create a tiny transparent PNG to upload
  const base64Pixel = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  const fileBuffer = Buffer.from(base64Pixel, 'base64');
  const blob = new Blob([fileBuffer], { type: 'image/png' });

  const formData = new FormData();
  formData.append('file', blob, 'test.png');
  formData.append('upload_preset', 'ro2ya_reels');
  formData.append('folder', 'products-123');

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  console.log('Status:', response.status);
  console.log('Data:', data);
}

testUpload().catch(console.error);
