// lib/auth.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type StaffRole = 'owner' | 'manager' | 'chef' | 'cashier'

interface StaffProfile {
  role: StaffRole
  restaurant_id: string
}

export async function signUpStaff(
  email: string,
  password: string,
  role: StaffRole,
  restaurantId: string
) {
  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          restaurant_id: restaurantId
        }
      }
    })

    if (authError) {
      throw new Error(authError.message)
    }

    if (!authData.user) {
      throw new Error('User creation failed')
    }

    // 2. Add to staff table (without password_hash)
    const { error: staffError } = await supabase
      .from('staff')
      .insert([{
        id: authData.user.id,
        restaurant_id: restaurantId,
        email,
        role
      }])

    if (staffError) {
      // Rollback auth user if staff creation fails
      await supabase.auth.admin.deleteUser(authData.user.id)
      throw new Error(staffError.message)
    }

    return authData.user

  } catch (error) {
    console.error('Signup error:', error)
    throw error
  }
}

export async function signInStaff(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      throw new Error(error.message)
    }

    if (!data.user) {
      throw new Error('Authentication failed')
    }

    return data

  } catch (error) {
    console.error('Signin error:', error)
    throw error
  }
}

export async function getCurrentStaff() {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError) {
      throw new Error(authError.message)
    }

    if (!user) {
      return null
    }

    const { data: staffData, error: staffError } = await supabase
      .from('staff')
      .select('role, restaurant_id')
      .eq('id', user.id)
      .single()

    if (staffError) {
      throw new Error(staffError.message)
    }

    return {
      ...user,
      role: staffData?.role as StaffRole | null,
      restaurantId: staffData?.restaurant_id || null
    }

  } catch (error) {
    console.error('Get current staff error:', error)
    return null
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    console.error('Signout error:', error)
    throw error
  }
}