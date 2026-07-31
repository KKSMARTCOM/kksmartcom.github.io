import { redirect } from 'next/navigation';

// Les comptes sont provisionnés par un administrateur, pas par inscription publique.
export default function SignupPage() {
  redirect('/login');
}
