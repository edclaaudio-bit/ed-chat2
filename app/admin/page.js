"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Admin() {
  const [name, setName] = useState("");

  async function createGroup() {
    await supabase.from("groups").insert({ name });
    alert("Grupo criado!");
    setName("");
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin</h2>

      <input
        placeholder="Nome do grupo"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createGroup}>Criar grupo</button>
    </div>
  );
}
