import React from 'react';
import Link from 'next/link';
import { getPlaceDetails } from '@/lib/places';

export default async function PlaceDetailTemplate({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const placeData = await getPlaceDetails(id);

  if (!placeData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center pt-28">
        <div>
          <span className="text-6xl block mb-6">🏜️</span>
          <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Oásis Fantasma</h1>
          <p className="text-slate-500 mb-8 max-w-md mx-auto text-lg">Infelizmente, a Google Places API não tem registo deste local nas suas coordenadas de GPS.</p>
          <Link href="/" className="px-8 py-3.5 border-2 border-slate-900 text-slate-900 font-bold rounded-full hover:bg-slate-900 hover:text-white transition-colors">Voltar para Santarém</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Spacer invisível para empurrar o conteúdo para baixo da Navbar principal que é transparente */}
      <div className="h-28 w-full bg-white border-b border-slate-100"></div>
      
      {/* Secondary Navbar / Filtros (Estilo TripAdvisor) */}
      <div className="border-b border-slate-200 sticky top-0 bg-white z-40">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 flex items-center gap-6 md:gap-10 overflow-x-auto no-scrollbar font-bold text-sm text-slate-600 py-4">
          <Link href="/" className="shrink-0 text-slate-900 border-b-2 border-black pb-4 -mb-[18px]">Descobrir</Link>
          <Link href="/" className="shrink-0 hover:text-black">Monumentos</Link>
          <Link href="/" className="shrink-0 hover:text-black">Restaurantes</Link>
          <Link href="/" className="shrink-0 hover:text-black">Alojamentos</Link>
          <Link href="/" className="shrink-0 hover:text-black">Trilhos</Link>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        {/* Breadcrumb de navegação fácil */}
        <div className="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:underline">Portugal</Link>
          <span>&gt;</span>
          <Link href="/" className="hover:underline">Santarém</Link>
          <span>&gt;</span>
          <span className="text-slate-800 font-medium">Viagens e turismo ({placeData.category})</span>
        </div>

        {/* Cinto Decorativo Grande (Carousel de Imagem) */}
        <div className="w-full relative aspect-[16/8] md:aspect-[21/8] bg-slate-200 rounded-3xl overflow-hidden mb-8 shadow-sm group">
           <img src={placeData.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Fotografia gigante do local" />
           
           {/* Pintinhas de controlo do carrossel no centro */}
           <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-white shadow-md cursor-pointer"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/50 shadow-sm cursor-pointer hover:bg-white/80 transition"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/50 shadow-sm cursor-pointer hover:bg-white/80 transition"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/50 shadow-sm cursor-pointer hover:bg-white/80 transition"></div>
           </div>
           
           {/* Botão de Ver Fotos no canto */}
           <button className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 flex items-center gap-2 rounded-lg hover:bg-black transition-colors shadow-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              5084
           </button>
        </div>

        {/* Título massivo e Botão Guardar em baixo da imagem */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-8 border-b border-slate-100 pb-10">
           <div>
             <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#000000] tracking-tight mb-4">{placeData.name}<span className="text-primary-600">.</span></h1>
             <div className="flex items-center gap-4 text-sm font-medium">
                <span className="text-green-700 font-bold bg-green-50 px-2 py-1 rounded-md">⭐ Avaliação: {placeData.rating}</span>
                <span className="text-slate-500 underline cursor-pointer">{placeData.reviews} avaliações oficiais no Google</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{placeData.category}</span>
             </div>
           </div>
           
           <button className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-slate-900 font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition-colors shadow-sm shrink-0 w-fit">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              Guardar
           </button>
        </div>

        {/* Conteúdo Informativo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Informação Turística</h2>
            <p className="text-slate-700 leading-relaxed text-lg">{placeData.description}</p>
            
            <div className="flex items-start gap-4 mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <svg className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <div>
                <span className="font-bold text-slate-800 block mb-1">Localização Exata via GPS</span>
                <span className="text-slate-600 font-medium">{placeData.address}</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
             {/* Caixa Rápida de Interatividade / Mapa */}
             <div className="bg-slate-50 rounded-3xl h-64 border border-slate-200 flex flex-col items-center justify-center p-6 shadow-sm">
                <svg className="w-8 h-8 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
               <span className="text-slate-500 font-bold text-sm text-center">Caixa do Mapa Google<br/><span className="text-xs font-medium">A integrar na próxima fase API</span></span>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
