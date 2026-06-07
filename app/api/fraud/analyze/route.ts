import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { analyzeFraud } from '@/lib/actions/fraud-detection'

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let body: any;
    try {
      body = await request.json()
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const { customer_id, store_id, item_id, quantity, total, delivery_address, customer_ip, entity_type } = body;

    // Validate required fields
    if (!customer_id || typeof customer_id !== 'string') {
      return NextResponse.json({ error: 'customer_id is required and must be a string' }, { status: 400 })
    }
    if (store_id === undefined || typeof store_id !== 'number') {
      return NextResponse.json({ error: 'store_id is required and must be a number' }, { status: 400 })
    }
    if (total === undefined || typeof total !== 'number') {
      return NextResponse.json({ error: 'total is required and must be a number' }, { status: 400 })
    }
    if (!entity_type || (entity_type !== 'ORDER' && entity_type !== 'BOOKING')) {
      return NextResponse.json({ error: "entity_type is required and must be either 'ORDER' or 'BOOKING'" }, { status: 400 })
    }

    const context = {
      customer_id,
      store_id,
      item_id: item_id ? Number(item_id) : 0,
      quantity: quantity ? Number(quantity) : undefined,
      total,
      delivery_address,
      customer_ip,
      entity_type
    };

    const analysis = await analyzeFraud(context);

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error('[API Fraud Analyze Error]:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 })
  }
}
