import "./styles/globals.css";

export const metadata = {
  title: "ED Chat",
  description: "Chat interno Estrutura Dinâmica"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
