import { type ClassValue, clsx } from 'clsx';
import {
  addDays,
  addMonths,
  differenceInMonths,
  differenceInYears,
  endOfMonth,
  formatDuration,
  intervalToDuration,
  startOfDay,
  startOfMonth,
} from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(value: string): string {
  const date = new Date(value);

  return date.toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
}

export function formatCustomDistance(from: Date, to: Date | null) {
  // Ensure the start date is the start of the day
  const startDate = startOfDay(from);

  // Adjust the end date to the end of the day
  const adjustedEndDate = addDays(endOfMonth(to || new Date('')), 1);

  const duration = intervalToDuration({
    start: startDate,
    end: adjustedEndDate,
  });

  // Customize the format
  const formattedDuration = formatDuration(duration, {
    format: ['years', 'months'], // Only show years and months
    delimiter: ' ',
  });

  return formattedDuration.replace('year', 'yr').replace('month', 'mo');
}
