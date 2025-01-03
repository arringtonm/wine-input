<template>
  <div class="graph-viewer">
    <div ref="networkContainer" class="network-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Network } from 'vis-network';

interface Node {
  id: string;
  name: string;
  type: string; // "Person" or "Winery"
  bio?: string;
}

interface Link {
  id: string;
  source: string;
  target: string;
  relationship: string;
}

const props = defineProps<{
  nodes: Node[];
  links: Link[];
}>();

const networkContainer = ref<HTMLElement | null>(null);
let network: Network | null = null;

const renderNetwork = () => {
  if (!networkContainer.value) return;

  // Convert nodes and links to Vis.js format
  const visNodes = props.nodes.map((node) => ({
    id: node.id,
    label: node.name,
    color: node.type === 'Winery' ? '#ff7f0e' : '#1f77b4',
    title: `
      <div style="padding: 10px; max-width: 200px;">
        <strong>${node.name}</strong><br>
        ${node.bio || 'No bio available.'}
      </div>
    `,
  }));

  const visEdges = props.links.map((link) => ({
    from: link.source,
    to: link.target,
    label: link.relationship,
    arrows: 'to',
    font: {
      align: 'top',
      vadjust: -10, // Adjust label position
    },
  }));

  // Create the network
  const data = { nodes: visNodes, edges: visEdges };

  const options = {
    layout: {
      improvedLayout: true,
    },
    nodes: {
      shape: 'dot',
      size: 20,
      font: {
        size: 14,
        color: '#ffffff',
      },
      borderWidth: 2,
    },
    edges: {
      font: {
        size: 12,
        align: 'top',
        vadjust: -10, // Adjust label position
      },
      color: '#848484',
      arrows: {
        to: { enabled: true, scaleFactor: 1 },
      },
      smooth: {
        enabled: true,
        type: 'dynamic',
        roundness: 0.5,
      },
    },
    interaction: {
      tooltipDelay: 100,
      hover: true,
    },
    physics: {
      enabled: true,
      stabilization: {
        iterations: 200,
      },
      barnesHut: {
        gravitationalConstant: -8000,
        centralGravity: 0.3,
        springLength: 95,
        springConstant: 0.04,
        damping: 0.09,
        avoidOverlap: 0.5,
      },
    },
  };

  network = new Network(networkContainer.value, data, options);

  // Disable physics after stabilization
  network.once('stabilizationIterationsDone', function () {
    network?.setOptions({ physics: false });
  });
};

onMounted(() => {
  renderNetwork();
});

watch(
  () => [props.nodes, props.links],
  () => {
    renderNetwork();
  },
  { deep: true }
);
</script>

<style scoped>
.network-container {
  width: 100%;
  max-width: 80vw; /* Adjust as needed */
  height: 600px; /* Adjust as needed */
  border: 1px solid #ccc;
}

.vis-network-tooltip {
  background-color: #fff !important;
  border: 1px solid #ccc !important;
  border-radius: 4px;
  padding: 10px !important;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
</style>
