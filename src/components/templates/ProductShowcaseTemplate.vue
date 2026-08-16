<template>
  <div class="template-product-page">
    <!-- Store Header -->
    <header class="store-header">
      <div class="header-container">
        <div class="store-title-group">
          <h1>Vision Pro Store</h1>
          <p>Explore spatial devices, accessories, and developer hardware.</p>
        </div>

        <div class="header-controls">
          <IdSegmentedControl
            v-model="activeCategory"
            :options="['All', 'Hardware', 'Audio', 'Accessories']"
            theme="white"
          />
          <div class="cart-badge-wrap">
            <IdButton variant="glass" :icon-left="ShoppingBag" @click="cartOpen = true">
              Bag ({{ cartCount }})
            </IdButton>
          </div>
        </div>
      </div>
    </header>

    <!-- Product Grid -->
    <main class="store-main">
      <div class="product-grid">
        <IdCard
          v-for="prod in filteredProducts"
          :key="prod.id"
          variant="image-top"
          image-aspect="16-9"
          :image="prod.image"
          :title="prod.name"
          :subtitle="prod.subtitle"
          :tag="prod.tag"
          interactive
        >
          <div class="product-card-body">
            <p class="product-desc">{{ prod.desc }}</p>
            <div class="product-footer-row">
              <span class="product-price">{{ prod.price }}</span>
              <div class="product-actions">
                <IdButton size="sm" variant="secondary" @click.stop="quickView(prod)">
                  Quick View
                </IdButton>
                <IdButton size="sm" variant="primary" :icon-left="ShoppingBag" @click.stop="addToCart(prod)">
                  Add
                </IdButton>
              </div>
            </div>
          </div>
        </IdCard>
      </div>
    </main>

    <!-- Quick View Modal -->
    <IdModal v-model="quickModalOpen" :title="selectedProduct?.name" :subtitle="selectedProduct?.subtitle" :teleport="false">
      <div v-if="selectedProduct" class="modal-product-details">
        <img :src="selectedProduct.image" :alt="selectedProduct.name" class="modal-prod-img" />
        <div class="modal-meta">
          <IdTag variant="success" icon-left="⚡">IN STOCK · SHIPS TODAY</IdTag>
          <p class="modal-desc">{{ selectedProduct.fullDesc || selectedProduct.desc }}</p>
          <span class="modal-price">{{ selectedProduct.price }}</span>
        </div>
      </div>
      <template #actions>
        <IdButton variant="secondary" @click="quickModalOpen = false">Close</IdButton>
        <IdButton variant="primary" :icon-left="ShoppingBag" @click="addToCart(selectedProduct); quickModalOpen = false">
          Add to Bag — {{ selectedProduct?.price }}
        </IdButton>
      </template>
    </IdModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ShoppingBag } from '@lucide/vue'
import IdSegmentedControl from '../idesign/IdSegmentedControl.vue'
import IdButton from '../idesign/IdButton.vue'
import IdCard from '../idesign/IdCard.vue'
import IdTag from '../idesign/IdTag.vue'
import IdModal from '../idesign/IdModal.vue'
import { useToast } from '../../composables/useToast'

const toast = useToast()

const activeCategory = ref('All')
const cartCount = ref(2)
const cartOpen = ref(false)
const quickModalOpen = ref(false)
const selectedProduct = ref(null)

const products = [
  {
    id: '1',
    category: 'Hardware',
    name: 'Vision Studio Pro',
    subtitle: 'Spatial Computer',
    tag: 'FLAGSHIP',
    price: '$3,499',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80',
    desc: 'Transforms how you work, watch, connect, and re-experience memories in spatial 3D.',
    fullDesc: 'Vision Studio Pro seamlessly blends digital content with your physical space. You navigate simply by using your eyes, hands, and voice.'
  },
  {
    id: '2',
    category: 'Audio',
    name: 'AirPods Max',
    subtitle: 'Spatial Audio Headset',
    tag: 'BESTSELLER',
    price: '$549',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    desc: 'High-fidelity audio, Active Noise Cancellation, and personalized Spatial Audio.',
    fullDesc: 'Computational audio combines custom acoustic design with advanced DSP chips and software for breakthrough listening experiences.'
  },
  {
    id: '3',
    category: 'Accessories',
    name: 'Magic Keyboard Touch ID',
    subtitle: 'Wireless Keyboard',
    tag: 'ACCESSIBLE',
    price: '$199',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    desc: 'Delivers a remarkably comfortable and precise typing experience with Touch ID security.',
    fullDesc: 'Wireless and rechargeable, with an incredibly long-lasting internal battery that powers your keyboard for a month or more between charges.'
  },
  {
    id: '4',
    category: 'Hardware',
    name: 'Mac Studio M2 Ultra',
    subtitle: 'Pro Workstation',
    tag: 'PRO PERFORMANCE',
    price: '$3,999',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    desc: 'Outrageous performance in an extensively compact footprint for pro studios.',
    fullDesc: 'Mac Studio features 24-core CPU, up to 76-core GPU, and up to 192GB of unified memory with 800GB/s memory bandwidth.'
  }
]

const filteredProducts = computed(() => {
  if (activeCategory.value === 'All') return products
  return products.filter(p => p.category === activeCategory.value)
})

const addToCart = (prod) => {
  cartCount.value++
  toast.success(`Added ${prod.name} to Bag`, { description: `${prod.price} · Standard Free Delivery` })
}

const quickView = (prod) => {
  selectedProduct.value = prod
  quickModalOpen.value = true
}
</script>

<style scoped>
.template-product-page {
  width: 100%; min-height: 100vh; background: var(--bg); color: var(--text);
  font-family: var(--font); padding-bottom: 80px;
}

/* Store Header */
.store-header {
  padding: 40px 32px; background: var(--surface); border-bottom: 1px solid var(--hairline);
}
.header-container {
  max-width: 1140px; margin: 0 auto; display: flex; justify-content: space-between;
  align-items: flex-end; flex-wrap: wrap; gap: 20px;
}
.store-title-group h1 { font-size: 36px; font-weight: 800; letter-spacing: -0.03em; margin: 0 0 6px 0; }
.store-title-group p { font-size: 15px; color: var(--text-2); margin: 0; }

.header-controls { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }

/* Store Main Grid */
.store-main { max-width: 1140px; margin: 40px auto 0 auto; padding: 0 24px; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }

.product-card-body { display: flex; flex-direction: column; gap: 14px; margin-top: 8px; flex: 1; }
.product-desc { font-size: 13.5px; color: var(--text-body); line-height: 1.5; margin: 0; flex: 1; }
.product-footer-row {
  display: flex; justify-content: space-between; align-items: center; pt: 12px;
  border-top: 1px solid var(--hairline); margin-top: auto;
}
.product-price { font-size: 18px; font-weight: 750; color: var(--text); font-variant-numeric: tabular-nums; }
.product-actions { display: flex; gap: 8px; }

/* Modal Details */
.modal-product-details { display: flex; flex-direction: column; gap: 16px; }
.modal-prod-img { width: 100%; height: 220px; object-fit: cover; border-radius: 12px; }
.modal-meta { display: flex; flex-direction: column; gap: 8px; }
.modal-desc { font-size: 14px; color: var(--text-body); line-height: 1.6; margin: 0; }
.modal-price { font-size: 22px; font-weight: 800; color: var(--text); }
</style>
