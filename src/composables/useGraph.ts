
// useGraph.ts
import { ref } from "vue";
import type { Node, Link } from "../models/graph";

export const useGraph = () => {
  const graph = ref({
    nodes: [] as Node[],
    links: [] as Link[],
  });

  // Add Node
  const addNode = (node: Node) => {
    graph.value.nodes.push(node);
  };

  // Remove Node
  const removeNode = (nodeId: Node['id']) => {
    graph.value.nodes = graph.value.nodes.filter((node) => node.id !== nodeId);
    graph.value.links = graph.value.links.filter((link) => link.source !== nodeId && link.target !== nodeId);
  };

  // Update Node
  const updateNode = (updatedNode: Node) => {
    const index = graph.value.nodes.findIndex((node) => node.id === updatedNode.id);
    if (index !== -1) {
      graph.value.nodes[index] = updatedNode;
    }
  };

  // Add Link
  const addLink = (link: Link) => {
    graph.value.links.push(link);
  };

  // Remove Link
  const removeLink = (linkId: Link['id']) => {
    graph.value.links = graph.value.links.filter((link) => link.id !== linkId);
  };

  // Update Link
  const updateLink = (updatedLink: Link) => {
    const index = graph.value.links.findIndex((link) => link.id === updatedLink.id);
    if (index !== -1) {
      graph.value.links[index] = updatedLink;
    }
  };

  return {
    graph,
    addNode,
    removeNode,
    updateNode,
    addLink,
    removeLink,
    updateLink,
  };
};

