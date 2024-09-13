<script setup lang="ts">
import { RouterView } from "vue-router";
import { useFundStore } from "./stores/CrowdfundStore";
import { onMounted } from "vue";

const data = useFundStore();

onMounted(() => {
  data.fill();
});
</script>

<template>
  <RouterView />
</template>
