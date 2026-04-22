const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

export interface PlaceDetails {
  id: string;
  name: string;
  description: string;
  images: string[];
  rating: string;
  reviews: string;
  types: string[];
  address: string;
  category: string;
}

export async function getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  if (!GOOGLE_API_KEY) {
    console.error("Missing Google Maps API Key");
    return null;
  }
  
  try {
    let finalPlaceId = placeId;
    
    // Se o ID vier dos nossos cartões Demo (ex: "igreja_graca_visita"), 
    // fazemos uma pesquisa automática para descobrir o ID real no Google Maps!
    if (!placeId.startsWith('ChI')) {
      const searchQuery = placeId.replace(/_/g, ' ') + ' Santarém Portugal';
      const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&language=pt-PT&key=${GOOGLE_API_KEY}`;
      const searchRes = await fetch(searchUrl, { next: { revalidate: 3600 } });
      const searchData = await searchRes.json();
      
      if (searchData.status === 'OK' && searchData.results.length > 0) {
        finalPlaceId = searchData.results[0].place_id;
      } else {
        console.error("Não foi possível mapear o nome falso para um Google Place ID real.");
        return null;
      }
    }

    // Obter detalhes profundos do local com o ID verdadeiro
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${finalPlaceId}&language=pt-PT&key=${GOOGLE_API_KEY}`;
    
    const response = await fetch(url, { next: { revalidate: 86400 } });
    const data = await response.json();
    
    if (data.status !== 'OK') {
      console.error("Place API Error:", data.status, data.error_message);
      return null;
    }
    
    const result = data.result;
    
    // Extrair fotos originais
    const images = [];
    if (result.photos && result.photos.length > 0) {
      for (let i = 0; i < Math.min(5, result.photos.length); i++) {
        images.push(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=${result.photos[i].photo_reference}&key=${GOOGLE_API_KEY}`);
      }
    } else {
      images.push("/monument.png"); // Fallback fallback
    }

    // Criar descrição (seja da Google ou através de Reviews para dar contexto humano)
    let description = "Informação indisponível. Em breve teremos mais detalhes sobre este local fantástico em Santarém.";
    if (result.editorial_summary && result.editorial_summary.overview) {
      description = result.editorial_summary.overview;
    } else if (result.reviews && result.reviews.length > 0) {
      description = `O que as pessoas dizem desta experiência: "${result.reviews[0].text}"`;
    }
    
    // Identificar a categoria principal visualmente
    let category = "Local de Interesse";
    if (result.types) {
      if (result.types.includes("tourist_attraction") || result.types.includes("church")) category = "Monumentos Históricos";
      else if (result.types.includes("restaurant") || result.types.includes("food")) category = "Gastronomia";
      else if (result.types.includes("lodging") || result.types.includes("hotel")) category = "Alojamentos";
      else if (result.types.includes("park") || result.types.includes("natural_feature")) category = "Trilhos e Natureza";
    }

    return {
      id: finalPlaceId, // Passamos o ID real de volta para a app poder salvar Favoritos com o ID idêntico 
      name: result.name,
      description: description,
      images: images,
      rating: result.rating ? String(result.rating).replace('.', ',') : "N/A",
      reviews: result.user_ratings_total ? String(result.user_ratings_total) : "0",
      types: result.types || [],
      address: result.formatted_address || "Santarém",
      category: category
    };
  } catch (error) {
    console.error("Failed to fetch place details:", error);
    return null;
  }
}
