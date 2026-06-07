const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function testVideoUpload() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) throw new Error("Missing cloudName");

  // Create a minimal valid webm file
  const base64Webm = 'GkXfo0AgQoaWAASAgUAAgEAAgQDAQAQAAQAAAQAAAAEAAAMBCAARAAABDAwAAQAAQAcAAAAAAAAAAQAAAAAAAQAAQAgAAAAAAAAAAQAAAAEAAEIHAAAAAAAAAAEAAMICiHwIQv8gEQEQXwAHAQEBw4MBBQEDAgAA';
  const fileBuffer = Buffer.from(base64Webm, 'base64');
  const blob = new Blob([fileBuffer], { type: 'video/webm' });

  const formData = new FormData();
  formData.append('file', blob, 'test.webm');
  formData.append('upload_preset', 'ro2ya_reels');

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
  } catch (err) {
    console.error('Network Error:', err.message);
  }
}

testVideoUpload();
