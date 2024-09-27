import { expect, test, describe, it } from 'vitest';
import { cn, formatCustomDistance, formatDate } from '@/lib/utils';

describe('utils', () => {
  describe('cn', () => {
    test('should be correct', () => {
      const result = cn('text-base', 'text-lg');
      expect(result).toBe('text-lg');
    });
    test('should be failure', () => {
      const result = cn('text-base', 'text-lg');
      expect(result).not.toBe('text-lg text-bae');
    });
  });

  describe('formatDate', () => {
    const date = '2024-01-31';
    const result = formatDate(date);
    test('should be correct', () => {
      expect(result).toBe('01/31/24');
    });

    test('should be failure', () => {
      expect(result).not.toBe('01/31/2024');
    });
  });

  describe('formatCustomDistance', () => {
    const form = new Date('2024-01-31');
    const to = new Date('2024-02-31');
    test('should be correct', () => {
      const distance = formatCustomDistance(form, to);

      expect(distance).toBe('2 mos');
    });

    test('should be failure', () => {
      const distance = formatCustomDistance(form, to);

      expect(distance).not.toBe('1 mos');
    });
  });
});
