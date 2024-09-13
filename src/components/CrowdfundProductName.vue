<template>
  <div class="z-10 mb-10 w-full max-w-screen-lg px-4 xl:px-10">
    <div
      class="flex w-full flex-col items-center justify-center rounded-xl border border-gray-300 bg-white xl:px-16"
    >
      <div class="size-20 -translate-y-10 rounded-full border border-black">
        <img class="size-full" src="/images/logo-mastercraft.svg" />
      </div>
      <div class="mb-8 flex flex-col items-center gap-y-8">
        <h1 class="text-center font-commissioner text-3xl font-bold xl:text-4xl">
          {{ data.product.name }}
        </h1>
        <h2 class="text-center font-commissioner text-lg text-gray-500 xl:text-xl">
          {{ data.product.brief }}
        </h2>
      </div>
      <div
        class="mb-12 flex w-full items-center justify-center gap-x-4 xl:justify-between"
      >
        <CrowdfundOpenModal :btn-name="`Back this project`" />
        <div
          @click="toggleBookmark"
          class="relative flex h-20 items-center hover:cursor-pointer"
        >
          <div class="left-0 block size-20 rounded-full xl:absolute">
            <svg class="left-0" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <circle
                  :class="bookmarked ? 'fill-cyan-500' : 'fill-gray-500'"
                  fill="currentColor"
                  cx="28"
                  cy="28"
                  r="28"
                />
                <path
                  :class="bookmarked ? 'fill-white' : 'fill-[#B1B1B1]'"
                  fill="currentColor"
                  d="M23 19v18l5-5.058L33 37V19z"
                />
              </g>
            </svg>
          </div>
          <button
            v-show="!bookmarked"
            class="hidden h-full rounded-full bg-gray-300/30 py-5 pl-24 pr-8 font-commissioner font-bold text-gray-500 xl:block"
          >
            Bookmark
          </button>
          <button
            v-show="bookmarked"
            class="hidden h-full rounded-full bg-cyan-500/10 py-5 pl-24 pr-8 font-commissioner font-bold text-cyan-500 xl:block"
          >
            Bookmarked
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFundStore } from "@/stores/CrowdfundStore";
import CrowdfundOpenModal from "./CrowdfundOpenModal.vue";
import { ref } from "vue";

const data = useFundStore();
const bookmarked = ref(false);

const toggleBookmark = () => {
  bookmarked.value = !bookmarked.value;
};
</script>
