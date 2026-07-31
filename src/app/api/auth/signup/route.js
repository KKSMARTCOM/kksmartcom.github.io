import { NextResponse } from 'next/server';

// Les comptes d'administration sont créés par le seed ou directement en base.
// Une inscription publique transformerait cette route en escalade de privilèges.
export async function POST() {
  return NextResponse.json(
    { message: 'La création de comptes publics est désactivée.' },
    { status: 403 }
  );
}
