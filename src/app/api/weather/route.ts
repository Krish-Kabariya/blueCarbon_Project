import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
      return NextResponse.json(
        { success: false, error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    // Mock weather data - in production, integrate with weather API
    const mockWeatherData = {
      location: {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        name: 'Project Location',
      },
      timestamp: new Date().toISOString(),
      current: {
        temperature: 24 + Math.random() * 10, // 24-34°C
        humidity: 60 + Math.random() * 30, // 60-90%
        pressure: 1013 + Math.random() * 20, // 1013-1033 hPa
        windSpeed: Math.random() * 15, // 0-15 m/s
        windDirection: Math.random() * 360, // 0-360°
        precipitation: Math.random() * 5, // 0-5mm
        visibility: 10 + Math.random() * 15, // 10-25km
        uvIndex: Math.random() * 11, // 0-11
        cloudCover: Math.random() * 100, // 0-100%
      },
      forecast: {
        daily: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          tempHigh: 28 + Math.random() * 8,
          tempLow: 20 + Math.random() * 5,
          humidity: 65 + Math.random() * 25,
          precipitation: Math.random() * 10,
          windSpeed: Math.random() * 12,
          conditions: ['sunny', 'partly_cloudy', 'cloudy', 'rainy'][Math.floor(Math.random() * 4)],
        })),
      },
    };

    return NextResponse.json({
      success: true,
      data: mockWeatherData,
    });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
