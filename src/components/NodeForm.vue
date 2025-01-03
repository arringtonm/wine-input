<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Name</label>
      <input id="name" v-model="node.name" type="text" required />
    </div>
    <div>
      <label for="type">Type</label>
      <select id="type" v-model="node.type" required>
        <option value="Person">Person</option>
        <option value="Winery">Winery</option>
      </select>
    </div>
    <div v-if="node.type === 'Person'">
      <label for="bio">Bio</label>
      <textarea id="bio" v-model="node.bio" rows="3"></textarea>
    </div>
    <div v-if="node.type === 'Winery'">
      <label for="location">Location</label>
      <input id="location" v-model="node.location" type="text" />

      <label for="established">Established</label>
      <input id="established" v-model="node.established" type="text" />
    </div>
    <button type="submit">Save</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Node } from '../models/graph';

const props = defineProps<{
  existingNode?: Node | null; // Allow existingNode to be optional and nullable
}>();

const emit = defineEmits(['addNode', 'updateNode']); // Declare emitted events

// const node = ref<Node>(
//   props.existingNode
//     ? { ...props.existingNode }
//     : { name: '', type: 'Person', bio: '', location: '', established: '' }
// );

const node = ref<Node>(
  props.existingNode
    ? {
        ...props.existingNode,
        bio: props.existingNode.bio || '',
        location: props.existingNode.location || '',
        established: props.existingNode.established || '',
      }
    : {
        id: '',
        name: '',
        type: 'Person',
        bio: '',
        location: '',
        established: '',
      }
);

const handleSubmit = () => {
  if (props.existingNode) {
    emit('updateNode', node.value);
  } else {
    emit('addNode', node.value);
  }
  // Reset form after submission
  node.value = {
    id: '',
    name: '',
    type: 'Person',
    bio: '',
    location: '',
    established: '',
  };
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
textarea,
button {
  max-width: 400px;
  padding: 8px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
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
