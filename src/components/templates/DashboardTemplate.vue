<template>
  <div class="template-dashboard-page">
    <!-- Top Header Navigation -->
    <header class="dash-header">
      <div class="dash-title-group">
        <div class="dash-breadcrumbs">
          <IdBreadcrumbs :items="[{ label: 'Workspace' }, { label: 'Analytics & Systems' }]" />
        </div>
        <h2>System Overview</h2>
      </div>

      <div class="dash-actions">
        <IdSegmentedControl v-model="timeframe" :options="['24h', '7d', '30d', '1y']" theme="white" />
        <IdButton variant="primary" size="sm" :icon-left="Download" @click="exportReport">
          Export Report
        </IdButton>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="dash-body">
      <!-- 4 Stat Cards Row -->
      <div class="stats-row">
        <IdStat
          label="Total Revenue"
          value="$128,450"
          change="+14.2%"
          change-type="positive"
          description="Compared to $112,400 last month"
          :sparkline-data="[12, 18, 24, 20, 32, 45, 52, 60]"
        />
        <IdStat
          label="Active Users"
          value="48,290"
          change="+8.6%"
          change-type="positive"
          description="Daily active spatial sessions"
          :sparkline-data="[20, 25, 30, 28, 35, 40, 48, 55]"
        />
        <IdStat
          label="Server Load"
          value="18.4%"
          change="-3.1%"
          change-type="positive"
          description="High-performance cluster utilization"
          :sparkline-data="[40, 35, 28, 30, 22, 19, 18, 18]"
        />
        <IdStat
          label="System Incidents"
          value="0"
          change="100% Uptime"
          change-type="neutral"
          description="Zero downtime over 90 days"
        />
      </div>

      <!-- Main Section: Data Table + Live Panel -->
      <div class="dash-grid-layout">
        <!-- Main Data Table -->
        <div class="table-section-box">
          <IdTable
            title="Team Activity & Roles"
            variant="striped"
            :columns="tableColumns"
            :data="tableData"
            selectable
            searchable
            has-row-actions
            v-model:selected-rows="selectedRows"
          >
            <template #col-status="{ value }">
              <IdTag :variant="value === 'Active' ? 'success' : value === 'Syncing' ? 'accent' : 'warning'" size="sm">
                {{ value }}
              </IdTag>
            </template>

            <template #actions="{ row }">
              <IdButton size="sm" variant="ghost" @click="handleEdit(row)">
                Manage
              </IdButton>
            </template>
          </IdTable>
        </div>

        <!-- Right Side Panel -->
        <div class="side-panel-box">
          <IdPanel title="System Controls">
            <IdPanelRow title="Wi-Fi 6E" subtitle="5.4 Gbps Mesh" icon-bg="#007aff" detail="Connected">
              <template #icon>📶</template>
            </IdPanelRow>

            <IdPanelRow title="Spatial Sync" subtitle="Local Peer-to-Peer" icon-bg="#34c759" detail="Active">
              <template #icon>⚡</template>
            </IdPanelRow>

            <IdPanelRow title="Push Notifications" subtitle="APNs Enabled" icon-bg="#ff9500" detail="Enabled">
              <template #icon>🔔</template>
            </IdPanelRow>

            <IdPanelRow title="Security Enclave" subtitle="Hardware Vault" icon-bg="#af52de" detail="Encrypted">
              <template #icon>🛡️</template>
            </IdPanelRow>
          </IdPanel>

          <!-- Avatar Group Card -->
          <div class="team-card-box">
            <h4 class="card-head">Active Collaborators</h4>
            <IdAvatarGroup
              variant="hero"
              shape="squircle"
              size="md"
              :users="activeUsers"
              label="5 engineers online"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Download } from '@lucide/vue'
import IdBreadcrumbs from '../idesign/IdBreadcrumbs.vue'
import IdSegmentedControl from '../idesign/IdSegmentedControl.vue'
import IdButton from '../idesign/IdButton.vue'
import IdStat from '../idesign/IdStat.vue'
import IdTable from '../idesign/IdTable.vue'
import IdTag from '../idesign/IdTag.vue'
import IdPanel from '../idesign/IdPanel.vue'
import IdPanelRow from '../idesign/IdPanelRow.vue'
import IdAvatarGroup from '../idesign/IdAvatarGroup.vue'
import { useToast } from '../../composables/useToast'

const toast = useToast()

const timeframe = ref('7d')
const selectedRows = ref([])

const activeUsers = ref([
  { name: 'Jane Smith', status: 'online' },
  { name: 'Alex Rivera', status: 'online' },
  { name: 'Sarah Chen', status: 'busy' },
  { name: 'David Kim', status: 'online' },
  { name: 'Elena Rostova' }
])

const tableColumns = [
  { key: 'name', label: 'Member Name', sortable: true },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'lastActive', label: 'Last Active' }
]

const tableData = [
  { id: '1', name: 'Jane Smith', role: 'Design Lead', status: 'Active', lastActive: 'Just now' },
  { id: '2', name: 'Alex Rivera', role: 'Staff Engineer', status: 'Active', lastActive: '4m ago' },
  { id: '3', name: 'Sarah Chen', role: 'Product Manager', status: 'Syncing', lastActive: '12m ago' },
  { id: '4', name: 'David Kim', role: 'Security Ops', status: 'Active', lastActive: '1h ago' },
  { id: '5', name: 'Elena Rostova', role: 'QA Lead', status: 'Away', lastActive: '3h ago' }
]

const exportReport = () => {
  toast.success('Analytics Report Exported', { description: `PDF report generated for timeframe: ${timeframe.value}` })
}

const handleEdit = (row) => {
  toast.info(`Editing member: ${row.name}`)
}
</script>

<style scoped>
.template-dashboard-page {
  width: 100%; min-height: 100vh; background: var(--bg); color: var(--text);
  font-family: var(--font); padding-bottom: 80px;
}

/* Header */
.dash-header {
  padding: 32px 32px 24px 32px; background: var(--surface); border-bottom: 1px solid var(--hairline);
  display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px;
}
.dash-breadcrumbs { margin-bottom: 6px; }
.dash-title-group h2 { font-size: 32px; font-weight: 800; letter-spacing: -0.025em; margin: 0; }

.dash-actions { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }

/* Dashboard Body */
.dash-body { max-width: 1200px; margin: 32px auto 0 auto; padding: 0 24px; display: flex; flex-direction: column; gap: 28px; }

/* 4 Stat Cards Row */
.stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; }

/* Main Grid Layout */
.dash-grid-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }

.table-section-box { width: 100%; }

.side-panel-box { display: flex; flex-direction: column; gap: 20px; }

.team-card-box {
  background: var(--surface); border: 1px solid var(--hairline); border-radius: var(--r-panel);
  padding: 20px; box-shadow: var(--sh-card); display: flex; flex-direction: column; gap: 12px;
}
.card-head { font-size: 15px; font-weight: 650; margin: 0; color: var(--text); }

@media (max-width: 900px) {
  .dash-grid-layout { grid-template-columns: 1fr; }
}
</style>
