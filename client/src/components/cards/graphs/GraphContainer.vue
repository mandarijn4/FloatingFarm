<template>
    <!-- <VemGraph /> -->
    <TestGraph />
</template>

<script>
// import VemGraph from './VemGraph.vue';
import TestGraph from './TestGraph.vue';

export default {
    name: 'GraphContainer',
    // components: { VemGraph },
    // components: { VemGraph, TestGraph },
    components: { TestGraph },
}
</script>
