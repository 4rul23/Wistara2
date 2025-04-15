import { Destination } from "@/app/data/destinations";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function getAllDestinations(): Promise<Destination[]> {
  try {
    // Log untuk debugging
    console.log(`Fetching destinations from: ${API_BASE_URL}/destinations`);

    const response = await fetch(`${API_BASE_URL}/destinations`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API response received:', data);

    if (data.destinations && Array.isArray(data.destinations)) {
      return data.destinations;
    } else if (Array.isArray(data)) {
      return data;
    } else {
      console.error('Unexpected API response format:', data);
      throw new Error('Invalid API response format');
    }
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
}

export async function getDestinationById(id: string): Promise<Destination> {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch destination');
    }

    const data = await response.json();
    return data.destination;
  } catch (error) {
    console.error('Error fetching destination:', error);
    throw error;
  }
}

export async function getDestinationsByRegion(region: string): Promise<Destination[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations/region/${region}`);
    if (!response.ok) {
      throw new Error('Failed to fetch destinations by region');
    }

    const data = await response.json();
    return data.destinations;
  } catch (error) {
    console.error('Error fetching destinations by region:', error);
    throw error;
  }
}

export async function getFeaturedDestinations(): Promise<Destination[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations?featured=true`);
    if (!response.ok) {
      throw new Error('Failed to fetch featured destinations');
    }

    const data = await response.json();
    return data.destinations;
  } catch (error) {
    console.error('Error fetching featured destinations:', error);
    throw error;
  }
}
