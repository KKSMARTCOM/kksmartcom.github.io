// app/layout.js (le layout racine, pour le HTML/Body uniquement)
import './auth.css';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}