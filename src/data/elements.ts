import { PeriodicElement } from '../store/useElementStore';

export const ELEMENTS_DATA: PeriodicElement[] = [
  {
    atomicNumber: 1, symbol: 'H', name: 'Hydrogen', atomicMass: '1.008', category: 'nonmetal', state: 'gas', x: 1, y: 1,
    meltingPoint: 13.99, boilingPoint: 20.271, density: 0.00008988, electronConfig: '1s¹', valenceElectrons: 1,
    description: 'Hydrogen is the chemical element with the symbol H and atomic number 1. It is the lightest element and the most abundant chemical substance in the universe.',
    uses: [{ emoji: '🚀', label: 'Rocket Fuel' }, { emoji: '🔋', label: 'Fuel Cells' }, { emoji: '🧪', label: 'Chemical Synth' }],
    isotopes: [
      { massNumber: 1, neutrons: 0, abundance: 99.98, isStable: true },
      { massNumber: 2, neutrons: 1, abundance: 0.02, isStable: true },
      { massNumber: 3, neutrons: 2, abundance: 0, isStable: false, halfLife: '12.3 years' }
    ],
    reactions: [
      {
        reactant1: { symbol: 'H₂', color: '#b2f0e8', label: 'Hydrogen' },
        reactant2: { symbol: 'O₂', color: '#b2f0e8', label: 'Oxygen' },
        product: { name: 'Water', color: '#c0d8ff', label: 'H₂O' },
        equation: '2H₂ + O₂ → 2H₂O'
      }
    ]
  },
  {
    atomicNumber: 2, symbol: 'He', name: 'Helium', atomicMass: '4.0026', category: 'noble-gas', state: 'gas', x: 18, y: 1,
    meltingPoint: 0.95, boilingPoint: 4.222, density: 0.0001785, electronConfig: '1s²', valenceElectrons: 2,
    description: 'Helium is a colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas group in the periodic table.',
    uses: [{ emoji: '🎈', label: 'Balloons' }, { emoji: '🧊', label: 'Cryogenics' }],
    isotopes: [
      { massNumber: 3, neutrons: 1, abundance: 0.0001, isStable: true },
      { massNumber: 4, neutrons: 2, abundance: 99.9999, isStable: true }
    ],
    reactions: []
  },
  {
    atomicNumber: 3, symbol: 'Li', name: 'Lithium', atomicMass: '6.94', category: 'alkali-metal', state: 'solid', x: 1, y: 2,
    meltingPoint: 453.65, boilingPoint: 1603, density: 0.534, electronConfig: '[He] 2s¹', valenceElectrons: 1,
    description: 'Lithium is a chemical element with symbol Li and atomic number 3. It is a soft, silvery-white alkali metal.',
    uses: [{ emoji: '🔋', label: 'Batteries' }, { emoji: '💊', label: 'Medicine' }],
    isotopes: [
      { massNumber: 6, neutrons: 3, abundance: 7.59, isStable: true },
      { massNumber: 7, neutrons: 4, abundance: 92.41, isStable: true }
    ],
    reactions: []
  },
  {
    atomicNumber: 4, symbol: 'Be', name: 'Beryllium', atomicMass: '9.0122', category: 'alkaline-earth-metal', state: 'solid', x: 2, y: 2,
    meltingPoint: 1560, boilingPoint: 2742, density: 1.85, electronConfig: '[He] 2s²', valenceElectrons: 2,
    description: 'Beryllium is a steel-gray, strong, lightweight and brittle alkaline earth metal.',
    uses: [{ emoji: '🛰️', label: 'Aerospace' }, { emoji: '💎', label: 'Emeralds' }],
    isotopes: [
      { massNumber: 9, neutrons: 5, abundance: 100, isStable: true }
    ],
    reactions: []
  },
  {
    atomicNumber: 5, symbol: 'B', name: 'Boron', atomicMass: '10.81', category: 'metalloid', state: 'solid', x: 13, y: 2,
    meltingPoint: 2349, boilingPoint: 4273, density: 2.34, electronConfig: '[He] 2s² 2p¹', valenceElectrons: 3,
    description: 'Boron is a metalloid found in nature only in compounds such as borax.',
    uses: [{ emoji: '🥤', label: 'Borosilicate Glass' }, { emoji: '🧼', label: 'Detergents' }],
    isotopes: [
      { massNumber: 10, neutrons: 5, abundance: 19.9, isStable: true },
      { massNumber: 11, neutrons: 6, abundance: 80.1, isStable: true }
    ],
    reactions: []
  },
  {
    atomicNumber: 6, symbol: 'C', name: 'Carbon', atomicMass: '12.011', category: 'nonmetal', state: 'solid', x: 14, y: 2,
    meltingPoint: 3823, boilingPoint: 4098, density: 2.267, electronConfig: '[He] 2s² 2p²', valenceElectrons: 4,
    description: 'Carbon is the basis of all known life. It occurs in many forms including graphite and diamond.',
    uses: [{ emoji: '💎', label: 'Diamonds' }, { emoji: '✏️', label: 'Graphite' }, { emoji: '🥩', label: 'Life forms' }],
    isotopes: [
      { massNumber: 12, neutrons: 6, abundance: 98.9, isStable: true },
      { massNumber: 13, neutrons: 7, abundance: 1.1, isStable: true },
      { massNumber: 14, neutrons: 8, abundance: 0.0000000001, isStable: false, halfLife: '5,730 years' }
    ],
    reactions: []
  },
  {
    atomicNumber: 7, symbol: 'N', name: 'Nitrogen', atomicMass: '14.007', category: 'nonmetal', state: 'gas', x: 15, y: 2,
    meltingPoint: 63.15, boilingPoint: 77.36, density: 0.0012506, electronConfig: '[He] 2s² 2p³', valenceElectrons: 5,
    description: 'Nitrogen is the most abundant element in Earth\'s atmosphere (78%).',
    uses: [{ emoji: '❄️', label: 'Liquid Nitrogen' }, { emoji: '🌱', label: 'Fertilizer' }],
    isotopes: [
      { massNumber: 14, neutrons: 7, abundance: 99.63, isStable: true },
      { massNumber: 15, neutrons: 8, abundance: 0.37, isStable: true }
    ],
    reactions: []
  },
  {
    atomicNumber: 8, symbol: 'O', name: 'Oxygen', atomicMass: '15.999', category: 'nonmetal', state: 'gas', x: 16, y: 2,
    meltingPoint: 54.36, boilingPoint: 90.188, density: 0.001429, electronConfig: '[He] 2s² 2p⁴', valenceElectrons: 6,
    description: 'Oxygen is highly reactive and forms oxides with most elements. It is essential for most life on Earth.',
    uses: [{ emoji: '🤿', label: 'Respiration' }, { emoji: '🔥', label: 'Combustion' }, { emoji: '💧', label: 'Water' }, { emoji: '🧪', label: 'Chemistry' }],
    isotopes: [
      { massNumber: 16, neutrons: 8, abundance: 99.76, isStable: true },
      { massNumber: 17, neutrons: 9, abundance: 0.04, isStable: true },
      { massNumber: 18, neutrons: 10, abundance: 0.2, isStable: true }
    ],
    reactions: [
      {
        reactant1: { symbol: 'Fe', color: '#c0d8ff', label: 'Iron' },
        reactant2: { symbol: 'O₂', color: '#b2f0e8', label: 'Oxygen' },
        product: { name: 'Iron Oxide', color: '#ffd6c0', label: 'Fe₂O₃' },
        equation: '4Fe + 3O₂ → 2Fe₂O₃'
      }
    ]
  },
  {
    atomicNumber: 9, symbol: 'F', name: 'Fluorine', atomicMass: '18.998', category: 'halogen', state: 'gas', x: 17, y: 2,
    meltingPoint: 53.48, boilingPoint: 85.03, density: 0.001696, electronConfig: '[He] 2s² 2p⁵', valenceElectrons: 7,
    description: 'Fluorine is the most electronegative element and extremely reactive.',
    uses: [{ emoji: '🪥', label: 'Toothpaste' }, { emoji: '🍳', label: 'Teflon' }],
    reactions: []
  },
  {
    atomicNumber: 10, symbol: 'Ne', name: 'Neon', atomicMass: '20.180', category: 'noble-gas', state: 'gas', x: 18, y: 2,
    meltingPoint: 24.56, boilingPoint: 27.07, density: 0.0008999, electronConfig: '[He] 2s² 2p⁶', valenceElectrons: 8,
    description: 'Neon is a noble gas that gives a distinct reddish-orange glow when used in high-voltage discharge lamps.',
    uses: [{ emoji: '💡', label: 'Neon Signs' }, { emoji: '🚨', label: 'Fog Lights' }],
    isotopes: [
      { massNumber: 20, neutrons: 10, abundance: 90.48, isStable: true },
      { massNumber: 21, neutrons: 11, abundance: 0.27, isStable: true },
      { massNumber: 22, neutrons: 12, abundance: 9.25, isStable: true }
    ],
    reactions: []
  },
  {
    atomicNumber: 11, symbol: 'Na', name: 'Sodium', atomicMass: '22.990', category: 'alkali-metal', state: 'solid', x: 1, y: 3,
    meltingPoint: 370.87, boilingPoint: 1156, density: 0.971, electronConfig: '[Ne] 3s¹', valenceElectrons: 1,
    description: 'Sodium is a very reactive alkali metal that is stored in oil to prevent oxidation.',
    uses: [{ emoji: '🧂', label: 'Table Salt' }, { emoji: '🧼', label: 'Soap' }],
    reactions: []
  },
  {
    atomicNumber: 12, symbol: 'Mg', name: 'Magnesium', atomicMass: '24.305', category: 'alkaline-earth-metal', state: 'solid', x: 2, y: 3,
    meltingPoint: 923, boilingPoint: 1363, density: 1.738, electronConfig: '[Ne] 3s²', valenceElectrons: 2,
    description: 'Magnesium is essential to all cells and some 300 enzymes.',
    uses: [{ emoji: '🎆', label: 'Fireworks' }, { emoji: '🏎️', label: 'Alloys' }],
    reactions: []
  },
  {
    atomicNumber: 13, symbol: 'Al', name: 'Aluminum', atomicMass: '26.982', category: 'post-transition-metal', state: 'solid', x: 13, y: 3,
    meltingPoint: 933.47, boilingPoint: 2792, density: 2.70, electronConfig: '[Ne] 3s² 3p¹', valenceElectrons: 3,
    description: 'Aluminum is a lightweight, silvery-white metal that is non-corrosive.',
    uses: [{ emoji: '🥫', label: 'Cans' }, { emoji: '✈️', label: 'Aviation' }],
    reactions: []
  },
  {
    atomicNumber: 14, symbol: 'Si', name: 'Silicon', atomicMass: '28.085', category: 'metalloid', state: 'solid', x: 14, y: 3,
    meltingPoint: 1687, boilingPoint: 3538, density: 2.329, electronConfig: '[Ne] 3s² 3p²', valenceElectrons: 4,
    description: 'Silicon is a hard, brittle crystalline solid and a semiconductor.',
    uses: [{ emoji: '💻', label: 'Computers' }, { emoji: '🏢', label: 'Glass' }],
    reactions: []
  },
  {
    atomicNumber: 15, symbol: 'P', name: 'Phosphorus', atomicMass: '30.974', category: 'nonmetal', state: 'solid', x: 15, y: 3,
    meltingPoint: 317.3, boilingPoint: 553.7, density: 1.823, electronConfig: '[Ne] 3s² 3p³', valenceElectrons: 5,
    description: 'Phosphorus exists in several forms, most commonly white and red phosphorus. It is essential for life, being a component of DNA and ATP.',
    uses: [{ emoji: '🔥', label: 'Matches' }, { emoji: '🌱', label: 'Fertilizer' }, { emoji: '🥤', label: 'Soft Drinks' }],
    reactions: []
  },
  {
    atomicNumber: 16, symbol: 'S', name: 'Sulfur', atomicMass: '32.06', category: 'nonmetal', state: 'solid', x: 16, y: 3,
    meltingPoint: 388.36, boilingPoint: 717.8, density: 2.07, electronConfig: '[Ne] 3s² 3p⁴', valenceElectrons: 6,
    description: 'Sulfur is a bright yellow crystalline solid at room temperature. It is known for its distinct smell when in compounds like hydrogen sulfide.',
    uses: [{ emoji: '🔋', label: 'Battery Acid' }, { emoji: '🧨', label: 'Gunpowder' }, { emoji: '🩹', label: 'Medicine' }],
    reactions: []
  },
  {
    atomicNumber: 17, symbol: 'Cl', name: 'Chlorine', atomicMass: '35.45', category: 'halogen', state: 'gas', x: 17, y: 3,
    meltingPoint: 171.6, boilingPoint: 239.11, density: 0.0032, electronConfig: '[Ne] 3s² 3p⁵', valenceElectrons: 7,
    description: 'Chlorine is a yellow-green gas. It is a powerful disinfectant and a common component in table salt (NaCl).',
    uses: [{ emoji: '🏊', label: 'Pools' }, { emoji: '🧼', label: 'Bleach' }, { emoji: '🧂', label: 'Salt' }],
    reactions: []
  },
  {
    atomicNumber: 18, symbol: 'Ar', name: 'Argon', atomicMass: '39.948', category: 'noble-gas', state: 'gas', x: 18, y: 3,
    meltingPoint: 83.81, boilingPoint: 87.3, density: 0.001784, electronConfig: '[Ne] 3s² 3p⁶', valenceElectrons: 8,
    description: 'Argon is the third most abundant gas in Earth\'s atmosphere. It is chemically inert and used to provide an unreactive atmosphere.',
    uses: [{ emoji: '💡', label: 'Light Bulbs' }, { emoji: '🔦', label: 'Lasers' }, { emoji: '🧊', label: 'Windows (Insulation)' }],
    reactions: []
  },
  {
    atomicNumber: 19, symbol: 'K', name: 'Potassium', atomicMass: '39.098', category: 'alkali-metal', state: 'solid', x: 1, y: 4,
    meltingPoint: 336.7, boilingPoint: 1032, density: 0.89, electronConfig: '[Ar] 4s¹', valenceElectrons: 1,
    description: 'Potassium is a soft silvery metal that reacts violently with water. It is essential for nerve function and fluid balance in the body.',
    uses: [{ emoji: '🍌', label: 'Bananas' }, { emoji: '🌱', label: 'Fertilizer' }, { emoji: '🧼', label: 'Soap' }],
    reactions: []
  },
  {
    atomicNumber: 20, symbol: 'Ca', name: 'Calcium', atomicMass: '40.078', category: 'alkaline-earth-metal', state: 'solid', x: 2, y: 4,
    meltingPoint: 1115, boilingPoint: 1757, density: 1.54, electronConfig: '[Ar] 4s²', valenceElectrons: 2,
    description: 'Calcium is a dull gray metal. It is the most abundant mineral in the human body, key for bones and teeth.',
    uses: [{ emoji: '🥛', label: 'Milk (Bones)' }, { emoji: '🧱', label: 'Cement' }, { emoji: '🦷', label: 'Teeth' }],
    reactions: []
  },
  {
    atomicNumber: 26, symbol: 'Fe', name: 'Iron', atomicMass: '55.845', category: 'transition-metal', state: 'solid', x: 8, y: 4,
    meltingPoint: 1811, boilingPoint: 3134, density: 7.874, electronConfig: '[Ar] 3d⁶ 4s²', valenceElectrons: 8,
    description: 'Iron is by mass the most common element on Earth, forming much of Earth\'s outer and inner core.',
    uses: [{ emoji: '🏗️', label: 'Steel' }, { emoji: '🩸', label: 'Hemoglobin' }],
    isotopes: [
      { massNumber: 54, neutrons: 28, abundance: 5.85, isStable: true },
      { massNumber: 56, neutrons: 30, abundance: 91.75, isStable: true },
      { massNumber: 57, neutrons: 31, abundance: 2.12, isStable: true },
      { massNumber: 58, neutrons: 32, abundance: 0.28, isStable: true }
    ],
    reactions: []
  },
  {
    atomicNumber: 29, symbol: 'Cu', name: 'Copper', atomicMass: '63.546', category: 'transition-metal', state: 'solid', x: 11, y: 4,
    meltingPoint: 1357.77, boilingPoint: 2835, density: 8.96, electronConfig: '[Ar] 3d¹⁰ 4s¹', valenceElectrons: 1,
    description: 'Copper is used as a conductor of heat and electricity, as a building material, and as a constituent of various metal alloys.',
    uses: [{ emoji: '🔌', label: 'Wiring' }, { emoji: '🎺', label: 'Brass' }, { emoji: '💰', label: 'Coins' }],
    reactions: []
  },
  {
    atomicNumber: 47, symbol: 'Ag', name: 'Silver', atomicMass: '107.87', category: 'transition-metal', state: 'solid', x: 11, y: 5,
    meltingPoint: 1234.93, boilingPoint: 2435, density: 10.49, electronConfig: '[Kr] 4d¹⁰ 5s¹', valenceElectrons: 1,
    description: 'Silver is a soft, white, lustrous transition metal, it exhibits the highest electrical conductivity, thermal conductivity, and reflectivity of any metal.',
    uses: [{ emoji: '💍', label: 'Jewelry' }, { emoji: '📷', label: 'Photography' }, { emoji: '🔋', label: 'Batteries' }],
    reactions: []
  },
  {
    atomicNumber: 78, symbol: 'Pt', name: 'Platinum', atomicMass: '195.08', category: 'transition-metal', state: 'solid', x: 10, y: 6,
    meltingPoint: 2041.4, boilingPoint: 4098, density: 21.45, electronConfig: '[Xe] 4f¹⁴ 5d⁹ 6s¹', valenceElectrons: 1,
    description: 'Platinum is a dense, malleable, ductile, highly unreactive, precious, silver-white transition metal.',
    uses: [{ emoji: '💍', label: 'Jewelry' }, { emoji: '🚗', label: 'Catalytic Converters' }, { emoji: '🩺', label: 'Pacemakers' }],
    reactions: []
  },
  {
    atomicNumber: 79, symbol: 'Au', name: 'Gold', atomicMass: '196.97', category: 'transition-metal', state: 'solid', x: 11, y: 6,
    meltingPoint: 1337.33, boilingPoint: 3129, density: 19.3, electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', valenceElectrons: 1,
    description: 'Gold is a soft, malleable, and ductile metal with a bright yellow color. It is highly unreactive and found in nature in its native form.',
    uses: [{ emoji: '💰', label: 'Currency' }, { emoji: '💍', label: 'Jewelry' }, { emoji: '💻', label: 'Electronics' }],
    isotopes: [
      { massNumber: 197, neutrons: 118, abundance: 100, isStable: true }
    ],
    reactions: []
  },
  {
    atomicNumber: 92, symbol: 'U', name: 'Uranium', atomicMass: '238.03', category: 'actinide', state: 'solid', x: 7, y: 10,
    meltingPoint: 1405.3, boilingPoint: 4404, density: 19.1, electronConfig: '[Rn] 5f³ 6d¹ 7s²', valenceElectrons: 6,
    description: 'Uranium is a silvery-grey metal. It is weakly radioactive because all its isotopes are unstable.',
    uses: [{ emoji: '☢️', label: 'Nuclear Power' }, { emoji: '🚢', label: 'Naval Propulsion' }],
    isotopes: [
      { massNumber: 234, neutrons: 142, abundance: 0.005, isStable: false, halfLife: '245,500 years' },
      { massNumber: 235, neutrons: 143, abundance: 0.72, isStable: false, halfLife: '704 million years' },
      { massNumber: 238, neutrons: 146, abundance: 99.27, isStable: false, halfLife: '4.46 billion years' }
    ],
    reactions: []
  }
];

