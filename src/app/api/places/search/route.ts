import { NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

export async function GET(request: Request) {
  if (!GOOGLE_API_KEY) {
    return NextResponse.json({ error: 'Missing Google Maps API Key' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Fazer o append artificial de "Santarém, Portugal" caso não exista
    const finalQuery = q.toLowerCase().includes('santarém') ? q : `${q} Santarém Portugal`;

    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(finalQuery)}&language=pt-PT&key=${GOOGLE_API_KEY}`;
    
    const searchRes = await fetch(searchUrl, { next: { revalidate: 3600 } });
    const searchData = await searchRes.json();

    if (searchData.status !== 'OK') {
      if (searchData.status === 'ZERO_RESULTS') {
        return NextResponse.json({ results: [] });
      }
      return NextResponse.json({ error: searchData.status }, { status: 400 });
    }

    // Map to the internal structure
    const mappedResults = searchData.results.slice(0, 15).map((place: any) => {
      // Obter fallback ou imagem original
      const photoUrl = place.photos && place.photos.length > 0
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
        : "/monument.png"; // Fallback static image
        
      let ratingStr = "N/A";
      if (place.rating) {
        ratingStr = String(place.rating).replace('.', ',');
      }

      // Preço tentativo via price_level
      let priceStr = "Ver Local";
      if (place.price_level !== undefined) {
        priceStr = "€".repeat(place.price_level) || "Barato";
      }

      return {
        id: place.place_id,
        title: place.name,
        image: photoUrl,
        rating: ratingStr,
        reviews: place.user_ratings_total ? String(place.user_ratings_total) : "0",
        tag: place.types ? place.types[0].replace(/_/g, ' ') : "Informação",
        price: priceStr,
      };
    });

    return NextResponse.json({ results: mappedResults });

  } catch (error) {
    console.error("Erro na busca de Places:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
