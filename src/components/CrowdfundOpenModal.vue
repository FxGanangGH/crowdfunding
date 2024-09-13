<template>
  <button
    @click="toggleModal"
    class="rounded-full bg-cyan-500 px-11 py-5 font-commissioner text-lg font-medium text-white hover:bg-cyan-600"
    :class="{ 'bg-gray-500': stock === 0 }"
  >
    {{ btnName }}
  </button>

  <Teleport to="body">
    <div
      v-show="showModal"
      class="fixed top-0 z-50 flex h-screen w-screen items-center justify-center overflow-y-auto bg-black/60 pb-20 pt-96"
    >
      <div
        v-if="!pledgeSubmitted"
        class="relative mt-96 flex w-11/12 max-w-screen-lg flex-col items-center justify-center rounded-2xl bg-white px-7 py-10 xl:mt-0 xl:px-16 xl:py-12"
      >
        <div class="mb-5 flex w-full items-center justify-between">
          <h1 class="font-commissioner text-2xl font-bold xl:text-4xl">
            Back this project
          </h1>
          <XMarkIcon
            @click="toggleModal"
            class="size-8 hover:cursor-pointer xl:absolute xl:right-8 xl:top-8"
          />
        </div>
        <h2
          class="mb-5 font-commissioner text-gray-500 xl:w-full xl:text-left xl:text-lg"
        >
          Want to support us in bringing out {{ data.product.name }} in the world ?
        </h2>
        <div
          @click="updateRadio('')"
          class="mb-5 w-full rounded-xl border border-gray-500 p-7 target:border hover:border-cyan-500"
        >
          <div class="mb-5 flex items-center gap-x-3">
            <input type="radio" :checked="radioValue === ''" @click="updateRadio('')" />
            <h3 class="font-commissioner text-lg font-bold">Pledge with no reward</h3>
          </div>
          <p class="font-commissioner text-gray-500 xl:px-6 xl:text-lg">
            Choose to support us without a reward if you simply believe in our project. As
            a backer, you will be signed up to recieve product updates via email.
          </p>
        </div>
        <div v-for="(item, index) in data.items" :key="index">
          <div
            @click="updateRadio(item.name)"
            class="mb-5 w-full rounded-xl border border-gray-500 p-7 target:border hover:border-cyan-500"
            :class="{ 'pointer-events-none opacity-50': item.stock === 0 }"
          >
            <div class="mb-5 xl:flex xl:items-center xl:justify-between">
              <div class="flex items-center gap-x-5">
                <input
                  :min="item.price"
                  class="active:bg-cyan-500"
                  type="radio"
                  :checked="radioValue === item.name"
                  v-model.number="item.amount"
                  @change="updateRadio(item.name)"
                />
                <div class="flex flex-col items-start xl:flex-row xl:gap-x-3">
                  <h3 class="font-commissioner text-lg font-bold">{{ item.name }}</h3>
                  <h3 class="font-commissioner text-lg font-bold text-cyan-500">
                    Pledge ${{ item.price }} or more
                  </h3>
                </div>
              </div>
              <div class="hidden items-center gap-x-2 xl:flex">
                <span class="font-commissioner text-xl font-bold">{{ item.stock }}</span>
                <span class="font-commissioner text-lg text-gray-500">left</span>
              </div>
            </div>
            <p class="mb-5 font-commissioner text-gray-500 xl:px-7 xl:text-lg">
              {{ item.details }}
            </p>
            <div
              class="flex items-center gap-x-2 xl:hidden"
              :class="{ 'mb-5': radioValue === item.name }"
            >
              <span class="font-commissioner text-xl font-bold">{{ item.stock }}</span>
              <span class="font-commissioner text-lg text-gray-500">left</span>
            </div>
            <div
              v-show="radioValue === item.name"
              class="flex w-full flex-col items-center justify-center border-t border-gray-500/30 xl:flex-row xl:justify-between"
              :class="{ hidden: item.stock === 0 }"
            >
              <span class="mb-3 mt-5 font-commissioner text-gray-500">
                Enter your pledge
              </span>
              <div
                class="flex items-center justify-between gap-x-5 xl:mt-5 xl:justify-normal"
              >
                <div class="w-auto">
                  <input
                    v-model="pledge"
                    type="number"
                    placeholder="$"
                    class="w-full rounded-full border border-gray-500/30 p-4 font-commissioner font-bold"
                  />
                </div>
                <button
                  @click="submitPledge(index)"
                  class="rounded-full bg-cyan-500 px-6 py-4 font-commissioner font-bold text-white hover:bg-cyan-600"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="pledgeSubmitted"
        class="flex w-11/12 max-w-sm -translate-y-36 flex-col items-center justify-center gap-y-10 rounded-2xl bg-white px-7 py-10 xl:max-w-md"
      >
        <svg class="scale-125" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
            <circle fill="#3CB3AB" cx="32" cy="32" r="32" />
            <path stroke="#FFF" stroke-width="5" d="M20 31.86L28.093 40 44 24" />
          </g>
        </svg>
        <h1 class="font-commissioner text-2xl font-bold">Thanks for your support!</h1>
        <p class="text-center font-commissioner leading-relaxed text-gray-500">
          Your pledge brings us one step closer to sharing
          {{ data.product.name }} worldwide. You will get an email once our campaign is
          completed.
        </p>
        <button
          @click="toggleModal"
          class="rounded-full bg-cyan-500 px-6 py-4 font-commissioner font-bold text-white hover:bg-cyan-600"
        >
          Continue
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { useFundStore } from "@/stores/CrowdfundStore";

const props = defineProps({
  btnName: {
    type: String,
    default: "",
  },
  stock: {
    type: Number,
    default: 1,
  },
  initialSelect: {
    type: String,
    default: "",
  },
});

const data = useFundStore();
const pledge = ref();
const showModal = ref(false);
const pledgeSubmitted = ref(false);
const radioValue = ref(props.initialSelect || "");

const toggleModal = () => {
  showModal.value = !showModal.value;
  if (pledgeSubmitted.value) {
    togglePledge();
    pledge.value = 0;
  }
};

const updateRadio = (newValue: string) => {
  radioValue.value = newValue;
};

const togglePledge = () => {
  pledgeSubmitted.value = !pledgeSubmitted.value;
};

const submitPledge = (index: number) => {
  data.product.backer += 1;
  if (data.items[index].stock > 0) {
    data.items[index].stock -= 1;
  }
  if (pledge.value > 1) {
    console.log(data.product.progress);
    data.product.progress += pledge.value;
    console.log(data.product.progress);
  }
  togglePledge();
};
</script>
