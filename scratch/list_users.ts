import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function listUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('id, full_name, email, role')
    .limit(50);

  if (error) {
    console.error('Error fetching users:', error);
    return;
  }

  console.log('List of users:');
  console.log(data);
}

listUsers();
