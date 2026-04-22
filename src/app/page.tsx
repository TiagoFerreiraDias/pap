"use client";

import Link from "next/link";
import PlaceCard from "@/components/PlaceCard";
import CategoryCard from "@/components/CategoryCard";
import SearchBar from "@/components/SearchBar";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  
  const categories = [
    { title: t('sections.cultura'), image: "/monument.png" },
    { title: t('sections.atividades'), image: "/nature.png" },
    { title: t('sections.restaurantes'), image: "/food.png" },
    { title: t('sections.alojamento'), image: "/river.png" },
  ];

  const places = [
    {
      id: "ChIJvQMOERLuGA0R6ANVOSrgQww",
      title: "Jardim das Portas do Sol",
      image: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEL5tyNTonpY98BOgMzLUiuLzy527yQrw5FsqPTeBCvvpQEMRLG5hZrZF9DR-eA6K3lpgUAEwJfSL-G7WV0MhoJhYec6MQWihCGQCEyakOMchWQfihA_uLyUDl1gyolgpWy26liSmPFlePXD7Kf3bkWkyo6udn8mQMRosckgCXtJ7yySPOCmQHpfILl1F_p24qenzfMGS6GDBIA75CTsgOF7zW5j_PQv1LGPcyI1MdccHK-YCv7T2UxqslvDShUC4Wq1Fb0u-mprYajMxqrpRzcWQnWwxOyNi9Y-62bO4yB3zURCvhUuYi9MZjOTkYBQCOrf_BN-KMUivAyJb5o9J6XQSsskAl0K6sry_-fIoSk-t_KXzdANNuq1HVh99lBxqaM3R2ojF96GOcbrz7AJcg4WjafTm-1UozuftcMGhEj3Xc&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`,
      rating: "4,6",
      reviews: "2 465",
      tag: "O Miradouro da Cidade",
      price: "Ver Local"
    },
    {
      id: "ChIJJVSZOGzuGA0R_1jEZx8Sjww",
      title: "Taberna do Quinzena",
      image: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEH3Wrkb7bsNGc7kpIsHfagDRYkNr-zlnzMKJrnZRbEfNCnO6u7aWdqDWrGJkmAdCDBMRnRJ5dlW-0h-3zhNBR7UlX9WahtfpTFz_hF9jd7nL9OjbJzRCVRPB9g3Qrajchx-ai8omuI8SUAgfs5DNuxNMrPbooNoeNgtaz_4D3luyiY76xRpDce4gdKCH-pSLY0UjDih3Zf70Q-fg4VDPIHhupiCyckzgbvVcsSPmx8OhoLSWB53gEVc6Zi9VR_m6P52-IvaZnvZIjwfqr0VMrVF7s8_ZBUGjbAT4Tqu49Fd6w&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`,
      rating: "4,4",
      reviews: "4 520",
      tag: "A Gota de Sangue Ribatejano",
      price: "Ver Local"
    },
    {
      id: "ChIJiar8oRLuGA0RDAmoZUzPwsA",
      title: "Igreja de Santa Maria da Graça",
      image: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF9YTOeog9IuycEFtezMzQFsWJYafMWiRxy_ztT7kEv7ajEXXmw0f9jg6naQY7n1c23qXHE0Wh48ZvITUoRIZhtAHMp3KY-qaTfhy4cBye7L0K32DyFFkY_bbnwCoojlkwSPt0bF1eGXzktF9RC7oIJFQmb8GoGIdZDQGd7MeHYSJQzm2bGyyazX1lqgvJQClHbyJWKu6SNHOzqPmJf6ob2aeuQKED2tzlwLpc9JSeWAX_omDmKvhCmI70_g5KaIgi8XM0wkr18nORJG3aXZNyTxr01E-hinBwAdZypSXyP3-J5Zpv4us_mWbNCV13y8bcGIim6801ZgTRvb6a9UvwfOOamEca8z3LJe2X7Mi00d7ATZcf4sZYgBpmWFSkorSOrvbXQLEcG548pnnFIFSlQH9F7AudWnj8YnHh7LWLkjgXC&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`,
      rating: "4,4",
      reviews: "693",
      tag: "Tradição Lusa",
      price: "Ver Local"
    },
    {
      id: "ChIJ8xcrUXLuGA0Ri7qClT9uz5s",
      title: "Sé Catedral de Santarém",
      image: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEG8rJZfPLyjhfFrS2dcDxpYQ9q-FQ0kMaEeA0zyiic7MTlTpbRTbmxYjQ2Br8ScVrc1hgc4wpydHNM37mJxXuO-Djp3On6uAQ7i_jfItv2VxWL-cnXHl5cGbQGorH4mboVRy9dpJ2BZbHQB2-tjC03U4cMv109M_r_EdO9pSas5kyRh6Iu5ZeM_p4F8r3ISK9BoUIW3jpDtxSy5GWEGAi-jxWzDjS_ffP1aay3QBEr83GWEDOD7Wrv4tvbjwmLni_ui5Vg1Z9EPQhlsvAn046o1tMUHC0ygelr4PKqpH7gTNiAYgAlzK0uXyhCen5qDgL146SKRfDjTqNAZOFokfbp8EVyshqMRK_bwcRJ9rbPF8PXOhHqRxohdU1bscrPu8DR3wRTz4-M9twrDxSO9pQvC3rW3F8gPRnFubfO0ZQUHc8Pj-MqBidxafMR8Ds1a&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`,
      rating: "4,6",
      reviews: "900",
      tag: "Fé Monumental",
      price: "Ver Local"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-24 pb-16 px-6 bg-gradient-to-b from-[#faeed7] to-white relative z-20">
        <div className="max-w-4xl text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-slate-800">
            CCC
          </h1>
          <h2 className="text-2xl md:text-3xl text-primary-600 font-medium">
            {t('hero.title')}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto pt-4 leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          {/* TripAdvisor Style Search Bar Component */}
          <SearchBar />
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto w-full px-6 py-12">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{t('sections.discover')}</h2>
          <p className="text-slate-600">{t('sections.discover_sub')}</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard key={i} category={cat} />
          ))}
        </div>
      </section>

      {/* Places / Experiences Section */}
      <section className="max-w-7xl mx-auto w-full px-6 py-6 mb-24">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{t('search.exploring')} Santarém</h2>
          <p className="text-slate-600">{t('hero.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {places.map((place, i) => (
            <PlaceCard key={i} place={place} />
          ))}
        </div>
      </section>
    </div>
  );
}
