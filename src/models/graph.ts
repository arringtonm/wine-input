export interface Node {
  id: string;
  name: string;
  type: 'Person' | 'Winery';
  bio?: string;
  location?: string;
  established?: string;
}

export interface Link {
  id: string;
  source: string; // Node ID
  target: string; // Node ID
  relationship: string;
}

// Utility functions for creating unique IDs
export const generateUniqueId = (): string => '_' + Math.random().toString(36).substr(2, 9);

// Sample data for initial development or testing
export const initialNodes: Node[] = [
  {
    id: generateUniqueId(),
    name: 'David Lett',
    type: 'Person',
    bio: 'Pioneered Oregon\'s modern wine industry.',
  },
  {
    id: generateUniqueId(),
    name: 'The Eyrie Vineyards',
    type: 'Winery',
    location: 'Willamette Valley',
    established: '1965',
  },
];

export const initialLinks: Link[] = [
  {
    id: generateUniqueId(),
    source: initialNodes[0].id,
    target: initialNodes[1].id,
    relationship: 'Founder',
  },
];