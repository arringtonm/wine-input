<template>
  <div class="admin-panel">
    <h1>Admin Panel</h1>

    <!-- Node Management Section -->
    <section class="nodes-section">
      <h2>Manage Nodes</h2>
      <NodeForm
        :existingNode="editingNode"
        @addNode="handleAddNode"
        @updateNode="handleUpdateNode"
        @clearForm="clearNodeForm"
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

    <!-- Link Management Section -->
    <section class="links-section">
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
  </div>

  <!-- <GraphView :nodes="graph.nodes" :links="graph.links" /> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGraph } from '../composables/useGraph';
import NodeForm from '../components/NodeForm.vue';
import LinkForm from '../components/LinkForm.vue';
import type { Node, Link } from '../models/graph';

// Graph Data
const {
  graph,
  addNode,
  updateNode,
  removeNode,
  addLink,
  updateLink,
  removeLink,
} = useGraph();

// Editing State
import type { PersonNode, WineryNode } from '../models/graph';

const editingNode = ref<PersonNode | WineryNode | null>(null);
const editingLink = ref<Link | null>(null);

// Success Message State
const successMessage = ref<string | null>(null);

// Methods
const handleAddNode = (node: Node) => {
  addNode(node);
  editingNode.value = null;
  successMessage.value = 'Node added successfully!';
  clearNodeForm();
  setTimeout(() => (successMessage.value = null), 3000);
};

const handleUpdateNode = (node: Node) => {
  updateNode(node);
  editingNode.value = null;
  successMessage.value = 'Node updated successfully!';
  setTimeout(() => (successMessage.value = null), 3000);
};

const handleAddLink = (link: Link) => {
  addLink(link);
  editingLink.value = null;
  successMessage.value = 'Link added successfully!';
  setTimeout(() => (successMessage.value = null), 3000);
};

const handleUpdateLink = (link: Link) => {
  updateLink(link);
  editingLink.value = null;
  successMessage.value = 'Link updated successfully!';
  setTimeout(() => (successMessage.value = null), 3000);
};

const editNode = (node: Node) => {
  if (node.type === 'Person') {
    editingNode.value = { ...node } as PersonNode;
  } else if (node.type === 'Winery') {
    editingNode.value = { ...node } as WineryNode;
  } else {
    editingNode.value = null;
  }
};

const deleteNode = (nodeId: string) => {
  if (confirm('Are you sure you want to delete this node?')) {
    removeNode(nodeId);
  }
};

const editLink = (link: Link) => {
  editingLink.value = { ...link };
};

const deleteLink = (linkId: string) => {
  if (confirm('Are you sure you want to delete this link?')) {
    removeLink(linkId);
  }
};

const getNodeName = (nodeId: string): string => {
  const node = graph.value.nodes.find((n) => n.id === nodeId);
  return node ? node.name : 'Unknown Node';
};

const clearNodeForm = () => {
  editingNode.value = null;
};
</script>

<style scoped>
/* Same styles as before */
.success-message {
  color: green;
  margin-top: 10px;
}
</style>
