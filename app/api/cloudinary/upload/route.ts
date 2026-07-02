import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const UPLOAD_PRESET = 'ro2ya_reels'
const MAX_IMAGE_BYTES = 10 * 1024 * 1024
const MAX_VIDEO_BYTES = 50 * 1024 * 1024

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  if (!cloudName) {
    return NextResponse.json({ error: 'Cloudinary non configuré' }, { status: 500 })
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Fichier manquant' }, { status: 400 })
  }

  const isVideo = file.type.startsWith('video/')
  const maxSize = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES
  if (file.size > maxSize) {
    const maxMb = Math.round(maxSize / (1024 * 1024))
    return NextResponse.json({ error: `Fichier trop volumineux (max ${maxMb} Mo)` }, { status: 400 })
  }

  const folder = formData.get('folder')
  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${isVideo ? 'video' : 'image'}/upload`

  const cloudinaryFormData = new FormData()
  cloudinaryFormData.append('file', file)
  cloudinaryFormData.append('upload_preset', UPLOAD_PRESET)
  if (typeof folder === 'string' && folder.trim()) {
    cloudinaryFormData.append('folder', folder.trim().replace(/\//g, '-'))
  }

  try {
    const response = await fetch(endpoint, { method: 'POST', body: cloudinaryFormData })
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      const message = data?.error?.message || data?.message || 'Erreur Cloudinary'
      return NextResponse.json({ error: message }, { status: response.status })
    }

    return NextResponse.json({ secure_url: data.secure_url, public_id: data.public_id })
  } catch (error: any) {
    console.error('[cloudinary/upload]', error)
    return NextResponse.json(
      { error: error?.message || 'Erreur réseau lors de l\'upload' },
      { status: 500 },
    )
  }
}
