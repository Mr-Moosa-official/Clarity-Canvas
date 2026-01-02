'use server';
/**
 * @fileOverview A personalized recommendation AI agent.
 *
 * - getPersonalizedRecommendations - A function that provides personalized recommendations to students.
 * - GetPersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - GetPersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetPersonalizedRecommendationsInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  learningHistory: z.string().describe('The learning history of the student, including courses taken, grades, and completion rates.'),
  performanceMetrics: z.string().describe('The performance metrics of the student, such as engagement levels and quiz scores.'),
  areasOfStruggle: z.string().describe('Areas where the student is struggling.'),
});
export type GetPersonalizedRecommendationsInput = z.infer<typeof GetPersonalizedRecommendationsInputSchema>;

const GetPersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of personalized recommendations for learning resources and interventions.'),
});
export type GetPersonalizedRecommendationsOutput = z.infer<typeof GetPersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(input: GetPersonalizedRecommendationsInput): Promise<GetPersonalizedRecommendationsOutput> {
  return getPersonalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getPersonalizedRecommendationsPrompt',
  input: {schema: GetPersonalizedRecommendationsInputSchema},
  output: {schema: GetPersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI assistant that provides personalized recommendations to students based on their learning history and performance.

  Analyze the following information about the student and provide a list of personalized recommendations for learning resources and interventions that can help them improve their understanding and outcomes.

  Student ID: {{{studentId}}}
  Learning History: {{{learningHistory}}}
  Performance Metrics: {{{performanceMetrics}}}
  Areas of Struggle: {{{areasOfStruggle}}}

  Recommendations:
  `,
});

const getPersonalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'getPersonalizedRecommendationsFlow',
    inputSchema: GetPersonalizedRecommendationsInputSchema,
    outputSchema: GetPersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
