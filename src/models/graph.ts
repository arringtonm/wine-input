import { NodeType, RelationshipType, WinemakingRole } from "./enums.ts";

export interface PersonNode {
  type: NodeType.Person;
  name: string;
  id: string;
  age?: number;
  bio?: string;
  image?: string;
}

export interface WineryNode {
  type: NodeType.Winery;
  name: string;
  id: string;
  location: string;
  established?: string;
  logo?: string;
}

// export type Node = PersonNode | WineryNode;


import type { SimulationNodeDatum } from 'd3';


export interface Node extends SimulationNodeDatum {
  id: string;
  name: string;
  type: NodeType;
  age?: number;
  bio?: string;
  image?: string;
  location?: string;
  established?: string;
  logo?: string;
}



export interface Link {
  id: string;
  source: string;
  target: string;
  relationship: RelationshipType;
  subType?: WinemakingRole | "Spouse" | "Parent/Child";
  startDate?: string;
  endDate?: string;
}

export interface Graph {
  nodes: (PersonNode | WineryNode)[];
  links: Link[];
}


