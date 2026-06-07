const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const storeInsert = {
    owner_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', // Fake UUID
    name: 'Test Store',
    slug: 'test-store-' + Date.now(),
    category: 'RESTAURANT',
    phone: '12345678',
    email: 'test@example.com',
    city: 'tunis',
    status: 'PENDING'
  };
  const { data, error } = await supabase.from('stores').insert(storeInsert).select('id');
  console.log('Result:', data);
  console.log('Error:', error);
}
test();
