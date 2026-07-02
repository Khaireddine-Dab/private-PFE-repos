import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { createNotification } from '@/lib/actions/notifications'
import { triggerInstantRecommendation } from '@/lib/actions/ai-notifications'

export async function GET(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new NextResponse(
      JSON.stringify({ 
        error: 'Unauthorized. Veuillez vous connecter d\'abord sur la plateforme à l\'adresse http://localhost:3000.' 
      }), 
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || 'Shopping'
  const mode = searchParams.get('mode') || 'fake' // 'fake' or 'real'

  try {
    if (mode === 'real') {
      // Trigger the actual AI recommendation logic for a category
      const res = await triggerInstantRecommendation(category)
      return NextResponse.json({
        success: true,
        message: `Moteur de recommandation IA déclenché pour la catégorie: ${category}`,
        result: res
      })
    } else {
      // Create a direct mock AI notification to test frontend rendering immediately
      const result = await createNotification({
        userId: user.id,
        title: `✨ Recommandation IA : ${category}`,
        description: `Nous avons trouvé des Reels intéressants dans la catégorie "${category}" qui correspondent à vos goûts.`,
        type: 'AI_RECOMMENDATION',
        link: `/discover?category=${encodeURIComponent(category)}`,
        metadata: {
          category,
          score: 95,
          trigger: 'test_instant_search'
        }
      })

      return NextResponse.json({
        success: true,
        message: 'Notification factice créée avec succès ! Regardez le menu de notification sur le frontend.',
        notification: result
      })
    }
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Error triggering test' 
    }, { status: 500 })
  }
}
