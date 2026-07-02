import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const targetUserId = '331b7407-40e9-47f6-a572-ad587bea8bda'; // abderrahman ebdelli

async function triggerNotification() {
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id: targetUserId,
      title: '✨ Recommandation IA : Shopping',
      description: 'Nous avons trouvé 3 nouveaux articles de mode correspondant à vos goûts chez vos commerçants préférés.',
      type: 'AI_RECOMMENDATION',
      link: '/discover?category=shopping',
      metadata: {
        category: 'Shopping',
        score: 95,
        trigger: 'admin_test'
      }
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating notification:', error);
    return;
  }

  console.log('Successfully injected test notification:');
  console.log(data);
}

triggerNotification();
