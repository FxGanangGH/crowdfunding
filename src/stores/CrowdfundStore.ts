import { defineStore } from 'pinia'
import type { Data, Product, Item, Images } from './interfaces'

export const useFundStore = defineStore('data', {
  state: () => ({
    product: {} as Product,
    brief: '',
    progress: 0,
    target: 0,
    backer: 0,
    duration: 0,
    description: '',
    extra: '',
    items: [] as Item[],
    images: {} as Images
  }),

  actions: {
    async fill() {
      try {
        const module = await import('@/stores/CrowdfundData.json')
        const data = module.default as Data

        // Update state with fetched data
        this.product = data.product
        this.brief = data.product.brief
        this.progress = data.product.progress
        this.target = data.product.target
        this.backer = data.product.backer
        this.duration = data.product.duration
        this.description = data.product.description
        this.extra = data.product.extra
        this.items = data.items
        this.images = data.product.images
      } catch (error) {
        console.error('Failed to load store data:', error)
      }
    }
  }
})