// Helper to fill in the rest of the 118 elements with basic data
const basicElements: Partial<PeriodicElement>[] = [
  { atomicNumber: 21, symbol: 'Sc', name: 'Scandium', x: 3, y: 4, category: 'transition-metal' },
  { atomicNumber: 22, symbol: 'Ti', name: 'Titanium', x: 4, y: 4, category: 'transition-metal' },
  { atomicNumber: 23, symbol: 'V', name: 'Vanadium', x: 5, y: 4, category: 'transition-metal' },
  { atomicNumber: 24, symbol: 'Cr', name: 'Chromium', x: 6, y: 4, category: 'transition-metal' },
  { atomicNumber: 25, symbol: 'Mn', name: 'Manganese', x: 7, y: 4, category: 'transition-metal' },
  { atomicNumber: 27, symbol: 'Co', name: 'Cobalt', x: 9, y: 4, category: 'transition-metal' },
  { atomicNumber: 28, symbol: 'Ni', name: 'Nickel', x: 10, y: 4, category: 'transition-metal' },
  { atomicNumber: 30, symbol: 'Zn', name: 'Zinc', x: 12, y: 4, category: 'transition-metal' },
  { atomicNumber: 31, symbol: 'Ga', name: 'Gallium', x: 13, y: 4, category: 'post-transition-metal' },
  { atomicNumber: 32, symbol: 'Ge', name: 'Germanium', x: 14, y: 4, category: 'metalloid' },
  { atomicNumber: 33, symbol: 'As', name: 'Arsenic', x: 15, y: 4, category: 'metalloid' },
  { atomicNumber: 34, symbol: 'Se', name: 'Selenium', x: 16, y: 4, category: 'nonmetal' },
  { atomicNumber: 35, symbol: 'Br', name: 'Bromine', x: 17, y: 4, category: 'halogen' },
  { atomicNumber: 36, symbol: 'Kr', name: 'Krypton', x: 18, y: 4, category: 'noble-gas' },
  { atomicNumber: 37, symbol: 'Rb', name: 'Rubidium', x: 1, y: 5, category: 'alkali-metal' },
  { atomicNumber: 38, symbol: 'Sr', name: 'Strontium', x: 2, y: 5, category: 'alkaline-earth-metal' },
  { atomicNumber: 39, symbol: 'Y', name: 'Yttrium', x: 3, y: 5, category: 'transition-metal' },
  { atomicNumber: 40, symbol: 'Zr', name: 'Zirconium', x: 4, y: 5, category: 'transition-metal' },
  { atomicNumber: 41, symbol: 'Nb', name: 'Niobium', x: 5, y: 5, category: 'transition-metal' },
  { atomicNumber: 42, symbol: 'Mo', name: 'Molybdenum', x: 6, y: 5, category: 'transition-metal' },
  { atomicNumber: 43, symbol: 'Tc', name: 'Technetium', x: 7, y: 5, category: 'transition-metal' },
  { atomicNumber: 44, symbol: 'Ru', name: 'Ruthenium', x: 8, y: 5, category: 'transition-metal' },
  { atomicNumber: 45, symbol: 'Rh', name: 'Rhodium', x: 9, y: 5, category: 'transition-metal' },
  { atomicNumber: 46, symbol: 'Pd', name: 'Palladium', x: 10, y: 5, category: 'transition-metal' },
  { atomicNumber: 48, symbol: 'Cd', name: 'Cadmium', x: 12, y: 5, category: 'transition-metal' },
  { atomicNumber: 49, symbol: 'In', name: 'Indium', x: 13, y: 5, category: 'post-transition-metal' },
  { atomicNumber: 50, symbol: 'Sn', name: 'Tin', x: 14, y: 5, category: 'post-transition-metal' },
  { atomicNumber: 51, symbol: 'Sb', name: 'Antimony', x: 15, y: 5, category: 'metalloid' },
  { atomicNumber: 52, symbol: 'Te', name: 'Tellurium', x: 16, y: 5, category: 'metalloid' },
  { atomicNumber: 53, symbol: 'I', name: 'Iodine', x: 17, y: 5, category: 'halogen' },
  { atomicNumber: 54, symbol: 'Xe', name: 'Xenon', x: 18, y: 5, category: 'noble-gas' },
  { atomicNumber: 55, symbol: 'Cs', name: 'Cesium', x: 1, y: 6, category: 'alkali-metal' },
  { atomicNumber: 56, symbol: 'Ba', name: 'Barium', x: 2, y: 6, category: 'alkaline-earth-metal' },

  // Lanthanides
  { atomicNumber: 57, symbol: 'La', name: 'Lanthanum', x: 4, y: 9, category: 'lanthanide' },
  { atomicNumber: 58, symbol: 'Ce', name: 'Cerium', x: 5, y: 9, category: 'lanthanide' },
  { atomicNumber: 59, symbol: 'Pr', name: 'Praseodymium', x: 6, y: 9, category: 'lanthanide' },
  { atomicNumber: 60, symbol: 'Nd', name: 'Neodymium', x: 7, y: 9, category: 'lanthanide' },
  { atomicNumber: 61, symbol: 'Pm', name: 'Promethium', x: 8, y: 9, category: 'lanthanide' },
  { atomicNumber: 62, symbol: 'Sm', name: 'Samarium', x: 9, y: 9, category: 'lanthanide' },
  { atomicNumber: 63, symbol: 'Eu', name: 'Europium', x: 10, y: 9, category: 'lanthanide' },
  { atomicNumber: 64, symbol: 'Gd', name: 'Gadolinium', x: 11, y: 9, category: 'lanthanide' },
  { atomicNumber: 65, symbol: 'Tb', name: 'Terbium', x: 12, y: 9, category: 'lanthanide' },
  { atomicNumber: 66, symbol: 'Dy', name: 'Dysprosium', x: 13, y: 9, category: 'lanthanide' },
  { atomicNumber: 67, symbol: 'Ho', name: 'Holmium', x: 14, y: 9, category: 'lanthanide' },
  { atomicNumber: 68, symbol: 'Er', name: 'Erbium', x: 15, y: 9, category: 'lanthanide' },
  { atomicNumber: 69, symbol: 'Tm', name: 'Thulium', x: 16, y: 9, category: 'lanthanide' },
  { atomicNumber: 70, symbol: 'Yb', name: 'Ytterbium', x: 17, y: 9, category: 'lanthanide' },
  { atomicNumber: 71, symbol: 'Lu', name: 'Lutetium', x: 18, y: 9, category: 'lanthanide' },

  { atomicNumber: 72, symbol: 'Hf', name: 'Hafnium', x: 4, y: 6, category: 'transition-metal' },
  { atomicNumber: 73, symbol: 'Ta', name: 'Tantalum', x: 5, y: 6, category: 'transition-metal' },
  { atomicNumber: 74, symbol: 'W', name: 'Tungsten', x: 6, y: 6, category: 'transition-metal' },
  { atomicNumber: 75, symbol: 'Re', name: 'Rhenium', x: 7, y: 6, category: 'transition-metal' },
  { atomicNumber: 76, symbol: 'Os', name: 'Osmium', x: 8, y: 6, category: 'transition-metal' },
  { atomicNumber: 77, symbol: 'Ir', name: 'Iridium', x: 9, y: 6, category: 'transition-metal' },
  { atomicNumber: 80, symbol: 'Hg', name: 'Mercury', x: 12, y: 6, category: 'transition-metal' },
  { atomicNumber: 81, symbol: 'Tl', name: 'Thallium', x: 13, y: 6, category: 'post-transition-metal' },
  { atomicNumber: 82, symbol: 'Pb', name: 'Lead', x: 14, y: 6, category: 'post-transition-metal' },
  { atomicNumber: 83, symbol: 'Bi', name: 'Bismuth', x: 15, y: 6, category: 'post-transition-metal' },
  { atomicNumber: 84, symbol: 'Po', name: 'Polonium', x: 16, y: 6, category: 'post-transition-metal' },
  { atomicNumber: 85, symbol: 'At', name: 'Astatine', x: 17, y: 6, category: 'halogen' },
  { atomicNumber: 86, symbol: 'Rn', name: 'Radon', x: 18, y: 6, category: 'noble-gas' },
  { atomicNumber: 87, symbol: 'Fr', name: 'Francium', x: 1, y: 7, category: 'alkali-metal' },
  { atomicNumber: 88, symbol: 'Ra', name: 'Radium', x: 2, y: 7, category: 'alkaline-earth-metal' },

  // Actinides
  { atomicNumber: 89, symbol: 'Ac', name: 'Actinium', x: 4, y: 10, category: 'actinide' },
  { atomicNumber: 90, symbol: 'Th', name: 'Thorium', x: 5, y: 10, category: 'actinide' },
  { atomicNumber: 91, symbol: 'Pa', name: 'Protactinium', x: 6, y: 10, category: 'actinide' },
  { atomicNumber: 92, symbol: 'U', name: 'Uranium', x: 7, y: 10, category: 'actinide' },
  { atomicNumber: 93, symbol: 'Np', name: 'Neptunium', x: 8, y: 10, category: 'actinide' },
  { atomicNumber: 94, symbol: 'Pu', name: 'Plutonium', x: 9, y: 10, category: 'actinide' },
  { atomicNumber: 95, symbol: 'Am', name: 'Americium', x: 10, y: 10, category: 'actinide' },
  { atomicNumber: 96, symbol: 'Cm', name: 'Curium', x: 11, y: 10, category: 'actinide' },
  { atomicNumber: 97, symbol: 'Bk', name: 'Berkelium', x: 12, y: 10, category: 'actinide' },
  { atomicNumber: 98, symbol: 'Cf', name: 'Californium', x: 13, y: 10, category: 'actinide' },
  { atomicNumber: 99, symbol: 'Es', name: 'Einsteinium', x: 14, y: 10, category: 'actinide' },
  { atomicNumber: 100, symbol: 'Fm', name: 'Fermium', x: 15, y: 10, category: 'actinide' },
  { atomicNumber: 101, symbol: 'Md', name: 'Mendelevium', x: 16, y: 10, category: 'actinide' },
  { atomicNumber: 102, symbol: 'No', name: 'Nobelium', x: 17, y: 10, category: 'actinide' },
  { atomicNumber: 103, symbol: 'Lr', name: 'Lawrencium', x: 18, y: 10, category: 'actinide' },

  { atomicNumber: 104, symbol: 'Rf', name: 'Rutherfordium', x: 4, y: 7, category: 'transition-metal' },
  { atomicNumber: 105, symbol: 'Db', name: 'Dubnium', x: 5, y: 7, category: 'transition-metal' },
  { atomicNumber: 106, symbol: 'Sg', name: 'Seaborgium', x: 6, y: 7, category: 'transition-metal' },
  { atomicNumber: 107, symbol: 'Bh', name: 'Bohrium', x: 7, y: 7, category: 'transition-metal' },
  { atomicNumber: 108, symbol: 'Hs', name: 'Hassium', x: 8, y: 7, category: 'transition-metal' },
  { atomicNumber: 109, symbol: 'Mt', name: 'Meitnerium', x: 9, y: 7, category: 'transition-metal' },
  { atomicNumber: 110, symbol: 'Ds', name: 'Darmstadtium', x: 10, y: 7, category: 'transition-metal' },
  { atomicNumber: 111, symbol: 'Rg', name: 'Roentgenium', x: 11, y: 7, category: 'transition-metal' },
  { atomicNumber: 112, symbol: 'Cn', name: 'Copernicium', x: 12, y: 7, category: 'transition-metal' },
  { atomicNumber: 113, symbol: 'Nh', name: 'Nihonium', x: 13, y: 7, category: 'post-transition-metal' },
  { atomicNumber: 114, symbol: 'Fl', name: 'Flerovium', x: 14, y: 7, category: 'post-transition-metal' },
  { atomicNumber: 115, symbol: 'Mc', name: 'Moscovium', x: 15, y: 7, category: 'post-transition-metal' },
  { atomicNumber: 116, symbol: 'Lv', name: 'Livermorium', x: 16, y: 7, category: 'post-transition-metal' },
  { atomicNumber: 117, symbol: 'Ts', name: 'Tennessine', x: 17, y: 7, category: 'halogen' },
  { atomicNumber: 118, symbol: 'Og', name: 'Oganesson', x: 18, y: 7, category: 'noble-gas' },
];

