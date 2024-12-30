<template>
  <div>
    <h2>Add Node</h2>
    <form @submit.prevent="addNode">
      <input v-model="newNode.id" placeholder="Name" required />
      <input v-model="newNode.role" placeholder="Role" required />
      <input v-model="newNode.winery" placeholder="Winery" required />
      <button type="submit">Add Node</button>
    </form>

    <h2>Add Link</h2>
    <form @submit.prevent="addLink">
      <input v-model="newLink.source" placeholder="Source" required />
      <input v-model="newLink.target" placeholder="Target" required />
      <input
        v-model="newLink.relationship"
        placeholder="Relationship"
        required
      />
      <button type="submit">Add Link</button>
    </form>

    <h2>Nodes</h2>
    <ul>
      <li v-for="node in nodes" :key="node.id">
        {{ node.id }} - {{ node.role }} at {{ node.winery }}
      </li>
    </ul>

    <h2>Links</h2>
    <ul>
      <li v-for="link in links" :key="link.source + link.target">
        {{ link.source }} - {{ link.target }}: {{ link.relationship }}
      </li>
    </ul>
  </div>

  <pre>
    {{ JSON.stringify({ nodes, links }, null, 2) }}
  </pre>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Node {
  id: string;
  role: string;
  winery: string;
}

interface Link {
  source: string;
  target: string;
  relationship: string;
}

const nodes = ref<Node[]>([]);
const links = ref<Link[]>([]);
const newNode = ref<Node>({
  id: '',
  role: '',
  winery: '',
});
const newLink = ref<Link>({
  source: '',
  target: '',
  relationship: '',
});

const addNode = () => {
  nodes.value.push({ ...newNode.value });
  newNode.value.id = '';
  newNode.value.role = '';
  newNode.value.winery = '';
};

const addLink = () => {
  links.value.push({ ...newLink.value });
  newLink.value.source = '';
  newLink.value.target = '';
  newLink.value.relationship = '';
};
</script>

<style scoped>
/* Add your styles here */
</style>
