import { experienceSchema, projectSchema, stackSchema } from '@/schema';
import { describe, test, expect } from 'vitest';

describe('schema', () => {
  describe('project schema', () => {
    test('should be successfully', () => {
      const result = projectSchema.safeParse({
        title: 'Laboris sint et ea duis eu.',
        description: 'Duis nisi non excepteur minim eu laborum.',
        image_cover: 'https://example.com',
        url: 'https://example.com',
        stacks: ['react'],
      });
      expect(result.success).toEqual(true);
    });

    test('should be error', () => {
      const result = projectSchema.safeParse({
        title: '',
        description: '',
        image_cover: '',
        url: '',
        stacks: ['react'],
      });
      expect(result.success).toEqual(false);
    });
  });

  describe('stack schema', () => {
    test('should be successfully', () => {
      const result = stackSchema.safeParse({
        stack: 'react',
      });
      expect(result.success).toEqual(true);
    });

    test('should be error', () => {
      const result = stackSchema.safeParse({
        stack: '',
      });
      expect(result.success).toEqual(false);
    });
  });

  describe(' experience schema', () => {
    test('should be successfully', () => {
      const result = experienceSchema.safeParse({
        title: 'Software Engineer',
        employment_type: 'Full-time',
        company_name: 'Tech Innovations Inc.',
        location: 'San Francisco, CA',
        location_type: 'Remote',
        start_date: new Date('2020-01-01'),
        end_date: null, // Nullable field
        description:
          'Developed various applications using modern technologies.',
      });
      expect(result.success).toEqual(true);
    });

    test('should be error', () => {
      const result = experienceSchema.safeParse({
        title: '', // Invalid: Empty string
        employment_type: 'Part-time',
        company_name: 'Tech Innovations Inc.',
        location: 'San Francisco, CA',
        location_type: 'Remote',
        start_date: new Date('2020-01-01'),
        end_date: null, // Nullable field
        description: 'Worked on various projects.',
      });
      expect(result.success).toEqual(false);
    });
  });
});
