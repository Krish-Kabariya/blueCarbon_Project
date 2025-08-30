
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

const SuggestSearchInputSchema = z.object({
  query: z.string().describe('The partial search query.'),
});
export type SuggestSearchInput = z.infer<typeof SuggestSearchInputSchema>;

const SuggestSearchOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of search suggestions.'),
});
export type SuggestSearchOutput = z.infer<typeof SuggestSearchOutputSchema>;

async function getCityNames(): Promise<string[]> {
    try {
        const filePath = path.join(process.cwd(), 'public', 'india_mangroves.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        const cities = data.india_mangroves.map((item: any) => item.city);
        return [...new Set<string>(cities)]; // Return unique city names
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

    const cities = await getCityNames();
    const filteredCities = cities.filter(city => 
      city.toLowerCase().includes(query.toLowerCase())
    );

    return { suggestions: filteredCities.slice(0, 5) }; // Limit to 5 suggestions
  }
);
