// app/layout.js (le layout racine, pour le HTML/Body uniquement)
import "./globals.css"
export default function RootLayout({ children }) {
  return (
    <html >
      <body>{children}</body>
    </html>
  );
}