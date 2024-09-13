<template>
  <div class="relative flex size-full flex-col items-center bg-gray-200 pb-4">
    <img
      class="absolute top-0 z-0 hidden h-auto w-full object-fill xl:block"
      src="/images/image-hero-desktop.jpg"
    />
    <img
      class="absolute top-0 z-0 block h-auto w-full object-fill xl:hidden"
      src="/images/image-hero-mobile.jpg"
    />
    <header
      class="relative z-30 mb-48 flex h-24 w-full items-center justify-between px-4 xl:h-40 xl:pl-60 xl:pr-52"
    >
      <div class="flex w-full items-center justify-between">
        <label class="font-commissioner text-2xl font-bold text-white xl:text-3xl">
          crowdfund
        </label>
        <Bars3Icon
          @click="toggleNav"
          v-show="!showNav"
          class="size-7 text-white xl:hidden"
        />
        <XMarkIcon
          @click="toggleNav"
          v-show="showNav"
          class="size-7 text-white xl:hidden"
        />
        <div class="hidden xl:block">
          <ul class="flex items-center gap-x-10">
            <li
              class="font-commissioner text-xl capitalize text-white hover:cursor-pointer"
            >
              about
            </li>
            <li
              class="font-commissioner text-xl capitalize text-white hover:cursor-pointer"
            >
              discover
            </li>
            <li
              class="font-commissioner text-xl capitalize text-white hover:cursor-pointer"
            >
              get started
            </li>
          </ul>
        </div>
      </div>
      <Transition name="fade">
        <div
          v-show="showNav"
          class="absolute inset-x-0 top-24 mx-auto w-11/12 rounded-xl border border-gray-300 bg-white"
        >
          <nav class="flex items-center">
            <ul
              class="flex flex-col items-start px-5 xl:flex-row xl:items-center xl:gap-x-10"
            >
              <li
                class="py-5 font-commissioner text-xl font-semibold capitalize text-black hover:cursor-pointer"
              >
                about
              </li>
              <li
                class="py-5 font-commissioner text-xl font-semibold capitalize text-black hover:cursor-pointer"
              >
                discover
              </li>
              <li
                class="py-5 font-commissioner text-xl font-semibold capitalize text-black hover:cursor-pointer"
              >
                get started
              </li>
            </ul>
          </nav>
        </div>
      </Transition>
    </header>
    <Transition name="fade">
      <div
        v-show="showNav"
        class="absolute inset-x-0 top-0 z-20 h-[50vh] w-full bg-gradient-to-b from-black/50 to-black/0"
      ></div>
    </Transition>
    <CrowdfundProductName />
    <CrowdfundProductProgress />
    <CrowdfundProductDetails />
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
import CrowdfundProductName from "../components/CrowdfundProductName.vue";
import CrowdfundProductProgress from "../components/CrowdfundProductProgress.vue";
import CrowdfundProductDetails from "../components/CrowdfundProductDetails.vue";

const showNav = ref(false);

const toggleNav = () => {
  showNav.value = !showNav.value;
  anime({
    targets: "nav",
    opacity: showNav.value ? [0, 1] : [1, 0],
    duration: 500,
    easing: "easeOutSine",
  });
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
