<template>
  <div class="graph-viewer">
    <div ref="graphContainer" class="graph-container">
      <div
        v-if="hoveredNode"
        class="node-modal"
        :style="{
          top: `${modalPosition.y}px`,
          left: `${modalPosition.x}px`,
        }"
      >
        <h3>{{ hoveredNode.name }}</h3>
        <p v-if="hoveredNode.bio">{{ hoveredNode.bio }}</p>
        <p v-if="hoveredNode.location">Location: {{ hoveredNode.location }}</p>
        <p v-if="hoveredNode.established">
          Established: {{ hoveredNode.established }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Network } from 'vis-network/standalone';
import type { Node, Link } from '../models/graph';

const props = defineProps<{
  nodes: Node[];
  links: Link[];
}>();

const graphContainer = ref<HTMLElement | null>(null);
const network = ref<Network | null>(null);
const hoveredNode = ref<Node | null>(null);
const modalPosition = ref({ x: 0, y: 0 });

const renderGraph = () => {
  if (!graphContainer.value) return;

  const nodes = props.nodes.map((node) => ({
    id: node.id,
    label: node.name,
    group: node.type,
  }));

  const edges = props.links.map((link) => ({
    from: link.source,
    to: link.target,
    label: link.relationship,
    arrows: 'none',
  }));

  const data = { nodes, edges };

  const options = {
    nodes: {
      shape: 'dot',
      size: 20,
      font: {
        size: 14,
      },
    },
    edges: {
      font: {
        size: 12,
        align: 'middle',
      },
      color: '#848484',
    },
    physics: {
      enabled: true,
    },
    interaction: {
      hover: true,
    },
  };

  network.value = new Network(graphContainer.value, data, options);

  network.value.on('hoverNode', (params) => {
    const node = props.nodes.find((n) => n.id === params.node);
    if (node) {
      hoveredNode.value = node;

      const { x, y } = network.value!.canvasToDOM({
        x: params.pointer.canvas.x,
        y: params.pointer.canvas.y,
      });
      modalPosition.value = { x, y };
    }
  });

  network.value.on('blurNode', () => {
    hoveredNode.value = null;
  });
};

onMounted(() => {
  renderGraph();
});
</script>

<style scoped>
.graph-container {
  width: 100%;
  height: 500px;
  position: relative;
}

.node-modal {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  pointer-events: none;
  z-index: 10;
  transform: translate(-50%, -100%);
}

.node-modal h3 {
  margin: 0;
  font-size: 1.2rem;
}

.node-modal p {
  margin: 5px 0 0;
  font-size: 0.9rem;
}
</style>
