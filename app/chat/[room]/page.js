'use client';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function RoomPage({ params }) {
  const { room } = params; // if using file [room]
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const msgRef = useRef();

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('messages').select('*').eq('room_id', room).order('created_at', { ascending: true });
      setMessages(data || []);
    }
    load();

    // realtime subscription
    const channel = supabase.channel('room-' + room)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${room}` }, payload => {
        setMessages(prev => [...prev, payload.new]);
        msgRef.current?.scrollIntoView({ behavior: 'smooth' });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [room]);

  async function send() {
    if (!text) return;
    const user = JSON.parse(localStorage.getItem('ed_user') || '{}');
    await supabase.from('messages').insert([{ room_id: room, user_id: user.id, username: user.username, text }]);
    setText('');
  }

  return (
    <main>
      <h3>Chat</h3>
      <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
        {messages.map(m => <div key={m.id}><strong>{m.username}</strong>: {m.text}</div>)}
        <div ref={msgRef} />
      </div>
      <input value={text} onChange={e=>setText(e.target.value)} placeholder="Mensagem..." />
      <button onClick={send}>Enviar</button>
    </main>
  );
}
