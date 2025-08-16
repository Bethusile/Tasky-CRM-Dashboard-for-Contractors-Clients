// src/services/supabaseService.ts

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);



export const getClients = async () => {
     const { data, error } = await supabase
    .from('clients')
    .select('*');
  if (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
  return data;
};

export const getTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*, client_id(name)'); // Joins with the clients table
  if (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
  return data;
};

export const createTask = async (task: any) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([task])
    .select();
  if (error) {
    console.error('Error creating task:', error);
    throw error;
  }
  return data;
};

export const updateTask = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) {
    console.error('Error updating task:', error);
    throw error;
  }
  return data;
};

export const deleteTask = async (id: string) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);
  if (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
  return 'Task deleted successfully';
};