/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Exploration' | 'Chemistry' | 'Learning' | 'Master';
}

export const BADGES: Badge[] = [
  { id: 'curious', title: 'Curious Mind', description: 'View 10 elements', icon: '🔬', category: 'Exploration' },
  { id: 'explorer', title: 'Explorer', description: 'View all 118 elements', icon: '🌍', category: 'Exploration' },
  { id: 'h2o', title: 'H₂O Master', description: 'Build water molecule', icon: '💧', category: 'Chemistry' },
  { id: 'salt', title: 'Salt Bae', description: 'Build NaCl correctly', icon: '🧂', category: 'Chemistry' },
  { id: 'first_lesson', title: 'First Lesson', description: 'Complete lesson 1', icon: '📖', category: 'Learning' },
  { id: 'graduate', title: 'Graduate', description: 'Complete all 8 lessons', icon: '🎓', category: 'Learning' },
  { id: 'noble', title: 'Noble Soul', description: 'View all noble gases', icon: '💎', category: 'Chemistry' },
  { id: 'legend', title: 'Legend', description: 'Reach 5000 XP', icon: '🌟', category: 'Master' }
];
