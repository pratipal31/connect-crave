// lib/supabase/auth-config.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function disableEmailConfirmation() {
  const { data, error } = await supabase
    .rpc('disable_email_confirmation')
    
  if (error) throw error
  return data
}

// Call this once during setup
disableEmailConfirmation()
