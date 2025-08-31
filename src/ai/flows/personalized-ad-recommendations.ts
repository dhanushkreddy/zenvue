'use server';

/**
 * @fileOverview A personalized ad recommendation AI agent.
 *
 * - getPersonalizedAdRecommendations - A function that handles the personalized ad recommendations process.
 * - PersonalizedAdRecommendationsInput - The input type for the getPersonalizedAdRecommendations function.
 * - PersonalizedAdRecommendationsOutput - The return type for the getPersonalizedAdRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedAdRecommendationsInputSchema = z.object({
  userAdRatings: z.array(
    z.object({
      adId: z.string().describe('The ID of the ad.'),
      rating: z.number().int().min(-1).max(1).describe('The user rating for the ad. -1 for dislike, 1 for like, 0 for neutral.'),
    })
  ).describe('The user ad ratings.'),
  cartProductIds: z.array(z.string()).describe('The IDs of the products in the user cart.'),
  seasonalOffers: z.array(z.string()).optional().describe('The current seasonal offers available.'),
  popularProducts: z.array(z.string()).optional().describe('The popular products in the user region.'),
});
export type PersonalizedAdRecommendationsInput = z.infer<typeof PersonalizedAdRecommendationsInputSchema>;

const PersonalizedAdRecommendationsOutputSchema = z.object({
  recommendedAdIds: z.array(z.string()).describe('The IDs of the recommended ads.'),
  reasoning: z.string().describe('The reasoning behind the ad recommendations.'),
});
export type PersonalizedAdRecommendationsOutput = z.infer<typeof PersonalizedAdRecommendationsOutputSchema>;

export async function getPersonalizedAdRecommendations(input: PersonalizedAdRecommendationsInput): Promise<PersonalizedAdRecommendationsOutput> {
  return personalizedAdRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedAdRecommendationsPrompt',
  input: {schema: PersonalizedAdRecommendationsInputSchema},
  output: {schema: PersonalizedAdRecommendationsOutputSchema},
  prompt: `You are an expert marketing assistant specializing in personalized ad recommendations.

You will use the user's past ad ratings and current cart items to recommend new ads that the user might be interested in.

User Ad Ratings:
{{#each userAdRatings}}
  Ad ID: {{{adId}}}, Rating: {{{rating}}}
{{/each}}

Cart Product IDs:
{{#each cartProductIds}}
  {{{this}}}
{{/each}}

{{#if seasonalOffers}}
Seasonal Offers:
{{#each seasonalOffers}}
  {{{this}}}
{{/each}}
{{/if}}

{{#if popularProducts}}
Popular Products:
{{#each popularProducts}}
  {{{this}}}
{{/each}}
{{/if}}

You will make a determination as to which ads to recommend, and set the recommendedAdIds output field appropriately. Explain your reasoning in the reasoning output field.
`,
});

const personalizedAdRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedAdRecommendationsFlow',
    inputSchema: PersonalizedAdRecommendationsInputSchema,
    outputSchema: PersonalizedAdRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
