<template>
  <div class="landing-page">
    <!-- Cyber Navigation -->
    <nav class="cyber-nav">
      <div class="nav-container">
        <div class="nav-logo">
          <img src="../assets/images/icon128.png" alt="GeniusGuard" class="logo-icon">
          <span class="logo-text">GENIUSGUARD</span>
        </div>
        <div class="nav-links">
          <a href="#features" class="nav-link">FEATURES</a>
          <a href="#scanner" class="nav-link">SCANNER</a>
          <a href="#threats" class="nav-link">THREATS</a>
          <button class="nav-cta" @click="navigateToDashboard">DASHBOARD</button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="cyber-grid-overlay"></div>
        <div class="floating-orbs">
          <div class="orb orb-1"></div>
          <div class="orb orb-2"></div>
          <div class="orb orb-3"></div>
        </div>
      </div>
      
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-pulse"></span>
          AI-POWERED SECURITY PLATFORM
        </div>
        
        <h1 class="hero-title">
          <div class="hero-logo">
            <img src="../assets/images/icon128.png" alt="GeniusGuard" class="logo-icon">
          </div>
          <span class="title-line gradient-text">GENIUSGUARD</span>          
        </h1>
        
        <p class="hero-subtitle">
          Enterprise-grade vulnerability scanning powered by artificial intelligence. 
          <br>Protect your digital assets with military-grade security analysis.
        </p>

        <!-- Live Stats -->
        <div class="live-stats">
          <div class="stat">
            <div class="stat-value">{{ globalStats.total_scans || 0 }}</div>
            <div class="stat-label">TOTAL SCANS</div>
          </div>
          <div class="stat">
            <div class="stat-value">{{ globalStats.high_risk_scans || 0 }}</div>
            <div class="stat-label">HIGH RISK SCANS</div>
          </div>
          <div class="stat">
            <div class="stat-value">{{ globalStats.total_vulnerabilities_found || 0 }}</div>
            <div class="stat-label">VULNERABILITIES FOUND</div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="hero-actions">
          <button class="cta-primary" @click="startQuickScan">
            <span class="btn-icon">🔍</span>
            INSTANT SECURITY SCAN
          </button>
          <button class="cta-secondary" @click="navigateToDeepScan">
            <span class="btn-icon">⚡</span>
            DEEP SECURITY SCAN
          </button>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="scroll-indicator">
        <div class="scroll-line"></div>
        <span>EXPLORE PLATFORM</span>
      </div>
    </section>

    <!-- Main Content with AI Sidebar -->
    <div class="main-content-with-ai">
      <!-- Left Side - Scanner Section -->
      <section id="scanner" class="scanner-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">QUANTUM SECURITY SCANNER</h2>
            <p class="section-subtitle">Enter any URL for instant AI-powered vulnerability analysis</p>
          </div>

          <div class="scanner-interface">
            <!-- URL Input -->
            <div class="scanner-input-group">
              <div class="input-container">
                <input 
                  v-model="targetUrl"
                  type="text" 
                  placeholder="https://your-website.com"
                  class="cyber-input scanner-input"
                  :disabled="scanning"
                  @keyup.enter="initiateQuickScan"
                />
                <div class="input-decoration">
                  <div class="input-line"></div>
                </div>
              </div>
              <button 
                class="scan-button"
                :class="{ scanning: scanning }"
                @click="initiateQuickScan"
                :disabled="scanning || !targetUrl"
              >
                <span v-if="!scanning" class="scan-text">LAUNCH SCAN</span>
                <span v-else class="scan-text">SCANNING...</span>
                <div class="scan-progress" :style="{ width: `${scanProgress}%` }"></div>
              </button>
            </div>

            <!-- Demo Mode Indicator -->
            <div v-if="isDemoMode" class="demo-mode-indicator">
              <span class="demo-icon">🎮</span>
              DEMO MODE - Using simulated data
            </div>

            <!-- Connection Status -->
            <div v-if="connectionStatus" class="connection-status" :class="connectionStatus.type">
              <span class="status-icon">{{ connectionStatus.icon }}</span>
              {{ connectionStatus.message }}
            </div>

            <!-- Scan Visualization -->
            <div v-if="scanning" class="scan-visualization">
              <div class="scan-layers">
                <div class="scan-layer" :style="{ animationDelay: '0s' }">
                  <div class="layer-label">INITIAL RECONNAISSANCE</div>
                  <div class="layer-progress"></div>
                </div>
                <div class="scan-layer" :style="{ animationDelay: '1s' }">
                  <div class="layer-label">VULNERABILITY SCANNING</div>
                  <div class="layer-progress"></div>
                </div>
                <div class="scan-layer" :style="{ animationDelay: '2s' }">
                  <div class="layer-label">THREAT INTELLIGENCE</div>
                  <div class="layer-progress"></div>
                </div>
                <div class="scan-layer" :style="{ animationDelay: '3s' }">
                  <div class="layer-label">COMPLIANCE ASSESSMENT</div>
                  <div class="layer-progress"></div>
                </div>
              </div>

              <!-- Vulnerability Indicators -->
              <div class="vulnerability-indicators">
                <div 
                  v-for="vuln in detectedVulnerabilities" 
                  :key="vuln.id"
                  class="vulnerability-indicator"
                  :class="{ active: vuln.detected }"
                >
                  <div class="indicator-icon" :class="vuln.severity">
                    {{ getVulnIcon(vuln.type) }}
                  </div>
                  <div class="indicator-name">{{ vuln.name }}</div>
                  <div class="indicator-severity" :class="vuln.severity">
                    {{ vuln.severity }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Scan Results -->
            <div v-if="scanComplete" class="scan-results">
              <div class="results-header">
                <h3>SCAN COMPLETE</h3>
                <div class="risk-score" :class="riskScoreClass">
                  RISK SCORE: {{ currentScanResult.risk_score || 0 }}/100
                </div>
              </div>
              
              <!-- Scan Summary -->
              <div class="scan-summary">
                <div class="summary-item">
                  <span class="summary-label">Target:</span>
                  <span class="summary-value">{{ currentScanResult.target_url }}</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">Duration:</span>
                  <span class="summary-value">{{ currentScanResult.scan_duration }} seconds</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">Vulnerabilities Found:</span>
                  <span class="summary-value">{{ currentScanResult.total_vulnerabilities }}</span>
                </div>
              </div>

              <!-- Vulnerabilities List -->
              <div class="vulnerabilities-list">
                <div class="vulnerability-card" 
                     v-for="vulnerability in currentScanResult.vulnerabilities" 
                     :key="vulnerability.id"
                     :class="{ 'active': activeVulnerability?.id === vulnerability.id }"
                     @click="selectVulnerability(vulnerability)">
                  <div class="vuln-header">
                    <div class="severity-badge" :class="vulnerability.severity">
                      {{ vulnerability.severity.toUpperCase() }}
                    </div>
                    <div class="cvss-score">CVSS: {{ vulnerability.cvss_score }}</div>
                  </div>
                  <h4 class="vuln-title">{{ vulnerability.title }}</h4>
                  <p class="vuln-description">{{ truncateDescription(vulnerability.description) }}</p>
                  <div class="vuln-footer">
                    <span class="analysis-indicator" v-if="vulnerability.has_ai_analysis">
                      🤖 AI Ready
                    </span>
                    <button class="select-btn" :class="{ 'selected': activeVulnerability?.id === vulnerability.id }">
                      {{ activeVulnerability?.id === vulnerability.id ? 'Selected' : 'Analyze' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Right Side - AI Analysis Section -->
      <section class="ai-analysis-section" :class="{ 'has-selection': activeVulnerability }">
        <div class="ai-analysis-container">
          <!-- Header -->
          <div class="ai-header">
            <div class="ai-title">
              <div class="ai-icon">🤖</div>
              <div class="title-content">
                <h3>AI Security Analysis</h3>
                <p>Powered by Groq AI • Real-time Insights</p>
              </div>
            </div>
            <div class="ai-status" v-if="activeVulnerability">
              <div class="status-badge" :class="activeVulnerability.severity">
                {{ activeVulnerability.severity.toUpperCase() }}
              </div>
            </div>
          </div>

          <!-- Selected Vulnerability -->
          <div v-if="activeVulnerability" class="selected-vulnerability">
            <h4 class="selected-title">{{ activeVulnerability.title }}</h4>
            <p class="selected-description">{{ activeVulnerability.description }}</p>
            <div class="vuln-stats">
              <div class="stat">
                <span class="stat-label">CVSS Score</span>
                <span class="stat-value">{{ activeVulnerability.cvss_score }}/10</span>
              </div>
              <div class="stat">
                <span class="stat-label">Priority</span>
                <span class="stat-value" :class="getPriorityClass(activeVulnerability)">
                  {{ getPriorityText(activeVulnerability) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Analysis Interface -->
          <div class="analysis-interface" v-if="activeVulnerability">
            <!-- Analysis Type Selector -->
            <div class="analysis-tabs">
              <button class="tab-btn" 
                      :class="{ 'active': currentAnalysisType === 'simple' }"
                      @click="currentAnalysisType = 'simple'">
                <span class="tab-icon">👥</span>
                <span class="tab-text">Simple</span>
              </button>
              <button class="tab-btn" 
                      :class="{ 'active': currentAnalysisType === 'technical' }"
                      @click="currentAnalysisType = 'technical'">
                <span class="tab-icon">⚙️</span>
                <span class="tab-text">Technical</span>
              </button>
              <button class="tab-btn" 
                      :class="{ 'active': currentAnalysisType === 'risk' }"
                      @click="currentAnalysisType = 'risk'">
                <span class="tab-icon">⚠️</span>
                <span class="tab-text">Risk</span>
              </button>
            </div>

            <!-- Analysis Content -->
            <div class="analysis-content">
              <!-- Loading State -->
              <div v-if="aiAnalysisLoading" class="loading-state">
                <div class="loading-animation">
                  <div class="loading-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                  </div>
                </div>
                <p class="loading-text">AI is analyzing the vulnerability...</p>
                <p class="loading-subtext">Generating comprehensive security insights</p>
              </div>

              <!-- Error State -->
              <div v-else-if="aiAnalysisError" class="error-state">
                <div class="error-icon">⚠️</div>
                <h5>Analysis Failed</h5>
                <p>Unable to generate AI analysis at this time.</p>
                <button class="retry-btn" @click="generateAIAnalysis(activeVulnerability)">
                  Try Again
                </button>
              </div>

              <!-- Simple Explanation -->
              <div v-else-if="currentAnalysisType === 'simple' && currentAIAnalysis.simple_explanation" 
                   class="analysis-view simple-view">
                <div class="view-header">
                  <h5>Simple Explanation</h5>
                  <p>Easy-to-understand overview for everyone</p>
                </div>
                <div class="view-content">
                  <div class="explanation-card">
                    <p>{{ currentAIAnalysis.simple_explanation }}</p>
                  </div>
                  <div v-if="currentAIAnalysis.key_points && currentAIAnalysis.key_points.length" 
                       class="key-points">
                    <h6>Key Points</h6>
                    <div class="points-list">
                      <div class="point" v-for="(point, index) in currentAIAnalysis.key_points" :key="index">
                        <span class="point-number">{{ index + 1 }}</span>
                        <span class="point-text">{{ point }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Technical Explanation -->
              <div v-else-if="currentAnalysisType === 'technical' && currentAIAnalysis.technical_explanation" 
                   class="analysis-view technical-view">
                <div class="view-header">
                  <h5>Technical Analysis</h5>
                  <p>Detailed technical insights for developers</p>
                </div>
                <div class="view-content">
                  <div class="tech-section">
                    <h6>Root Cause</h6>
                    <p>{{ extractRootCause(currentAIAnalysis.technical_explanation) }}</p>
                  </div>
                  <div class="tech-section">
                    <h6>Impact</h6>
                    <p>{{ extractImpact(currentAIAnalysis.technical_explanation) }}</p>
                  </div>
                  <div class="tech-section">
                    <h6>Remediation Steps</h6>
                    <div class="steps">
                      <div class="step" v-for="(step, index) in extractFixSteps(currentAIAnalysis.technical_explanation)" :key="index">
                        <span class="step-number">{{ index + 1 }}</span>
                        <span class="step-text">{{ step }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Risk Assessment -->
              <div v-else-if="currentAnalysisType === 'risk' && currentAIAnalysis.risk_assessment" 
                   class="analysis-view risk-view">
                <div class="view-header">
                  <h5>Risk Assessment</h5>
                  <p>Business impact and security implications</p>
                </div>
                <div class="view-content">
                  <div class="risk-summary">
                    <p>{{ currentAIAnalysis.risk_assessment }}</p>
                  </div>
                  <div class="risk-metrics">
                    <div class="metric">
                      <div class="metric-info">
                        <span class="metric-label">Exploitation Likelihood</span>
                        <span class="metric-value">{{ getExploitationLikelihood(activeVulnerability) }}</span>
                      </div>
                      <div class="metric-bar">
                        <div class="bar-fill" :style="{ width: getLikelihoodPercentage(activeVulnerability) }"></div>
                      </div>
                    </div>
                    <div class="metric">
                      <div class="metric-info">
                        <span class="metric-label">Business Impact</span>
                        <span class="metric-value">{{ getBusinessImpact(activeVulnerability) }}</span>
                      </div>
                      <div class="metric-bar">
                        <div class="bar-fill" :style="{ width: getImpactPercentage(activeVulnerability) }"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- No Analysis Available -->
              <div v-else class="no-analysis">
                <div class="no-analysis-content">
                  <div class="ai-graphic">🤖</div>
                  <h5>AI Analysis Ready</h5>
                  <p>Generate comprehensive AI-powered insights for this vulnerability</p>
                  <button class="generate-btn" 
                          @click="generateAIAnalysis(activeVulnerability)"
                          :disabled="aiAnalysisLoading">
                    {{ aiAnalysisLoading ? 'Generating...' : 'Generate Analysis' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Analysis Actions -->
            <div class="analysis-actions" v-if="currentAIAnalysis.simple_explanation">
              <button class="action-btn copy" @click="copyAnalysis">
                📋 Copy
              </button>
              <button class="action-btn export" @click="exportAnalysis">
                📄 Export
              </button>
            </div>
          </div>

          <!-- No Selection State -->
          <div v-else class="no-selection">
            <div class="no-selection-content">
              <div class="selection-graphic">🔍</div>
              <h4>Select a Vulnerability</h4>
              <p>Click on any vulnerability from the scan results to view AI-powered analysis</p>
              <div class="features">
                <div class="feature">
                  <span class="feature-icon">👥</span>
                  <span>Simple explanations</span>
                </div>
                <div class="feature">
                  <span class="feature-icon">⚙️</span>
                  <span>Technical guides</span>
                </div>
                <div class="feature">
                  <span class="feature-icon">⚠️</span>
                  <span>Risk assessment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Features Section -->
    <section id="features" class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">MILITARY-GRADE FEATURES</h2>
          <p class="section-subtitle">Advanced security capabilities for enterprise protection</p>
        </div>

        <div class="features-grid">
          <div class="feature-card" v-for="feature in features" :key="feature.id">
            <div class="feature-icon" :style="{ color: feature.color }">
              {{ feature.icon }}
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
            <div class="feature-stats">
              <span class="stat">{{ feature.stat }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Threat Feed -->
    <section id="threats" class="threats-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">LIVE GLOBAL THREAT INTELLIGENCE</h2>
          <p class="section-subtitle">Real-time security monitoring powered by AI analysis</p>
        </div>

        <div class="threat-visualization">
          <div class="threat-globe">
            <div class="globe-placeholder">
              <div class="pulse-rings">
                <div class="pulse-ring" v-for="n in 3" :key="n" :style="getRingStyle(n)"></div>
              </div>
              <div class="threat-dots">
                <div class="threat-dot" v-for="dot in threatDots" :key="dot.id" 
                     :style="dot.style"></div>
              </div>
            </div>
          </div>
          
          <div class="threat-feed">
            <div class="feed-header">
              <h3>ACTIVE THREATS</h3>
              <div class="live-indicator">
                <span class="live-pulse"></span>
                LIVE
              </div>
            </div>
            <div class="feed-items">
              <div class="feed-item" v-for="threat in liveThreats" :key="threat.id">
                <div class="threat-type" :class="threat.type">{{ threat.type }}</div>
                <div class="threat-info">
                  <span class="threat-target">{{ threat.title }}</span>
                  <span class="threat-time">{{ formatTime(threat.detected_at) }}</span>
                </div>
                <div class="threat-severity" :class="threat.severity">
                  {{ threat.severity }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>READY TO SECURE YOUR DIGITAL PRESENCE?</h2>
          <p>Join thousands of enterprises protecting their assets with Genius Software Guard</p>
          <div class="cta-actions">
            <button class="cta-primary large" @click="startQuickScan">START FREE SCAN</button>
            <button class="cta-secondary large" @click="navigateToDashboard">VIEW DASHBOARD</button>
          </div>
          <div class="trust-badges">
            <div class="trust-badge">ENTERPRISE GRADE</div>
            <div class="trust-badge">REAL-TIME ANALYSIS</div>
            <div class="trust-badge">AI POWERED</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="cyber-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="logo">GENIUS GUARD</div>
            <p>Quantum Security Intelligence Platform</p>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h4>SCANNING</h4>
              <a @click="startQuickScan">Quick Scan</a>
              <a @click="navigateToDeepScan">Deep Scan</a>
              <a @click="loadThreatIntelligence">Threat Intel</a>
            </div>
            <div class="link-group">
              <h4>PLATFORM</h4>
              <a @click="navigateToDashboard">Dashboard</a>
              <a @click="loadGlobalStats">Statistics</a>
              <a @click="loadLiveThreats">Live Feed</a>
            </div>
            <div class="link-group">
              <h4>SECURITY</h4>
              <a>Vulnerabilities</a>
              <a>Compliance</a>
              <a>Reports</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Genius Software Guard. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Quick Scan Modal -->
    <div v-if="showScanModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>Quick Security Scan</h3>
        <p>Enter the URL you want to scan:</p>
        <input 
          v-model="quickScanUrl" 
          class="cyber-input" 
          placeholder="https://example.com" 
          @keyup.enter="executeQuickScan" 
        />
        <div class="modal-actions">
          <button @click="closeModal" class="cta-secondary">CANCEL</button>
          <button @click="executeQuickScan" class="cta-primary">SCAN NOW</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Smart API configuration
const API_BASE = '/api'
const isDemoMode = ref(false)
const backendAvailable = ref(false)

// Authentication helper
const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token')
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

// Check if user is authenticated
const checkAuthentication = () => {
  const token = localStorage.getItem('auth_token')
  return !!token
}

// Error handling helper
const handleApiError = (error: any, context = '') => {
  console.error(`API Error in ${context}:`, error)
  
  if (error.status === 403) {
    showStatus('warning', 'Authentication required for full features. Using demo mode.')
    return true
  }
  
  if (error.status === 404) {
    showStatus('warning', 'Service temporarily unavailable. Using demo mode.')
    return true
  }
  
  showStatus('error', `Request failed: ${error.message}`)
  return false
}

// Reactive data
const targetUrl = ref('')
const scanning = ref(false)
const scanProgress = ref(0)
const scanComplete = ref(false)
const showScanModal = ref(false)
const quickScanUrl = ref('')
const connectionStatus = ref<{type: string, message: string, icon: string} | null>(null)

const features = ref([
  { 
    id: 1, 
    icon: '🛡️', 
    title: 'AI-Powered Scanning', 
    description: 'Machine learning algorithms detect zero-day vulnerabilities with advanced pattern recognition', 
    color: '#00f0ff', 
    stat: '99.9% Accuracy' 
  },
  { 
    id: 2, 
    icon: '🌐', 
    title: 'Global Threat Intelligence', 
    description: 'Real-time threat data aggregation from multiple intelligence sources worldwide', 
    color: '#b967ff', 
    stat: 'Real-time Updates' 
  },
  { 
    id: 3, 
    icon: '⚡', 
    title: 'Lightning Fast Scans', 
    description: 'Optimized scanning algorithms deliver comprehensive results in record time', 
    color: '#00ff41', 
    stat: '<50ms Scans' 
  },
  { 
    id: 4, 
    icon: '🔍', 
    title: 'Deep Vulnerability Analysis', 
    description: 'Multi-layered security assessment covering infrastructure and application layers', 
    color: '#ff00ff', 
    stat: '500+ Tests' 
  }
])

const threatDots = ref([
  { id: 1, style: 'left: 30%; top: 40%;' },
  { id: 2, style: 'left: 60%; top: 35%;' },
  { id: 3, style: 'left: 45%; top: 55%;' },
  { id: 4, style: 'left: 70%; top: 60%;' }
])

// Scan results data
const currentScanResult = ref<any>({
  risk_score: 0,
  target_url: '',
  scan_duration: 0,
  total_vulnerabilities: 0,
  vulnerabilities: []
})

const globalStats = ref({
  total_scans: 0,
  high_risk_scans: 0,
  total_vulnerabilities_found: 0,
  average_scan_duration: 0
})

const liveThreats = ref<any[]>([])
const detectedVulnerabilities = ref<any[]>([])

// Computed properties
const riskScoreClass = computed(() => {
  const score = currentScanResult.value.risk_score || 0
  if (score >= 80) return 'critical'
  if (score >= 60) return 'high'
  if (score >= 40) return 'medium'
  return 'low'
})

// Methods
const showStatus = (type: string, message: string) => {
  const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' }
  connectionStatus.value = { type, message, icon: icons[type as keyof typeof icons] }
  setTimeout(() => {
    connectionStatus.value = null
  }, 5000)
}

const initiateQuickScan = async () => {
  if (!targetUrl.value) {
    showStatus('error', 'Please enter a URL to scan')
    return
  }

  scanning.value = true
  scanProgress.value = 0
  scanComplete.value = false
  currentScanResult.value = {
    risk_score: 0,
    target_url: targetUrl.value,
    scan_duration: 0,
    total_vulnerabilities: 0,
    vulnerabilities: []
  }
  detectedVulnerabilities.value = []

  try {
    showStatus('info', 'Initiating security scan...')
    
    const response = await fetch(`${API_BASE}/quick-scan/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        url: targetUrl.value
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    await simulateScanProgress()
    
    currentScanResult.value = {
      risk_score: data.risk_score || 0,
      target_url: targetUrl.value,
      scan_duration: data.scan_duration || 0,
      total_vulnerabilities: data.total_vulnerabilities || 0,
      vulnerabilities: data.findings?.vulnerabilities || []
    }
    
    updateDetectedVulnerabilities(currentScanResult.value.vulnerabilities)
    
    scanComplete.value = true
    scanning.value = false
    showStatus('success', 'Security scan completed successfully!')
    
    // Reload global stats to reflect new scan
    loadGlobalStats()
    
  } catch (error) {
    console.error('Scan failed:', error)
    showStatus('error', 'Scan failed. Please try again.')
    scanning.value = false
  }
}

const simulateScanProgress = async () => {
  const phases = [
    { progress: 25, message: 'Initial Reconnaissance' },
    { progress: 50, message: 'Vulnerability Scanning' },
    { progress: 75, message: 'Threat Intelligence Analysis' },
    { progress: 100, message: 'Final Analysis' }
  ]
  
  for (const phase of phases) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    scanProgress.value = phase.progress
    showStatus('info', `${phase.message}... ${phase.progress}%`)
  }
}

const updateDetectedVulnerabilities = (vulnerabilities: any[]) => {
  const vulnTypes = ['xss', 'sqli', 'rce', 'csrf', 'lfi']
  detectedVulnerabilities.value = vulnTypes.map(type => {
    const detected = vulnerabilities.some(v => 
      v.title.toLowerCase().includes(type) || 
      v.description.toLowerCase().includes(type)
    )
    return {
      id: type,
      type: type,
      name: type.toUpperCase(),
      detected: detected,
      severity: detected ? 'high' : 'low'
    }
  })
}

const startQuickScan = () => {
  showScanModal.value = true
}

const executeQuickScan = () => {
  if (quickScanUrl.value) {
    targetUrl.value = quickScanUrl.value
    showScanModal.value = false
    initiateQuickScan()
  }
}

const closeModal = () => {
  showScanModal.value = false
  quickScanUrl.value = ''
}

const navigateToDeepScan = () => {
  if (!checkAuthentication()) {
    showStatus('warning', 'Please sign in to access Deep Scan features')
    router.push('/login')
    return
  }
  router.push('/deep-scan')
}

const navigateToDashboard = () => {
  if (!checkAuthentication()) {
    showStatus('warning', 'Please sign in to access Dashboard')
    router.push('/login')
    return
  }
  router.push('/dashboard')
}

const loadGlobalStats = async () => {
  try {
    const response = await fetch(`${API_BASE}/global-stats/`, {
      headers: getAuthHeaders()
    })
    
    if (response.ok) {
      const data = await response.json()
      if (data.length > 0) {
        globalStats.value = data[0]
      } else if (data.total_scans !== undefined) {
        // Handle single object response
        globalStats.value = data
      }
      isDemoMode.value = false
      backendAvailable.value = true
    } else {
      // Use real database data even if API structure is different
      await loadRealStatsFromDB()
    }
  } catch (error) {
    console.error('Failed to load global stats:', error)
    await loadRealStatsFromDB()
  }
}

const loadRealStatsFromDB = async () => {
  try {
    // Alternative endpoint or direct database stats
    const response = await fetch(`${API_BASE}/scan-results/stats/`, {
      headers: getAuthHeaders()
    })
    
    if (response.ok) {
      const data = await response.json()
      globalStats.value = data
    } else {
      // Calculate from available data
      globalStats.value.total_scans = ScanResult.objects?.count() || 0
      globalStats.value.high_risk_scans = ScanResult.objects?.filter(risk_score__gte=70)?.count() || 0
      globalStats.value.total_vulnerabilities_found = Vulnerability.objects?.count() || 0
    }
  } catch (error) {
    console.error('Failed to load real stats:', error)
  }
}

const loadThreatIntelligence = async () => {
  try {
    const response = await fetch(`${API_BASE}/threat-intelligence/live_feed/`, {
      headers: getAuthHeaders()
    })
    
    if (response.ok) {
      const data = await response.json()
      liveThreats.value = data
      isDemoMode.value = false
    } else {
      await loadRealThreats()
    }
  } catch (error) {
    console.error('Failed to load threat intelligence:', error)
    await loadRealThreats()
  }
}

const loadRealThreats = async () => {
  try {
    // Try alternative endpoint for threats
    const response = await fetch(`${API_BASE}/threats/active/`, {
      headers: getAuthHeaders()
    })
    
    if (response.ok) {
      const data = await response.json()
      liveThreats.value = data
    } else {
      // Get threats from vulnerabilities
      const vulnResponse = await fetch(`${API_BASE}/vulnerabilities/recent/`, {
        headers: getAuthHeaders()
      })
      
      if (vulnResponse.ok) {
        const vulns = await vulnResponse.json()
        liveThreats.value = vulns.map((vuln: any, index: number) => ({
          id: index + 1,
          type: vuln.title.split(' ')[0].toUpperCase(),
          title: vuln.title,
          detected_at: vuln.created_at,
          severity: vuln.severity
        }))
      }
    }
  } catch (error) {
    console.error('Failed to load real threats:', error)
  }
}

const loadLiveThreats = () => {
  loadThreatIntelligence()
}

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  return `${hours}h ago`
}

const getVulnIcon = (type: string) => {
  const icons: { [key: string]: string } = {
    xss: '⚡',
    sqli: '💉',
    rce: '🎯',
    csrf: '🔄',
    lfi: '📁'
  }
  return icons[type] || '⚠️'
}

const getRingStyle = (index: number) => {
  const size = 100 + (index * 40)
  const delay = index * 0.5
  return {
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`
  }
}

// Check backend connection
const checkBackendConnection = async () => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    
    const response = await fetch(`${API_BASE}/health/`, {
      method: 'GET',
      headers: getAuthHeaders(),
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (response.ok) {
      backendAvailable.value = true
      isDemoMode.value = false
      showStatus('success', 'Backend connected successfully')
    } else {
      backendAvailable.value = false
      isDemoMode.value = true
      showStatus('info', 'Using limited functionality mode')
    }
  } catch (error) {
    console.warn('Backend not available:', error)
    backendAvailable.value = false
    isDemoMode.value = true
    showStatus('info', 'Using limited functionality mode')
  }
}

// Initialize
onMounted(() => {
  loadGlobalStats()
  loadThreatIntelligence()
  checkBackendConnection()
  
  const statsInterval = setInterval(loadGlobalStats, 30000)
  const threatsInterval = setInterval(loadThreatIntelligence, 15000)

  onUnmounted(() => {
    clearInterval(statsInterval)
    clearInterval(threatsInterval)
  })
})


// AI Analysis Reactive State
const activeVulnerability = ref<any>(null)
const currentAnalysisType = ref('simple')
const currentAIAnalysis = ref<any>({})
const aiAnalysisLoading = ref(false)
const aiAnalysisError = ref(false)

// Methods
const selectVulnerability = (vulnerability: any) => {
  activeVulnerability.value = vulnerability
  currentAnalysisType.value = 'simple'
  currentAIAnalysis.value = {}
  
  // If vulnerability already has AI analysis, use it
  if (vulnerability.has_ai_analysis && vulnerability.ai_analysis) {
    currentAIAnalysis.value = vulnerability.ai_analysis
  }
}

const generateAIAnalysis = async (vulnerability: any) => {
  if (!vulnerability) return
  
  aiAnalysisLoading.value = true
  aiAnalysisError.value = false
  
  try {
    const response = await fetch(`${API_BASE}/ai-analysis/quick/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        vulnerability: {
          title: vulnerability.title,
          description: vulnerability.description,
          severity: vulnerability.severity,
          cvss_score: vulnerability.cvss_score,
          recommendation: vulnerability.recommendation,
          evidence: vulnerability.evidence
        }
      })
    })

    if (!response.ok) {
      throw new Error('AI analysis failed')
    }

    const data = await response.json()
    currentAIAnalysis.value = data.analysis
    
    // Update the vulnerability in the list to show it has AI analysis
    const vulnIndex = currentScanResult.value.vulnerabilities.findIndex(
      (v: any) => v.id === vulnerability.id
    )
    if (vulnIndex !== -1) {
      currentScanResult.value.vulnerabilities[vulnIndex].has_ai_analysis = true
      currentScanResult.value.vulnerabilities[vulnIndex].ai_analysis = data.analysis
    }
    
  } catch (error) {
    console.error('AI analysis error:', error)
    aiAnalysisError.value = true
  } finally {
    aiAnalysisLoading.value = false
  }
}

// Helper Methods (same as before, but simplified)
const truncateDescription = (description: string, length: number = 100) => {
  if (!description) return ''
  return description.length > length ? description.substring(0, length) + '...' : description
}

const extractRootCause = (technicalExplanation: string) => {
  if (!technicalExplanation) return 'Root cause analysis will be provided in the AI analysis.'
  const sentences = technicalExplanation.split('.')
  return sentences[0] + '.'
}

const extractImpact = (technicalExplanation: string) => {
  if (!technicalExplanation) return 'Impact analysis will be provided in the AI analysis.'
  const sentences = technicalExplanation.split('.')
  return sentences.length > 1 ? sentences[1] + '.' : 'Impact analysis not available.'
}

const extractFixSteps = (technicalExplanation: string) => {
  if (!technicalExplanation) return ['Detailed fix steps will be provided in the AI analysis.']
  const steps = technicalExplanation.split(/\d+\./).filter(step => step.trim().length > 10)
  return steps.length > 0 ? steps.slice(0, 3).map(step => step.trim()) : ['Implement security best practices', 'Follow the recommended remediation', 'Conduct security testing']
}

const getPriorityClass = (vulnerability: any) => {
  if (!vulnerability) return 'medium'
  if (vulnerability.severity === 'critical') return 'critical'
  if (vulnerability.severity === 'high') return 'high'
  if (vulnerability.severity === 'medium') return 'medium'
  return 'low'
}

const getPriorityText = (vulnerability: any) => {
  if (!vulnerability) return 'Medium'
  if (vulnerability.severity === 'critical') return 'Immediate'
  if (vulnerability.severity === 'high') return 'High'
  if (vulnerability.severity === 'medium') return 'Medium'
  return 'Low'
}

const getExploitationLikelihood = (vulnerability: any) => {
  const severity = vulnerability?.severity
  if (severity === 'critical') return 'Very High'
  if (severity === 'high') return 'High'
  if (severity === 'medium') return 'Medium'
  return 'Low'
}

const getLikelihoodPercentage = (vulnerability: any) => {
  const severity = vulnerability?.severity
  if (severity === 'critical') return '85%'
  if (severity === 'high') return '70%'
  if (severity === 'medium') return '50%'
  return '30%'
}

const getBusinessImpact = (vulnerability: any) => {
  const severity = vulnerability?.severity
  if (severity === 'critical') return 'Severe'
  if (severity === 'high') return 'High'
  if (severity === 'medium') return 'Moderate'
  return 'Low'
}

const getImpactPercentage = (vulnerability: any) => {
  const severity = vulnerability?.severity
  if (severity === 'critical') return '90%'
  if (severity === 'high') return '75%'
  if (severity === 'medium') return '60%'
  return '40%'
}

const copyAnalysis = () => {
  let textToCopy = ''
  switch (currentAnalysisType.value) {
    case 'simple':
      textToCopy = currentAIAnalysis.value.simple_explanation
      break
    case 'technical':
      textToCopy = currentAIAnalysis.value.technical_explanation
      break
    case 'risk':
      textToCopy = currentAIAnalysis.value.risk_assessment
      break
  }
  
  navigator.clipboard.writeText(textToCopy)
}

const exportAnalysis = () => {
  console.log('Export analysis functionality')
}
</script>

<style scoped>
/* Main Layout */
.main-content-with-ai {
  display: grid;
  grid-template-columns: 1fr 400px;
  min-height: 80vh;
  gap: 0;
}

.scanner-section {
  background: #0a0a0a;
  padding: 2rem 0;
}

.ai-analysis-section {
  background: rgba(10, 10, 10, 0.95);
  border-left: 1px solid rgba(0, 240, 255, 0.2);
  height: 100%;
  position: sticky;
  top: 0;
}

.ai-analysis-section.has-selection {
  background: rgba(15, 15, 15, 0.98);
}

.ai-analysis-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Scanner Results */
.vulnerabilities-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.vulnerability-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.vulnerability-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 240, 255, 0.3);
  transform: translateY(-2px);
}

.vulnerability-card.active {
  background: rgba(0, 240, 255, 0.1);
  border-color: #00f0ff;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
}

.vuln-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.severity-badge {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
}

.severity-badge.critical { background: rgba(255, 68, 68, 0.2); color: #ff4444; border: 1px solid #ff4444; }
.severity-badge.high { background: rgba(255, 107, 53, 0.2); color: #ff6b35; border: 1px solid #ff6b35; }
.severity-badge.medium { background: rgba(255, 165, 0, 0.2); color: #ffa500; border: 1px solid #ffa500; }
.severity-badge.low { background: rgba(0, 255, 65, 0.2); color: #00ff41; border: 1px solid #00ff41; }

.cvss-score {
  font-family: 'Courier New', monospace;
  color: #00f0ff;
  font-weight: 600;
  font-size: 0.9rem;
}

.vuln-title {
  font-family: 'Orbitron', monospace;
  color: white;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.vuln-description {
  color: #ccc;
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.vuln-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.analysis-indicator {
  color: #b967ff;
  font-size: 0.8rem;
  font-weight: 600;
}

.select-btn {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: #ccc;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.select-btn:hover {
  background: rgba(0, 240, 255, 0.2);
  border-color: #00f0ff;
  color: #00f0ff;
}

.select-btn.selected {
  background: rgba(0, 240, 255, 0.3);
  border-color: #00f0ff;
  color: #00f0ff;
}

/* AI Analysis Section */
.ai-header {
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ai-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.ai-icon {
  font-size: 2rem;
}

.title-content h3 {
  color: #00f0ff;
  margin: 0;
  font-family: 'Orbitron', monospace;
  font-size: 1.3rem;
}

.title-content p {
  color: #ccc;
  margin: 0.25rem 0 0 0;
  font-size: 0.85rem;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
}

.status-badge.critical { background: rgba(255, 68, 68, 0.2); color: #ff4444; border: 1px solid #ff4444; }
.status-badge.high { background: rgba(255, 107, 53, 0.2); color: #ff6b35; border: 1px solid #ff6b35; }
.status-badge.medium { background: rgba(255, 165, 0, 0.2); color: #ffa500; border: 1px solid #ffa500; }
.status-badge.low { background: rgba(0, 255, 65, 0.2); color: #00ff41; border: 1px solid #00ff41; }

/* Selected Vulnerability */
.selected-vulnerability {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.selected-title {
  color: white;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  font-family: 'Orbitron', monospace;
}

.selected-description {
  color: #ccc;
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.vuln-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  color: #888;
  font-size: 0.8rem;
  font-weight: 600;
}

.stat-value {
  font-family: 'Courier New', monospace;
  font-weight: 700;
  font-size: 0.9rem;
}

.stat-value.critical { color: #ff4444; }
.stat-value.high { color: #ff6b35; }
.stat-value.medium { color: #ffa500; }
.stat-value.low { color: #00ff41; }

/* Analysis Interface */
.analysis-interface {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.analysis-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tab-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 1rem;
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
}

.tab-btn:hover {
  color: #00f0ff;
  background: rgba(0, 240, 255, 0.05);
}

.tab-btn.active {
  color: #00f0ff;
  background: rgba(0, 240, 255, 0.1);
  border-bottom: 2px solid #00f0ff;
}

.tab-icon {
  font-size: 1.2rem;
}

.tab-text {
  font-weight: 600;
}

.analysis-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 2rem;
}

.loading-animation {
  margin-bottom: 1rem;
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00f0ff;
  animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.loading-text {
  color: #00f0ff;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.loading-subtext {
  color: #888;
  font-size: 0.9rem;
}

/* Error State */
.error-state {
  text-align: center;
  padding: 2rem;
}

.error-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  opacity: 0.7;
}

.error-state h5 {
  color: #ff6b35;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', monospace;
}

.error-state p {
  color: #ccc;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.retry-btn {
  padding: 0.75rem 1.5rem;
  background: rgba(255, 107, 53, 0.2);
  border: 1px solid #ff6b35;
  border-radius: 6px;
  color: #ff6b35;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: rgba(255, 107, 53, 0.3);
}

/* Analysis Views */
.view-header {
  margin-bottom: 1.5rem;
}

.view-header h5 {
  color: #00f0ff;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', monospace;
}

.view-header p {
  color: #888;
  font-size: 0.9rem;
  margin: 0;
}

.view-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Simple View */
.explanation-card {
  background: rgba(0, 240, 255, 0.05);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 8px;
  padding: 1.25rem;
}

.explanation-card p {
  color: #ccc;
  line-height: 1.6;
  margin: 0;
}

.key-points h6 {
  color: #00ff41;
  margin-bottom: 1rem;
  font-family: 'Orbitron', monospace;
  font-size: 0.9rem;
}

.points-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.point {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.point-number {
  background: #00ff41;
  color: black;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.point-text {
  color: #ccc;
  line-height: 1.5;
  font-size: 0.9rem;
  flex: 1;
}

/* Technical View */
.tech-section {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tech-section h6 {
  color: #00f0ff;
  margin-bottom: 0.75rem;
  font-family: 'Orbitron', monospace;
  font-size: 0.9rem;
}

.tech-section p {
  color: #ccc;
  line-height: 1.6;
  margin: 0;
  font-size: 0.9rem;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.step-number {
  background: rgba(0, 240, 255, 0.2);
  color: #00f0ff;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
  font-family: 'Courier New', monospace;
}

.step-text {
  color: #ccc;
  line-height: 1.5;
  font-size: 0.9rem;
  flex: 1;
}

/* Risk View */
.risk-summary {
  background: rgba(255, 107, 53, 0.05);
  border: 1px solid rgba(255, 107, 53, 0.2);
  border-radius: 8px;
  padding: 1.25rem;
}

.risk-summary p {
  color: #ccc;
  line-height: 1.6;
  margin: 0;
  font-size: 0.9rem;
}

.risk-metrics {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.metric {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.metric-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.metric-label {
  color: #ccc;
  font-size: 0.9rem;
  font-weight: 600;
}

.metric-value {
  font-family: 'Courier New', monospace;
  font-weight: 700;
  font-size: 0.9rem;
}

.metric-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff4444, #ff6b35);
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* No Analysis */
.no-analysis {
  padding: 2rem;
  text-align: center;
}

.no-analysis-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.ai-graphic {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.no-analysis h5 {
  color: #00f0ff;
  margin: 0;
  font-family: 'Orbitron', monospace;
}

.no-analysis p {
  color: #ccc;
  margin: 0;
  font-size: 0.9rem;
  text-align: center;
}

.generate-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  border: none;
  border-radius: 8px;
  color: black;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Orbitron', monospace;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 240, 255, 0.3);
}

.generate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* No Selection */
.no-selection {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.no-selection-content {
  text-align: center;
  max-width: 300px;
}

.selection-graphic {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.7;
}

.no-selection h4 {
  color: #00f0ff;
  margin-bottom: 1rem;
  font-family: 'Orbitron', monospace;
}

.no-selection p {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #888;
  font-size: 0.9rem;
}

.feature-icon {
  font-size: 1.1rem;
}

/* Analysis Actions */
.analysis-actions {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  flex: 1;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
  font-weight: 600;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.action-btn.copy:hover {
  border-color: #00ff41;
  color: #00ff41;
}

.action-btn.export:hover {
  border-color: #00f0ff;
  color: #00f0ff;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-content-with-ai {
    grid-template-columns: 1fr;
  }
  
  .ai-analysis-section {
    border-left: none;
    border-top: 1px solid rgba(0, 240, 255, 0.2);
  }
}

@media (max-width: 768px) {
  .vuln-stats {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .analysis-tabs {
    grid-template-columns: 1fr;
  }
  
  .ai-header {
    padding: 1.5rem;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .ai-title {
    flex-direction: column;
    text-align: center;
  }
}

/* Add new styles for demo mode and enhanced UI */
.demo-mode-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(255, 165, 0, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.3);
  border-radius: 8px;
  color: #ffa500;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  margin: 1rem 0;
}

.demo-icon {
  font-size: 1.2rem;
}

.summary-value.demo {
  color: #ffa500;
  font-weight: 700;
}

.scan-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  border: 1px solid rgba(0, 240, 255, 0.1);
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.summary-label {
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Courier New', monospace;
}

.summary-value {
  font-size: 1rem;
  color: #00f0ff;
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

.no-vulnerabilities {
  text-align: center;
  padding: 3rem 2rem;
  color: #00ff41;
}

.safe-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-vulnerabilities h4 {
  font-family: 'Orbitron', monospace;
  margin-bottom: 0.5rem;
  color: #00ff41;
}

.no-vulnerabilities p {
  color: #ccc;
  font-size: 1rem;
}

/* Update connection status styles */
.connection-status {
  padding: 12px;
  border-radius: 6px;
  margin: 10px 0;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.connection-status.info {
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid #00f0ff;
  color: #00f0ff;
}

.connection-status.success {
  background: rgba(0, 255, 65, 0.1);
  border: 1px solid #00ff41;
  color: #00ff41;
}

.connection-status.error {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid #ff4444;
  color: #ff4444;
}

.connection-status.warning {
  background: rgba(255, 165, 0, 0.1);
  border: 1px solid #ffa500;
  color: #ffa500;
}

.status-icon {
  font-size: 1.1rem;
}

/* Rest of your original cyberpunk styles remain exactly the same */
/* [All your existing CSS styles from the original template] */

.landing-page {
  min-height: 100vh;
  background: #000;
  color: white;
  position: relative;
  z-index: 10;
}

/* Navigation */
.cyber-nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #00f0ff;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Navigation Logo Styles */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.hero-logo{
  img{
    width: 150px;  /* Fixed size - not oversized */
    height: 150px; /* Fixed size - not oversized */
    object-fit: cover;
    filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.5));
    transition: all 0.3s ease;
  }
  
}

.logo-icon {
  width: 32px;  /* Fixed size - not oversized */
  height: 32px; /* Fixed size - not oversized */
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.5));
  transition: all 0.3s ease;
}

.logo-icon:hover {
  filter: drop-shadow(0 0 12px rgba(0, 240, 255, 0.8));
  transform: scale(1.05);
}

.logo-text {
  font-family: 'Orbitron', monospace;
  font-weight: 900;
  font-size: 1.25rem;
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 2px;
}

/* Remove any conflicting styles that might be making it oversized */
.nav-logo .logo-icon {
  /* Ensure no other styles override the size */
  width: 32px !important;
  height: 32px !important;
  max-width: 32px !important;
  max-height: 32px !important;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: #ccc;
  text-decoration: none;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #00f0ff;
}

.nav-cta {
  background: transparent;
  border: 1px solid #00f0ff;
  color: #00f0ff;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  font-family: 'Orbitron', monospace;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-cta:hover {
  background: rgba(0, 240, 255, 0.1);
  box-shadow: 0 0 15px #00f0ff;
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 80%, rgba(0, 240, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(185, 103, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(0, 255, 65, 0.05) 0%, transparent 50%);
}

.cyber-grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

.floating-orbs {
  position: absolute;
  width: 100%;
  height: 100%;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.3;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: #00f0ff;
  top: 10%;
  left: 10%;
  animation: float 8s ease-in-out infinite;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: #b967ff;
  top: 60%;
  left: 80%;
  animation: float 12s ease-in-out infinite reverse;
}

.orb-3 {
  width: 150px;
  height: 150px;
  background: #00ff41;
  top: 80%;
  left: 20%;
  animation: float 10s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.hero-content {
  text-align: center;
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid #00f0ff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #00f0ff;
  margin-bottom: 2rem;
  font-family: 'Courier New', monospace;
}

.badge-pulse {
  width: 8px;
  height: 8px;
  background: #00ff41;
  border-radius: 50%;
  animation: scanPulse 2s infinite;
}

@keyframes scanPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 255, 65, 0.7);
  }
  50% {
    transform: scale(1.2);
    box-shadow: 0 0 0 10px rgba(0, 255, 65, 0);
  }
}

.hero-title {
  font-family: 'Orbitron', monospace;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.title-line {
  display: block;
}

.gradient-text {
  background: linear-gradient(135deg, #00f0ff, #b967ff, #00ff41);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.live-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
}

.stat {
  text-align: center;
}

.stat-value {
  font-family: 'Orbitron', monospace;
  font-size: 2.5rem;
  font-weight: 700;
  color: #00f0ff;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-primary, .cta-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  text-decoration: none;
}

.cta-primary {
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  color: black;
}

.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 240, 255, 0.3);
}

.cta-secondary {
  background: transparent;
  border: 2px solid #b967ff;
  color: #b967ff;
}

.cta-secondary:hover {
  background: rgba(185, 103, 255, 0.1);
  box-shadow: 0 0 20px rgba(185, 103, 255, 0.3);
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to top, #00f0ff, transparent);
  animation: scrollBounce 2s infinite;
}

@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Scanner Section */
.scanner-section {
  padding: 6rem 0;
  background: #0a0a0a;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-family: 'Orbitron', monospace;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #ccc;
}

.scanner-interface {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.scanner-input-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.input-container {
  flex: 1;
  position: relative;
}

.scanner-input {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #00f0ff;
  color: white;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
}

.scanner-input:focus {
  box-shadow: 0 0 0 2px rgba(0, 240, 255, 0.1), 0 0 10px #00f0ff;
  background: rgba(255, 255, 255, 0.08);
}

.scanner-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #00f0ff, #b967ff);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.scanner-input:focus + .input-decoration {
  transform: scaleX(1);
}

.scan-button {
  position: relative;
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  color: black;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  min-width: 160px;
}

.scan-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.scan-button.scanning {
  background: linear-gradient(135deg, #00ff41, #00f0ff);
}

.scan-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: #00ff41;
  transition: width 0.3s ease;
  border-radius: 0 0 8px 8px;
}

.scan-text {
  position: relative;
  z-index: 2;
}

.scan-visualization {
  margin: 2rem 0;
}

.scan-layers {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.scan-layer {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #00f0ff;
  position: relative;
  overflow: hidden;
}

.scan-layer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.2), transparent);
  animation: scanLayerProgress 3s ease-in-out infinite;
}

@keyframes scanLayerProgress {
  0% { left: -100%; }
  100% { left: 100%; }
}

.layer-label {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #00f0ff;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 2;
}

.layer-progress {
  height: 4px;
  background: rgba(0, 240, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  z-index: 2;
}

.layer-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, #00f0ff, #00ff41);
  animation: layerProgressFill 2s ease-in-out infinite;
}

@keyframes layerProgressFill {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

.vulnerability-indicators {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.vulnerability-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
  min-height: 120px;
}

.vulnerability-indicator.active {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  animation: glowRed 2s ease-in-out infinite alternate;
}

@keyframes glowRed {
  from { box-shadow: 0 0 5px rgba(255, 0, 0, 0.3); }
  to { box-shadow: 0 0 20px rgba(255, 0, 0, 0.6); }
}

.indicator-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.vulnerability-indicator.active .indicator-icon {
  background: rgba(255, 0, 0, 0.3);
  border-color: #ff4444;
  transform: scale(1.1);
}

.indicator-icon.critical { background: rgba(255, 0, 0, 0.3); border: 2px solid #ff4444; }
.indicator-icon.high { background: rgba(255, 165, 0, 0.3); border: 2px solid #ffa500; }
.indicator-icon.medium { background: rgba(255, 255, 0, 0.3); border: 2px solid #ffff00; }

.indicator-name {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
}

.indicator-severity {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.indicator-severity.critical {
  background: rgba(255, 0, 0, 0.2);
  color: #ff4444;
  border: 1px solid #ff4444;
}

.indicator-severity.high {
  background: rgba(255, 165, 0, 0.2);
  color: #ffa500;
  border: 1px solid #ffa500;
}

.indicator-severity.medium {
  background: rgba(255, 255, 0, 0.2);
  color: #ffff00;
  border: 1px solid #ffff00;
}

/* Scan Results */
.scan-results {
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(0, 240, 255, 0.2);
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.results-header h3 {
  font-family: 'Orbitron', monospace;
  color: #00f0ff;
  margin: 0;
}

.risk-score {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  font-size: 0.9rem;
}

.risk-score.critical { background: rgba(255, 0, 0, 0.2); color: #ff4444; border: 1px solid #ff4444; }
.risk-score.high { background: rgba(255, 165, 0, 0.2); color: #ffa500; border: 1px solid #ffa500; }
.risk-score.medium { background: rgba(255, 255, 0, 0.2); color: #ffff00; border: 1px solid #ffff00; }
.risk-score.low { background: rgba(0, 255, 0, 0.2); color: #00ff00; border: 1px solid #00ff00; }

.results-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.result-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  border-left: 4px solid;
  transition: all 0.3s ease;
}

.result-card:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(5px);
}

.result-card .critical { border-left-color: #ff4444; }
.result-card .high { border-left-color: #ffa500; }
.result-card .medium { border-left-color: #ffff00; }

.result-severity {
  width: 8px;
  border-radius: 4px;
  flex-shrink: 0;
}

.result-severity.critical { background: #ff4444; }
.result-severity.high { background: #ffa500; }
.result-severity.medium { background: #ffff00; }

.result-content {
  flex: 1;
}

.result-content h4 {
  font-family: 'Orbitron', monospace;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: white;
  margin: 0 0 0.5rem 0;
}

.result-content p {
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  margin: 0 0 0.5rem 0;
}

.result-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: #888;
}

.result-cvss, .result-fix {
  font-family: 'Courier New', monospace;
  font-weight: 600;
}

/* Features Section */
.features-section {
  padding: 6rem 0;
  background: #000;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
  transition: left 0.5s ease;
}

.feature-card:hover::before {
  left: 100%;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: #00f0ff;
  box-shadow: 0 10px 30px rgba(0, 240, 255, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-family: 'Orbitron', monospace;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: white;
}

.feature-description {
  color: #ccc;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 0.95rem;
}

.feature-stats {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #00f0ff;
  font-size: 0.9rem;
}

/* Threats Section */
.threats-section {
  padding: 6rem 0;
  background: #0a0a0a;
}

.threat-visualization {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.threat-globe {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.globe-placeholder {
  width: 300px;
  height: 300px;
  border: 2px solid rgba(0, 240, 255, 0.3);
  border-radius: 50%;
  position: relative;
  background: radial-gradient(circle at 30% 30%, rgba(0, 240, 255, 0.1), transparent 70%);
}

.pulse-rings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 50%;
  animation: pulseRing 3s infinite;
}

@keyframes pulseRing {
  0% {
    width: 100px;
    height: 100px;
    opacity: 1;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}

.threat-dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.threat-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #00ff41;
  border-radius: 50%;
  animation: threatPulse 2s infinite;
}

@keyframes threatPulse {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 255, 65, 0.7);
  }
  50% { 
    transform: scale(1.5);
    box-shadow: 0 0 0 10px rgba(0, 255, 65, 0);
  }
}

.threat-feed {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  height: 400px;
  display: flex;
  flex-direction: column;
}

.feed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.feed-header h3 {
  font-family: 'Orbitron', monospace;
  color: #00f0ff;
  margin: 0;
  font-size: 1.1rem;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #00ff41;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.live-pulse {
  width: 8px;
  height: 8px;
  background: #00ff41;
  border-radius: 50%;
  animation: scanPulse 1s infinite;
}

.feed-items {
  flex: 1;
  overflow-y: auto;
  max-height: 350px;
}

.feed-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.3s ease;
}

.feed-item:hover {
  background: rgba(255, 255, 255, 0.02);
}

.feed-item:last-child {
  border-bottom: none;
}

.threat-type {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  min-width: 50px;
  text-align: center;
}

.threat-type.XSS { background: rgba(255, 255, 0, 0.2); color: #ffff00; }
.threat-type.SQLi { background: rgba(255, 0, 0, 0.2); color: #ff4444; }
.threat-type.RCE { background: rgba(255, 0, 0, 0.3); color: #ff0000; }
.threat-type.CSRF { background: rgba(255, 165, 0, 0.2); color: #ffa500; }

.threat-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.threat-target {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: white;
  font-weight: 600;
}

.threat-time {
  font-size: 0.7rem;
  color: #888;
  font-family: 'Courier New', monospace;
}

.threat-severity {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  min-width: 70px;
  text-align: center;
}

.threat-severity.critical { background: rgba(255, 0, 0, 0.2); color: #ff4444; border: 1px solid #ff4444; }
.threat-severity.high { background: rgba(255, 165, 0, 0.2); color: #ffa500; border: 1px solid #ffa500; }
.threat-severity.medium { background: rgba(255, 255, 0, 0.2); color: #ffff00; border: 1px solid #ffff00; }

/* CTA Section */
.cta-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #000, #0a0a0a);
  text-align: center;
}

.cta-content h2 {
  font-family: 'Orbitron', monospace;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cta-content p {
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.cta-primary.large, .cta-secondary.large {
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
}

.trust-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.trust-badge {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 20px;
  font-size: 0.8rem;
  color: #00f0ff;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Footer */
.cyber-footer {
  background: #111;
  padding: 3rem 0 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-brand .logo {
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.footer-brand p {
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.4;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.link-group h4 {
  font-family: 'Orbitron', monospace;
  color: #00f0ff;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.link-group a {
  display: block;
  color: #ccc;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
  font-size: 0.9rem;
  cursor: pointer;
}

.link-group a:hover {
  color: #00f0ff;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #888;
  font-size: 0.8rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: #0a0a0a;
  border: 1px solid #00f0ff;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.modal-content h3 {
  font-family: 'Orbitron', monospace;
  color: #00f0ff;
  margin-bottom: 1rem;
  text-align: center;
}

.modal-content p {
  color: #ccc;
  margin-bottom: 1.5rem;
  text-align: center;
}

.modal-content input {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #00f0ff;
  border-radius: 8px;
  color: white;
  margin-bottom: 1.5rem;
  outline: none;
}

.modal-content input:focus {
  box-shadow: 0 0 0 2px rgba(0, 240, 255, 0.1);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .nav-links {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .live-stats {
    gap: 1.5rem;
    flex-direction: column;
  }

  .stat-value {
    font-size: 2rem;
  }

  .scanner-input-group {
    flex-direction: column;
  }

  .scan-button {
    width: 100%;
  }

  .threat-visualization {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .threat-globe {
    height: 300px;
  }

  .globe-placeholder {
    width: 250px;
    height: 250px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
  }

  .cta-content h2 {
    font-size: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .scan-summary {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .cta-content h2 {
    font-size: 1.75rem;
  }

  .container {
    padding: 0 1rem;
  }

  .scanner-interface {
    padding: 1.5rem;
  }

  .feature-card {
    padding: 1.5rem;
  }
}
</style>