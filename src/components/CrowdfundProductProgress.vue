<template>
  <div class="z-10 mb-10 w-full max-w-screen-lg px-4 xl:px-10">
    <div class="rounded-xl border border-gray-300 bg-white px-8 py-10 xl:px-16">
      <div
        class="flex flex-col items-center justify-center xl:mb-8 xl:flex-row xl:justify-start"
      >
        <div class="flex flex-col items-center justify-center xl:items-start">
          <span class="mb-2 font-commissioner text-4xl font-bold">${{ progress }}</span>
          <span class="mb-8 font-commissioner text-gray-500 xl:mb-0"
            >of ${{ target }} backed</span
          >
        </div>
        <div
          class="mb-8 w-24 border-b border-gray-500/30 xl:mx-16 xl:mb-0 xl:h-16 xl:w-1 xl:border-b-0 xl:border-r"
        ></div>
        <div class="flex flex-col items-center justify-center xl:mr-16 xl:items-start">
          <span class="mb-2 font-commissioner text-4xl font-bold">
            {{ backer }}
          </span>
          <span class="mb-8 font-commissioner text-gray-500 xl:mb-0">total backers</span>
        </div>
        <div
          class="mb-8 w-24 border-b border-gray-500/30 xl:mx-16 xl:mb-0 xl:h-16 xl:w-1 xl:border-b-0 xl:border-r"
        ></div>
        <div
          class="mb-8 flex flex-col items-center justify-center xl:mb-0 xl:items-start"
        >
          <span class="mb-2 font-commissioner text-4xl font-bold">
            {{ data.product.duration }}
          </span>
          <span class="font-commissioner text-gray-500">days left</span>
        </div>
      </div>
      <div class="h-4 w-full rounded-full bg-gray-300">
        <div :style="progressBar" class="h-full rounded-full bg-cyan-500"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFundStore } from "@/stores/CrowdfundStore";
import { ref, computed } from "vue";

const data = useFundStore();
const rawTarget = data.product.target;

const progress = computed(() => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(data.product.progress);
});

const backer = computed(() => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(data.product.backer);
});

const target = computed(() => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(data.product.target);
});

const progressPercentage = computed(() => {
  return data.product.target === 0
    ? 100
    : Math.min((data.product.progress / data.product.target) * 100, 100);
});

const progressBar = computed(() => {
  return `width: ${progressPercentage.value}%;`;
});
</script>
