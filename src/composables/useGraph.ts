import { reactive, watchEffect } from 'vue';
import type { Node, Link } from '../models/graph';

const graph = reactive({
  nodes: JSON.parse(localStorage.getItem('graphNodes') || '[]') as Node[],
  links: JSON.parse(localStorage.getItem('graphLinks') || '[]') as Link[],
});

// Persist to local storage whenever the graph changes
watchEffect(() => {
  localStorage.setItem('graphNodes', JSON.stringify(graph.nodes));
  localStorage.setItem('graphLinks', JSON.stringify(graph.links));
});

const addNode = (node: Node) => {
  if (!graph.nodes.find((n) => n.id === node.id)) {
    graph.nodes.push(node);
  } else {
    console.warn(`Node with id ${node.id} already exists.`);
  }
};

const removeNode = (nodeId: string) => {
  graph.nodes = graph.nodes.filter((node) => node.id !== nodeId);
  graph.links = graph.links.filter(
    (link) => link.source !== nodeId && link.target !== nodeId
  );
};

const updateNode = (updatedNode: Node) => {
  const index = graph.nodes.findIndex((node) => node.id === updatedNode.id);
  if (index !== -1) {
    graph.nodes[index] = updatedNode;
  } else {
    console.warn(`Node with id ${updatedNode.id} not found.`);
  }
};

const addLink = (link: Link) => {
  if (!graph.links.find((l) => l.source === link.source && l.target === link.target)) {
    graph.links.push(link);
  } else {
    console.warn(`Link from ${link.source} to ${link.target} already exists.`);
  }
};

const removeLink = (linkId: string) => {
  graph.links = graph.links.filter((link) => link.id !== linkId);
};

const updateLink = (updatedLink: Link) => {
  const index = graph.links.findIndex((link) => link.id === updatedLink.id);
  if (index !== -1) {
    graph.links[index] = updatedLink;
  } else {
    console.warn(`Link with id ${updatedLink.id} not found.`);
  }
};

const bulkImport = (data: { nodes: Node[]; links: Link[] }) => {
  data.nodes.forEach((node) => addNode(node));
  data.links.forEach((link) => addLink(link));
};

export const useGraph = () => ({
  graph,
  addNode,
  removeNode,
  updateNode,
  addLink,
  removeLink,
  updateLink,
  bulkImport,
});
