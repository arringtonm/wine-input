<template>
  <div class="link-form">
    <h2>{{ isEditing ? 'Edit Link' : 'Add New Link' }}</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Source Node -->
      <div class="form-group">
        <label for="source">Source Node:</label>
        <select id="source" v-model="formData.source" required>
          <option v-for="node in nodes" :key="node.id" :value="node.id">
            {{ node.name }}
          </option>
        </select>
      </div>

      <!-- Target Node -->
      <div class="form-group">
        <label for="target">Target Node:</label>
        <select id="target" v-model="formData.target" required>
          <option
            v-for="node in filteredTargetNodes"
            :key="node.id"
            :value="node.id"
          >
            {{ node.name }}
          </option>
        </select>
      </div>

      <!-- Relationship -->
      <div class="form-group">
        <label for="relationship">Relationship:</label>
        <select id="relationship" v-model="formData.relationship" required>
          <option v-for="type in relationshipTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>

      <!-- Dates -->
      <div class="form-group">
        <label for="startDate">Start Date:</label>
        <input id="startDate" v-model="formData.startDate" type="date" />
      </div>
      <div class="form-group">
        <label for="endDate">End Date:</label>
        <input id="endDate" v-model="formData.endDate" type="date" />
      </div>

      <button type="submit" class="submit-button">
        {{ isEditing ? 'Update Link' : 'Add Link' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { RelationshipType } from '../models/enums'; // Adjust import path if necessary

// Node and Link Interfaces
interface Node {
  id: string;
  name: string;
  type: string;
}

interface Link {
  id: string;
  source: string;
  target: string;
  relationship: string;
  startDate?: string;
  endDate?: string;
}

// Props and Emits
const props = defineProps<{ nodes: Node[]; existingLink: Link | null }>();
const emit = defineEmits(['addLink', 'updateLink']);

// Reactive Form Data
const formData = ref({
  id: props.existingLink?.id || '',
  source: props.existingLink?.source || '',
  target: props.existingLink?.target || '',
  relationship: props.existingLink?.relationship || '',
  startDate: props.existingLink?.startDate || '',
  endDate: props.existingLink?.endDate || '',
});

// Computed Properties
const isEditing = computed(() => !!props.existingLink);

// Filtered target nodes (exclude selected source node)
const filteredTargetNodes = computed(() => {
  return props.nodes.filter((node) => node.id !== formData.value.source);
});

// Relationship types
const relationshipTypes = Object.values(RelationshipType);

// Methods
const handleSubmit = () => {
  if (!formData.value.source || !formData.value.target) {
    alert('Source and Target nodes must be selected.');
    return;
  }

  if (
    formData.value.startDate &&
    formData.value.endDate &&
    formData.value.startDate > formData.value.endDate
  ) {
    alert('Start Date cannot be later than End Date.');
    return;
  }

  const link: Link = {
    ...formData.value,
    id: formData.value.id || generateUniqueId(),
  };
  emit(isEditing.value ? 'updateLink' : 'addLink', link);
  resetForm();
};

// Reset form fields
const resetForm = () => {
  formData.value = {
    id: '',
    source: '',
    target: '',
    relationship: '',
    startDate: '',
    endDate: '',
  };
};

// Utility: Generate Unique ID
const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);
</script>

<style scoped>
.link-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  /* background-color: #f9f9f9; */
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  /* color: white; */
  font-size: 16px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
