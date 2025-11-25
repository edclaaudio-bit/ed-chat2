"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  async function handleLogin() {
    localStorage.setItem("user_email", email);
    router.push("/chat");
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Entrar</h2>
      <input
        placeholder="Seu email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
