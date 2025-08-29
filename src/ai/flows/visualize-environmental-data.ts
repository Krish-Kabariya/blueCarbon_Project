'use server';
/**
 * @fileOverview A flow for visualizing environmental data in an easily understandable format.
 *
 * - visualizeEnvironmentalData - A function that visualizes environmental data.
 * - VisualizeEnvironmentalDataInput - The input type for the visualizeEnvironmentalData function.
 * - VisualizeEnvironmentalDataOutput - The return type for the visualizeEnvironmentalData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VisualizeEnvironmentalDataInputSchema = z.object({
  dataType: z
    .string()
    .describe("The type of environmental data to visualize (e.g., 'blue carbon levels', 'pollution reports')."),
  dataValues: z.string().describe('The data values to visualize, in JSON format.'),
  visualizationType: z
    .string()
    .describe("The desired type of visualization (e.g., 'bar chart', 'map', 'table')."),
});
export type VisualizeEnvironmentalDataInput = z.infer<
  typeof VisualizeEnvironmentalDataInputSchema
>;

const VisualizeEnvironmentalDataOutputSchema = z.object({
  visualization: z
    .string()
    .describe('A textual description of the visualized data.'),
});
export type VisualizeEnvironmentalDataOutput = z.infer<
  typeof VisualizeEnvironmentalDataOutputSchema
>;

export async function visualizeEnvironmentalData(
  input: VisualizeEnvironmentalDataInput
): Promise<VisualizeEnvironmentalDataOutput> {
  return visualizeEnvironmentalDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'visualizeEnvironmentalDataPrompt',
  input: {schema: VisualizeEnvironmentalDataInputSchema},
  output: {schema: VisualizeEnvironmentalDataOutputSchema},
  prompt: `You are an expert in data visualization.

You will take environmental data and create a textual summary of the data, describing how it is visualized, and the key insights from the data.

Data Type: {{{dataType}}}
Data Values: {{{dataValues}}}
Visualization Type: {{{visualizationType}}}

Create a detailed description of the visualization.`,
});

const visualizeEnvironmentalDataFlow = ai.defineFlow(
  {
    name: 'visualizeEnvironmentalDataFlow',
    inputSchema: VisualizeEnvironmentalDataInputSchema,
    outputSchema: VisualizeEnvironmentalDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
