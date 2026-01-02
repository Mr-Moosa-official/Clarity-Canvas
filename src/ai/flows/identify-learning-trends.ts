'use server';

/**
 * @fileOverview Identifies trends and patterns in student learning data to understand areas where students are excelling or struggling.
 *
 * - identifyLearningTrends - A function that analyzes learning data to identify trends.
 * - IdentifyLearningTrendsInput - The input type for the identifyLearningTrends function.
 * - IdentifyLearningTrendsOutput - The return type for the identifyLearningTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyLearningTrendsInputSchema = z.object({
  learningData: z.string().describe('Aggregated learning data from various sources like LMS and online course platforms.'),
});
export type IdentifyLearningTrendsInput = z.infer<typeof IdentifyLearningTrendsInputSchema>;

const IdentifyLearningTrendsOutputSchema = z.object({
  trends: z.string().describe('Identified trends and patterns in student learning data.'),
  recommendations: z.string().describe('Personalized recommendations based on the identified trends.'),
});
export type IdentifyLearningTrendsOutput = z.infer<typeof IdentifyLearningTrendsOutputSchema>;

export async function identifyLearningTrends(input: IdentifyLearningTrendsInput): Promise<IdentifyLearningTrendsOutput> {
  return identifyLearningTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyLearningTrendsPrompt',
  input: {schema: IdentifyLearningTrendsInputSchema},
  output: {schema: IdentifyLearningTrendsOutputSchema},
  prompt: `You are an expert in learning analytics. Analyze the following learning data and identify trends and patterns in student performance. Provide personalized recommendations based on the identified trends.

Learning Data: {{{learningData}}}`,
});

const identifyLearningTrendsFlow = ai.defineFlow(
  {
    name: 'identifyLearningTrendsFlow',
    inputSchema: IdentifyLearningTrendsInputSchema,
    outputSchema: IdentifyLearningTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
