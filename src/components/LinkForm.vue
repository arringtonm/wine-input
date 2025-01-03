<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="source">Source Node</label>
      <select id="source" v-model="link.source">
        <option v-for="node in nodes" :key="node.id" :value="node.id">
          {{ node.name }}
        </option>
      </select>
    </div>
    <div>
      <label for="target">Target Node</label>
      <select id="target" v-model="link.target">
        <option v-for="node in filteredNodes" :key="node.id" :value="node.id">
          {{ node.name }}
        </option>
      </select>
    </div>
    <div>
      <label for="relationship">Relationship</label>
      <input id="relationship" v-model="link.relationship" type="text" />
    </div>
    <button type="submit">Save</button>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Node, Link } from '../models/graph';

const props = defineProps<{
  nodes: Node[];
  existingLink?: Link | null; // Allow `existingLink` to be optional and nullable
}>();

const emit = defineEmits(['addLink', 'updateLink']); // Declare emitted events

// const link = ref<Link>(
//   props.existingLink
//     ? { ...props.existingLink }
//     : { source: '', target: '', relationship: '' }
// );

const link = ref<Link>(
  props.existingLink
    ? {
        ...props.existingLink,
        relationship: props.existingLink.relationship || '',
      }
    : { id: '', source: '', target: '', relationship: '' }
);

// Filter out the selected source node from the target options
const filteredNodes = computed(() => {
  return props.nodes.filter((node) => node.id !== link.value.source);
});

// Handle form submission
const handleSubmit = () => {
  if (props.existingLink) {
    emit('updateLink', link.value);
  } else {
    emit('addLink', link.value);
  }
  // Reset form after submission
  link.value = { source: '', target: '', relationship: '', id: '' };
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
}

input,
select,
button {
  max-width: 400px;
  padding: 8px;
  font-size: 1rem;
}

button {
  background-color: #69b3a2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #57a38c;
}
</style>
