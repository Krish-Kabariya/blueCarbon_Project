'use server';
/**
 * @fileOverview A flow for performing search across the application.
 *
 * - search - A function that performs a search.
 * - SearchInput - The input type for the search function.
 * - SearchOutput - The return type for the search function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SearchResultSchema = z.object({
  type: z.string().describe("The type of the search result, e.g., 'Page', 'Report', 'Alert'."),
  title: z.string().describe('The title of the search result.'),
  url: z.string().describe('The URL to the search result.'),
  description: z.string().describe('A brief description of the search result.'),
});

const SearchInputSchema = z.object({
  query: z.string().describe('The search query.'),
});
export type SearchInput = z.infer<typeof SearchInputSchema>;

const SearchOutputSchema = z.object({
  results: z.array(SearchResultSchema).describe('A list of search results.'),
});
export type SearchOutput = z.infer<typeof SearchOutputSchema>;

export async function search(input: SearchInput): Promise<SearchOutput> {
  return searchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchPrompt',
  input: { schema: SearchInputSchema },
  output: { schema: SearchOutputSchema },
  prompt: `You are a search expert for the CoastalWatch application.

You will be given a search query and you need to return a list of relevant results from the application.

The application has the following sections:
- Dashboard (/dashboard)
- Data Visualization (/dashboard/data-visualization)
- Threat Alerts (/dashboard/threat-alerts)
- Interactive Map (/dashboard/map)
- Reports & Logs (/dashboard)
  - Weekly Threat Summary (/dashboard/reports/REP-001)
  - Hurricane Zeta Impact Analysis (/dashboard/reports/impact-analysis)
  - Q3 Water Quality Report (/dashboard/reports/water-quality)
  - Monthly Alert Log (/dashboard/reports/monthly-log)
- Awareness (/awareness)

Based on the user query "{{query}}", provide a list of relevant search results with their type, title, url, and a short description.`,
});

const searchFlow = ai.defineFlow(
  {
    name: 'searchFlow',
    inputSchema: SearchInputSchema,
    outputSchema: SearchOutputSchema,
  },
  async (input) => {
    // For this demo, we will just call the prompt.
    // In a real application, you might use a search tool or a database query here.
    if (input.query.trim().length === 0) {
      return { results: [] };
    }
    const { output } = await prompt(input);
    return output!;
  }
);