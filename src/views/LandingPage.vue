<template>
  <div class="landing-page">
    <!-- Cyber Navigation -->
    <nav class="cyber-nav">
      <div class="nav-container">
        <div class="nav-logo">
          <div class="logo-icon">⚡</div>
          <span class="logo-text">DEEPPATCH</span>
        </div>
        <div class="nav-links">
          <a href="#features" class="nav-link">FEATURES</a>
          <a href="#scanner" class="nav-link">SCANNER</a>
          <a href="#threats" class="nav-link">THREATS</a>
          <button class="nav-cta">GET STARTED</button>
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
          <span class="title-line">DEEP</span>
          <span class="title-line">SECURITY</span>
          <span class="title-line gradient-text">PATCHING</span>
        </h1>
        
        <p class="hero-subtitle">
          Enterprise-grade vulnerability scanning powered by artificial intelligence. 
          <br>Protect your digital assets with military-grade security analysis.
        </p>

        <!-- Live Stats -->
        <div class="live-stats">
          <div class="stat">
            <div class="stat-value">{{ threatsCount }}</div>
            <div class="stat-label">THREATS NEUTRALIZED</div>
          </div>
          <div class="stat">
            <div class="stat-value">99.9%</div>
            <div class="stat-label">ACCURACY RATE</div>
          </div>
          <div class="stat">
            <div class="stat-value">&lt;50ms</div>
            <div class="stat-label">SCAN SPEED</div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="hero-actions">
          <button class="cta-primary" @click="startQuickScan">
            <span class="btn-icon">🔍</span>
            INSTANT SECURITY SCAN
          </button>
          <button class="cta-secondary" @click="watchDemo">
            <span class="btn-icon">🎬</span>
            WATCH DEMO
          </button>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="scroll-indicator">
        <div class="scroll-line"></div>
        <span>EXPLORE PLATFORM</span>
      </div>
    </section>

    <!-- Quick Scanner Section -->
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
              />
              <div class="input-decoration">
                <div class="input-line"></div>
              </div>
            </div>
            <button 
              class="scan-button"
              :class="{ scanning: scanning }"
              @click="initiateScan"
              :disabled="scanning || !targetUrl"
            >
              <span v-if="!scanning" class="scan-text">LAUNCH SCAN</span>
              <span v-else class="scan-text">SCANNING...</span>
              <div class="scan-progress" :style="{ width: `${scanProgress}%` }"></div>
            </button>
          </div>

          <!-- Scan Visualization -->
          <div v-if="scanning" class="scan-visualization">
            <div class="scan-layers">
              <div class="scan-layer" :style="{ animationDelay: '0s' }">
                <div class="layer-label">SURFACE ANALYSIS</div>
                <div class="layer-progress"></div>
              </div>
              <div class="scan-layer" :style="{ animationDelay: '1s' }">
                <div class="layer-label">DEEP INFRASTRUCTURE</div>
                <div class="layer-progress"></div>
              </div>
              <div class="scan-layer" :style="{ animationDelay: '2s' }">
                <div class="layer-label">AI ASSESSMENT</div>
                <div class="layer-progress"></div>
              </div>
            </div>

            <!-- Vulnerability Indicators -->
            <div class="vulnerability-indicators">
              <div 
                v-for="vuln in vulnerabilities" 
                :key="vuln.id"
                class="vulnerability-indicator"
                :class="{ active: scanProgress >= vuln.threshold }"
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
                RISK SCORE: {{ riskScore }}/100
              </div>
            </div>
            <div class="results-grid">
              <div class="result-card" v-for="finding in scanFindings" :key="finding.id">
                <div class="result-severity" :class="finding.severity"></div>
                <div class="result-content">
                  <h4>{{ finding.title }}</h4>
                  <p>{{ finding.description }}</p>
                  <div class="result-meta">
                    <span class="result-cvss">CVSS: {{ finding.cvss }}</span>
                    <span class="result-fix">FIX: {{ finding.fixTime }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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
          <p class="section-subtitle">Real-time security monitoring across 180+ countries</p>
        </div>

        <div class="threat-visualization">
          <div class="threat-globe">
            <!-- Globe visualization would go here -->
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
                  <span class="threat-target">{{ threat.target }}</span>
                  <span class="threat-time">{{ threat.time }}</span>
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
          <p>Join thousands of enterprises protecting their assets with Sentinel AI</p>
          <div class="cta-actions">
            <button class="cta-primary large">START FREE TRIAL</button>
            <button class="cta-secondary large">REQUEST DEMO</button>
          </div>
          <div class="trust-badges">
            <div class="trust-badge">SOC2 COMPLIANT</div>
            <div class="trust-badge">GDPR READY</div>
            <div class="trust-badge">ISO 27001</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="cyber-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="logo">SENTINEL</div>
            <p>Quantum Security Intelligence Platform</p>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h4>PRODUCT</h4>
              <a>Features</a>
              <a>Pricing</a>
              <a>API</a>
            </div>
            <div class="link-group">
              <h4>COMPANY</h4>
              <a>About</a>
              <a>Careers</a>
              <a>Contact</a>
            </div>
            <div class="link-group">
              <h4>RESOURCES</h4>
              <a>Documentation</a>
              <a>Blog</a>
              <a>Support</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Sentinel Security. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Quick Scan Modal -->
    <div v-if="showScanModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>Quick Security Scan</h3>
        <p>Enter the URL you want to scan:</p>
        <input v-model="quickScanUrl" class="cyber-input" placeholder="https://example.com" />
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

// Reactive data
const targetUrl = ref('')
const scanning = ref(false)
const scanProgress = ref(0)
const scanComplete = ref(false)
const riskScore = ref(0)
const showScanModal = ref(false)
const quickScanUrl = ref('')
const threatsCount = ref(0)

// Mock data
const vulnerabilities = ref([
  { id: 1, type: 'xss', name: 'XSS', threshold: 25, severity: 'high' },
  { id: 2, type: 'sqli', name: 'SQLi', threshold: 50, severity: 'critical' },
  { id: 3, type: 'rce', name: 'RCE', threshold: 75, severity: 'high' },
  { id: 4, type: 'csrf', name: 'CSRF', threshold: 40, severity: 'medium' }
])

const scanFindings = ref([
  { id: 1, title: 'SQL Injection Vulnerability', description: 'User input not properly sanitized in login form', severity: 'critical', cvss: 9.8, fixTime: '15 minutes' },
  { id: 2, title: 'XSS in Search Function', description: 'Cross-site scripting possible in search parameter', severity: 'high', cvss: 7.4, fixTime: '30 minutes' },
  { id: 3, title: 'Missing Security Headers', description: 'CSP and HSTS headers not implemented', severity: 'medium', cvss: 5.2, fixTime: '10 minutes' }
])

const features = ref([
  { id: 1, icon: '🛡️', title: 'AI-Powered Scanning', description: 'Machine learning algorithms detect zero-day vulnerabilities', color: '#00f0ff', stat: '99.9% Accuracy' },
  { id: 2, icon: '🌐', title: 'Global Threat Intelligence', description: 'Real-time threat data from 180+ countries', color: '#b967ff', stat: '10M+ Threats' },
  { id: 3, icon: '⚡', title: 'Lightning Fast', description: 'Complete security scans in under 50 milliseconds', color: '#00ff41', stat: '<50ms Scans' },
  { id: 4, icon: '🔍', title: 'Deep Vulnerability Analysis', description: 'Comprehensive testing beyond surface-level checks', color: '#ff00ff', stat: '500+ Tests' }
])

const liveThreats = ref([
  { id: 1, type: 'XSS', target: 'e-commerce-site.com', time: '2s ago', severity: 'high' },
  { id: 2, type: 'SQLi', target: 'api.bank.com', time: '5s ago', severity: 'critical' },
  { id: 3, type: 'RCE', target: 'admin-panel.net', time: '8s ago', severity: 'critical' },
  { id: 4, type: 'CSRF', target: 'user-portal.io', time: '12s ago', severity: 'medium' }
])

const threatDots = ref([
  { id: 1, style: 'left: 30%; top: 40%;' },
  { id: 2, style: 'left: 60%; top: 35%;' },
  { id: 3, style: 'left: 45%; top: 55%;' },
  { id: 4, style: 'left: 70%; top: 60%;' }
])

// Computed
const riskScoreClass = computed(() => {
  if (riskScore.value >= 80) return 'critical'
  if (riskScore.value >= 60) return 'high'
  if (riskScore.value >= 40) return 'medium'
  return 'low'
})

// Methods
const initiateScan = async () => {
  if (!targetUrl.value) return
  
  scanning.value = true
  scanProgress.value = 0
  scanComplete.value = false
  
  const interval = setInterval(() => {
    scanProgress.value += Math.random() * 15
    if (scanProgress.value >= 100) {
      scanProgress.value = 100
      clearInterval(interval)
      completeScan()
    }
  }, 300)
}

const completeScan = () => {
  scanning.value = false
  scanComplete.value = true
  riskScore.value = Math.floor(Math.random() * 40) + 60 // 60-100 for demo
  threatsCount.value += 1
}

const startQuickScan = () => {
  showScanModal.value = true
}

const executeQuickScan = () => {
  targetUrl.value = quickScanUrl.value
  showScanModal.value = false
  initiateScan()
}

const closeModal = () => {
  showScanModal.value = false
}

const watchDemo = () => {
  // Would open demo video
  console.log('Opening demo...')
}

const getVulnIcon = (type: string) => {
  const icons: { [key: string]: string } = {
    xss: '⚡',
    sqli: '💉',
    rce: '🎯',
    csrf: '🔄'
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

// Animation for live stats
onMounted(() => {
  const interval = setInterval(() => {
    if (threatsCount.value < 12847) {
      threatsCount.value += Math.floor(Math.random() * 10) + 1
    }
  }, 100)

  onUnmounted(() => clearInterval(interval))
})
</script>

<style scoped>
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

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
}

.logo-icon {
  font-size: 1.5rem;
  color: #00f0ff;
}

.logo-text {
  font-size: 1.2rem;
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  font-size: clamp(3rem, 8vw, 6rem);
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

/* Utility Classes for Text */
.text-cyber-blue { color: #00f0ff; }
.text-matrix-green { color: #00ff41; }
.text-neon-purple { color: #b967ff; }

/* Background Utilities */
.bg-cyber-dark { background: #000; }
.bg-cyber-darker { background: #0a0a0a; }
.bg-cyber-darkest { background: #111; }

/* Border Utilities */
.border-cyber { border-color: #00f0ff; }
.border-matrix { border-color: #00ff41; }
.border-neon { border-color: #b967ff; }

/* Custom Scrollbar for Feed */
.feed-items::-webkit-scrollbar {
  width: 6px;
}

.feed-items::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.feed-items::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #00f0ff, #b967ff);
  border-radius: 3px;
}

.feed-items::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #00ff41, #00f0ff);
}
</style>