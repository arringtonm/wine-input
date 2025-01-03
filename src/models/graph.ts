import { NodeType, RelationshipType, WinemakingRole } from "./enums";

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

export interface Node {
  id: string;
  name: string;
  type: NodeType;
  age?: number; // For PersonNode
  bio?: string; // For PersonNode
  image?: string; // For PersonNode
  location?: string; // For WineryNode
  established?: string; // For WineryNode
  logo?: string; // For WineryNode
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
  nodes: Node[];
  links: Link[];
}
