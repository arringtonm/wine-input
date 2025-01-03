<template>
  <div class="admin-view">
    <h1>Admin Dashboard</h1>

    <!-- Node Management -->
    <section>
      <h2>Manage Nodes</h2>
      <NodeForm
        :existingNode="editingNode"
        @addNode="handleAddNode"
        @updateNode="handleUpdateNode"
      />
      <h3>Existing Nodes</h3>
      <ul>
        <li v-for="node in graph.nodes" :key="node.id">
          <span>{{ node.name }} ({{ node.type }})</span>
          <button @click="editNode(node)">Edit</button>
          <button @click="deleteNode(node.id)">Delete</button>
        </li>
      </ul>
    </section>

    <!-- Link Management -->
    <section>
      <h2>Manage Links</h2>
      <LinkForm
        :nodes="graph.nodes"
        :existingLink="editingLink"
        @addLink="handleAddLink"
        @updateLink="handleUpdateLink"
      />
      <h3>Existing Links</h3>
      <ul>
        <li v-for="link in graph.links" :key="link.id">
          <span>
            {{ getNodeName(link.source) }} → {{ getNodeName(link.target) }} ({{
              link.relationship
            }})
          </span>
          <button @click="editLink(link)">Edit</button>
          <button @click="deleteLink(link.id)">Delete</button>
        </li>
      </ul>
    </section>

    <!-- Graph Viewer -->
    <section>
      <GraphViewer
        v-if="graph.nodes.length && graph.links.length"
        :nodes="graph.nodes"
        :links="graph.links"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGraph } from '../composables/useGraph';
import NodeForm from '../components/NodeForm.vue';
import LinkForm from '../components/LinkForm.vue';
import GraphViewer from '../components/GraphViewer.vue';
import type { Node, Link } from '../models/graph';

const {
  graph,
  addNode,
  removeNode,
  updateNode,
  addLink,
  removeLink,
  updateLink,
} = useGraph();

const editingNode = ref<Node | null>(null);
const editingLink = ref<Link | null>(null);

const getNodeName = (nodeId: string): string => {
  const node = graph.value.nodes.find((n) => n.id === nodeId);
  return node ? node.name : `Unknown Node (${nodeId})`;
};

const handleAddNode = (node: Node): void => {
  addNode(node);
  editingNode.value = null;
};

const handleUpdateNode = (node: Node): void => {
  updateNode(node);
  editingNode.value = null;
};

const handleAddLink = (link: Link): void => {
  addLink(link);
  editingLink.value = null;
};

const handleUpdateLink = (link: Link): void => {
  updateLink(link);
  editingLink.value = null;
};

const editNode = (node: Node): void => {
  editingNode.value = { ...node };
};

const deleteNode = (nodeId: string): void => {
  if (confirm('Are you sure you want to delete this node?')) {
    removeNode(nodeId);
  }
};

const editLink = (link: Link): void => {
  editingLink.value = { ...link };
};

const deleteLink = (linkId: string): void => {
  if (confirm('Are you sure you want to delete this link?')) {
    removeLink(linkId);
  }
};
</script>

<style scoped>
.admin-view {
  padding: 20px;
}
</style>
