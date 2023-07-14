<script setup lang="ts">
import LogicFlow from '@logicflow/core';
import '@logicflow/core/dist/style/index.css';

onMounted(() => {
  const lf = new LogicFlow({
    container: document.querySelector('#flow')!,
    grid: true,
  });

  lf.render({
    nodes: [
      {
        id: '1',
        type: 'rect',
        x: 100,
        y: 100,
        text: '节点1',
      },
      {
        id: '2',
        type: 'circle',
        x: 300,
        y: 200,
        text: '节点2',
      },
    ],
    edges: [
      {
        sourceNodeId: '1',
        targetNodeId: '2',
        type: 'polyline',
        text: '连线',
      },
    ],
  });
});
</script>

<template>
  <main id="flow" class="h-96"></main>
</template>

<style scoped lang="scss"></style>
