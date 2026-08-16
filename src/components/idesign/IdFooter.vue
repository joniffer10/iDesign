<template>
  <footer :class="['id-footer', `variant-${variant}`, { 'has-border': border }]">
    <div class="footer-inner">
      <!-- Main Content / Link Columns -->
      <div v-if="columns && columns.length > 0" class="footer-grid">
        <div v-for="(col, idx) in columns" :key="idx" class="footer-col">
          <div class="col-title">{{ col.title }}</div>
          <ul class="col-links">
            <li v-for="(link, lIdx) in col.links" :key="lIdx">
              <a :href="link.href || '#'" :target="link.target" class="col-link">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <slot />

      <!-- Bottom Bar with Copyright, Legal & Language -->
      <div class="footer-bottom">
        <div class="bottom-left">
          <span class="footer-copy">{{ copyrightText || `Copyright © ${currentYear} Idesign Inc. All rights reserved.` }}</span>
          <div v-if="legalLinks && legalLinks.length > 0" class="legal-links">
            <a v-for="(legal, idx) in legalLinks" :key="idx" :href="legal.href || '#'" class="legal-link">
              {{ legal.label }}
            </a>
          </div>
        </div>

        <div class="bottom-right">
          <slot name="extra" />
          <span v-if="countryText" class="footer-country">{{ countryText }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  copyrightText: String,
  countryText: {
    type: String,
    default: 'United States'
  },
  legalLinks: {
    type: Array,
    default: () => [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Use', href: '#' },
      { label: 'Sales Policy', href: '#' },
      { label: 'Legal', href: '#' }
    ]
  },
  border: {
    type: Boolean,
    default: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: v => ['default', 'glass', 'muted'].includes(v)
  }
})

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.id-footer {
  width: 100%;
  background: var(--surface);
  font-family: var(--font);
  color: var(--text-2);
  box-sizing: border-box;
}

.id-footer.has-border {
  border-top: 1px solid var(--hairline);
}

.variant-muted {
  background: var(--bg);
}

.variant-glass {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}
:root.dark .variant-glass {
  background: rgba(28, 28, 30, 0.75);
}

.footer-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 32px 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--hairline);
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.col-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
}

.col-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.col-link {
  font-size: 12.5px;
  color: var(--text-2);
  text-decoration: none;
  transition: color 0.15s ease;
}

.col-link:hover {
  color: var(--text);
  text-decoration: underline;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
  color: var(--text-3);
}

.bottom-left {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
}

.legal-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.legal-link {
  color: var(--text-3);
  text-decoration: none;
  transition: color 0.15s;
}

.legal-link:hover {
  color: var(--text);
}

.bottom-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-country {
  font-size: 12px;
  color: var(--text-2);
  font-weight: 550;
}
</style>
