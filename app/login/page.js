'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleLogin(e){
    e.preventDefault();
    // login via API route (server)
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if(data.ok){
      // gravar userId/localStorage e redirecionar para /chat
      localStorage.setItem('ed_user', JSON.stringify({ id: data.user.id, username: data.user.username }));
      router.push('/chat');
    } else {
      alert('Login inválido');
    }
  }

  return (
    <main>
      <h1>ED Chat — Entrar</h1>
      <form onSubmit={handleLogin}>
        <input placeholder="Usuário" value={username} onChange={e=>setUsername(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
