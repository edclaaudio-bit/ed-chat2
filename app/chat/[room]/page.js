"use client";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Room({ params }) {
  const roomId = params.room;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          if (payload.new.room_id === roomId) {
            setMessages((prev) => [...prev, payload.new]);
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  async function loadMessages() {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("room_id", roomId)
      .order("created_at", { ascending: true });

    setMessages(data || []);
  }

  async function sendMessage() {
    const email = localStorage.getItem("user_email");

    await supabase.from("messages").insert({
      room_id: roomId,
      sender: email,
      text
    });

    setText("");
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Chat</h2>

      <div>
        {messages.map((m) => (
          <p key={m.id}>
            <b>{m.sender}:</b> {m.text}
          </p>
        ))}
      </div>

      <input
        value={text}
        placeholder="Mensagem..."
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
