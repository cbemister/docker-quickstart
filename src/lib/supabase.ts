
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:8000';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseAnonKey) {
  console.warn('Supabase anon key is not set. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication helpers
export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({ email, password });
};

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  return await supabase.auth.getUser();
};

// Data access helpers
export const getDataFromTable = async (
  tableName: string, 
  queryOptions?: { 
    columns?: string, 
    filter?: { column: string, operator: string, value: any } 
  }
) => {
  let query = supabase.from(tableName).select(queryOptions?.columns || '*');
  
  if (queryOptions?.filter) {
    const { column, operator, value } = queryOptions.filter;
    query = query.filter(column, operator, value);
  }
  
  return await query;
};

export const insertIntoTable = async (tableName: string, data: any) => {
  return await supabase.from(tableName).insert(data);
};

export const updateInTable = async (tableName: string, data: any, match: { column: string, value: any }) => {
  return await supabase.from(tableName).update(data).match({ [match.column]: match.value });
};

export const deleteFromTable = async (tableName: string, match: { column: string, value: any }) => {
  return await supabase.from(tableName).delete().match({ [match.column]: match.value });
};
