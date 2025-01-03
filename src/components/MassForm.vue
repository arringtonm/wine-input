<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="jsonInput">Mass Import JSON</label>
      <textarea
        id="jsonInput"
        v-model="jsonInput"
        placeholder="Paste your JSON data here..."
        rows="10"
        required
      ></textarea>
    </div>
    <button type="submit">Submit</button>
  </form>
  <div v-if="error" class="error">{{ error }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Node, Link } from '../models/graph';

const emit = defineEmits(['massSubmit']);

const jsonInput = ref('');
const error = ref('');

const validateJSON = (input: string): { nodes: any[]; links: any[] } | null => {
  try {
    const parsed = JSON.parse(input);
    if (
      Array.isArray(parsed.nodes) &&
      Array.isArray(parsed.links) &&
      parsed.nodes.every((node: Node) => node.id && node.name) &&
      parsed.links.every((link: Link) => link.source && link.target)
    ) {
      return parsed;
    } else {
      throw new Error('Invalid JSON structure');
    }
  } catch (e: any) {
    error.value = e.message || 'Invalid JSON';
    return null;
  }
};

const handleSubmit = () => {
  const validatedData = validateJSON(jsonInput.value);
  if (validatedData) {
    emit('massSubmit', validatedData);
    jsonInput.value = '';
    error.value = '';
  }
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

textarea {
  width: 100%;
  max-width: 600px;
  padding: 8px;
  font-size: 1rem;
  resize: vertical;
}

button {
  background-color: #69b3a2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px;
}

button:hover {
  background-color: #57a38c;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
