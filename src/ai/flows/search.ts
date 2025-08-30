
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
  prompt: `You are a search expert for the CoastalWatch application. Your task is to provide relevant search results based on a user's query.

You must only return results from the following list of available pages and reports in the application. Do not invent new results.

Available Application Sections:
- Page: Dashboard, url: /dashboard
- Page: Data Visualization, url: /dashboard/data-visualization
- Page: Threat Alerts, url: /dashboard/threat-alerts
- Page: Interactive Map, url: /dashboard/map
- Page: Awareness, url: /awareness

Available Reports (under Reports & Logs):
- Report: Weekly Threat Summary, url: /dashboard/reports/REP-001
- Report: Hurricane Zeta Impact Analysis, url: /dashboard/reports/impact-analysis
- Report: Q3 Water Quality Report, url: /dashboard/reports/water-quality
- Report: Monthly Alert Log, url: /dashboard/reports/monthly-log

Based on the user's search query "{{query}}", return a list of the most relevant results. For each result, provide its type, title, URL, and a brief description.`,
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
