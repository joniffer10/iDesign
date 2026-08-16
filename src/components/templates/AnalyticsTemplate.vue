<template>
  <div class="analytics-template">
    <!-- Top Bar with Telemetry Status -->
    <div class="analytics-header">
      <div class="header-title-group">
        <div class="live-status-row">
          <IdLiveDot>LIVE TELEMETRY STREAM</IdLiveDot>
          <span class="sync-time">Updated 2s ago</span>
        </div>
        <h2 class="analytics-title">Cluster Analytics & Metrics</h2>
      </div>

      <div class="header-controls">
        <IdSegmentedControl
          v-model="timeRange"
          :options="['24h', '7d', '30d', 'Quarter']"
        />
        <IdButton size="sm" variant="primary" :loading="isExporting" @click="exportReport">
          Export Data ↓
        </IdButton>
      </div>
    </div>

    <!-- Stat Metric Tiles Grid -->
    <div class="stats-grid">
      <IdCard variant="glass" padding="md" interactive>
        <IdStat
          label="Total Active Users"
          value="142,850"
          unit="users"
          change="+14.2%"
          change-type="positive"
          description="vs. previous period"
          :sparkline-data="[45, 52, 58, 65, 60, 72, 85, 94]"
        />
      </IdCard>

      <IdCard variant="glass" padding="md" interactive>
        <IdStat
          label="API Latency (p99)"
          value="18.4"
          unit="ms"
          change="-3.8%"
          change-type="positive"
          description="Faster edge response"
          :sparkline-data="[32, 28, 26, 24, 22, 20, 19, 18]"
        />
      </IdCard>

      <IdCard variant="glass" padding="md" interactive>
        <IdStat
          label="System Throughput"
          value="4.82"
          unit="M req/s"
          change="+8.1%"
          change-type="positive"
          description="Peak load sustained"
          :sparkline-data="[2.1, 2.8, 3.4, 3.9, 4.2, 4.5, 4.8]"
        />
      </IdCard>

      <IdCard variant="glass" padding="md" interactive>
        <IdStat
          label="Compute Error Rate"
          value="0.004"
          unit="%"
          change="-0.001%"
          change-type="positive"
          description="Zero critical outages"
          :sparkline-data="[0.012, 0.009, 0.008, 0.006, 0.004]"
        />
      </IdCard>
    </div>

    <!-- Charts Row -->
    <div class="charts-row">
      <!-- Activity Bar Chart -->
      <IdCard class="chart-card" variant="default" padding="lg">
        <template #header>
          <div class="card-head-between">
            <div>
              <IdCardTitle tag="h3">Traffic & Ingestion Volume</IdCardTitle>
              <IdCardDescription>Hourly compute operations across edge zones</IdCardDescription>
            </div>
            <IdTag variant="accent" size="sm">Hourly</IdTag>
          </div>
        </template>

        <div class="chart-container">
          <IdBarChart
            :height="200"
            :data="chartData"
          />
        </div>
      </IdCard>

      <!-- Traffic Distribution Donut Chart -->
      <IdCard class="chart-card-side" variant="default" padding="lg">
        <template #header>
          <IdCardTitle tag="h3">Traffic Origin</IdCardTitle>
          <IdCardDescription>Distribution by client protocol</IdCardDescription>
        </template>

        <div class="donut-container">
          <IdPieChart
            center-label="Protocol Traffic"
            :data="[
              { label: 'HTTP/3 Quic', value: 58, color: '#0071e3' },
              { label: 'gRPC Stream', value: 27, color: '#5e5ce6' },
              { label: 'WebSocket', value: 15, color: '#30d158' }
            ]"
          />
        </div>
      </IdCard>
    </div>

    <!-- Live Event Stream Table -->
    <div class="table-section">
      <IdTable
        title="Live Ingestion Events"
        :columns="[
          { key: 'event', label: 'Event Type', sortable: true },
          { key: 'region', label: 'Edge Region' },
          { key: 'latency', label: 'Latency' },
          { key: 'status', label: 'Status' }
        ]"
        :data="eventLogs"
        hoverable
        searchable
      >
        <template #col-status="{ value }">
          <IdTag :variant="value === 'Success' ? 'success' : 'warning'" size="sm">
            {{ value }}
          </IdTag>
        </template>
        <template #col-event="{ value }">
          <span class="event-name-cell">⚡ {{ value }}</span>
        </template>
      </IdTable>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import IdLiveDot from '../idesign/IdLiveDot.vue'
import IdSegmentedControl from '../idesign/IdSegmentedControl.vue'
import IdButton from '../idesign/IdButton.vue'
import IdCard from '../idesign/IdCard.vue'
import IdCardTitle from '../idesign/IdCardTitle.vue'
import IdCardDescription from '../idesign/IdCardDescription.vue'
import IdStat from '../idesign/IdStat.vue'
import IdTag from '../idesign/IdTag.vue'
import IdBarChart from '../idesign/IdBarChart.vue'
import IdPieChart from '../idesign/IdPieChart.vue'
import IdTable from '../idesign/IdTable.vue'
import { useToast } from '../../composables/useToast'

const toast = useToast()
const timeRange = ref('24h')
const isExporting = ref(false)

const chartData = [
  { label: '00:00', value: 45 },
  { label: '04:00', value: 30 },
  { label: '08:00', value: 85 },
  { label: '12:00', value: 120 },
  { label: '16:00', value: 95 },
  { label: '20:00', value: 65 }
]

const eventLogs = reactive([
  { event: 'auth.token.issue', region: 'us-east (N. Virginia)', latency: '12ms', status: 'Success' },
  { event: 'database.query.cached', region: 'eu-west (Frankfurt)', latency: '4ms', status: 'Success' },
  { event: 'storage.sync.complete', region: 'ap-northeast (Tokyo)', latency: '28ms', status: 'Success' },
  { event: 'api.rate_limit.check', region: 'us-west (Oregon)', latency: '8ms', status: 'Success' },
  { event: 'telemetry.flush', region: 'us-east (N. Virginia)', latency: '15ms', status: 'Success' }
])

const exportReport = () => {
  isExporting.value = true
  setTimeout(() => {
    isExporting.value = false
    toast.success('Telemetry Report Exported', {
      description: 'Downloaded analytics-cluster-report.csv'
    })
  }, 700)
}
</script>

<style scoped>
.analytics-template {
  font-family: var(--font);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 16px;
  background: var(--bg);
  color: var(--text);
}

.analytics-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--hairline);
}

.header-title-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.live-status-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sync-time {
  font-size: 11.5px;
  color: var(--text-3);
  font-family: var(--mono);
}

.analytics-title {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin: 0;
  color: var(--text);
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.charts-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 14px;
}

@media (max-width: 800px) {
  .charts-row {
    grid-template-columns: 1fr;
  }
}

.card-head-between {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}

.chart-container {
  padding-top: 10px;
}

.donut-container {
  display: flex;
  justify-content: center;
  padding-top: 10px;
}

.event-name-cell {
  font-family: var(--mono);
  font-size: 12.5px;
  font-weight: 600;
}
</style>
