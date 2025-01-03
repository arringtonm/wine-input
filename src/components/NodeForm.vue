<template>
  <div class="node-form">
    <h2>{{ isEditing ? 'Edit Node' : 'Add New Node' }}</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Node Type Selector -->
      <div class="form-group">
        <label for="type">Node Type:</label>
        <select
          id="type"
          v-model="formData.type"
          @change="resetTypeSpecificFields"
        >
          <option :value="NodeType.Person">Person</option>
          <option :value="NodeType.Winery">Winery</option>
        </select>
      </div>

      <!-- Common Fields -->
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" v-model="formData.name" type="text" required />
      </div>

      <!-- Person-Specific Fields -->
      <div v-if="formData.type === NodeType.Person">
        <div class="form-group">
          <label for="age">Age:</label>
          <input id="age" v-model.number="formData.age" type="number" min="0" />
        </div>

        <div class="form-group">
          <label for="bio">Bio:</label>
          <textarea id="bio" v-model="formData.bio" rows="3"></textarea>
        </div>
      </div>

      <!-- Winery-Specific Fields -->
      <div v-else-if="formData.type === NodeType.Winery">
        <div class="form-group">
          <label for="location">Location:</label>
          <input
            id="location"
            v-model="formData.location"
            type="text"
            required
          />
        </div>

        <div class="form-group">
          <label for="established">Established:</label>
          <input
            id="established"
            v-model="formData.established"
            type="text"
            placeholder="YYYY"
          />
        </div>
      </div>

      <button type="submit" class="submit-button">
        {{ isEditing ? 'Update Node' : 'Add Node' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Enum for Node Types
enum NodeType {
  Person = 'Person',
  Winery = 'Winery',
}

interface Node {
  id: string;
  name: string;
  type: NodeType;
  age?: number;
  bio?: string;
  location?: string;
  established?: string;
}

// Props and Emits
const props = defineProps<{ existingNode: Node | null }>();
const emit = defineEmits(['addNode', 'updateNode']);

// Reactive Form Data
const formData = ref({
  id: props.existingNode?.id || '',
  name: props.existingNode?.name || '',
  type: props.existingNode?.type || NodeType.Person,
  age: props.existingNode?.age || 0,
  bio: props.existingNode?.bio || '',
  location: props.existingNode?.location || '',
  established: props.existingNode?.established || '',
});

// Computed Property: Editing State
const isEditing = computed(() => !!props.existingNode);

// Methods
const handleSubmit = () => {
  const node: Node = {
    ...formData.value,
    id: formData.value.id || generateUniqueId(),
  };
  emit(isEditing.value ? 'updateNode' : 'addNode', node);
  resetForm();
};

// Reset form fields based on node type
const resetTypeSpecificFields = () => {
  if (formData.value.type === NodeType.Person) {
    formData.value.location = '';
    formData.value.established = '';
  } else if (formData.value.type === NodeType.Winery) {
    formData.value.age = 0;
    formData.value.bio = '';
  }
};

// Reset entire form
const resetForm = () => {
  formData.value = {
    id: '',
    name: '',
    type: NodeType.Person,
    age: 0,
    bio: '',
    location: '',
    established: '',
  };
};

// Utility: Generate Unique ID
const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);
</script>

<style scoped>
.node-form {
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
textarea,
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
