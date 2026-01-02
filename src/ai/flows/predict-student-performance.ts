'use server';

/**
 * @fileOverview Forecasts student performance using predictive modeling to identify at-risk students.
 *
 * - predictStudentPerformance - A function that predicts student performance and identifies at-risk students.
 * - PredictStudentPerformanceInput - The input type for the predictStudentPerformance function.
 * - PredictStudentPerformanceOutput - The return type for the predictStudentPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictStudentPerformanceInputSchema = z.object({
  studentData: z.string().describe('Aggregated student data including demographics, academic history, and engagement metrics.'),
  modelType: z.enum(['regression', 'classification']).describe('The type of predictive model to use: regression or classification.'),
  performanceThreshold: z.number().describe('The threshold below which a student is considered at-risk.'),
});
export type PredictStudentPerformanceInput = z.infer<typeof PredictStudentPerformanceInputSchema>;

const PredictStudentPerformanceOutputSchema = z.object({
  predictedPerformance: z.number().describe('The predicted performance score for the student.'),
  isAtRisk: z.boolean().describe('Whether the student is predicted to be at-risk based on the performance threshold.'),
  factors: z.string().describe('Key factors influencing the predicted performance.'),
});
export type PredictStudentPerformanceOutput = z.infer<typeof PredictStudentPerformanceOutputSchema>;

export async function predictStudentPerformance(input: PredictStudentPerformanceInput): Promise<PredictStudentPerformanceOutput> {
  return predictStudentPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictStudentPerformancePrompt',
  input: {schema: PredictStudentPerformanceInputSchema},
  output: {schema: PredictStudentPerformanceOutputSchema},
  prompt: `You are an AI assistant that uses predictive modeling to forecast student performance and identify at-risk students.

  Analyze the following student data and predict the student's performance. Indicate whether the student is at-risk based on the performance threshold ({{{performanceThreshold}}}).

  Student Data: {{{studentData}}}
  Model Type: {{{modelType}}}

  Predicted Performance:
  Is At-Risk:
  Factors:
  `,
});

const predictStudentPerformanceFlow = ai.defineFlow(
  {
    name: 'predictStudentPerformanceFlow',
    inputSchema: PredictStudentPerformanceInputSchema,
    outputSchema: PredictStudentPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
