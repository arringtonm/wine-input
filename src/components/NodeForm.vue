<template>
  <div class="node-form">
    <h2>{{ isEditing ? 'Edit Node' : 'Add New Node' }}</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Node Type Selector -->
      <label for="type">Node Type:</label>
      <select
        id="type"
        v-model="formData.type"
        @change="resetTypeSpecificFields"
      >
        <option :value="NodeType.Person">Person</option>
        <option :value="NodeType.Winery">Winery</option>
      </select>

      <!-- Common Fields -->
      <label for="id">ID:</label>
      <input
        id="id"
        v-model="formData.id"
        type="text"
        required
        :disabled="isEditing"
      />

      <label for="name">Name:</label>
      <input id="name" v-model="formData.name" type="text" required />

      <!-- Person-Specific Fields -->
      <div v-if="formData.type === NodeType.Person">
        <label for="age">Age:</label>
        <input id="age" v-model.number="formData.age" type="number" min="0" />

        <label for="bio">Bio:</label>
        <textarea id="bio" v-model="formData.bio" rows="3"></textarea>

        <label for="image">Image URL:</label>
        <input id="image" v-model="formData.image" type="text" />
      </div>

      <!-- Winery-Specific Fields -->
      <div v-else-if="formData.type === NodeType.Winery">
        <label for="location">Location:</label>
        <input id="location" v-model="formData.location" type="text" required />

        <label for="established">Established:</label>
        <input
          id="established"
          v-model="formData.established"
          type="text"
          placeholder="YYYY"
        />

        <label for="logo">Logo URL:</label>
        <input id="logo" v-model="formData.logo" type="text" />
      </div>

      <!-- Submit Button -->
      <button type="submit">
        {{ isEditing ? 'Update Node' : 'Add Node' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { defineProps, defineEmits } from 'vue';
import type { PersonNode, WineryNode } from '../models/graph';
enum NodeType {
  Person = 'Person',
  Winery = 'Winery',
}

// Props and Emits
const props = defineProps<{
  existingNode: PersonNode | WineryNode | null;
}>();
const emit = defineEmits(['addNode', 'updateNode', 'clearForm']);

// Reactive Form Data
const formData = ref({
  id: props.existingNode?.id || '',
  type: props.existingNode?.type || NodeType.Person,
  name: props.existingNode?.name || '',
  age: (props.existingNode as PersonNode)?.age || undefined,
  bio: (props.existingNode as PersonNode)?.bio || '',
  image: (props.existingNode as PersonNode)?.image || '',
  location: (props.existingNode as WineryNode)?.location || '',
  established: (props.existingNode as WineryNode)?.established || '',
  logo: (props.existingNode as WineryNode)?.logo || '',
});

// Computed: Editing State
const isEditing = computed(() => !!props.existingNode);

// Methods
const resetTypeSpecificFields = () => {
  if (formData.value.type === NodeType.Person) {
    formData.value.location = '';
    formData.value.established = '';
    formData.value.logo = '';
  } else if (formData.value.type === NodeType.Winery) {
    formData.value.age = undefined;
    formData.value.bio = '';
    formData.value.image = '';
  }
};

const clearForm = () => {
  formData.value.id = '';
  formData.value.type = NodeType.Person;
  formData.value.name = '';
  formData.value.age = undefined;
  formData.value.bio = '';
  formData.value.image = '';
  formData.value.location = '';
  formData.value.established = '';
  formData.value.logo = '';
  emit('clearForm');
};

const handleSubmit = () => {
  if (formData.value.type === NodeType.Person) {
    const personNode: PersonNode = {
      id: formData.value.id,
      type: NodeType.Person,
      name: formData.value.name,
      age: formData.value.age,
      bio: formData.value.bio,
      image: formData.value.image,
    };
    emit(isEditing.value ? 'updateNode' : 'addNode', personNode);
  } else if (formData.value.type === NodeType.Winery) {
    const wineryNode: WineryNode = {
      id: formData.value.id,
      type: NodeType.Winery,
      name: formData.value.name,
      location: formData.value.location,
      established: formData.value.established,
      logo: formData.value.logo,
    };
    emit(isEditing.value ? 'updateNode' : 'addNode', wineryNode);
  }
  clearForm();
};
</script>

<style scoped>
/* Same styles as before */
</style>
