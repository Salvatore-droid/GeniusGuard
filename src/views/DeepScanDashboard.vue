<template>
  <div class="deep-scan-dashboard">
    <!-- Navigation Header -->
    <header class="dashboard-header">
      <div class="header-content">
        <div class="header-brand">
          <router-link to="/" class="back-button">
            <span class="back-arrow">←</span>
            BACK TO HOME
          </router-link>
          <div class="brand-logo">
            <span class="logo-icon">🔍</span>
            <span class="logo-text">SENTINEL DEEP SCAN</span>
          </div>
        </div>
        <div class="header-actions">
          <div class="user-profile">
            <div class="user-avatar">👤</div>
            <span class="user-name">Security Analyst</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Dashboard -->
    <main class="dashboard-main">
      <div class="dashboard-container">
        
        <!-- Setup Wizard -->
        <section class="setup-wizard" v-if="!scanSetupComplete">
          <div class="wizard-header">
            <h1 class="wizard-title">DEEP SECURITY AUDIT SETUP</h1>
            <p class="wizard-subtitle">Configure authenticated scanning for comprehensive vulnerability assessment</p>
          </div>

          <div class="wizard-steps">
            <div class="step-indicator">
              <div class="step" :class="{ active: currentStep === 1, completed: currentStep > 1 }">
                <div class="step-number">1</div>
                <div class="step-label">Install Extension</div>
              </div>
              <div class="step-connector" :class="{ active: currentStep > 1 }"></div>
              <div class="step" :class="{ active: currentStep === 2, completed: currentStep > 2 }">
                <div class="step-number">2</div>
                <div class="step-label">Record Session</div>
              </div>
              <div class="step-connector" :class="{ active: currentStep > 2 }"></div>
              <div class="step" :class="{ active: currentStep === 3, completed: currentStep > 3 }">
                <div class="step-number">3</div>
                <div class="step-label">Configure Scan</div>
              </div>
              <div class="step-connector" :class="{ active: currentStep > 3 }"></div>
              <div class="step" :class="{ active: currentStep === 4 }">
                <div class="step-number">4</div>
                <div class="step-label">Launch Audit</div>
              </div>
            </div>

            <!-- Step 1: Extension Installation -->
            <div v-if="currentStep === 1" class="step-content">
              <div class="step-card">
                <div class="step-icon">🌐</div>
                <h3>Install Sentinel Browser Extension</h3>
                <p>Add our security extension to record user sessions and enable authenticated scanning capabilities.</p>
                
                <div class="browser-options">
                  <div class="browser-option" @click="selectBrowser('chrome')">
                    <div class="browser-icon">🦊</div>
                    <span>Firefox</span>
                  </div>
                  <div class="browser-option" @click="selectBrowser('chrome')">
                    <div class="browser-icon">🔵</div>
                    <span>Chrome</span>
                  </div>
                  <div class="browser-option" @click="selectBrowser('edge')">
                    <div class="browser-icon">🌀</div>
                    <span>Edge</span>
                  </div>
                </div>

                <div class="extension-preview">
                  <div class="extension-mockup">
                    <div class="extension-header">
                      <div class="extension-icon">🛡️</div>
                      <span class="extension-name">Sentinel Security</span>
                    </div>
                    <div class="extension-body">
                      <div class="extension-status">
                        <div class="status-indicator active"></div>
                        <span>Ready to record</span>
                      </div>
                      <button class="extension-button" @click="simulateExtensionInstall">
                        {{ extensionInstalled ? '✓ INSTALLED' : 'INSTALL EXTENSION' }}
                      </button>
                    </div>
                  </div>
                </div>

                <div class="step-actions">
                  <button class="btn-secondary" @click="currentStep = 2" :disabled="!extensionInstalled">
                    CONTINUE TO SESSION RECORDING
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 2: Session Recording -->
            <div v-if="currentStep === 2" class="step-content">
              <div class="step-card">
                <div class="step-icon">🎥</div>
                <h3>Record User Session</h3>
                <p>Navigate through your application while we record the authentication flow and user interactions.</p>

                <div class="recording-interface">
                  <div class="recording-controls">
                    <div class="recording-status" :class="{ recording: isRecording }">
                      <div class="recording-indicator"></div>
                      <span>{{ isRecording ? 'RECORDING...' : 'READY TO RECORD' }}</span>
                    </div>
                    
                    <div class="control-buttons">
                      <button class="btn-primary" @click="toggleRecording" :disabled="recordingComplete">
                        {{ isRecording ? 'STOP RECORDING' : 'START RECORDING' }}
                      </button>
                      <button class="btn-secondary" @click="simulateRecording" :disabled="isRecording || recordingComplete">
                        SIMULATE RECORDING
                      </button>
                    </div>
                  </div>

                  <div class="session-preview" v-if="recordedActions.length > 0">
                    <h4>Recorded Actions</h4>
                    <div class="actions-list">
                      <div v-for="(action, index) in recordedActions" :key="index" class="action-item">
                        <div class="action-icon">{{ getActionIcon(action.type) }}</div>
                        <div class="action-details">
                          <span class="action-type">{{ action.type }}</span>
                          <span class="action-target">{{ action.target }}</span>
                        </div>
                        <div class="action-time">{{ action.time }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="recording-tips">
                    <h4>Recording Tips:</h4>
                    <ul>
                      <li>Log in with test credentials</li>
                      <li>Navigate to sensitive areas (admin panels, user settings)</li>
                      <li>Perform critical actions (payments, data exports)</li>
                      <li>Test all user roles if applicable</li>
                    </ul>
                  </div>
                </div>

                <div class="step-actions">
                  <button class="btn-secondary" @click="currentStep = 1">BACK</button>
                  <button class="btn-primary" @click="currentStep = 3" :disabled="!recordingComplete">
                    CONTINUE TO SCAN CONFIG
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 3: Scan Configuration -->
            <div v-if="currentStep === 3" class="step-content">
              <div class="step-card">
                <div class="step-icon">⚙️</div>
                <h3>Configure Deep Scan Parameters</h3>
                <p>Customize the scanning intensity and focus areas for your security audit.</p>

                <div class="scan-configuration">
                  <div class="config-section">
                    <h4>Scan Intensity</h4>
                    <div class="intensity-options">
                      <label class="intensity-option" v-for="intensity in scanIntensities" :key="intensity.level">
                        <input 
                          type="radio" 
                          v-model="selectedIntensity" 
                          :value="intensity.level"
                          class="intensity-radio"
                        >
                        <div class="intensity-card" :class="{ active: selectedIntensity === intensity.level }">
                          <div class="intensity-icon">{{ intensity.icon }}</div>
                          <div class="intensity-info">
                            <strong>{{ intensity.name }}</strong>
                            <span>{{ intensity.description }}</span>
                          </div>
                          <div class="intensity-duration">{{ intensity.duration }}</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div class="config-section">
                    <h4>Vulnerability Focus</h4>
                    <div class="vulnerability-options">
                      <label class="vuln-option" v-for="vuln in vulnerabilityTypes" :key="vuln.id">
                        <input type="checkbox" v-model="selectedVulnerabilities" :value="vuln.id">
                        <div class="vuln-card">
                          <div class="vuln-icon" :style="{ color: vuln.color }">{{ vuln.icon }}</div>
                          <div class="vuln-info">
                            <strong>{{ vuln.name }}</strong>
                            <span>{{ vuln.description }}</span>
                          </div>
                          <div class="vuln-severity" :class="vuln.severity">{{ vuln.severity }}</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div class="config-section">
                    <h4>Advanced Options</h4>
                    <div class="advanced-options">
                      <label class="advanced-option">
                        <input type="checkbox" v-model="advancedOptions.crawlLinks">
                        <span>Automatically crawl discovered links</span>
                      </label>
                      <label class="advanced-option">
                        <input type="checkbox" v-model="advancedOptions.testAPIs">
                        <span>Test API endpoints</span>
                      </label>
                      <label class="advanced-option">
                        <input type="checkbox" v-model="advancedOptions.checkHeaders">
                        <span>Analyze security headers</span>
                      </label>
                      <label class="advanced-option">
                        <input type="checkbox" v-model="advancedOptions.bruteForce">
                        <span>Test for brute force vulnerabilities</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="step-actions">
                  <button class="btn-secondary" @click="currentStep = 2">BACK</button>
                  <button class="btn-primary" @click="currentStep = 4">
                    REVIEW & LAUNCH SCAN
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 4: Launch Scan -->
            <div v-if="currentStep === 4" class="step-content">
              <div class="step-card">
                <div class="step-icon">🚀</div>
                <h3>Ready for Deep Security Audit</h3>
                <p>Review your configuration and launch the comprehensive security scan.</p>

                <div class="scan-summary">
                  <div class="summary-section">
                    <h4>Scan Configuration</h4>
                    <div class="summary-grid">
                      <div class="summary-item">
                        <span class="summary-label">Intensity:</span>
                        <span class="summary-value">{{ getIntensityName(selectedIntensity) }}</span>
                      </div>
                      <div class="summary-item">
                        <span class="summary-label">Vulnerabilities:</span>
                        <span class="summary-value">{{ selectedVulnerabilities.length }} types</span>
                      </div>
                      <div class="summary-item">
                        <span class="summary-label">Recorded Actions:</span>
                        <span class="summary-value">{{ recordedActions.length }} steps</span>
                      </div>
                      <div class="summary-item">
                        <span class="summary-label">Estimated Duration:</span>
                        <span class="summary-value">{{ getEstimatedDuration() }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="summary-section">
                    <h4>Target Coverage</h4>
                    <div class="coverage-metrics">
                      <div class="coverage-metric">
                        <div class="metric-value">100%</div>
                        <div class="metric-label">Authentication Flow</div>
                      </div>
                      <div class="coverage-metric">
                        <div class="metric-value">95%</div>
                        <div class="metric-label">User Privileges</div>
                      </div>
                      <div class="coverage-metric">
                        <div class="metric-value">90%</div>
                        <div class="metric-label">Business Logic</div>
                      </div>
                      <div class="coverage-metric">
                        <div class="metric-value">85%</div>
                        <div class="metric-label">API Endpoints</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="risk-assessment">
                  <h4>Risk Assessment Preview</h4>
                  <div class="risk-meters">
                    <div class="risk-meter">
                      <div class="meter-label">Authentication Security</div>
                      <div class="meter-bar">
                        <div class="meter-fill" style="width: 85%"></div>
                      </div>
                      <div class="meter-value">HIGH RISK</div>
                    </div>
                    <div class="risk-meter">
                      <div class="meter-label">Data Exposure</div>
                      <div class="meter-bar">
                        <div class="meter-fill" style="width: 60%"></div>
                      </div>
                      <div class="meter-value">MEDIUM RISK</div>
                    </div>
                    <div class="risk-meter">
                      <div class="meter-label">Input Validation</div>
                      <div class="meter-bar">
                        <div class="meter-fill" style="width: 45%"></div>
                      </div>
                      <div class="meter-value">LOW RISK</div>
                    </div>
                  </div>
                </div>

                <div class="step-actions">
                  <button class="btn-secondary" @click="currentStep = 3">BACK</button>
                  <button class="btn-primary large" @click="launchDeepScan">
                    🚀 LAUNCH DEEP SECURITY AUDIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Active Scan Dashboard -->
        <section class="active-scan" v-else>
          <div class="scan-header">
            <h1 class="scan-title">DEEP SECURITY AUDIT IN PROGRESS</h1>
            <p class="scan-subtitle">Comprehensive vulnerability analysis running</p>
          </div>

          <div class="scan-dashboard">
            <!-- Progress Overview -->
            <div class="progress-overview">
              <div class="progress-card">
                <div class="progress-header">
                  <h3>Scan Progress</h3>
                  <div class="progress-time">Elapsed: {{ elapsedTime }}</div>
                </div>
                <div class="progress-bar-large">
                  <div class="progress-fill" :style="{ width: `${deepScanProgress}%` }"></div>
                </div>
                <div class="progress-stats">
                  <div class="progress-stat">
                    <div class="stat-value">{{ deepScanProgress }}%</div>
                    <div class="stat-label">Overall Progress</div>
                  </div>
                  <div class="progress-stat">
                    <div class="stat-value">{{ vulnerabilitiesFound }}</div>
                    <div class="stat-label">Vulnerabilities Found</div>
                  </div>
                  <div class="progress-stat">
                    <div class="stat-value">{{ endpointsTested }}</div>
                    <div class="stat-label">Endpoints Tested</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Real-time Scanning Modules -->
            <div class="scan-modules">
              <div class="module-grid">
                <div class="module-card" v-for="module in scanModules" :key="module.id" 
                     :class="{ active: module.active, completed: module.progress === 100 }">
                  <div class="module-header">
                    <div class="module-icon">{{ module.icon }}</div>
                    <h4>{{ module.name }}</h4>
                    <div class="module-status">
                      <span v-if="module.progress === 100">✓</span>
                      <span v-else-if="module.active">⟳</span>
                      <span v-else>⏸</span>
                    </div>
                  </div>
                  <div class="module-progress">
                    <div class="module-bar">
                      <div class="module-fill" :style="{ width: `${module.progress}%` }"></div>
                    </div>
                    <span class="module-percent">{{ module.progress }}%</span>
                  </div>
                  <div class="module-details">
                    <span class="module-info">{{ module.info }}</span>
                    <span class="module-findings" v-if="module.findings > 0">
                      {{ module.findings }} findings
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Live Vulnerability Feed -->
            <div class="vulnerability-feed">
              <div class="feed-header">
                <h3>Live Vulnerability Detection</h3>
                <div class="feed-controls">
                  <button class="filter-btn" :class="{ active: currentFilter === 'all' }" 
                          @click="currentFilter = 'all'">All</button>
                  <button class="filter-btn" :class="{ active: currentFilter === 'critical' }" 
                          @click="currentFilter = 'critical'">Critical</button>
                  <button class="filter-btn" :class="{ active: currentFilter === 'high' }" 
                          @click="currentFilter = 'high'">High</button>
                </div>
              </div>
              <div class="feed-content">
                <div v-for="finding in filteredFindings" :key="finding.id" class="finding-item">
                  <div class="finding-severity" :class="finding.severity"></div>
                  <div class="finding-content">
                    <div class="finding-header">
                      <span class="finding-title">{{ finding.title }}</span>
                      <span class="finding-time">{{ finding.time }}</span>
                    </div>
                    <p class="finding-description">{{ finding.description }}</p>
                    <div class="finding-meta">
                      <span class="finding-location">{{ finding.location }}</span>
                      <span class="finding-cvss">CVSS: {{ finding.cvss }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Scan Controls -->
            <div class="scan-controls">
              <button class="btn-secondary" @click="pauseScan" :disabled="!scanRunning">
                {{ scanRunning ? 'PAUSE SCAN' : 'SCAN PAUSED' }}
              </button>
              <button class="btn-danger" @click="stopScan">STOP SCAN</button>
              <button class="btn-primary" @click="generateReport" :disabled="deepScanProgress < 100">
                GENERATE REPORT
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Quick Stats Sidebar -->
    <aside class="stats-sidebar">
      <div class="sidebar-section">
        <h4>Scan Statistics</h4>
        <div class="stat-cards">
          <div class="stat-card">
            <div class="stat-icon">🛡️</div>
            <div class="stat-info">
              <div class="stat-number">{{ securityScore }}/100</div>
              <div class="stat-label">Security Score</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-info">
              <div class="stat-number">{{ scanSpeed }} req/s</div>
              <div class="stat-label">Scan Speed</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🔍</div>
            <div class="stat-info">
              <div class="stat-number">{{ testsCompleted }}</div>
              <div class="stat-label">Tests Completed</div>
            </div>
          </div>
        </div>
      </div>

      <div class="sidebar-section">
        <h4>Risk Distribution</h4>
        <div class="risk-chart">
          <div class="risk-segment critical" style="flex: 3">
            <span class="risk-label">Critical</span>
            <span class="risk-count">12</span>
          </div>
          <div class="risk-segment high" style="flex: 5">
            <span class="risk-label">High</span>
            <span class="risk-count">8</span>
          </div>
          <div class="risk-segment medium" style="flex: 7">
            <span class="risk-label">Medium</span>
            <span class="risk-count">15</span>
          </div>
          <div class="risk-segment low" style="flex: 10">
            <span class="risk-label">Low</span>
            <span class="risk-count">23</span>
          </div>
        </div>
      </div>

      <div class="sidebar-section">
        <h4>Recent Activity</h4>
        <div class="activity-feed">
          <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
            <div class="activity-icon">{{ activity.icon }}</div>
            <div class="activity-details">
              <span class="activity-message">{{ activity.message }}</span>
              <span class="activity-time">{{ activity.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Wizard State
const currentStep = ref(1)
const scanSetupComplete = ref(false)
const extensionInstalled = ref(false)
const isRecording = ref(false)
const recordingComplete = ref(false)

// Scan Configuration
const selectedIntensity = ref('comprehensive')
const selectedVulnerabilities = ref(['sqli', 'xss', 'rce', 'auth'])
const advancedOptions = ref({
  crawlLinks: true,
  testAPIs: true,
  checkHeaders: true,
  bruteForce: false
})

// Active Scan State
const deepScanProgress = ref(0)
const scanRunning = ref(false)
const vulnerabilitiesFound = ref(0)
const endpointsTested = ref(0)
const currentFilter = ref('all')
const elapsedTime = ref('00:00:00')

// Mock Data
const recordedActions = ref([
  { type: 'navigation', target: 'Login Page', time: '00:01' },
  { type: 'input', target: 'Username Field', time: '00:02' },
  { type: 'input', target: 'Password Field', time: '00:03' },
  { type: 'click', target: 'Login Button', time: '00:04' },
  { type: 'navigation', target: 'Dashboard', time: '00:06' },
  { type: 'click', target: 'User Settings', time: '00:08' }
])

const scanIntensities = ref([
  { level: 'quick', name: 'Quick Scan', icon: '⚡', description: 'Basic vulnerability check', duration: '5-10 min' },
  { level: 'standard', name: 'Standard Audit', icon: '🔍', description: 'Comprehensive security assessment', duration: '15-30 min' },
  { level: 'comprehensive', name: 'Deep Audit', icon: '🚀', description: 'Full penetration testing', duration: '45-60 min' }
])

const vulnerabilityTypes = ref([
  { id: 'sqli', name: 'SQL Injection', icon: '💉', description: 'Database manipulation attacks', severity: 'critical', color: '#ff4444' },
  { id: 'xss', name: 'XSS', icon: '⚡', description: 'Cross-site scripting', severity: 'high', color: '#ffa500' },
  { id: 'rce', name: 'RCE', icon: '🎯', description: 'Remote code execution', severity: 'critical', color: '#ff4444' },
  { id: 'auth', name: 'Auth Bypass', icon: '🔑', description: 'Authentication vulnerabilities', severity: 'high', color: '#ffa500' },
  { id: 'csrf', name: 'CSRF', icon: '🔄', description: 'Cross-site request forgery', severity: 'medium', color: '#ffff00' },
  { id: 'idor', name: 'IDOR', icon: '👤', description: 'Insecure direct object references', severity: 'medium', color: '#ffff00' }
])

const scanModules = ref([
  { id: 1, name: 'Authentication Testing', icon: '🔑', progress: 100, active: false, info: 'Login security analysis', findings: 3 },
  { id: 2, name: 'Session Management', icon: '🔄', progress: 85, active: true, info: 'Cookie and token analysis', findings: 2 },
  { id: 3, name: 'Input Validation', icon: '📝', progress: 60, active: true, info: 'Form and API input testing', findings: 7 },
  { id: 4, name: 'Business Logic', icon: '🧠', progress: 45, active: true, info: 'Workflow vulnerability testing', findings: 4 },
  { id: 5, name: 'API Security', icon: '🌐', progress: 30, active: true, info: 'Endpoint security assessment', findings: 5 },
  { id: 6, name: 'Data Exposure', icon: '📊', progress: 20, active: true, info: 'Sensitive data leakage', findings: 1 }
])

const liveFindings = ref([
  { id: 1, title: 'SQL Injection in Login Form', description: 'User input not properly sanitized in username field', severity: 'critical', location: '/login', cvss: 9.8, time: '2 min ago' },
  { id: 2, title: 'XSS in Search Parameter', description: 'Reflected XSS vulnerability in search functionality', severity: 'high', location: '/search', cvss: 7.4, time: '3 min ago' },
  { id: 3, title: 'Weak Session Management', description: 'Session tokens not properly invalidated on logout', severity: 'medium', location: '/logout', cvss: 5.2, time: '4 min ago' },
  { id: 4, title: 'IDOR in User Profile', description: 'User can access other profiles by modifying ID parameter', severity: 'high', location: '/profile', cvss: 8.2, time: '5 min ago' }
])

const recentActivities = ref([
  { id: 1, icon: '🔍', message: 'Started authentication testing', time: '2 min ago' },
  { id: 2, icon: '⚡', message: 'Found SQL injection vulnerability', time: '3 min ago' },
  { id: 3, icon: '🛡️', message: 'Completed session security analysis', time: '4 min ago' },
  { id: 4, icon: '📊', message: 'Generated intermediate report', time: '5 min ago' }
])

// Computed
const filteredFindings = computed(() => {
  if (currentFilter.value === 'all') return liveFindings.value
  return liveFindings.value.filter(f => f.severity === currentFilter.value)
})

const securityScore = computed(() => Math.max(0, 100 - (vulnerabilitiesFound.value * 2)))
const scanSpeed = computed(() => Math.floor(50 + Math.random() * 50))
const testsCompleted = computed(() => Math.floor(deepScanProgress.value * 2))

// Methods
const simulateExtensionInstall = () => {
  extensionInstalled.value = true
}

const toggleRecording = () => {
  isRecording.value = !isRecording.value
  if (!isRecording.value) {
    recordingComplete.value = true
  }
}

const simulateRecording = () => {
  isRecording.value = true
  setTimeout(() => {
    isRecording.value = false
    recordingComplete.value = true
  }, 3000)
}

const getActionIcon = (type: string) => {
  const icons: { [key: string]: string } = {
    navigation: '🧭',
    input: '⌨️',
    click: '👆',
    submit: '📤'
  }
  return icons[type] || '🔍'
}

const getIntensityName = (level: string) => {
  const intensity = scanIntensities.value.find(i => i.level === level)
  return intensity ? intensity.name : 'Unknown'
}

const getEstimatedDuration = () => {
  const intensity = scanIntensities.value.find(i => i.level === selectedIntensity.value)
  return intensity ? intensity.duration : 'Unknown'
}

const launchDeepScan = () => {
  scanSetupComplete.value = true
  scanRunning.value = true
  startScanSimulation()
}

const pauseScan = () => {
  scanRunning.value = !scanRunning.value
}

const stopScan = () => {
  scanRunning.value = false
  scanSetupComplete.value = false
  currentStep.value = 1
  deepScanProgress.value = 0
}

const generateReport = () => {
  alert('Comprehensive security report generated!')
}

const startScanSimulation = () => {
  let progress = 0
  const interval = setInterval(() => {
    if (scanRunning.value && progress < 100) {
      progress += 0.5
      deepScanProgress.value = Math.min(100, Math.floor(progress))
      
      // Update modules progress
      scanModules.value.forEach(module => {
        if (module.progress < 100) {
          module.progress = Math.min(100, module.progress + Math.random() * 2)
        }
      })
      
      // Randomly find vulnerabilities
      if (Math.random() > 0.7) {
        vulnerabilitiesFound.value++
      }
      
      // Update endpoints tested
      endpointsTested.value = Math.floor(deepScanProgress.value * 1.5)
      
      // Update elapsed time
      const totalSeconds = Math.floor(progress * 60)
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60
      elapsedTime.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      
    } else if (progress >= 100) {
      clearInterval(interval)
      scanRunning.value = false
    }
  }, 100)
}

onMounted(() => {
  // Initialize any required setup
})

onUnmounted(() => {
  // Cleanup any intervals
})
</script>

<style scoped>
.deep-scan-dashboard {
  min-height: 100vh;
  background: #000;
  color: white;
  display: grid;
  grid-template-columns: 1fr 300px;
  font-family: 'Courier New', monospace;
}

/* Header Styles */
.dashboard-header {
  grid-column: 1 / -1;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #00f0ff;
  padding: 1rem 0;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #00f0ff;
  text-decoration: none;
  font-family: 'Orbitron', monospace;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.back-button:hover {
  color: #b967ff;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  font-size: 1.2rem;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(0, 240, 255, 0.3);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 240, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.user-name {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  color: #00f0ff;
}

/* Main Dashboard */
.dashboard-main {
  padding: 2rem;
  overflow-y: auto;
}

.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Setup Wizard */
.setup-wizard {
  max-width: 800px;
  margin: 0 auto;
}

.wizard-header {
  text-align: center;
  margin-bottom: 3rem;
}

.wizard-title {
  font-family: 'Orbitron', monospace;
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.wizard-subtitle {
  color: #ccc;
  font-size: 1.1rem;
  line-height: 1.6;
}

/* Step Indicator */
.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  gap: 0.5rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  font-weight: 700;
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: #00f0ff;
  border-color: #00f0ff;
  color: black;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
}

.step.completed .step-number {
  background: #00ff41;
  border-color: #00ff41;
  color: black;
}

.step-label {
  font-size: 0.8rem;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.step.active .step-label {
  color: #00f0ff;
}

.step-connector {
  width: 80px;
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.step-connector.active {
  background: linear-gradient(90deg, #00f0ff, #00ff41);
}

/* Step Content */
.step-content {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.step-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
}

.step-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.step-card h3 {
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
}

.step-card p {
  color: #ccc;
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* Browser Options */
.browser-options {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.browser-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
}

.browser-option:hover {
  border-color: #00f0ff;
  transform: translateY(-2px);
}

.browser-icon {
  font-size: 2rem;
}

/* Extension Preview */
.extension-preview {
  margin: 2rem 0;
}

.extension-mockup {
  background: #1a1a1a;
  border: 1px solid #00f0ff;
  border-radius: 8px;
  overflow: hidden;
  max-width: 300px;
  margin: 0 auto;
}

.extension-header {
  background: rgba(0, 240, 255, 0.1);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(0, 240, 255, 0.3);
}

.extension-icon {
  font-size: 1.2rem;
}

.extension-name {
  font-weight: 600;
  color: #00f0ff;
}

.extension-body {
  padding: 1rem;
}

.extension-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00ff41;
  animation: scanPulse 2s infinite;
}

.extension-button {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  border: none;
  border-radius: 6px;
  color: black;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.extension-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(0, 240, 255, 0.3);
}

/* Recording Interface */
.recording-interface {
  text-align: left;
}

.recording-controls {
  background: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
}

.recording-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: center;
  font-weight: 600;
}

.recording-status.recording {
  color: #00ff41;
}

.recording-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff4444;
  animation: recordingPulse 1s infinite;
}

@keyframes recordingPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.recording-status.recording .recording-indicator {
  background: #00ff41;
}

.control-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.session-preview {
  background: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
}

.session-preview h4 {
  margin-bottom: 1rem;
  color: #00f0ff;
  font-family: 'Orbitron', monospace;
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}

.action-icon {
  font-size: 1.2rem;
}

.action-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.action-type {
  font-weight: 600;
  color: #00f0ff;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

.action-target {
  color: #ccc;
  font-size: 0.9rem;
}

.action-time {
  color: #888;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
}

.recording-tips {
  background: rgba(0, 240, 255, 0.1);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 240, 255, 0.3);
}

.recording-tips h4 {
  color: #00f0ff;
  margin-bottom: 1rem;
  font-family: 'Orbitron', monospace;
}

.recording-tips ul {
  text-align: left;
  color: #ccc;
  line-height: 1.6;
}

.recording-tips li {
  margin-bottom: 0.5rem;
}

/* Scan Configuration */
.scan-configuration {
  text-align: left;
}

.config-section {
  margin-bottom: 2rem;
}

.config-section h4 {
  color: #00f0ff;
  margin-bottom: 1rem;
  font-family: 'Orbitron', monospace;
}

.intensity-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.intensity-option {
  cursor: pointer;
}

.intensity-radio {
  display: none;
}

.intensity-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.intensity-card.active {
  border-color: #00f0ff;
  background: rgba(0, 240, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 240, 255, 0.2);
}

.intensity-icon {
  font-size: 2rem;
}

.intensity-info {
  flex: 1;
  text-align: left;
}

.intensity-info strong {
  display: block;
  margin-bottom: 0.25rem;
  color: white;
}

.intensity-info span {
  color: #ccc;
  font-size: 0.9rem;
}

.intensity-duration {
  color: #00ff41;
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

.vulnerability-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.vuln-option {
  cursor: pointer;
}

.vuln-option input {
  display: none;
}

.vuln-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.vuln-option input:checked + .vuln-card {
  border-color: #00f0ff;
  background: rgba(0, 240, 255, 0.1);
}

.vuln-icon {
  font-size: 1.5rem;
}

.vuln-info {
  flex: 1;
  text-align: left;
}

.vuln-info strong {
  display: block;
  margin-bottom: 0.25rem;
  color: white;
  font-size: 0.9rem;
}

.vuln-info span {
  color: #ccc;
  font-size: 0.8rem;
}

.vuln-severity {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.vuln-severity.critical {
  background: rgba(255, 0, 0, 0.2);
  color: #ff4444;
  border: 1px solid #ff4444;
}

.vuln-severity.high {
  background: rgba(255, 165, 0, 0.2);
  color: #ffa500;
  border: 1px solid #ffa500;
}

.vuln-severity.medium {
  background: rgba(255, 255, 0, 0.2);
  color: #ffff00;
  border: 1px solid #ffff00;
}

.advanced-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.advanced-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.advanced-option:hover {
  background: rgba(255, 255, 255, 0.08);
}

.advanced-option input {
  margin: 0;
}

/* Scan Summary */
.scan-summary {
  text-align: left;
  margin-bottom: 2rem;
}

.summary-section {
  margin-bottom: 2rem;
}

.summary-section h4 {
  color: #00f0ff;
  margin-bottom: 1rem;
  font-family: 'Orbitron', monospace;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.summary-label {
  color: #ccc;
  font-weight: 600;
}

.summary-value {
  color: #00ff41;
  font-family: 'Courier New', monospace;
  font-weight: 700;
}

.coverage-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.coverage-metric {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(0, 240, 255, 0.2);
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00f0ff;
  margin-bottom: 0.5rem;
}

.metric-label {
  color: #ccc;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Risk Assessment */
.risk-assessment {
  text-align: left;
  margin-bottom: 2rem;
}

.risk-assessment h4 {
  color: #00f0ff;
  margin-bottom: 1rem;
  font-family: 'Orbitron', monospace;
}

.risk-meters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.risk-meter {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.meter-label {
  flex: 1;
  color: white;
  font-weight: 600;
}

.meter-bar {
  flex: 2;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.meter-fill {
  height: 100%;
  background: linear-gradient(90deg, #00ff41, #ffa500, #ff4444);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.meter-value {
  min-width: 80px;
  text-align: right;
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

/* Active Scan Dashboard */
.active-scan {
  animation: fadeIn 0.5s ease-out;
}

.scan-header {
  text-align: center;
  margin-bottom: 3rem;
}

.scan-title {
  font-family: 'Orbitron', monospace;
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.scan-subtitle {
  color: #ccc;
  font-size: 1.1rem;
}

/* Progress Overview */
.progress-overview {
  margin-bottom: 2rem;
}

.progress-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.progress-header h3 {
  font-family: 'Orbitron', monospace;
  color: white;
  margin: 0;
}

.progress-time {
  color: #00ff41;
  font-family: 'Courier New', monospace;
  font-weight: 600;
}

.progress-bar-large {
  height: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00f0ff, #00ff41);
  border-radius: 6px;
  transition: width 0.3s ease;
}

.progress-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.progress-stat {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00f0ff;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #ccc;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Scan Modules */
.scan-modules {
  margin-bottom: 2rem;
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.module-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.module-card.active {
  border-color: #00f0ff;
  background: rgba(0, 240, 255, 0.1);
}

.module-card.completed {
  border-color: #00ff41;
  background: rgba(0, 255, 65, 0.1);
}

.module-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.module-icon {
  font-size: 1.5rem;
}

.module-header h4 {
  flex: 1;
  margin: 0;
  color: white;
  font-family: 'Orbitron', monospace;
}

.module-status {
  color: #00ff41;
  font-weight: 700;
}

.module-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.module-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.module-fill {
  height: 100%;
  background: linear-gradient(90deg, #00f0ff, #00ff41);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.module-percent {
  color: #00ff41;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  min-width: 40px;
}

.module-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.module-info {
  color: #ccc;
  font-size: 0.8rem;
}

.module-findings {
  color: #ff4444;
  font-weight: 600;
  font-size: 0.8rem;
}

/* Vulnerability Feed */
.vulnerability-feed {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.feed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.feed-header h3 {
  font-family: 'Orbitron', monospace;
  color: white;
  margin: 0;
}

.feed-controls {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: #ccc;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn.active {
  background: #00f0ff;
  border-color: #00f0ff;
  color: black;
  font-weight: 600;
}

.feed-content {
  max-height: 400px;
  overflow-y: auto;
}

.finding-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.3s ease;
}

.finding-item:hover {
  background: rgba(255, 255, 255, 0.02);
}

.finding-item:last-child {
  border-bottom: none;
}

.finding-severity {
  width: 4px;
  border-radius: 2px;
  flex-shrink: 0;
}

.finding-severity.critical { background: #ff4444; }
.finding-severity.high { background: #ffa500; }
.finding-severity.medium { background: #ffff00; }

.finding-content {
  flex: 1;
}

.finding-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.5rem;
}

.finding-title {
  font-weight: 600;
  color: white;
  flex: 1;
}

.finding-time {
  color: #888;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
}

.finding-description {
  color: #ccc;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  font-size: 0.9rem;
}

.finding-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: #888;
}

.finding-location {
  font-family: 'Courier New', monospace;
}

.finding-cvss {
  font-weight: 600;
  color: #ff4444;
}

/* Scan Controls */
.scan-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Stats Sidebar */
.stats-sidebar {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  overflow-y: auto;
}

.sidebar-section {
  margin-bottom: 2rem;
}

.sidebar-section h4 {
  color: #00f0ff;
  margin-bottom: 1rem;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
}

.stat-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 1.2rem;
  font-weight: 700;
  color: #00f0ff;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #ccc;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Risk Chart */
.risk-chart {
  display: flex;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
}

.risk-segment {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
}

.risk-segment.critical { background: #ff4444; }
.risk-segment.high { background: #ffa500; }
.risk-segment.medium { background: #ffff00; color: #000; }
.risk-segment.low { background: #00ff41; }

.risk-label {
  text-transform: uppercase;
  letter-spacing: 1px;
}

.risk-count {
  font-family: 'Courier New', monospace;
}

/* Activity Feed */
.activity-feed {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.activity-icon {
  font-size: 1.2rem;
}

.activity-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.activity-message {
  color: white;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.activity-time {
  color: #888;
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
}

/* Button Styles */
.btn-primary, .btn-secondary, .btn-danger {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  color: black;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 240, 255, 0.3);
}

.btn-secondary {
  background: transparent;
  border: 2px solid #00f0ff;
  color: #00f0ff;
}

.btn-secondary:hover:not(:disabled) {
  background: rgba(0, 240, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
}

.btn-danger {
  background: transparent;
  border: 2px solid #ff4444;
  color: #ff4444;
}

.btn-danger:hover:not(:disabled) {
  background: rgba(255, 68, 68, 0.1);
  box-shadow: 0 0 20px rgba(255, 68, 68, 0.3);
}

.btn-primary.large {
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
}

.btn-primary:disabled, .btn-secondary:disabled, .btn-danger:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.step-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .deep-scan-dashboard {
    grid-template-columns: 1fr;
  }
  
  .stats-sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .dashboard-main {
    padding: 1rem;
  }
  
  .step-indicator {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .step-connector {
    display: none;
  }
  
  .control-buttons {
    flex-direction: column;
  }
  
  .scan-controls {
    flex-direction: column;
  }
  
  .module-grid {
    grid-template-columns: 1fr;
  }
  
  .vulnerability-options {
    grid-template-columns: 1fr;
  }
  
  .summary-grid {
    grid-template-columns: 1fr;
  }
  
  .coverage-metrics {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .wizard-title {
    font-size: 2rem;
  }
  
  .scan-title {
    font-size: 2rem;
  }
  
  .step-card {
    padding: 1.5rem;
  }
  
  .browser-options {
    flex-direction: column;
    align-items: center;
  }
  
  .browser-option {
    width: 100%;
    max-width: 200px;
  }
}
</style>