export const ALL_ELEMENTS: PeriodicElement[] = [
  ...ELEMENTS_DATA.map(el => ({
    ...el,
    electronegativity: el.electronegativity ?? (el.atomicNumber === 1 ? 2.20 : el.atomicNumber === 8 ? 3.44 : 2.1),
    atomicRadius: el.atomicRadius ?? (el.atomicNumber === 1 ? 31 : el.atomicNumber === 8 ? 66 : 100),
    ionizationEnergy: el.ionizationEnergy ?? (el.atomicNumber === 1 ? 1312 : el.atomicNumber === 8 ? 1314 : 1000),
    electronAffinity: el.electronAffinity ?? 72,
    discoveredYear: el.discoveredYear ?? 'Ancient',
    discoverer: el.discoverer ?? 'Various',
    production: el.production ?? [
      { country: 'China', flag: '🇨🇳', percentage: 54 },
      { country: 'Australia', flag: '🇦🇺', percentage: 19 },
      { country: 'Brazil', flag: '🇧🇷', percentage: 13 }
    ],
    hazards: el.hazards ?? (el.atomicNumber === 8 ? ['oxidizer'] : []),
    biologicalRole: el.biologicalRole ?? 'Essential for most life.',
    isotopes: el.isotopes ?? [
      { massNumber: 16, neutrons: 8, abundance: 99.76, isStable: true },
      { massNumber: 18, neutrons: 10, abundance: 0.20, isStable: true }
    ]
  })),
  ...basicElements.map(el => {
    if (ELEMENTS_DATA.find(d => d.atomicNumber === el.atomicNumber)) return null;
    return {
      ...el,
      atomicMass: (el.atomicNumber! * 2 + Math.floor(el.atomicNumber! / 10)).toString(),
      state: 'solid',
      meltingPoint: 0,
      boilingPoint: 0,
      density: 0,
      electronConfig: '',
      valenceElectrons: 0,
      description: `${el.name} is the element with atomic number ${el.atomicNumber}.`,
      uses: [],
      reactions: [],
      electronegativity: 2.0,
      atomicRadius: 100,
      ionizationEnergy: 1000,
      electronAffinity: 50,
      discoveredYear: 'Unknown',
      discoverer: 'Anonymous',
      production: [],
      hazards: [],
      biologicalRole: 'Unknown',
      isotopes: []
    } as PeriodicElement;
  }).filter((el): el is PeriodicElement => el !== null)
].sort((a, b) => a.atomicNumber - b.atomicNumber);

