'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function ChatIndex(){
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('rooms').select('*').order('created_at', { ascending: true });
      setRooms(data || []);
    }
    load();
  }, []);

  return (
    <main>
      <h2>Salas</h2>
      <ul>
        {rooms.map(r => (
          <li key={r.id}>
            <a href={`/chat/${r.id}`}>{r.name}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
