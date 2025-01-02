<template>
  <div class="home-view">
    <h1>Oregon Wine Industry Map</h1>
    <div ref="graphContainer" class="graph-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import * as d3 from 'd3';
import { useGraph } from '../composables/useGraph';
import type { Node, Link } from '../models/graph';

// Props
const props = defineProps<{
  nodes: Node[];
  links: Link[];
}>();

const { graph } = useGraph();

// Refs
const graphContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (graphContainer.value && graph.value) {
    createGraphVisualization();
  }
});

// Watch for changes in nodes and links
watch(
  () => [props.nodes, props.links],
  () => {
    if (graphContainer.value && graph.value) {
      createGraphVisualization();
    }
  },
  { deep: true }
);

// Create the Graph Visualization with D3.js
const createGraphVisualization = () => {
  const width = 800;
  const height = 600;

  // Clear previous SVG elements
  d3.select(graphContainer.value).selectAll('*').remove();

  const svg = d3
    .select(graphContainer.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Create simulation for node layout
  const simulation = d3.forceSimulation(props.nodes);
  simulation
    .force(
      'link',
      d3
        .forceLink(props.links)
        .id((d: any) => d.id)
        .distance(100)
    )
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(width / 2, height / 2));

  // Draw links
  svg
    .append('g')
    .selectAll<SVGLineElement, Link>('.link')
    .data(props.links)
    .enter()
    .append('line')
    .attr('class', 'link')
    .attr('stroke-width', 1);

  // Draw nodes
  const node = svg
    .append('g')
    .selectAll<SVGCircleElement, Node>('.node')
    .data(props.nodes)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('r', 10)
    .attr('fill', (d: Node) => (d.type === 'Person' ? 'blue' : 'green'))
    .call(
      d3
        .drag<SVGCircleElement, Node>()
        .on('start', (event: d3.D3DragEvent<SVGCircleElement, Node, Node>) =>
          dragstarted(event)
        )
        .on('drag', (event: d3.D3DragEvent<SVGCircleElement, Node, Node>) =>
          dragged(event)
        )
        .on('end', (event: d3.D3DragEvent<SVGCircleElement, Node, Node>) =>
          dragended(event)
        )
    );

  node.append('title').text((d: Node) => d.name);

  // Define tick function for the simulation
  simulation.on('tick', () => {
    svg
      .selectAll<SVGLineElement, Link>('.link')
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y);

    svg
      .selectAll<SVGCircleElement, Node>('.node')
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y);
  });

  // Drag functions
  const dragstarted = (event: d3.D3DragEvent<SVGCircleElement, Node, Node>) => {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  };

  const dragged = (event: d3.D3DragEvent<SVGCircleElement, Node, Node>) => {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  };

  const dragended = (event: d3.D3DragEvent<SVGCircleElement, Node, Node>) => {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  };
};
</script>

<style scoped>
.graph-container {
  margin-top: 2rem;
  border: 1px solid #ccc;
  height: 600px;
}

.node {
  cursor: pointer;
  fill: #007bff;
}

.link {
  stroke: #999;
  stroke-opacity: 0.6;
}
</style>
