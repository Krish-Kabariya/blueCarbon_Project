'use server';

import {
  visualizeEnvironmentalData,
  type VisualizeEnvironmentalDataInput,
} from '@/ai/flows/visualize-environmental-data';
import { z } from 'zod';

const actionSchema = z.object({
  dataType: z.string().min(1, "Data type is required."),
  dataValues: z.string().min(1, "Data values are required."),
  visualizationType: z.string().min(1, "Visualization type is required."),
});

export async function getVisualization(formData: FormData) {
  const rawInput = {
    dataType: formData.get('dataType'),
    dataValues: formData.get('dataValues'),
    visualizationType: formData.get('visualizationType'),
  };

  const parsedInput = actionSchema.safeParse(rawInput);

  if (!parsedInput.success) {
    return { error: 'Invalid input. Please check all fields.' };
  }

  try {
    const result = await visualizeEnvironmentalData(parsedInput.data as VisualizeEnvironmentalDataInput);
    if (!result.visualization) {
        return { error: 'AI failed to generate a visualization. Please try again.' };
    }
    return { visualization: result.visualization };
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
}
