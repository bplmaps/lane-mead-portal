// 1. Import utilities from `astro:content`
import { z, reference, defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

// 2. Define your collection(s)
const stories = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    publishDate: z.string().transform(str => new Date(str)),
    author: z.string(),
    banner: z.string(),
    bannerImage: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional()
  }),
});


const itemCollections = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    items: z.array(reference('items')),
    featured: reference('items')
  }).superRefine(
    ({items, featured}, ctx) => {
      if (!items.map((d) => d.id).includes(featured.id)) {
        ctx.addIssue({
          code: "custom",
          message: "`featured` must be included in `items`",
          path: ["featured"]
        })
      }
    }
  ),
}); 

const items = defineCollection({
  type: "data",
  schema: z.object({
    itemType: z.enum(["digitalCommonwealth", "internetArchive"]),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional()
  })
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'stories': stories,
  'item-collections': itemCollections,
  'items': items,
  docs: defineCollection({ schema: docsSchema() })
};