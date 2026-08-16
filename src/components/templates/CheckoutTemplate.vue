<template>
  <div class="checkout-template">
    <!-- Header with Stepper Progress -->
    <div class="checkout-header">
      <div class="header-left">
        <span class="step-badge">ONBOARDING & CHECKOUT</span>
        <h2 class="checkout-title">Enterprise Plan Subscription</h2>
      </div>

      <div class="header-stepper">
        <IdStepper
          v-model="currentStep"
          :steps="[
            { label: 'Organization' },
            { label: 'Payment' },
            { label: 'Confirmation' }
          ]"
          size="sm"
        />
      </div>
    </div>

    <!-- Main Two-Column Form & Summary Layout -->
    <div class="checkout-grid">
      <!-- Left Column: Compound Form -->
      <div class="form-container">
        <!-- Step 1: Organization Details -->
        <div v-if="currentStep === 0" class="step-pane">
          <IdForm @submit.prevent="nextStep">
            <IdFormSection title="Organization Details" description="Configure your workspace ownership and domain.">
              <IdFormField label="Company or Team Name" required :error="errors.company">
                <IdInput v-model="form.company" placeholder="e.g. Acme Spatial Inc." />
              </IdFormField>

              <IdFormGroup inline>
                <IdFormField label="Workspace Subdomain" required :error="errors.subdomain">
                  <IdInput v-model="form.subdomain" placeholder="acme">
                    <template #suffix>.idesign.app</template>
                  </IdInput>
                </IdFormField>

                <IdFormField label="Primary Region">
                  <IdSelect
                    v-model="form.region"
                    :options="[
                      { value: 'us-east', label: 'US East (N. Virginia)' },
                      { value: 'us-west', label: 'US West (Oregon)' },
                      { value: 'eu-central', label: 'Europe (Frankfurt)' },
                      { value: 'ap-east', label: 'Asia Pacific (Tokyo)' }
                    ]"
                  />
                </IdFormField>
              </IdFormGroup>
            </IdFormSection>

            <IdFormSection title="Technical Admin Contact" description="Primary engineer responsible for cluster administration.">
              <IdFormGroup inline>
                <IdFormField label="Admin First Name" required>
                  <IdInput v-model="form.adminFirstName" placeholder="Jane" />
                </IdFormField>
                <IdFormField label="Admin Last Name" required>
                  <IdInput v-model="form.adminLastName" placeholder="Doe" />
                </IdFormField>
              </IdFormGroup>

              <IdFormField label="Admin Work Email" required :error="errors.adminEmail">
                <IdInput v-model="form.adminEmail" type="email" placeholder="jane.doe@acme.com">
                  <template #prefix>✉️</template>
                </IdInput>
              </IdFormField>
            </IdFormSection>

            <IdFormActions align="right">
              <IdButton variant="primary" type="submit">
                Continue to Payment →
              </IdButton>
            </IdFormActions>
          </IdForm>
        </div>

        <!-- Step 2: Payment Details -->
        <div v-else-if="currentStep === 1" class="step-pane">
          <IdForm @submit.prevent="nextStep">
            <IdFormSection title="Payment Method" description="All transactions are encrypted with PCI-DSS Level 1 compliance.">
              <IdFormField label="Cardholder Full Name" required>
                <IdInput v-model="form.cardName" placeholder="Jane Doe" />
              </IdFormField>

              <IdFormField label="Card Number" required>
                <IdInput v-model="form.cardNumber" placeholder="•••• •••• •••• 4242">
                  <template #prefix>💳</template>
                </IdInput>
              </IdFormField>

              <IdFormGroup inline>
                <IdFormField label="Expiration Date" required>
                  <IdInput v-model="form.cardExp" placeholder="MM / YY" />
                </IdFormField>

                <IdFormField label="Security Code" required>
                  <IdInput v-model="form.cardCvc" placeholder="CVC">
                    <template #prefix>🔒</template>
                  </IdInput>
                </IdFormField>
              </IdFormGroup>
            </IdFormSection>

            <IdFormSection title="Billing Address" description="Tax invoice details.">
              <IdFormField label="Billing Country">
                <IdSelect
                  v-model="form.billingCountry"
                  :options="[
                    { value: 'us', label: 'United States' },
                    { value: 'ca', label: 'Canada' },
                    { value: 'uk', label: 'United Kingdom' },
                    { value: 'de', label: 'Germany' },
                    { value: 'jp', label: 'Japan' }
                  ]"
                />
              </IdFormField>
            </IdFormSection>

            <IdFormActions align="between">
              <IdButton variant="ghost" @click="currentStep = 0">← Back</IdButton>
              <IdButton variant="primary" type="submit" :loading="isProcessing">
                Authorize & Subscribe $149
              </IdButton>
            </IdFormActions>
          </IdForm>
        </div>

        <!-- Step 3: Confirmation -->
        <div v-else-if="currentStep === 2" class="step-pane">
          <IdCard variant="glass" padding="lg">
            <div class="confirmation-box">
              <div class="success-icon-badge">✨</div>
              <h3 class="success-title">Workspace Provisioned Successfully!</h3>
              <p class="success-desc">
                Your enterprise cluster <strong>{{ form.subdomain }}.idesign.app</strong> is live and ready for deployment.
              </p>

              <div class="receipt-panel">
                <div class="receipt-row">
                  <span>Organization</span>
                  <strong>{{ form.company }}</strong>
                </div>
                <div class="receipt-row">
                  <span>Primary Admin</span>
                  <strong>{{ form.adminEmail }}</strong>
                </div>
                <div class="receipt-row">
                  <span>Billing Frequency</span>
                  <strong>Annual Subscription ($1,490/yr)</strong>
                </div>
              </div>

              <div class="success-actions">
                <IdButton variant="secondary" size="md" @click="currentStep = 0">Start Over</IdButton>
                <IdButton variant="primary" size="md" @click="launchWorkspace">
                  Launch Console →
                </IdButton>
              </div>
            </div>
          </IdCard>
        </div>
      </div>

      <!-- Right Column: Order Summary Sidebar -->
      <div class="summary-sidebar">
        <IdCard variant="glass" padding="lg">
          <template #header>
            <IdCardTitle tag="h3">Order Summary</IdCardTitle>
            <IdCardDescription>Enterprise Pro Annual Tier</IdCardDescription>
          </template>

          <div class="order-items">
            <div class="order-item">
              <div class="item-meta">
                <div class="item-title">Enterprise Seat License (10 Users)</div>
                <div class="item-sub">Billed Annually · 20% discount applied</div>
              </div>
              <div class="item-price">$1,200.00</div>
            </div>

            <div class="order-item">
              <div class="item-meta">
                <div class="item-title">Dedicated Edge Compute Node</div>
                <div class="item-sub">High throughput p99 latency SLA</div>
              </div>
              <div class="item-price">$290.00</div>
            </div>
          </div>

          <IdDivider variant="hairline" />

          <div class="total-row">
            <span>Total Billed Today</span>
            <span class="total-price">$1,490.00</span>
          </div>

          <div class="guarantee-box">
            <span>🛡️ 30-day money back guarantee. Cancel anytime with one click.</span>
          </div>
        </IdCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import IdStepper from '../idesign/IdStepper.vue'
