/**
 * Cloudinary Upload Utility
 * Uploads via /api/cloudinary/upload (server proxy) to avoid CSP / CORS blocks.
 */

const UPLOAD_PRESET = 'ro2ya_reels'

async function uploadViaApi(file: File, folder?: string): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  if (folder) formData.append('folder', folder)

  const response = await fetch('/api/cloudinary/upload', {
    method: 'POST',
    body: formData,
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.error || `Upload échoué (${response.status})`)
  }
  if (!data.secure_url) {
    throw new Error('URL Cloudinary manquante dans la réponse')
  }
  return data.secure_url
}

/**
 * Upload a single file (image or video) to Cloudinary.
 */
export async function uploadToCloudinary(
  file: File,
  folder?: string,
): Promise<string | null> {
  try {
    return await uploadViaApi(file, folder)
  } catch (error: any) {
    console.error('❌ Error uploading to Cloudinary:', error)
    throw new Error(error.message || 'Erreur réseau lors de l\'upload')
  }
}

/**
 * Upload multiple files to Cloudinary in parallel.
 */
export async function uploadMultipleToCloudinary(
  files: File[],
  folder?: string,
): Promise<string[]> {
  const results = await Promise.all(
    files.map((file) =>
      uploadToCloudinary(file, folder).catch((err) => {
        console.error(`Failed to upload file: ${file.name}`, err)
        return null
      }),
    ),
  )
  return results.filter((url): url is string => url !== null)
}

export { UPLOAD_PRESET }
