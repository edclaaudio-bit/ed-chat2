export const metadata = {
  title: "ED Chat",
  description: "Chat interno da Estrutura Dinâmica",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
