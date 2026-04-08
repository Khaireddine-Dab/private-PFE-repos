'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Business detail page error:', error);
  }, [error]);

  const isNetworkError = error.message.includes('DATABASE_CONNECTION_ERROR') || 
                         error.message.includes('fetch failed') || 
                         error.message.includes('timeout');

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-stone-50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-stone-100">
        <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        
        <h2 className="text-2xl font-black text-stone-900 mb-2">
          {isNetworkError ? 'Connexion lente ou interrompue' : 'Oups ! Un problème est survenu'}
        </h2>
        
        <p className="text-stone-500 mb-8 leading-relaxed">
          {isNetworkError 
            ? "Nous n'avons pas pu charger les détails de cet établissement. Veuillez vérifier votre connexion ou réessayer." 
            : "Une erreur inattendue s'est produite lors de la génération de la page."}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 w-full py-4 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-95"
          >
            <RefreshCcw className="w-5 h-5" />
            Réessayer le chargement
          </button>
          
          <Link
            href="/search"
            className="flex items-center justify-center gap-2 w-full py-4 bg-stone-100 text-stone-600 rounded-2xl font-bold hover:bg-stone-200 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Retourner à la recherche
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 text-[10px] text-stone-300 font-mono">
            ID Erreur: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
