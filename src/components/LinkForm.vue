<template>
  <div class="link-form">
    <h2>{{ isEditing ? 'Edit Link' : 'Add New Link' }}</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Source Node Selector -->
      <label for="source">Source Node:</label>
      <select id="source" v-model="formData.source" required>
        <option v-for="node in nodes" :key="node.id" :value="node.id">
          {{ node.name }} ({{ node.type }})
        </option>
      </select>

      <!-- Target Node Selector -->
      <label for="target">Target Node:</label>
      <select id="target" v-model="formData.target" required>
        <option v-for="node in nodes" :key="node.id" :value="node.id">
          {{ node.name }} ({{ node.type }})
        </option>
      </select>

      <!-- Relationship Type -->
      <label for="relationship">Relationship:</label>
      <select id="relationship" v-model="formData.relationship" required>
        <option value="owner">Owner</option>
        <option value="winemaker">Winemaker</option>
        <option value="spouse">Spouse</option>
        <option value="parentChild">Parent/Child</option>
        <option value="consultant">Consultant Winemaker</option>
      </select>

      <!-- Additional Fields for Winemaker Relationship -->
      <div v-if="formData.relationship === 'winemaker'">
        <label for="startDate">Start Date:</label>
        <input
          id="startDate"
          v-model="formData.startDate"
          type="text"
          placeholder="YYYY"
        />

        <label for="endDate">End Date:</label>
        <input
          id="endDate"
          v-model="formData.endDate"
          type="text"
          placeholder="YYYY or 'present'"
        />
      </div>

      <!-- Submit Button -->
      <button type="submit">
        {{ isEditing ? 'Update Link' : 'Add Link' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';
import type { Node, Link } from '../models/graph';
import type { RelationshipType } from '../models/enums';

// Props and Emits
const props = defineProps<{
  nodes: Node[];
  existingLink: Link | null;
}>();
const emit = defineEmits(['addLink', 'updateLink', 'updateNodes']);

// Reactive Form Data
const formData = ref({
  id: props.existingLink?.id || '',
  source: props.existingLink?.source || '',
  target: props.existingLink?.target || '',
  relationship: props.existingLink?.relationship || '',
  startDate: props.existingLink?.startDate || '',
  endDate: props.existingLink?.endDate || '',
});

// Computed: Editing State
const isEditing = computed(() => !!props.existingLink);

// Emit nodes to parent component
watch(
  () => props.nodes,
  (newNodes) => {
    emit('updateNodes', newNodes);
  }
);

// Methods
const handleSubmit = () => {
  const link: Link = {
    id: formData.value.id || generateUniqueId(), // Ensure id is set correctly
    source: formData.value.source,
    target: formData.value.target,
    relationship: formData.value.relationship as RelationshipType,
    startDate: formData.value.startDate,
    endDate: formData.value.endDate,
  };
  emit(isEditing.value ? 'updateLink' : 'addLink', link);

  if (!isEditing.value) {
    formData.value = {
      id: '',
      source: '',
      target: '',
      relationship: '',
      startDate: '',
      endDate: '',
    };
  }
};

// Utility function to generate unique IDs
const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};
</script>

<style scoped>
.link-form {
  margin-bottom: 2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

select,
input,
button {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
