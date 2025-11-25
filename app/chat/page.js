"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchMessages();

    const subscription = supabase
      .channel("public:messages")
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, (payload) => {
        fetchMessages();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchMessages() {
    const { data } = await supabase.from("messages").select("*").order("id");
    setMessages(data);
  }

  async function sendMessage() {
    if (!text.trim()) return;

    await supabase.from("messages").insert({ content: text });

    setText("");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>💬 Chat Online</h1>

      <div style={{ border: "1px solid #ccc", height: 300, overflow: "auto", padding: 10, marginBottom: 20 }}>
        {messages?.map((msg) => (
          <p key={msg.id}>• {msg.content}</p>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite sua mensagem..."
        style={{ padding: 10, width: "70%" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px 20px", marginLeft: 10 }}>
        Enviar
      </button>
    </div>
  );
}
