<!-- <template>
  <div class="home-view">
    <div ref="graphContainer" class="graph-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import * as d3 from 'd3';

// Props: Nodes and Links
defineProps({
  nodes: {
    type: Array,
    required: true,
  },
  links: {
    type: Array,
    required: true,
  },
});

const graphContainer = ref<HTMLElement | null>(null);

// Graph rendering logic
const renderGraph = () => {
  if (!graphContainer.value) return;

  // Clear previous graph
  d3.select(graphContainer.value).selectAll('*').remove();

  // Set up dimensions
  const width = graphContainer.value.offsetWidth;
  const height = graphContainer.value.offsetHeight;

  const svg = d3
    .select(graphContainer.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Set up simulation
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3.forceLink(links).id((d: any) => d.id)
    )
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(width / 2, height / 2));

  // Links
  const link = svg
    .append('g')
    .selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6);

  // Nodes
  const node = svg
    .append('g')
    .selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', 10)
    .attr('fill', '#69b3a2')
    .call(
      d3
        .drag()
        .on('start', (event: any, d: any) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event: any, d: any) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event: any, d: any) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
    );

  node.append('title').text((d: any) => d.name);

  simulation.on('tick', () => {
    link
      .attr('x1', (d: any) => (d.source as any).x)
      .attr('y1', (d: any) => (d.source as any).y)
      .attr('x2', (d: any) => (d.target as any).x)
      .attr('y2', (d: any) => (d.target as any).y);

    node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
  });
};

// Watch for changes in nodes and links
// watch(
//   () => [nodes, links],
//   () => {
//     renderGraph();
//   },
//   { deep: true }
// );

// Initial render
onMounted(() => {
  renderGraph();
});
</script>

<style scoped>
.graph-container {
  width: 100%;
  height: 500px;
  border: 1px solid #ddd;
}
</style> -->
