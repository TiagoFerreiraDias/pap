"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import PlaceCard from '@/components/PlaceCard';
import Link from 'next/link';

export default function Perfil() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Proteção da Rota
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Pesquisar na BD partilhada Firebase a coleção de favoritos universal
  useEffect(() => {
    async function fetchFavorites() {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'users', user.uid, 'favorites_places'),
          orderBy('savedAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const placesData = snapshot.docs.map(doc => doc.data());
        setFavorites(placesData);
      } catch (err) {
        console.error("Erro ao carregar favoritos:", err);
      } finally {
        setLoadingData(false);
      }
    }
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  if (loading || (!user && !loading)) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-28">A carregar o teu passaporte...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="h-28 w-full bg-slate-50 border-b border-slate-100"></div>
      
      <main className="max-w-6xl mx-auto px-6 md:px-8 py-12">
        {/* Header do Perfil estilo Dashboard Moderno */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">O Meu Perfil<span className="text-primary-600">.</span></h1>
            <p className="text-slate-500 text-lg">Os teus tesouros de Santarém. Sincronizados com a tua App Mobile.</p>
          </div>
          <div className="bg-slate-100 px-6 py-3 rounded-full flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-xl uppercase shadow-sm">
               {user?.email ? user?.email[0] : 'U'}
             </div>
             <div>
               <p className="text-sm font-bold text-slate-800">{user?.email}</p>
               <p className="text-xs text-primary-600 font-bold uppercase tracking-widest">Viajante CCC</p>
             </div>
          </div>
        </div>

        {/* Lista de Favoritos (A Partida / Chegada dos dados de ambas as Apps) */}
        <section>
          <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
             <h2 className="text-2xl font-bold text-slate-800">Locais Guardados</h2>
             <span className="bg-primary-50 text-primary-700 border border-primary-200 font-bold px-3 py-1 rounded-full text-sm">{favorites.length}</span>
          </div>

          {loadingData ? (
             <div className="w-full py-20 flex justify-center"><div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-primary-600 animate-spin"></div></div>
          ) : favorites.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map((place, index) => (
                   <PlaceCard key={index} place={place} />
                ))}
             </div>
          ) : (
             <div className="text-center py-24 bg-slate-50 rounded-3xl border border-slate-100 border-dashed">
                <span className="text-6xl mb-6 block">🗺️</span>
                <h3 className="text-xl font-bold text-slate-700 mb-2">A tua mochila está vazia</h3>
                <p className="text-slate-500 max-w-md mx-auto mb-8">Ainda não guardaste nenhum local espetacular. Explora Santarém e carrega no coração das viagens!</p>
                <Link href="/" className="px-8 py-3.5 bg-primary-600 shadow-md text-white font-bold rounded-full hover:bg-primary-700 hover:-translate-y-1 transition-all">Começar a Explorar</Link>
             </div>
          )}
        </section>
      </main>
    </div>
  );
}
