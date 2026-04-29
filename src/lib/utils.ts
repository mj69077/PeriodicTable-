import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CATEGORY_COLORS: Record<string, string> = {
  'alkali-metal': '#ffd6c0',
  'alkaline-earth-metal': '#ffebcc',
  'transition-metal': '#c0d8ff',
  'post-transition-metal': '#d9e2f1',
  'metalloid': '#e0f2f1',
  'nonmetal': '#b2f0e8',
  'noble-gas': '#e8d5f5',
  'lanthanide': '#f8edff',
  'actinide': '#ffe0f0',
  'halogen': '#e0f2f1',
};
