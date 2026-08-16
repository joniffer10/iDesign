<template>
  <div class="template-hero-page">
    <!-- Sticky Glass Top Navigation Bar -->
    <header class="glass-nav-bar">
      <div class="nav-brand">
        <span class="brand-logo">✦</span>
        <span class="brand-title">AURA AI</span>
      </div>
      <nav class="nav-links">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#developers">Developers</a>
      </nav>
      <div class="nav-actions">
        <IdButton variant="glass" size="sm">Sign In</IdButton>
        <IdButton variant="primary" size="sm">Get Started →</IdButton>
      </div>
    </header>

    <!-- Main Hero Section -->
    <section class="hero-section">
      <!-- Ambient Blur Gradient Orbs -->
      <div class="ambient-orb orb-1"></div>
      <div class="ambient-orb orb-2"></div>

      <div class="hero-content">
        <IdTag variant="accent" icon-left="⚡" class="hero-pill">
          ANNOUNCING AURA SPATIAL 2.0
        </IdTag>

        <h1 class="hero-title">
          Intelligence, <br />
          <span class="gradient-text">Designed for Vision.</span>
        </h1>

        <p class="hero-subtitle">
          Experience spatial AI workflows crafted with liquid glass physics, 120fps fluid motion, and zero-latency local intelligence.
        </p>

        <div class="hero-cta-buttons">
          <IdButton variant="primary" size="lg" :icon-right="ArrowRight">
            Start Free Trial
          </IdButton>
          <IdButton variant="glass" size="lg" :icon-left="Play">
            Watch Keynote (2 min)
          </IdButton>
        </div>

        <!-- Key Metrics Row -->
        <div class="hero-stats-grid">
          <div class="stat-box">
            <span class="stat-num">99.8%</span>
            <span class="stat-lbl">Accuracy Score</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-box">
            <span class="stat-num">&lt; 12ms</span>
            <span class="stat-lbl">Local Latency</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-box">
            <span class="stat-num">4.9 ★</span>
            <span class="stat-lbl">Developer Rating</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Product Grid -->
    <section class="features-section">
      <div class="section-head">
        <IdTag variant="mono">ARCHITECTURE</IdTag>
        <h2>Engineered for High-Performance Silicon</h2>
        <p>Built ground-up with Vue 3, Vite, and hardware-accelerated CSS tokens.</p>
      </div>

      <div class="features-grid">
        <IdCard
          variant="glass"
          title="Neural Engine Sync"
          subtitle="Hardware Acceleration"
          tag="REALTIME"
          interactive
        >
          Leverage unified memory architecture for instantaneous vector embedding calculations.
          <template #actions>
            <IdButton variant="ghost" size="sm">Learn More →</IdButton>
          </template>
        </IdCard>

        <IdCard
          variant="hero"
          title="Liquid Glass Surfaces"
          subtitle="180% Vibrancy Saturation"
          tag="DESIGN SYSTEM"
          interactive
        >
          Dynamic Gaussian blur surfaces with adaptive dark mode color token transitions.
          <template #actions>
            <IdButton variant="glass" size="sm">Explore Tokens →</IdButton>
          </template>
        </IdCard>

        <IdCard
          variant="glass"
          title="End-to-End Encryption"
          subtitle="Secure Enclave Guard"
          tag="SECURITY"
          interactive
        >
          Zero data leaves your local device without explicit biometric confirmation.
          <template #actions>
            <IdButton variant="ghost" size="sm">Read Whitepaper →</IdButton>
          </template>
        </IdCard>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ArrowRight, Play } from '@lucide/vue'
import IdButton from '../idesign/IdButton.vue'
import IdTag from '../idesign/IdTag.vue'
import IdCard from '../idesign/IdCard.vue'
</script>

<style scoped>
.template-hero-page {
  width: 100%; min-height: 100vh; background: var(--bg); color: var(--text);
  font-family: var(--font); position: relative; overflow: hidden; padding-bottom: 60px;
}

/* Glass Header */
.glass-nav-bar {
  sticky: top; position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 32px; background: rgba(255, 255, 255, 0.75);
  backdrop-filter: saturate(180%) blur(20px); -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--hairline);
}
:root.dark .glass-nav-bar { background: rgba(28, 28, 30, 0.75); }

.nav-brand { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 16px; }
.brand-logo { color: var(--accent); font-size: 18px; }
.nav-links { display: flex; gap: 24px; }
.nav-links a { color: var(--text-2); text-decoration: none; font-size: 14px; font-weight: 550; transition: color 0.15s; }
.nav-links a:hover { color: var(--text); }
.nav-actions { display: flex; gap: 10px; align-items: center; }

/* Hero Section */
.hero-section {
  position: relative; padding: 90px 24px 70px 24px; display: flex; justify-content: center;
  text-align: center;
}
.ambient-orb {
  position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.25; pointer-events: none;
}
.orb-1 { width: 380px; height: 380px; background: #0071e3; top: -60px; left: 20%; }
.orb-2 { width: 320px; height: 320px; background: #af52de; top: 40px; right: 20%; }

.hero-content {
  max-width: 820px; display: flex; flex-direction: column; align-items: center; z-index: 2;
}
.hero-pill { margin-bottom: 24px; }
.hero-title {
  font-size: 64px; font-weight: 800; letter-spacing: -0.035em; line-height: 1.08;
  margin: 0 0 20px 0; color: var(--text);
}
.gradient-text {
  background: linear-gradient(135deg, #0071e3 0%, #9b51e0 50%, #ff2d55 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.hero-subtitle {
  font-size: 20px; color: var(--text-2); line-height: 1.5; max-width: 640px; margin: 0 0 36px 0;
}
.hero-cta-buttons { display: flex; gap: 16px; margin-bottom: 50px; flex-wrap: wrap; justify-content: center; }

/* Stats Grid */
.hero-stats-grid {
  display: flex; align-items: center; gap: 32px; padding: 20px 36px; border-radius: var(--r-pill);
  background: var(--surface); border: 1px solid var(--hairline); box-shadow: var(--sh-card);
}
.stat-box { display: flex; flex-direction: column; align-items: center; }
.stat-num { font-size: 22px; font-weight: 750; color: var(--text); font-variant-numeric: tabular-nums; }
.stat-lbl { font-size: 12px; color: var(--text-3); margin-top: 2px; }
.stat-divider { width: 1px; height: 28px; background: var(--hairline); }

/* Features Section */
.features-section { max-width: 1100px; margin: 40px auto 0 auto; padding: 0 24px; }
.section-head { text-align: center; margin-bottom: 40px; }
.section-head h2 { font-size: 32px; font-weight: 750; letter-spacing: -0.02em; margin: 12px 0 6px 0; }
.section-head p { font-size: 16px; color: var(--text-2); margin: 0; }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }

@media (max-width: 768px) {
  .hero-title { font-size: 42px; }
  .hero-subtitle { font-size: 16px; }
  .glass-nav-bar .nav-links { display: none; }
  .hero-stats-grid { flex-direction: column; gap: 16px; border-radius: var(--r-card); }
  .stat-divider { width: 80%; height: 1px; }
}
</style>
