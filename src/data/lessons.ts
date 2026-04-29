/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lesson {
  id: number;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  slides: {
    title: string;
    content: string;
    fact?: string;
    concept?: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correct: string;
  }[];
}

export const LESSONS: Lesson[] = [
  {
    id: 1,
    title: "What is the Periodic Table?",
    difficulty: 'Beginner',
    estimatedTime: '5 min',
    slides: [
      {
        title: "Introduction",
        content: "The Periodic Table is a tabular display of all known chemical elements. It is organized by atomic number, electron configuration, and recurring chemical properties.",
        concept: "Atomic Number",
        fact: "Dmitri Mendeleev is often credited with the first widely recognized periodic table in 1869."
      },
      {
        title: "How to Read it",
        content: "Each cell contains the element's symbol, name, and atomic number. The atomic number tells you how many protons are in the nucleus.",
        concept: "Element Symbols"
      }
    ],
    quiz: [
      {
        question: "Who created the first periodic table?",
        options: ["Einstein", "Mendeleev", "Newton", "Curie"],
        correct: "Mendeleev"
      }
    ]
  },
  {
    id: 2,
    title: "Element Families",
    difficulty: 'Beginner',
    estimatedTime: '8 min',
    slides: [
      {
        title: "Metals & Non-metals",
        content: "Elements are broadly classified into metals (left side) and non-metals (right side). Metalloids are found along the zigzag line between them.",
        concept: "Classification"
      },
      {
        title: "Noble Gases",
        content: "Group 18 elements are called Noble Gases. they are very stable and rarely react with other elements.",
        concept: "Group 18"
      }
    ],
    quiz: [
      {
        question: "Where are metals usually found?",
        options: ["Right side", "Left side", "Middle only", "Zigzag line"],
        correct: "Left side"
      }
    ]
  }
];
