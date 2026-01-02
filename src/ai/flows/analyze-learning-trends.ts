'use server';

/**
 * @fileOverview Identifies trends and patterns in student learning data to understand areas where students are excelling or struggling.
 *
 * - analyzeLearningTrends - A function that analyzes learning data to identify trends.
 * - AnalyzeLearningTrendsInput - The input type for the analyzeLearningTrends function.
 * - AnalyzeLearningTrendsOutput - The return type for the analyzeLearningTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeLearningTrendsInputSchema = z.object({
  learningData: z.string().describe('Aggregated learning data from various sources like LMS and online course platforms.'),
});
export type AnalyzeLearningTrendsInput = z.infer<typeof AnalyzeLearningTrendsInputSchema>;

const AnalyzeLearningTrendsOutputSchema = z.object({
  trends: z.string().describe('Identified trends and patterns in student learning data.'),
  recommendations: z.string().describe('Personalized recommendations based on the identified trends.'),
});
export type AnalyzeLearningTrendsOutput = z.infer<typeof AnalyzeLearningTrendsOutputSchema>;

export async function analyzeLearningTrends(input: AnalyzeLearningTrendsInput): Promise<AnalyzeLearningTrendsOutput> {
  return analyzeLearningTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeLearningTrendsPrompt',
  input: {schema: AnalyzeLearningTrendsInputSchema},
  output: {schema: AnalyzeLearningTrendsOutputSchema},
  prompt: `You are an expert in learning analytics. Analyze the following learning data and identify trends and patterns in student performance. Provide personalized recommendations based on the identified trends.

Learning Data: {{{learningData}}}`,
});

const analyzeLearningTrendsFlow = ai.defineFlow(
  {
    name: 'analyzeLearningTrendsFlow',
    inputSchema: AnalyzeLearningTrendsInputSchema,
    outputSchema: AnalyzeLearningTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
