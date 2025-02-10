// lib/sanityImage.ts (or lib/sanity.ts)

import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId:'iygh418k', 
  dataset:'production',        
  useCdn: true,                 
});
