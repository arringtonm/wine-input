<template>
  <div class="admin-view">
    <!-- Node Management Section -->
    <section>
      <h2>Manage Nodes</h2>
      <NodeForm
        :existingNode="editingNode?.type === 'Person' ? editingNode : null"
        @addNode="addNode"
        @updateNode="updateNode"
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
    <section>
      <h2>Manage Links</h2>
      <LinkForm
        :nodes="graph.nodes"
        :existingLink="editingLink"
        @addLink="addLink"
        @updateLink="updateLink"
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
  <HomeView :links="graph.links" :nodes="graph.nodes" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGraph } from '../composables/useGraph';
import NodeForm from '../components/NodeForm.vue';
import LinkForm from '../components/LinkForm.vue';
import type { Node, Link, PersonNode, WineryNode } from '../models/graph';
import HomeView from './HomeView.vue';

const {
  graph,
  addNode,
  updateNode,
  removeNode,
  addLink,
  updateLink,
  removeLink,
} = useGraph();

// Editing state
const editingNode = ref<PersonNode | WineryNode | null>(null);
const editingLink = ref<Link | null>(null);

// Methods
const editNode = (node: Node) => {
  editingNode.value = { ...node } as PersonNode | WineryNode;
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
</script>

<style scoped>
/* Add your styles here */
</style>
