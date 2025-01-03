<template>
  <div class="admin-view">
    <h1>Admin Dashboard</h1>
    <details>
      <summary>Add/Edit</summary>

      <!-- Node Management -->
      <section>
        <h2>Manage Nodes</h2>
        <NodeForm
          :existingNode="editingNode"
          @addNode="handleAddNode"
          @updateNode="handleUpdateNode"
        />
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
      </section>

      <!-- Mass Import -->
      <section>
        <h2>Mass Import</h2>
        <MassForm @massSubmit="handleMassSubmit" />
      </section>

      <!-- Delete All -->
      <section>
        <h2>Delete All</h2>
        <button @click="deleteAll">Delete All Nodes and Links</button>
      </section>

      <!-- Existing Nodes and Links -->
      <section>
        <details>
          <summary>Existing Nodes</summary>
          <ul>
            <li v-for="node in graph.nodes" :key="node.id">
              {{ node.name }} ({{ node.type }})
              <button @click="editNode(node)">Edit</button>
              <button @click="deleteNode(node.id)">Delete</button>
            </li>
          </ul>
        </details>

        <details>
          <summary>Existing Links</summary>
          <ul>
            <li v-for="link in graph.links" :key="link.id">
              {{ getNodeName(link.source) }} →
              {{ getNodeName(link.target) }} ({{ link.relationship }})
              <button @click="editLink(link)">Edit</button>
              <button @click="deleteLink(link.id)">Delete</button>
            </li>
          </ul>
        </details>
      </section>
    </details>
    <GraphViewer :nodes="graph.nodes" :links="graph.links" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGraph } from '../composables/useGraph';
import NodeForm from '../components/NodeForm.vue';
import LinkForm from '../components/LinkForm.vue';
import MassForm from '../components/MassForm.vue';
import type { Node, Link } from '../models/graph';
import GraphViewer from '../components/GraphViewer.vue';

const {
  graph,
  addNode,
  removeNode,
  updateNode,
  addLink,
  removeLink,
  updateLink,
  bulkImport,
} = useGraph();

const editingNode = ref<Node | null>(null);
const editingLink = ref<Link | null>(null);

const handleAddNode = (node: Node) => {
  addNode(node);
  editingNode.value = null;
};

const handleUpdateNode = (node: Node) => {
  updateNode(node);
  editingNode.value = null;
};

const handleAddLink = (link: Link) => {
  addLink(link);
  editingLink.value = null;
};

const handleUpdateLink = (link: Link) => {
  updateLink(link);
  editingLink.value = null;
};

const handleMassSubmit = (data: { nodes: Node[]; links: Link[] }) => {
  bulkImport(data);
};

const editNode = (node: Node) => {
  editingNode.value = { ...node };
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

const deleteAll = () => {
  if (confirm('Are you sure you want to delete all nodes and links?')) {
    graph.nodes.forEach((node) => removeNode(node.id));
    graph.links.forEach((link) => removeLink(link.id));
  }
};

const getNodeName = (nodeId: string): string => {
  const node = graph.nodes.find((n) => n.id === nodeId);
  return node ? node.name : `Unknown Node (${nodeId})`;
};
</script>

<style scoped>
.admin-view {
  padding: 20px;
}

summary {
  font-weight: bold;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}

button {
  margin-left: 10px;
  background-color: #69b3a2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 10px;
}

button:hover {
  background-color: #57a38c;
}
</style>
