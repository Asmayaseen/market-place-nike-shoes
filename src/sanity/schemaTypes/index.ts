/* eslint-disable @typescript-eslint/no-unused-vars */
import { type SchemaTypeDefinition } from 'sanity';
import { productSchema } from './product';
import Categories from '@/app/[Categories]/page'; // No ESLint warning for this line
/* eslint-enable @typescript-eslint/no-unused-vars */

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema],
};
