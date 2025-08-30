
'use server';
/**
 * @fileOverview A flow for providing search suggestions.
 *
 * - suggestSearch - A function that provides search suggestions.
 * - SuggestSearchInput - The input type for the suggestSearch function.
 * - SuggestSearchOutput - The return type for the suggestSearch function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { promises as fs } from 'fs';
import path from 'path';

const SuggestionSchema = z.object({
  city: z.string(),
  lat: z.number(),
  lon: z.number(),
});

const SuggestSearchInputSchema = z.object({
  query: z.string().describe('The partial search query.'),
});
export type SuggestSearchInput = z.infer<typeof SuggestSearchInputSchema>;

const SuggestSearchOutputSchema = z.object({
  suggestions: z.array(SuggestionSchema).describe('A list of search suggestions with coordinates.'),
});
export type SuggestSearchOutput = z.infer<typeof SuggestSearchOutputSchema>;

async function getCityData(): Promise<Array<{ city: string; lat: number; lon: number }>> {
    try {
        const filePath = path.join(process.cwd(), 'public', 'india_mangroves.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        
        const cityData = data.india_mangroves.map((item: any) => ({
            city: item.city,
            lat: item.latitude,
            lon: item.longitude,
        }));
        
        // Deduplicate cities, keeping the first encountered coordinates
        const uniqueCities = new Map<string, { city: string; lat: number; lon: number }>();
        cityData.forEach(item => {
            if (!uniqueCities.has(item.city)) {
                uniqueCities.set(item.city, item);
            }
        });
        
        return Array.from(uniqueCities.values());
    } catch (error) {
        console.error("Failed to load or parse city data:", error);
        return [];
    }
}

export async function suggestSearch(input: SuggestSearchInput): Promise<SuggestSearchOutput> {
  return suggestSearchFlow(input);
}

const suggestSearchFlow = ai.defineFlow(
  {
    name: 'suggestSearchFlow',
    inputSchema: SuggestSearchInputSchema,
    outputSchema: SuggestSearchOutputSchema,
  },
  async ({ query }) => {
    if (!query.trim()) {
      return { suggestions: [] };
    }

    const cities = await getCityData();
    const filteredCities = cities.filter(cityData => 
      cityData.city.toLowerCase().includes(query.toLowerCase())
    );

    return { suggestions: filteredCities.slice(0, 5) }; // Limit to 5 suggestions
  }
);
