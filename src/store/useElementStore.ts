import { create } from 'zustand';

export type ElementCategory = 
  | 'alkali-metal' 
  | 'alkaline-earth-metal' 
  | 'transition-metal' 
  | 'post-transition-metal' 
  | 'metalloid' 
  | 'nonmetal' 
  | 'noble-gas' 
  | 'lanthanide' 
  | 'actinide' 
  | 'halogen';

export interface Reaction {
  reactant1: { symbol: string; color: string; label: string };
  reactant2: { symbol: string; color: string; label: string };
  product: { name: string; color: string; label: string };
  equation: string;
}

export interface Isotope {
  massNumber: number;
  neutrons: number;
  abundance: number; // percentage
  halfLife?: string;
  isStable: boolean;
}

export interface ProductionData {
  country: string;
  flag: string;
  percentage: number;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  condition: string;
  unlocked: boolean;
}

export interface PeriodicElement {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: string;
  category: ElementCategory;
  state: 'gas' | 'liquid' | 'solid' | 'synthetic';
  meltingPoint: number | null;
  boilingPoint: number | null;
  density: number;
  electronConfig: string;
  valenceElectrons: number;
  description: string;
  uses: { emoji: string; label: string }[];
  reactions: Reaction[];
  x: number;
  y: number;
  // New properties for visualization and comparison
  electronegativity?: number | null;
  atomicRadius?: number | null;
  ionizationEnergy?: number | null;
  electronAffinity?: number | null;
  discoveredYear?: string;
  discoverer?: string;
  production?: ProductionData[];
  hazards?: string[];
  biologicalRole?: string;
  isotopes?: Isotope[];
}

interface ElementState {
  selectedElement: PeriodicElement | null;
  searchQuery: string;
  activeTab: 'table' | 'search' | 'reactions' | 'trends' | 'quiz' | 'settings' | 'learn' | 'game' | 'calculator' | 'profile';
  heatmapProperty: 'electronegativity' | 'atomicRadius' | 'ionizationEnergy' | 'meltingPoint' | 'density' | null;
  compareList: number[]; // atomic numbers
  favorites: number[];
  achievements: Achievement[];
  quizScore: number;
  quizStreak: number;
  
  // Student Progress
  xp: number;
  level: number;
  streak: number;
  lastVisit: string;
  lessonsProgress: Record<number, number>; // lessonId: percentage
  elementsViewed: number[];
  userName: string;
  userAvatar: string;

  setSelectedElement: (element: PeriodicElement | null) => void;
  setSearchQuery: (query: string) => void;
  setActiveTab: (tab: ElementState['activeTab']) => void;
  setHeatmapProperty: (prop: ElementState['heatmapProperty']) => void;
  toggleFavorite: (atomicNumber: number) => void;
  toggleCompare: (atomicNumber: number) => void;
  clearComparison: () => void;
  unlockAchievement: (id: string) => void;
  updateQuizProgress: (correct: boolean) => void;
  
  // Student Actions
  addXP: (amount: number) => void;
  completeLesson: (lessonId: number, percentage: number) => void;
  viewElement: (atomicNumber: number) => void;
  updateProfile: (name: string, avatar: string) => void;
}

export const useElementStore = create<ElementState>((set) => ({
  selectedElement: null,
  searchQuery: '',
  activeTab: 'table',
  heatmapProperty: null,
  compareList: [],
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  achievements: JSON.parse(localStorage.getItem('achievements') || '[]'),
  quizScore: 0,
  quizStreak: 0,

  xp: Number(localStorage.getItem('xp') || '0'),
  level: Number(localStorage.getItem('level') || '1'),
  streak: Number(localStorage.getItem('streak') || '0'),
  lastVisit: localStorage.getItem('lastVisit') || new Date().toDateString(),
  lessonsProgress: JSON.parse(localStorage.getItem('lessonsProgress') || '{}'),
  elementsViewed: JSON.parse(localStorage.getItem('elementsViewed') || '[]'),
  userName: localStorage.getItem('userName') || 'Young Chemist',
  userAvatar: localStorage.getItem('userAvatar') || '🧪',

  setSelectedElement: (element) => set((state) => {
    if (element && !state.elementsViewed.includes(element.atomicNumber)) {
      state.viewElement(element.atomicNumber);
    }
    return { selectedElement: element };
  }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveTab: (tab) => set({ activeTab: tab, heatmapProperty: null }),
  setHeatmapProperty: (prop) => set({ heatmapProperty: prop }),
  
  toggleFavorite: (atomicNumber) => set((state) => {
    const next = state.favorites.includes(atomicNumber)
      ? state.favorites.filter((id) => id !== atomicNumber)
      : [...state.favorites, atomicNumber];
    localStorage.setItem('favorites', JSON.stringify(next));
    return { favorites: next };
  }),

  toggleCompare: (atomicNumber) => set((state) => ({
    compareList: state.compareList.includes(atomicNumber)
      ? state.compareList.filter(id => id !== atomicNumber)
      : state.compareList.length < 3 ? [...state.compareList, atomicNumber] : state.compareList
  })),

  clearComparison: () => set({ compareList: [] }),
  
  unlockAchievement: (id) => set((state) => {
    const next = state.achievements.map(a => a.id === id ? { ...a, unlocked: true } : a);
    localStorage.setItem('achievements', JSON.stringify(next));
    return { achievements: next };
  }),

  updateQuizProgress: (correct) => set((state) => {
    if (correct) state.addXP(20);
    return {
      quizScore: correct ? state.quizScore + 100 : state.quizScore,
      quizStreak: correct ? state.quizStreak + 1 : 0
    };
  }),

  addXP: (amount) => set((state) => {
    const newXP = state.xp + amount;
    const newLevel = Math.floor(newXP / 500) + 1;
    localStorage.setItem('xp', newXP.toString());
    localStorage.setItem('level', newLevel.toString());
    return { xp: newXP, level: newLevel };
  }),

  completeLesson: (lessonId, percentage) => set((state) => {
    const nextProgress = { ...state.lessonsProgress, [lessonId]: Math.max(state.lessonsProgress[lessonId] || 0, percentage) };
    localStorage.setItem('lessonsProgress', JSON.stringify(nextProgress));
    if (percentage === 100 && (state.lessonsProgress[lessonId] || 0) < 100) {
      state.addXP(50);
    }
    return { lessonsProgress: nextProgress };
  }),

  viewElement: (atomicNumber) => set((state) => {
    if (state.elementsViewed.includes(atomicNumber)) return state;
    const next = [...state.elementsViewed, atomicNumber];
    localStorage.setItem('elementsViewed', JSON.stringify(next));
    state.addXP(5);
    return { elementsViewed: next };
  }),

  updateProfile: (name, avatar) => {
    localStorage.setItem('userName', name);
    localStorage.setItem('userAvatar', avatar);
    set({ userName: name, userAvatar: avatar });
  }
}));
