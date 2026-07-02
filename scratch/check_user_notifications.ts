import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const targetUserId = '331b7407-40e9-47f6-a572-ad587bea8bda'; // abderrahman ebdelli

async function checkNotifications() {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', targetUserId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching notifications:', error);
    return;
  }

  console.log(`Found ${data.length} notifications for user ${targetUserId}:`);
  console.log(data);
}

checkNotifications();
