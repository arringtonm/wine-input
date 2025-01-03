import { ref, watch } from "vue";
import type { Node, Link } from "../models/graph";

// Local Storage Keys
const LOCAL_STORAGE_KEYS = {
  nodes: "graph_nodes",
  links: "graph_links",
};

// Utility: Load data from localStorage
const loadFromLocalStorage = <T>(key: string): T | [] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Utility: Save data to localStorage
const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Reactive Graph State
const graph = ref<{
  nodes: Node[];
  links: Link[];
}>({
  nodes: loadFromLocalStorage<Node[]>(LOCAL_STORAGE_KEYS.nodes),
  links: loadFromLocalStorage<Link[]>(LOCAL_STORAGE_KEYS.links),
});

// Watchers: Save Changes to Local Storage
watch(
  () => graph.value.nodes,
  (newNodes) => {
    saveToLocalStorage(LOCAL_STORAGE_KEYS.nodes, newNodes);
  },
  { deep: true }
);

watch(
  () => graph.value.links,
  (newLinks) => {
    saveToLocalStorage(LOCAL_STORAGE_KEYS.links, newLinks);
  },
  { deep: true }
);

// Graph Operations
const addNode = (node: Node) => {
  graph.value.nodes.push(node);
};

const removeNode = (id: string) => {
  graph.value.nodes = graph.value.nodes.filter((node) => node.id !== id);
  graph.value.links = graph.value.links.filter(
    (link) => link.source !== id && link.target !== id
  );
};

const updateNode = (updatedNode: Node) => {
  const index = graph.value.nodes.findIndex((node) => node.id === updatedNode.id);
  if (index !== -1) graph.value.nodes[index] = updatedNode;
};

const addLink = (link: Link) => {
  graph.value.links.push(link);
};

const removeLink = (id: string) => {
  graph.value.links = graph.value.links.filter((link) => link.id !== id);
};

const updateLink = (updatedLink: Link) => {
  const index = graph.value.links.findIndex((link) => link.id === updatedLink.id);
  if (index !== -1) graph.value.links[index] = updatedLink;
};

export const useGraph = () => ({
  graph,
  addNode,
  removeNode,
  updateNode,
  addLink,
  removeLink,
  updateLink,
});