import IdForm from '../idesign/IdForm.vue'
import IdFormField from '../idesign/IdFormField.vue'
import IdFormGroup from '../idesign/IdFormGroup.vue'
import IdFormSection from '../idesign/IdFormSection.vue'
import IdFormActions from '../idesign/IdFormActions.vue'
import IdInput from '../idesign/IdInput.vue'
import IdSelect from '../idesign/IdSelect.vue'
import IdButton from '../idesign/IdButton.vue'
import IdCard from '../idesign/IdCard.vue'
import IdCardTitle from '../idesign/IdCardTitle.vue'
import IdCardDescription from '../idesign/IdCardDescription.vue'
import IdDivider from '../idesign/IdDivider.vue'
import { useToast } from '../../composables/useToast'

const toast = useToast()
const currentStep = ref(0)
const isProcessing = ref(false)

const form = reactive({
  company: 'Acme Spatial Inc.',
  subdomain: 'acme',
  region: 'us-east',
  adminFirstName: 'Jane',
  adminLastName: 'Doe',
  adminEmail: 'jane.doe@acme.com',
  cardName: 'Jane Doe',
  cardNumber: '4242 •••• •••• 4242',
  cardExp: '12 / 28',
  cardCvc: '888',
  billingCountry: 'us'
})

const errors = reactive({
  company: '',
  subdomain: '',
  adminEmail: ''
})

const nextStep = () => {
  if (currentStep.value === 0) {
    if (!form.company) {
      errors.company = 'Company name is required'
      return
    }
    if (!form.subdomain) {
      errors.subdomain = 'Subdomain is required'
      return
    }
    errors.company = ''
    errors.subdomain = ''
    currentStep.value = 1
  } else if (currentStep.value === 1) {
    isProcessing.value = true
    setTimeout(() => {
      isProcessing.value = false
      currentStep.value = 2
      toast.success('Subscription activated successfully!')
    }, 800)
  }
}

const launchWorkspace = () => {
  toast.success('Launching console environment...', {
    description: `Connecting to ${form.subdomain}.idesign.app`
  })
}
</script>

<style scoped>
.checkout-template {
  font-family: var(--font);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 16px;
  background: var(--bg);
  color: var(--text);
}

.checkout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--hairline);
}

.step-badge {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--accent);
  text-transform: uppercase;
}

.checkout-title {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin: 4px 0 0;
  color: var(--text);
}

.checkout-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 20px;
  align-items: start;
}

@media (max-width: 860px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.confirmation-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 10px;
  gap: 12px;
}

.success-icon-badge {
  font-size: 36px;
  line-height: 1;
}

.success-title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
  color: var(--text);
}

.success-desc {
  font-size: 14px;
  color: var(--text-2);
  max-width: 440px;
  margin: 0;
  line-height: 1.5;
}

.receipt-panel {
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: 12px;
  padding: 12px 16px;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 10px 0;
  text-align: left;
}

.receipt-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-2);
}

.receipt-row strong {
  color: var(--text);
}

.success-actions {
  display: flex;
  gap: 10px;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 12px 0;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.item-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}

.item-sub {
  font-size: 11.5px;
  color: var(--text-3);
  margin-top: 2px;
}

.item-price {
  font-size: 13.5px;
  font-weight: 650;
  font-family: var(--mono);
  color: var(--text);
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  margin: 12px 0 8px;
  color: var(--text);
}

.total-price {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--accent);
}

.guarantee-box {
  font-size: 11.5px;
  color: var(--text-3);
  text-align: center;
  padding: 8px;
  background: var(--hover);
  border-radius: 8px;
  margin-top: 8px;
}
</style>
