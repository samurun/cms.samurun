import { EMPLOYMENT_TYPE_OPTIONS } from '@/lib/options';
import z from 'zod';

const notEmpty = z.string().trim().min(1, { message: 'Required' });

export const projectSchema = z.object({
  title: z.string().pipe(notEmpty),
  description: z.string().pipe(notEmpty),
  image_cover: z.string().pipe(notEmpty),
  url: z.string().url().pipe(notEmpty),
  stacks: z.string().array().nonempty({
    message: "Stacks can't be empty!",
  }),
});

export type ProjectSchemaType = z.infer<typeof projectSchema>;

export const stackSchema = z.object({
  stack: z.string().pipe(notEmpty),
});

export type StackSchemaType = z.infer<typeof stackSchema>;

export const experienceSchema = z.object({
  title: z.string().pipe(notEmpty),
  employment_type: z.string().pipe(notEmpty),
  company_name: z.string().pipe(notEmpty),
  location: z.string().pipe(notEmpty),
  location_type: z.string().pipe(notEmpty),
  start_date: z.date(),
  end_date: z.date().nullable(),
  description: z.string(),
});

export type ExperienceSchemaType = z.infer<typeof experienceSchema>;
