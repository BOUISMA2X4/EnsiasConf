import { User, Session } from '@supabase/supabase-js';  // Import the correct types from Supabase
import {supabase} from '../lib/supabase';

type SignInResponse = {
  user: User | null;
  session: Session | null;
  error: string | null;
};

export const signIn = async (email: string, password: string): Promise<SignInResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error during sign in:', error.message);
    return { user: null, session: null, error: error.message };
  }

  return {
    user: data?.user || null,     // Access user from data
    session: data?.session || null, // Access session from data
    error: null,
  };
};
