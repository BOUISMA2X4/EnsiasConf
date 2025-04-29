// src/utils/getData.ts
import supabase from '~/lib/supabase'; // ou '@/lib/supabase' si alias fixé

export type DataResponse = {
  id: number;
  name: string;
};

export const getData = async (): Promise<DataResponse[] | null> => {
  const { data, error } = await supabase
    .from('table_name') // ✅ pas de génériques
    .select('*');

  if (error) {
    console.error('Erreur Supabase :', error.message);
    return null;
  }

  return data as DataResponse[];
};
