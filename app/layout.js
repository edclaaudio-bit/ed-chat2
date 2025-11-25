export const metadata = {
  title: "ED Chat",
  description: "Chat interno da Estrutura Dinâmica",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f4f6f9",
        }}
      >
        <header
          style={{
            width: "100%",
            padding: "16px 0",
            backgroundColor: "#003366", // Azul ED
            color: "white",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          <span style={{ color: "#00A859" }}>ED</span> Chat
        </header>

        <main
          style={{
            maxWidth: "900px",
            margin: "40px auto",
            padding: "0 20px",
          }}
        >
          {children}
        </main>

        <footer
          style={{
            textAlign: "center",
            padding: "10px 0",
            color: "#666",
            fontSize: "12px",
            marginTop: "60px",
          }}
        >
          Desenvolvido para Estrutura Dinâmica © {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
