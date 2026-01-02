'use server';

/**
 * @fileOverview Identifies at-risk students using predictive modeling.
 *
 * - identifyStrugglingStudents - A function that identifies at-risk students.
 * - IdentifyStrugglingStudentsInput - The input type for the identifyStrugglingStudents function.
 * - IdentifyStrugglingStudentsOutput - The return type for the identifyStrugglingStudents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyStrugglingStudentsInputSchema = z.object({
  studentData: z
    .string()
    .describe(
      'Aggregated learning data from various sources like learning management systems (LMS) and online course platforms, should be a JSON string.'
    ),
  performanceThreshold: z
    .number()
    .describe(
      'A numerical value representing the minimum acceptable performance level. Students performing below this threshold are flagged as at-risk.'
    ),
  engagementThreshold: z
    .number()
    .describe(
      'A numerical value representing the minimum acceptable engagement level. Students with engagement below this threshold are flagged as at-risk.'
    ),
});
export type IdentifyStrugglingStudentsInput = z.infer<
  typeof IdentifyStrugglingStudentsInputSchema
>;

const IdentifyStrugglingStudentsOutputSchema = z.object({
  atRiskStudents: z
    .array(z.string())
    .describe(
      'An array of student IDs who are identified as at-risk based on the predictive model.'
    ),
  summary: z
    .string()
    .describe(
      'A brief summary of the factors contributing to students being identified as at-risk.'
    ),
});
export type IdentifyStrugglingStudentsOutput = z.infer<
  typeof IdentifyStrugglingStudentsOutputSchema
>;

export async function identifyStrugglingStudents(
  input: IdentifyStrugglingStudentsInput
): Promise<IdentifyStrugglingStudentsOutput> {
  return identifyStrugglingStudentsFlow(input);
}

const identifyStrugglingStudentsPrompt = ai.definePrompt({
  name: 'identifyStrugglingStudentsPrompt',
  input: {schema: IdentifyStrugglingStudentsInputSchema},
  output: {schema: IdentifyStrugglingStudentsOutputSchema},
  prompt: `You are an AI assistant designed to identify students who are at risk of failing a course based on their learning data.

Analyze the following student data and identify students who are performing below the specified performance threshold ({{{performanceThreshold}}}) or engagement threshold ({{{engagementThreshold}}}).

Student Data: {{{studentData}}}

Based on this data, identify the students who are struggling and provide a summary of the factors contributing to their struggles.  Return the list of student ids and the summary.`,
});

const identifyStrugglingStudentsFlow = ai.defineFlow(
  {
    name: 'identifyStrugglingStudentsFlow',
    inputSchema: IdentifyStrugglingStudentsInputSchema,
    outputSchema: IdentifyStrugglingStudentsOutputSchema,
  },
  async input => {
    const {output} = await identifyStrugglingStudentsPrompt(input);
    return output!;
  }
);
