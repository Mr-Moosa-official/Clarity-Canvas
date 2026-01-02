'use server';
/**
 * @fileOverview A personalized recommendation AI agent that determines what learning intervention will improve the learning outcomes of a student.
 *
 * - generatePersonalizedRecommendations - A function that provides personalized recommendations to students.
 * - GeneratePersonalizedRecommendationsInput - The input type for the generatePersonalizedRecommendations function.
 * - GeneratePersonalizedRecommendationsOutput - The return type for the generatePersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedRecommendationsInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  learningHistory: z.string().describe('The learning history of the student, including courses taken, grades, and completion rates.'),
  performanceMetrics: z.string().describe('The performance metrics of the student, such as engagement levels and quiz scores.'),
  areasOfStruggle: z.string().describe('Areas where the student is struggling.'),
});
export type GeneratePersonalizedRecommendationsInput = z.infer<typeof GeneratePersonalizedRecommendationsInputSchema>;

const GeneratePersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of personalized recommendations for learning interventions.'),
});
export type GeneratePersonalizedRecommendationsOutput = z.infer<typeof GeneratePersonalizedRecommendationsOutputSchema>;

export async function generatePersonalizedRecommendations(input: GeneratePersonalizedRecommendationsInput): Promise<GeneratePersonalizedRecommendationsOutput> {
  return generatePersonalizedRecommendationsFlow(input);
}

const generatePersonalizedRecommendationsPrompt = ai.definePrompt({
  name: 'generatePersonalizedRecommendationsPrompt',
  input: {schema: GeneratePersonalizedRecommendationsInputSchema},
  output: {schema: GeneratePersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI assistant that provides personalized recommendations to students based on their learning history and performance, focusing on learning interventions.

  Analyze the following information about the student and provide a list of personalized recommendations for learning interventions that can help them improve their understanding and outcomes.

  Student ID: {{{studentId}}}
  Learning History: {{{learningHistory}}}
  Performance Metrics: {{{performanceMetrics}}}
  Areas of Struggle: {{{areasOfStruggle}}}

  Recommendations:
  `,
});

const generatePersonalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedRecommendationsFlow',
    inputSchema: GeneratePersonalizedRecommendationsInputSchema,
    outputSchema: GeneratePersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await generatePersonalizedRecommendationsPrompt(input);
    return output!;
  }
);
