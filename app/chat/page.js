"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ChatGroups() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    loadGroups();
  }, []);

  async function loadGroups() {
    const { data } = await supabase.from("groups").select("*");
    setGroups(data || []);
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Selecione um grupo</h2>

      {groups.map((g) => (
        <div key={g.id}>
          <Link href={`/chat/${g.id}`}>{g.name}</Link>
        </div>
      ))}
    </div>
  );
}
