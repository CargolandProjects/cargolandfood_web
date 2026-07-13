import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const placeId = request.nextUrl.searchParams.get('placeId');
  
  if (!placeId) {
    return NextResponse.json(
      { error: 'placeId is required' },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Use server-side env variable
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google API key is not configured' },
        { status: 500 }
      );
    }

    // Call the new Places API from the server
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'id,formattedAddress,addressComponents,geometry.location,displayName',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Places API error:', errorData);
      return NextResponse.json(
        { error: errorData.error?.message || 'Failed to fetch place details' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching place details:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}