import { supabase } from '../../../lib/supabaseClient'; // se em /src, ajuste caminho

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const { username, password } = req.body;
  const { data, error } = await supabase.from('users').select('*').eq('username', username).eq('password', password).limit(1).single();
  if(error || !data) return res.json({ ok:false });
  return res.json({ ok:true, user: data });
}
