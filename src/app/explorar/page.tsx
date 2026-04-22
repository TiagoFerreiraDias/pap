import React from 'react';
import PlaceCard from "@/components/PlaceCard";

export default function ExplorarPage() {
  const categories = ["Todos", "Monumentos", "Restaurantes", "Trilhos", "Eventos", "Alojamento"];
  
  // Array de demonstração visual (sem ligação final ao Firebase por agora)
  const places = [
    {
      id: "portas_do_sol_guia",
      title: "Viagem de um dia a Portas do Sol e Centro Histórico acompanhado de Guia",
      image: "/nature.png",
      rating: "4,8",
      reviews: "581",
      tag: "Líder de vendas",
      price: "15",
    },
    {
      id: "gastronomia_tabernas",
      title: "Excursão Gastronómica às Tabernas com 10+ especialidades Ribatejanas",
      image: "/food.png",
      rating: "4,9",
      reviews: "166",
      tag: "Recomendado",
      price: "45",
    },
    {
      id: "igreja_graca_visita",
      title: "Visita à Igreja da Graça e Túmulo de Pedro Álvares Cabral",
      image: "/monument.png",
      rating: "4,8",
      reviews: "2622",
      tag: "Cultura",
      price: "12",
    },
    {
      id: "passeio_rio_tejo",
      title: "Passeio de Barco no Rio Tejo com observação de aves",
      image: "/river.png",
      rating: "5,0",
      reviews: "4439",
      tag: "Esgota",
      price: "53",
    },
    {
      id: "casa_campino",
      title: "Jantar Tradicional na Casa do Campino com Fado ao vivo",
      image: "/food.png",
      rating: "4,7",
      reviews: "890",
      tag: "Novo",
      price: "35",
    },
    {
      id: "miradouro_sao_bento",
      title: "Passeio Fotográfico pelo Miradouro de São Bento",
      image: "/nature.png",
      rating: "4,9",
      reviews: "320",
      tag: "Ar livre",
      price: "Grátis",
    },
    {
      id: "museu_diocesano",
      title: "Entrada e Visita Guiada ao Museu Diocesano de Santarém",
      image: "/monument.png",
      rating: "4,6",
      reviews: "112",
      tag: "História",
      price: "5",
    },
    {
      id: "canoagem_tejo",
      title: "Aventura de Canoagem no Rio Tejo (Nível Iniciante)",
      image: "/river.png",
      rating: "4,9",
      reviews: "43",
      tag: "Desporto",
      price: "25",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-24">
      {/* Top Filter Bar (Fica colada ao topo quando fazemos scroll) */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  cat === 'Todos' 
                  ? 'bg-primary-600 text-white shadow-md hover:bg-primary-700' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 w-full md:w-auto justify-center transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
              Filtros
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border-2 border-slate-900 rounded-xl text-sm font-bold text-white hover:bg-slate-800 w-full md:w-auto justify-center transition-all shadow-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
              Ver no Mapa
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 animate-in fade-in duration-700">
        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">Explorar Santarém</h1>
            <p className="text-slate-500 mt-2 text-lg">{places.length} experiências de topo encontradas para ti</p>
          </div>
          
          <div className="text-sm font-semibold text-slate-500">
            Ordenar por: <span className="text-slate-900 cursor-pointer hover:underline">Recomendados</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {places.map((place) => (
             <PlaceCard key={place.id} place={place} />
          ))}
        </div>
        
        <div className="mt-16 mb-20 flex justify-center">
          <button className="px-8 py-3.5 bg-white border-2 border-slate-200 hover:border-primary-500 hover:text-primary-700 text-slate-700 font-bold rounded-full shadow-sm transition-all text-lg">
            Carregar mais atividades
          </button>
        </div>
      </div>
    </div>
  );
}
