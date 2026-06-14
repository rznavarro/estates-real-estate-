import { FloorPlan, Amenity } from './types';

export const FLOOR_PLANS: FloorPlan[] = [
  {
    id: 'cypress',
    name: 'The Cypress',
    stories: 1,
    bedrooms: 4,
    bathrooms: 4.5,
    garage: 3,
    sqftActual: 5120,
    sqftAcore: 4050,
    price: '$1,750,000',
    description: 'An exquisite one-story estate featuring a grand great room with high-volume coffered ceilings. Styled with a massive open-plan island kitchen, integrated bar area, and seamless sliding glass transitions out to an expansive wrap-around pool deck and dining lanai.',
    features: [
      'Deluxe Sub-Zero & Wolf appliance package',
      'Double entry foyer with Italian porcelain tiles',
      'Oversized master bathroom with freestanding soaking tub',
      'Dual walk-in wardobes in principal suite',
      'Private study/home office room adjacent to principal suite'
    ],
    exteriorImageUrl: 'https://www.cchomes.com/wp-content/uploads/2025/10/Gatehouse-Entrance-Road-768x431.jpg',
    floorPlanImageUrl: 'https://www.cchomes.com/wp-content/uploads/2025/10/Kinship-Kitchen-Preliminary-1-768x512.jpg'
  },
  {
    id: 'magnolia',
    name: 'The Magnolia',
    stories: 1,
    bedrooms: 4,
    bathrooms: 4.5,
    garage: 3,
    sqftActual: 5600,
    sqftAcore: 4450,
    price: '$1,890,000',
    description: 'Designed around a gorgeous central courtyard layout, The Magnolia maximizes natural Florida sunlight throughout every living space. The sprawling footprint gives a dramatic separation between formal gathering wings and private bedroom suites.',
    features: [
      'Wrap-around outdoor dining lanai with custom summer kitchen hookup',
      'In-law walk-in suite with private exterior entrance',
      'Chef butler-style walkthrough pantry',
      'Oversized 12-foot hurricane-impact floor-to-ceiling windows',
      'Premium smart home automation and lighting control pre-installed'
    ],
    exteriorImageUrl: 'https://www.cchomes.com/wp-content/uploads/2025/10/04-Turnberry-Clubhouse-Pool-View-R01-Beige-1-1600x900.jpg',
    floorPlanImageUrl: 'https://www.cchomes.com/wp-content/uploads/2025/10/6-1-768x511.jpg'
  },
  {
    id: 'sequoia',
    name: 'The Sequoia',
    stories: 2,
    bedrooms: 5,
    bathrooms: 5.5,
    garage: 3,
    sqftActual: 6450,
    sqftAcore: 5280,
    price: '$1,980,000',
    description: 'A striking two-story architectural masterpiece. Featuring a double-height 22-foot lobby that flow past floating glass stairwells, multiple flexible clubrooms, upstairs loft retreats, and scenic balcony lookouts reaching over Broward’s tranquil pastures.',
    features: [
      'Two-story dramatic grand foyer and open-concept layout',
      'Upstairs family retreat loft with private balcony access',
      'Bespoke modern floating hardwood stairs',
      'Secondary guest suite situated on the lower level',
      'Fully pre-piped media screening theater room'
    ],
    exteriorImageUrl: 'https://www.cchomes.com/wp-content/uploads/2024/07/Estates-by-Turnberry-300x200.jpg',
    floorPlanImageUrl: 'https://www.cchomes.com/wp-content/uploads/2025/10/Grand-entrance-768x431.jpg'
  },
  {
    id: 'banyan',
    name: 'The Banyan',
    stories: 2,
    bedrooms: 6,
    bathrooms: 6.5,
    garage: 4,
    sqftActual: 7550,
    sqftAcore: 6100,
    price: '$2,450,000',
    description: 'The absolute pinnacle of Davie residential luxury, The Banyan offers unmatched space and customization. Accommodates up to 6 custom bedroom suites, multi-generational master quarters, dual garages, an upstairs private wellness deck, and premium designer accents.',
    features: [
      'Quad-garage bays for active collectors',
      'Dual master principal quarters on both levels',
      'Dedicated state-of-the-art wellness/gym room',
      'Professional auxiliary catering preparation kitchen',
      'Ultra panoramic wrap-around upper balcony and outdoor space'
    ],
    exteriorImageUrl: 'https://www.cchomes.com/wp-content/uploads/2023/02/DJI_0249-300x225.jpg',
    floorPlanImageUrl: 'https://www.cchomes.com/wp-content/uploads/2025/10/Kinship-Kitchen-Preliminary-1-768x512.jpg'
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'clubhouse',
    title: 'The Turnberry Clubhouse',
    subtitle: 'MODERN RESORT MEETINGS',
    description: 'A magnificent bespoke design offering an elegant pool side club lounge, cutting-edge fitness center, custom wellness spa treatment room, and a grand fireside conversation salon for social gatherings.',
    imageUrl: 'https://www.cchomes.com/wp-content/uploads/2025/10/6-1-768x511.jpg',
    iconName: 'Sparkles'
  },
  {
    id: 'pool',
    title: 'Resort-Style Oasis Pool',
    subtitle: 'UNWIND UNDER THE SUN',
    description: 'Surrounded by custom-built pergolas, beach club cabanas, deep-tier tanning ledges, and meticulously designed landscape accents creating a year-round tropical resort experience right outside your door.',
    imageUrl: 'https://www.cchomes.com/wp-content/uploads/2025/10/04-Turnberry-Clubhouse-Pool-View-R01-Beige-1-1600x900.jpg',
    iconName: 'Waves'
  },
  {
    id: 'trails',
    title: 'Equestrian & Foot Trails',
    subtitle: 'GROUNDED IN NATURE',
    description: 'Honoring Davie’s deep-heritage horse culture with lushly buffered perimeter horse riding sand trails and wide pedestrian nature pathways framed by ancient grand oaks.',
    imageUrl: 'https://www.cchomes.com/wp-content/uploads/2025/10/Gatehouse-Entrance-Road-768x431.jpg',
    iconName: 'Compass'
  },
  {
    id: 'gatehouse',
    title: 'Elite 24/7 Guarded Gatehouse',
    subtitle: 'YOUR SECURE RETREAT',
    description: 'An elegantly sculpted brick gatehouse entry staffed day and night by security personnel, utilizing sophisticated license plate optical readers and robust perimeter fencing.',
    imageUrl: 'https://www.cchomes.com/wp-content/uploads/2025/10/Grand-entrance-768x431.jpg',
    iconName: 'ShieldCheck'
  }
];


export const GENERAL_FAQ = [
  {
    q: "Where is the community located exactly?",
    a: "Estates by Turnberry is positioned along Shotgun Road in western Davie, Florida—famed for its premier residential ranches, tranquil equestrian trails, and high-quality zoning, with immediate access to expressways, excellent private and public schools, and premier shopping."
  },
  {
    q: "Who are the developers behind the model?",
    a: "This exclusive neighborhood is co-developed by CC Homes (led by legendary developer Armando Codina and former Lennar President Jim Carr) and Turnberry. Together they bring decades of world-class placemaking expertise to build Broward's most desired single-family enclave."
  },
  {
    q: "How large are the private homesites?",
    a: "Every single lot in Estates by Turnberry is exceptionally sized, beginning at a half-acre standard (over 21,000 sq ft) and scaling up to expansive equestrian-bordered lots exceeding one full acre. Plenty of space remains for custom resort pools, private guest casitas, and vast lush landscapes."
  },
  {
    q: "Can I customize the floor plan designs?",
    a: "Yes. Home buyers will visit the state-of-the-art CC Homes Interior Design Studio to customize their finishes, upgrade layouts, select premium appliances, expand pool lanais, add summer kitchen features, configure home smart options, and customize private suites."
  }
];
