<template>
  <div class="z-10 mb-10 w-full max-w-screen-lg px-4 xl:px-10">
    <div
      class="flex flex-col items-start gap-y-10 rounded-xl border border-gray-300 bg-white px-8 py-10 xl:px-16"
    >
      <h1 class="font-commissioner text-2xl font-bold">About this project</h1>
      <p class="font-commissioner leading-relaxed text-gray-500">
        {{ data.product.description }}
      </p>
      <p class="font-commissioner leading-relaxed text-gray-500">
        {{ data.product.extra }}
      </p>
      <div
        v-for="(item, index) in data.items"
        :key="index"
        class="mb-5 w-full rounded-xl border border-gray-500 p-7 target:border hover:border-cyan-500 xl:mb-0"
        :class="{ 'pointer-events-none opacity-50': item.stock === 0 }"
      >
        <div class="mb-8">
          <div
            class="flex flex-col items-start xl:flex-row xl:items-center xl:justify-between"
          >
            <h3 class="font-commissioner text-lg font-bold">{{ item.name }}</h3>
            <h3 class="font-commissioner text-lg font-bold text-cyan-500">
              Pledge ${{ item.price }} or more
            </h3>
          </div>
        </div>
        <p class="mb-8 font-commissioner text-gray-500">
          {{ item.details }}
        </p>
        <div
          class="flex flex-col items-start gap-x-2 xl:flex-row xl:items-center xl:justify-between"
        >
          <div class="mb-6 flex items-center gap-x-2 xl:mb-0">
            <span class="pb-1 font-commissioner text-4xl font-bold">
              {{ item.stock }}
            </span>
            <span class="font-commissioner text-lg text-gray-500">left</span>
          </div>
          <CrowdfundOpenModal
            :btn-name="`Select Reward`"
            :stock="item.stock"
            :initial-select="item.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CrowdfundOpenModal from "./CrowdfundOpenModal.vue";
import { useFundStore } from "@/stores/CrowdfundStore";

const data = useFundStore();
</script>
