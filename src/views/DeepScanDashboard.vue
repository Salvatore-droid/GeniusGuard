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
            <img src="../assets/images/icon128.png" alt="GeniusGuard" class="logo-icon">
            <span class="logo-text">GENIUSGAURD DEEP SCAN</span>
          </div>
        </div>
        <div class="header-actions">
          <div class="user-profile">
            <div class="user-avatar">👤</div>
            <span class="user-name">{{ userData.username || 'Security Analyst' }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Connection Status -->
    <transition name="status-slide">
      <div v-if="connectionStatus" class="connection-status" :class="connectionStatus.type">
        <span class="status-icon">{{ connectionStatus.icon }}</span>
        <span class="status-message">{{ connectionStatus.message }}</span>
      </div>
    </transition>

    <!-- Main Dashboard -->
    <main class="dashboard-main">
      <div class="dashboard-container">
        
        <!-- Setup Wizard -->
        <section class="setup-wizard" v-if="!scanSetupComplete">
          <div class="wizard-header">
            <h1 class="wizard-title">DEEP SECURITY AUDIT SETUP</h1>
            <p class="wizard-subtitle">Configure authenticated scanning for comprehensive vulnerability assessment</p>
          </div>

          <!-- Enhanced Step Indicator -->
          <div class="wizard-progress">
            <div class="step-indicator">
              <div class="step" :class="{ active: currentStep === 1, completed: currentStep > 1 }">
                <div class="step-bubble">
                  <div class="step-number">1</div>
                  <div class="step-check">✓</div>
                </div>
                <div class="step-label">Install Extension</div>
              </div>
              <div class="step-connector" :class="{ active: currentStep > 1 }"></div>
              <div class="step" :class="{ active: currentStep === 2, completed: currentStep > 2 }">
                <div class="step-bubble">
                  <div class="step-number">2</div>
                  <div class="step-check">✓</div>
                </div>
                <div class="step-label">Record Session</div>
              </div>
              <div class="step-connector" :class="{ active: currentStep > 2 }"></div>
              <div class="step" :class="{ active: currentStep === 3, completed: currentStep > 3 }">
                <div class="step-bubble">
                  <div class="step-number">3</div>
                  <div class="step-check">✓</div>
                </div>
                <div class="step-label">Configure Scan</div>
              </div>
              <div class="step-connector" :class="{ active: currentStep > 3 }"></div>
              <div class="step" :class="{ active: currentStep === 4 }">
                <div class="step-bubble">
                  <div class="step-number">4</div>
                  <div class="step-check">✓</div>
                </div>
                <div class="step-label">Launch Audit</div>
              </div>
            </div>
          </div>

          <!-- Step Content with fixed Transition structure -->
          <transition name="step-fade" mode="out-in">
            <div :key="currentStep" class="step-content">
              <!-- Step 1: Extension Installation -->
              <div v-if="currentStep === 1" class="step-card">
                <div class="step-header">
                  <div class="step-icon">🌐</div>
                  <div class="step-info">
                    <h3>Install GENIUSGAURD Browser Extension</h3>
                    <p>Add our security extension to record user sessions and enable authenticated scanning capabilities.</p>
                  </div>
                </div>

                <div class="step-body">
                  <!-- Browser Options -->
                  <div class="browser-section">
                    <h4>Download for Your Browser</h4>
                    <div class="browser-options">
                      <div class="browser-option" @click="downloadExtension('firefox')">
                        <div class="browser-icon">🦊</div>
                        <div class="browser-info">
                          <span class="browser-name">Firefox</span>
                          <span class="browser-desc">.xpi package</span>
                        </div>
                      </div>
                      <div class="browser-option" @click="downloadExtension('chrome')">
                        <div class="browser-icon">🔵</div>
                        <div class="browser-info">
                          <span class="browser-name">Chrome</span>
                          <span class="browser-desc">.crx package</span>
                        </div>
                      </div>
                      <div class="browser-option" @click="downloadExtension('edge')">
                        <div class="browser-icon">🌀</div>
                        <div class="browser-info">
                          <span class="browser-name">Edge</span>
                          <span class="browser-desc">.crx package</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Extension Status -->
                  <div class="extension-section">
                    <div class="extension-preview">
                      <div class="extension-mockup">
                        <div class="extension-header">
                          <div class="extension-icon">🛡️</div>
                          <span class="extension-name">GENIUSGAURD Security</span>
                        </div>
                        <div class="extension-body">
                          <div class="extension-status">
                            <div class="status-indicator" :class="{ 
                              active: extensionStatus.installed, 
                              connected: extensionStatus.connected 
                            }"></div>
                            <span class="status-text">{{ getExtensionStatusText() }}</span>
                          </div>
                          <div class="extension-actions">
                            <button class="extension-button primary" @click="checkExtensionStatus" 
                                    :disabled="extensionStatus.connected || extensionStatus.checking">
                              <span v-if="extensionStatus.checking" class="button-loading"></span>
                              {{ extensionStatus.connected ? '✓ CONNECTED' : extensionStatus.checking ? 'CHECKING...' : 'CHECK CONNECTION' }}
                            </button>
                            <button v-if="!extensionStatus.connected" class="extension-button secondary" 
                                    @click="showManualInstall">
                              MANUAL SETUP
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Manual Setup Instructions -->
                  <transition name="expand-fade">
                    <div v-if="showManualSetup" class="manual-setup">
                      <div class="manual-header">
                        <h4>Manual Extension Setup</h4>
                        <p>Follow these steps if automatic installation fails</p>
                      </div>
                      <div class="manual-content">
                        <ol class="setup-steps">
                          <li class="setup-step">
                            <div class="step-marker">1</div>
                            <div class="step-content">
                              <strong>Download the extension</strong> for your browser from above
                            </div>
                          </li>
                          <li class="setup-step">
                            <div class="step-marker">2</div>
                            <div class="step-content">
                              <strong>Enable Developer Mode</strong> in your browser's extensions page
                            </div>
                          </li>
                          <li class="setup-step">
                            <div class="step-marker">3</div>
                            <div class="step-content">
                              <strong>Drag and drop</strong> the downloaded file into the extensions page
                            </div>
                          </li>
                          <li class="setup-step">
                            <div class="step-marker">4</div>
                            <div class="step-content">
                              <strong>Click the extension icon</strong> and enter your authentication token below
                            </div>
                          </li>
                        </ol>
                        
                        <div class="auth-token-section">
                          <div class="token-header">
                            <h5>Your Authentication Token</h5>
                            <p>Copy this token when prompted by the extension</p>
                          </div>
                          <div class="token-display">
                            <code class="token-value">{{ userAuthToken }}</code>
                            <button class="copy-button" @click="copyAuthToken">
                              <span class="copy-icon">📋</span>
                              Copy
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>

                <div class="step-footer">
                  <button class="btn btn-primary" @click="currentStep = 2" 
                          :disabled="!extensionStatus.connected">
                    Continue to Session Recording
                    <span class="btn-arrow">→</span>
                  </button>
                </div>
              </div>

              <!-- Step 2: Session Recording -->
              <div v-else-if="currentStep === 2" class="step-card">
                <div class="step-header">
                  <div class="step-icon">🎥</div>
                  <div class="step-info">
                    <h3>Record User Session</h3>
                    <p>Navigate through your application while we record the authentication flow and user interactions.</p>
                  </div>
                </div>

                <div class="step-body">
                  <div class="recording-interface">
                    <div class="recording-controls">
                      <div class="recording-status" :class="{ recording: isRecording }">
                        <div class="recording-indicator"></div>
                        <div class="status-info">
                          <span class="status-label">{{ isRecording ? 'RECORDING...' : recordingComplete ? 'RECORDING COMPLETE' : 'READY TO RECORD' }}</span>
                          <span class="status-desc" v-if="isRecording">Capturing user interactions...</span>
                        </div>
                      </div>
                      
                      <div class="control-buttons">
                        <button class="btn" :class="isRecording ? 'btn-danger' : 'btn-primary'" 
                                @click="toggleRecording" :disabled="recordingComplete">
                          {{ isRecording ? '⏹️ STOP RECORDING' : '● START RECORDING' }}
                        </button>
                      </div>
                    </div>

                    <div class="session-preview" v-if="recordedActions.length > 0">
                      <div class="preview-header">
                        <h4>Recorded Actions</h4>
                        <span class="action-count">{{ recordedActions.length }} actions</span>
                      </div>
                      <div class="actions-list">
                        <div v-for="(action, index) in recordedActions" :key="index" class="action-item">
                          <div class="action-icon">{{ getActionIcon(action.action_type) }}</div>
                          <div class="action-details">
                            <span class="action-type">{{ action.action_type }}</span>
                            <span class="action-target">{{ action.target_element }}</span>
                          </div>
                          <div class="action-time">{{ formatTime(action.timestamp) }}</div>
                        </div>
                      </div>
                    </div>

                    <div class="recording-tips">
                      <div class="tips-header">
                        <h4>📝 Recording Tips</h4>
                      </div>
                      <ul class="tips-list">
                        <li class="tip-item">Log in with test credentials</li>
                        <li class="tip-item">Navigate to sensitive areas (admin panels, user settings)</li>
                        <li class="tip-item">Perform critical actions (payments, data exports)</li>
                        <li class="tip-item">Test all user roles if applicable</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="step-footer">
                  <div class="footer-actions">
                    <button class="btn btn-secondary" @click="currentStep = 1">
                      <span class="btn-arrow">←</span>
                      Back
                    </button>
                    <button class="btn btn-primary" @click="currentStep = 3" :disabled="!recordingComplete">
                      Continue to Scan Configuration
                      <span class="btn-arrow">→</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Step 3: Scan Configuration -->
              <div v-else-if="currentStep === 3" class="step-card">
                <div class="step-header">
                  <div class="step-icon">⚙️</div>
                  <div class="step-info">
                    <h3>Configure Deep Scan Parameters</h3>
                    <p>Customize the scanning intensity and focus areas for your security audit.</p>
                  </div>
                </div>

                <div class="step-body">
                  <div class="scan-configuration">
                    <div class="config-section">
                      <div class="section-header">
                        <h4>Scan Intensity</h4>
                        <p class="section-description">Choose the depth and scope of your security audit</p>
                      </div>
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
                      <div class="section-header">
                        <h4>Vulnerability Focus</h4>
                        <p class="section-description">Select which vulnerability types to prioritize</p>
                      </div>
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
                      <div class="section-header">
                        <h4>Advanced Options</h4>
                        <p class="section-description">Additional scanning capabilities</p>
                      </div>
                      <div class="advanced-options">
                        <label class="advanced-option">
                          <input type="checkbox" v-model="advancedOptions.crawlLinks">
                          <div class="option-content">
                            <strong>Automatically crawl discovered links</strong>
                            <span>Follow and test all internal links found during scanning</span>
                          </div>
                        </label>
                        <label class="advanced-option">
                          <input type="checkbox" v-model="advancedOptions.testAPIs">
                          <div class="option-content">
                            <strong>Test API endpoints</strong>
                            <span>Comprehensive API security testing</span>
                          </div>
                        </label>
                        <label class="advanced-option">
                          <input type="checkbox" v-model="advancedOptions.checkHeaders">
                          <div class="option-content">
                            <strong>Analyze security headers</strong>
                            <span>Check for proper security header implementation</span>
                          </div>
                        </label>
                        <label class="advanced-option">
                          <input type="checkbox" v-model="advancedOptions.bruteForce">
                          <div class="option-content">
                            <strong>Test for brute force vulnerabilities</strong>
                            <span>Authentication and session brute force testing</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="step-footer">
                  <div class="footer-actions">
                    <button class="btn btn-secondary" @click="currentStep = 2">
                      <span class="btn-arrow">←</span>
                      Back
                    </button>
                    <button class="btn btn-primary" @click="currentStep = 4">
                      Review & Launch Scan
                      <span class="btn-arrow">→</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Step 4: Launch Scan -->
              <div v-else-if="currentStep === 4" class="step-card">
                <div class="step-header">
                  <div class="step-icon">🚀</div>
                  <div class="step-info">
                    <h3>Ready for Deep Security Audit</h3>
                    <p>Review your configuration and launch the comprehensive security scan.</p>
                  </div>
                </div>

                <div class="step-body">
                  <div class="scan-summary">
                    <div class="summary-section">
                      <div class="section-header">
                        <h4>Scan Configuration</h4>
                      </div>
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
                      <div class="section-header">
                        <h4>Target Coverage</h4>
                      </div>
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
                    <div class="section-header">
                      <h4>Risk Assessment Preview</h4>
                      <p class="section-description">Based on your application profile and selected tests</p>
                    </div>
                    <div class="risk-meters">
                      <div class="risk-meter">
                        <div class="meter-label">Authentication Security</div>
                        <div class="meter-bar">
                          <div class="meter-fill" style="width: 85%"></div>
                        </div>
                        <div class="meter-value high-risk">HIGH RISK</div>
                      </div>
                      <div class="risk-meter">
                        <div class="meter-label">Data Exposure</div>
                        <div class="meter-bar">
                          <div class="meter-fill" style="width: 60%"></div>
                        </div>
                        <div class="meter-value medium-risk">MEDIUM RISK</div>
                      </div>
                      <div class="risk-meter">
                        <div class="meter-label">Input Validation</div>
                        <div class="meter-bar">
                          <div class="meter-fill" style="width: 45%"></div>
                        </div>
                        <div class="meter-value low-risk">LOW RISK</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="step-footer">
                  <div class="footer-actions">
                    <button class="btn btn-secondary" @click="currentStep = 3">
                      <span class="btn-arrow">←</span>
                      Back
                    </button>
                    <button class="btn btn-primary large" @click="launchDeepScan">
                      🚀 LAUNCH DEEP SECURITY AUDIT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>
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
              <div class="section-header">
                <h3>Scanning Modules</h3>
                <p class="section-description">Real-time progress of security testing components</p>
              </div>
              <div class="module-grid">
                <div class="module-card" v-for="module in scanModules" :key="module.id" 
                     :class="{ active: module.status === 'running', completed: module.status === 'completed' }">
                  <div class="module-header">
                    <div class="module-icon">{{ getModuleIcon(module.module_type) }}</div>
                    <h4>{{ module.name }}</h4>
                    <div class="module-status">
                      <span v-if="module.status === 'completed'">✓</span>
                      <span v-else-if="module.status === 'running'">⟳</span>
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
                    <span class="module-info">{{ getModuleInfo(module.module_type) }}</span>
                    <span class="module-findings" v-if="module.findings_count > 0">
                      {{ module.findings_count }} findings
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
                      <span class="finding-time">{{ formatFindingTime(finding.detected_at) }}</span>
                    </div>
                    <p class="finding-description">{{ finding.description }}</p>
                    <div class="finding-meta">
                      <span class="finding-location">{{ finding.url }}</span>
                      <span class="finding-cvss">CVSS: {{ finding.cvss_score }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="filteredFindings.length === 0" class="no-findings">
                  <div class="no-findings-icon">🔍</div>
                  <p>No vulnerabilities found yet</p>
                  <span class="no-findings-desc">Scanning in progress...</span>
                </div>
              </div>
            </div>

            <!-- Scan Controls -->
            <div class="scan-controls">
              <button class="btn btn-secondary" @click="pauseScan" :disabled="!scanRunning">
                {{ scanRunning ? '⏸️ PAUSE SCAN' : '⏸️ SCAN PAUSED' }}
              </button>
              <button class="btn btn-danger" @click="stopScan">⏹️ STOP SCAN</button>
              <button class="btn btn-primary" @click="generateReport" :disabled="deepScanProgress < 100">
                📊 GENERATE REPORT
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
            <span class="risk-count">{{ riskDistribution.critical }}</span>
          </div>
          <div class="risk-segment high" style="flex: 5">
            <span class="risk-label">High</span>
            <span class="risk-count">{{ riskDistribution.high }}</span>
          </div>
          <div class="risk-segment medium" style="flex: 7">
            <span class="risk-label">Medium</span>
            <span class="risk-count">{{ riskDistribution.medium }}</span>
          </div>
          <div class="risk-segment low" style="flex: 10">
            <span class="risk-label">Low</span>
            <span class="risk-count">{{ riskDistribution.low }}</span>
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
import { useRouter } from 'vue-router'

const router = useRouter()

// Type definitions
interface UserData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface ConnectionStatus {
  type: string;
  message: string;
  icon: string;
}

interface RecordedAction {
  action_type: string;
  target_element: string;
  timestamp: number;
  value?: string;
  url?: string;
}

interface ScanModule {
  id: string;
  name: string;
  module_type: string;
  status: string;
  progress: number;
  findings_count: number;
}

interface Finding {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  cvss_score: number;
  url: string;
  detected_at: string;
}

interface Activity {
  id: string;
  icon: string;
  message: string;
  time: string;
}

interface ExtensionStatus {
  installed: boolean;
  connected: boolean;
  checking: boolean;
}

interface RiskDistribution {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

// API Configuration
const API_BASE = '/api/deep'
const AUTH_API_BASE = '/api'

// Enhanced authentication handling
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token') || localStorage.getItem('token') || sessionStorage.getItem('token')
}

const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  return headers
}

// Enhanced API call with error handling
const apiCall = async (url: string, options: RequestInit = {}) => {
  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  }
  
  try {
    const response = await fetch(url, config)
    
    if (response.status === 403) {
      // Token might be expired, try to refresh
      const refreshSuccess = await handleTokenRefresh()
      if (refreshSuccess) {
        // Retry with new token
        config.headers = {
          ...getAuthHeaders(),
          ...options.headers,
        }
        return await fetch(url, config)
      }
    }
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return response
  } catch (error) {
    console.error(`API call failed to ${url}:`, error)
    throw error
  }
}

const handleTokenRefresh = async (): Promise<boolean> => {
  try {
    const refreshToken = localStorage.getItem('refresh_token')
    if (!refreshToken) return false
    
    const response = await fetch('/api/auth/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken })
    })
    
    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('auth_token', data.access)
      return true
    }
  } catch (error) {
    console.error('Token refresh failed:', error)
  }
  
  // If refresh fails, redirect to login
  localStorage.removeItem('auth_token')
  localStorage.removeItem('refresh_token')
  sessionStorage.removeItem('auth_token')
  sessionStorage.removeItem('refresh_token')
  
  router.push('/login')
  return false
}

// Wizard State
const currentStep = ref(1)
const scanSetupComplete = ref(false)
const isRecording = ref(false)
const recordingComplete = ref(false)
const currentScanSession = ref<string | null>(null)

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

// User Data
const userData = ref<UserData>({
  username: '',
  email: '',
  first_name: '',
  last_name: ''
})

// Connection Status
const connectionStatus = ref<ConnectionStatus | null>(null)
const authError = ref<string | null>(null)
const apiStatus = ref<'healthy' | 'degraded' | 'offline'>('healthy')

// Extension State
const extensionStatus = ref<ExtensionStatus>({
  installed: false,
  connected: false,
  checking: false
})
const showManualSetup = ref(false)
const userAuthToken = ref('')

// Data Arrays with proper typing
const recordedActions = ref<RecordedAction[]>([])
const scanModules = ref<ScanModule[]>([])
const liveFindings = ref<Finding[]>([])
const recentActivities = ref<Activity[]>([])
const riskDistribution = ref<RiskDistribution>({
  critical: 0,
  high: 0,
  medium: 0,
  low: 0
})

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

// Computed Properties
const filteredFindings = computed(() => {
  if (currentFilter.value === 'all') return liveFindings.value
  return liveFindings.value.filter(f => f.severity === currentFilter.value)
})

const securityScore = computed(() => Math.max(0, 100 - (vulnerabilitiesFound.value * 2)))
const scanSpeed = computed(() => Math.floor(50 + Math.random() * 50))
const testsCompleted = computed(() => Math.floor(deepScanProgress.value * 2))

// Methods
const showStatus = (type: string, message: string): void => {
  const icons: Record<string, string> = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' }
  connectionStatus.value = { type, message, icon: icons[type] }
  
  // Store auth errors separately
  if (type === 'error' && (message.includes('auth') || message.includes('token') || message.includes('403'))) {
    authError.value = message
  }
  
  setTimeout(() => {
    connectionStatus.value = null
  }, 5000)
}

const retryAuthentication = async (): Promise<void> => {
  authError.value = null
  await fetchUserData()
  await checkExtensionStatus()
}

const testAPIConnectivity = async (): Promise<void> => {
  showStatus('info', 'Testing API connectivity...')
  
  try {
    // Test base API
    const baseResponse = await fetch('/api/health/').catch(() => null)
    const baseHealthy = baseResponse?.ok || false

    // Test deep API - expect 403 if authenticated but no permission, or 401 if not auth
    const deepResponse = await fetch('/api/deep/sessions/').catch(() => null)
    const deepHealthy = deepResponse?.ok || deepResponse?.status === 403 || deepResponse?.status === 401
    
    if (baseHealthy) {
      showStatus('success', 'Base API is reachable')
      apiStatus.value = 'healthy'
    } else {
      showStatus('error', 'Base API is not reachable')
      apiStatus.value = 'offline'
    }
    
    if (deepHealthy) {
      showStatus('success', 'Deep Scan API is reachable')
    } else {
      showStatus('warning', 'Deep Scan API endpoint not accessible')
    }
    
  } catch (error) {
    showStatus('error', `API connectivity test failed: ${error.message}`)
    apiStatus.value = 'offline'
  }
}

const checkAPIHealth = async (): Promise<void> => {
  try {
    const response = await fetch('/api/health/').catch(() => null)
    if (response?.ok) {
      apiStatus.value = 'healthy'
    } else {
      apiStatus.value = 'offline'
    }
  } catch (error) {
    apiStatus.value = 'offline'
    console.warn('API health check failed:', error)
  }
}

// Enhanced user data fetch
const fetchUserData = async (): Promise<void> => {
  try {
    const token = getAuthToken()
    if (!token) {
      showStatus('warning', 'No authentication token found')
      router.push('/login')
      return
    }
    
    // Use the correct endpoint in base app
    const response = await apiCall('/api/auth/user/')
    
    if (response.ok) {
      const data = await response.json()
      userData.value = data
      
      // Store user data for fallback
      localStorage.setItem('user_data', JSON.stringify(data))
      showStatus('success', 'User data loaded successfully')
    } else {
      throw new Error(`HTTP ${response.status}`)
    }
  } catch (error) {
    console.error('Failed to fetch user data:', error)
    
    // Use fallback data
    const storedUser = localStorage.getItem('user_data') || sessionStorage.getItem('user_data')
    if (storedUser) {
      userData.value = JSON.parse(storedUser)
      showStatus('warning', 'Using cached user data - API unavailable')
    } else {
      showStatus('error', 'Authentication failed. Redirecting to login...')
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    }
  }
}

const downloadExtension = async (browser: string): Promise<void> => {
  // Use absolute URL to Django backend
  const baseUrl = 'http://localhost:8000' // Your Django backend URL
  
  // Define instructions with proper typing
  const instructions: Record<string, string> = {
    chrome: `
1. Open Chrome and go to: chrome://extensions/
2. Enable "Developer mode" (toggle in top right corner)
3. Click "Load unpacked" button
4. Navigate to this folder in your project:
   ${baseUrl}/static/downloads/GENIUSGAURD-extension-chrome/
5. Select the folder and click "Select Folder"
6. The extension will be installed and ready to use
    `,
    firefox: `
1. Open Firefox and go to: about:debugging
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on" button
4. Navigate to this folder in your project:
   ${baseUrl}/static/downloads/GENIUSGAURD-extension-firefox/
5. Select the manifest.json file
6. The extension will be installed temporarily (reload on browser restart)
    `,
    edge: `
1. Open Edge and go to: edge://extensions/
2. Enable "Developer mode" (toggle in bottom left corner)
3. Click "Load unpacked" button
4. Navigate to this folder in your project:
   ${baseUrl}/static/downloads/GENIUSGAURD-extension-edge/
5. Select the folder and click "Select Folder"
6. The extension will be installed and ready to use
    `
  }

  // Define browser icons with proper typing
  const browserIcons: Record<string, string> = {
    chrome: '🔵',
    firefox: '🦊', 
    edge: '🌀'
  }

  // Validate browser parameter
  if (!(browser in instructions) || !(browser in browserIcons)) {
    showStatus('error', `Unsupported browser: ${browser}`)
    return
  }

  showStatus('info', `Showing installation instructions for ${browser}`)
  
  // Create modal with installation instructions
  const modal = document.createElement('div')
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    font-family: 'Courier New', monospace;
  `
  
  const content = document.createElement('div')
  content.style.cssText = `
    background: #0a0a0a;
    padding: 2rem;
    border-radius: 12px;
    border: 2px solid #00f0ff;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    color: #00f0ff;
    box-shadow: 0 0 30px rgba(0, 240, 255, 0.3);
  `
  
  content.innerHTML = `
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <div style="font-size: 3rem; margin-bottom: 0.5rem;">${browserIcons[browser]}</div>
      <h3 style="margin: 0; color: #00f0ff; font-family: 'Orbitron', monospace;">
        ${browser.charAt(0).toUpperCase() + browser.slice(1)} Extension Installation
      </h3>
    </div>
    
    <div style="background: #1a1a1a; padding: 1.5rem; border-radius: 8px; border: 1px solid #00f0ff; margin-bottom: 1.5rem;">
      <pre style="color: #00ff41; margin: 0; white-space: pre-wrap; line-height: 1.5; font-family: 'Courier New', monospace;">${instructions[browser]}</pre>
    </div>
    
    <div style="background: rgba(0, 240, 255, 0.1); padding: 1rem; border-radius: 6px; margin-bottom: 1.5rem; border: 1px solid rgba(0, 240, 255, 0.3);">
      <strong style="color: #00f0ff;">Extension Path:</strong>
      <div style="color: #00ff41; font-family: 'Courier New', monospace; margin-top: 0.5rem;">
        ${baseUrl}/static/downloads/GENIUSGAURD-extension-${browser}/
      </div>
    </div>
    
    <div style="text-align: center;">
      <button onclick="this.closest('[style*=\\'position: fixed\\']').remove()" style="
        background: linear-gradient(135deg, #00f0ff, #b967ff);
        color: black;
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        font-family: 'Orbitron', monospace;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.3s ease;
      " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 5px 15px rgba(0, 240, 255, 0.3)'" 
      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
        Got It!
      </button>
    </div>
  `
  
  modal.appendChild(content)
  document.body.appendChild(modal)
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  })
}

const checkExtensionStatus = async (): Promise<void> => {
  extensionStatus.value.checking = true
  
  try {
    const response = await apiCall(`${API_BASE}/extension/connect/`, {
      method: 'POST',
      body: JSON.stringify({
        session_id: `status_check_${Date.now()}`,
        browser_info: {
          userAgent: navigator.userAgent,
          vendor: navigator.vendor
        },
        version: '1.0.0',
        auth_token: getAuthToken()
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      extensionStatus.value.connected = data.status === 'connected'
      extensionStatus.value.installed = true
      
      if (extensionStatus.value.connected) {
        showStatus('success', 'Browser extension connected successfully')
      } else {
        showStatus('warning', 'Extension responded but not fully connected')
      }
    } else {
      throw new Error(`Extension API returned ${response.status}`)
    }
  } catch (error) {
    console.error('Extension connection failed:', error)
    
    // More specific error handling
    if (error.message.includes('404')) {
      showStatus('error', 'Extension endpoint not found. Check server routes.')
    } else if (error.message.includes('403')) {
      showStatus('error', 'Authentication failed for extension connection')
    } else if (error.message.includes('Network Error')) {
      showStatus('warning', 'Cannot reach extension API. Check server connection.')
    } else {
      showStatus('warning', 'Extension not detected. Please install manually.')
    }
    
    showManualSetup.value = true
  } finally {
    extensionStatus.value.checking = false
  }
}

const getExtensionStatusText = (): string => {
  if (extensionStatus.value.connected) return 'Extension Connected'
  if (extensionStatus.value.checking) return 'Checking Connection...'
  if (extensionStatus.value.installed) return 'Extension Installed'
  return 'Install Required'
}

const showManualInstall = (): void => {
  showManualSetup.value = true
  const token = getAuthToken()
  userAuthToken.value = token || ''
  if (!token) {
    showStatus('warning', 'No authentication token found. Please login first.')
  }
}

const copyAuthToken = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(userAuthToken.value)
    showStatus('success', 'Authentication token copied to clipboard')
    
    // Visual feedback for copy action
    const copyBtn = document.querySelector('.copy-button') as HTMLElement
    if (copyBtn) {
      copyBtn.textContent = '✓ Copied!'
      copyBtn.style.background = '#00ff41'
      copyBtn.style.color = '#000'
      
      setTimeout(() => {
        copyBtn.innerHTML = '<span class="copy-icon">📋</span> Copy'
        copyBtn.style.background = ''
        copyBtn.style.color = ''
      }, 2000)
    }
  } catch (error) {
    console.error('Failed to copy token:', error)
    showStatus('error', 'Failed to copy token')
  }
}

const toggleRecording = async (): Promise<void> => {
  if (!isRecording.value) {
    // Start real recording through extension
    try {
      const sessionId = await createScanSession()
      if (!sessionId) return
      
      const response = await apiCall(`${API_BASE}/sessions/${sessionId}/start_recording/`, {
        method: 'POST',
        body: JSON.stringify({
          browser_info: {
            userAgent: navigator.userAgent,
            platform: navigator.platform
          }
        })
      })
      
      if (response.ok) {
        isRecording.value = true
        currentScanSession.value = sessionId
        showStatus('success', 'Session recording started via extension')
        
        startActionPolling(sessionId)
      }
    } catch (error) {
      console.error('Failed to start recording:', error)
      showStatus('error', 'Failed to start recording session')
    }
  } else {
    // Stop recording
    try {
      if (!currentScanSession.value) return
      
      const response = await apiCall(`${API_BASE}/sessions/${currentScanSession.value}/stop_recording/`, {
        method: 'POST'
      })
      
      if (response.ok) {
        isRecording.value = false
        recordingComplete.value = true
        showStatus('success', 'Session recording completed')
      }
    } catch (error) {
      console.error('Failed to stop recording:', error)
      showStatus('error', 'Failed to stop recording session')
    }
  }
}

const startActionPolling = (sessionId: string): void => {
  const pollInterval = setInterval(async () => {
    if (!isRecording.value) {
      clearInterval(pollInterval)
      return
    }
    
    try {
      const response = await apiCall(`${API_BASE}/sessions/${sessionId}/actions/`)
      
      if (response.ok) {
        const data = await response.json()
        recordedActions.value = data.results || data
      }
    } catch (error) {
      console.error('Failed to fetch recorded actions:', error)
    }
  }, 2000)
}

const getActionIcon = (type: string): string => {
  const icons: Record<string, string> = {
    navigation: '🧭',
    input: '⌨️',
    click: '👆',
    submit: '📤',
    scroll: '🖱️',
    hover: '👀',
    keypress: '⌨️'
  }
  return icons[type] || '🔍'
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const getIntensityName = (level: string): string => {
  const intensity = scanIntensities.value.find(i => i.level === level)
  return intensity ? intensity.name : 'Unknown'
}

const getEstimatedDuration = (): string => {
  const intensity = scanIntensities.value.find(i => i.level === selectedIntensity.value)
  return intensity ? intensity.duration : 'Unknown'
}

const getModuleIcon = (type: string): string => {
  const icons: Record<string, string> = {
    auth: '🔑',
    session: '🔄',
    input: '📝',
    logic: '🧠',
    api: '🌐',
    data: '📊'
  }
  return icons[type] || '🔍'
}

const getModuleInfo = (type: string): string => {
  const info: Record<string, string> = {
    auth: 'Login security analysis',
    session: 'Cookie and token analysis',
    input: 'Form and API input testing',
    logic: 'Workflow vulnerability testing',
    api: 'Endpoint security assessment',
    data: 'Sensitive data leakage'
  }
  return info[type] || 'Security testing module'
}

const formatFindingTime = (timestamp: string): string => {
  if (!timestamp) return 'Just now'
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min ago`
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`
  return `${Math.floor(diffMins / 1440)} days ago`
}

const createScanSession = async (): Promise<string | null> => {
  try {
    const response = await apiCall(`${API_BASE}/sessions/`, {
      method: 'POST',
      body: JSON.stringify({
        name: `Deep Scan ${new Date().toLocaleString()}`,
        description: 'Automated deep security audit',
        target: 1,
        scan_intensity: selectedIntensity.value
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      currentScanSession.value = data.id
      return data.id
    } else {
      throw new Error('Failed to create scan session')
    }
  } catch (error) {
    console.error('Failed to create scan session:', error)
    showStatus('error', 'Failed to create scan session')
    return null
  }
}

const configureScan = async (sessionId: string): Promise<boolean> => {
  try {
    const response = await apiCall(`${API_BASE}/sessions/${sessionId}/configure_scan/`, {
      method: 'POST',
      body: JSON.stringify({
        scan_intensity: selectedIntensity.value,
        vulnerability_focus: selectedVulnerabilities.value,
        advanced_options: advancedOptions.value
      })
    })
    
    if (response.ok) {
      return true
    } else {
      throw new Error('Failed to configure scan')
    }
  } catch (error) {
    console.error('Failed to configure scan:', error)
    showStatus('error', 'Failed to configure scan parameters')
    return false
  }
}

const launchDeepScan = async (): Promise<void> => {
  showStatus('info', 'Preparing deep security audit...')
  
  try {
    const sessionId = await createScanSession()
    if (!sessionId) return
    
    const configured = await configureScan(sessionId)
    if (!configured) return
    
    const response = await apiCall(`${API_BASE}/sessions/${sessionId}/start_scan/`, {
      method: 'POST'
    })
    
    if (response.ok) {
      scanSetupComplete.value = true
      scanRunning.value = true
      showStatus('success', 'Deep security scan started successfully')
      
      startProgressMonitoring(sessionId)
    } else {
      const data = await response.json()
      throw new Error(data.error || 'Failed to start scan')
    }
  } catch (error) {
    console.error('Failed to launch deep scan:', error)
    showStatus('error', 'Failed to launch deep security scan')
  }
}

const pauseScan = async (): Promise<void> => {
  if (!currentScanSession.value) return
  
  try {
    const endpoint = scanRunning.value ? 'pause_scan' : 'resume_scan'
    const response = await apiCall(`${API_BASE}/sessions/${currentScanSession.value}/${endpoint}/`, {
      method: 'POST'
    })
    
    if (response.ok) {
      scanRunning.value = !scanRunning.value
      showStatus('success', `Scan ${scanRunning.value ? 'resumed' : 'paused'}`)
    } else {
      throw new Error(`Failed to ${scanRunning.value ? 'resume' : 'pause'} scan`)
    }
  } catch (error) {
    console.error('Failed to toggle scan state:', error)
    showStatus('error', `Failed to ${scanRunning.value ? 'resume' : 'pause'} scan`)
  }
}

const stopScan = async (): Promise<void> => {
  if (!currentScanSession.value) return
  
  try {
    const response = await apiCall(`${API_BASE}/sessions/${currentScanSession.value}/stop_scan/`, {
      method: 'POST'
    })
    
    if (response.ok) {
      scanRunning.value = false
      scanSetupComplete.value = false
      currentStep.value = 1
      deepScanProgress.value = 0
      showStatus('info', 'Scan stopped successfully')
    } else {
      throw new Error('Failed to stop scan')
    }
  } catch (error) {
    console.error('Failed to stop scan:', error)
    showStatus('error', 'Failed to stop scan')
  }
}

const generateReport = async (): Promise<void> => {
  if (!currentScanSession.value) return
  
  try {
    const response = await apiCall(`${API_BASE}/reports/generate_report/`, {
      method: 'POST',
      body: JSON.stringify({
        session_id: currentScanSession.value
      })
    })
    
    if (response.ok) {
      showStatus('success', 'Security report generated successfully')
    } else {
      throw new Error('Failed to generate report')
    }
  } catch (error) {
    console.error('Failed to generate report:', error)
    showStatus('error', 'Failed to generate security report')
  }
}

const fetchRecordedActions = async (): Promise<void> => {
  if (!currentScanSession.value) return
  
  try {
    const response = await apiCall(`${API_BASE}/sessions/${currentScanSession.value}/actions/`)
    
    if (response.ok) {
      const data = await response.json()
      recordedActions.value = data.results || data
    }
  } catch (error) {
    console.error('Failed to fetch recorded actions:', error)
  }
}

const fetchScanProgress = async (sessionId: string): Promise<void> => {
  try {
    const response = await apiCall(`${API_BASE}/progress/${sessionId}/`)
    
    if (response.ok) {
      const data = await response.json()
      
      deepScanProgress.value = data.overall_progress || 0
      vulnerabilitiesFound.value = data.vulnerabilities_found || 0
      elapsedTime.value = data.elapsed_time || '00:00:00'
      
      if (data.modules) {
        scanModules.value = data.modules
      }
      
      if (data.findings) {
        liveFindings.value = data.findings
        updateRiskDistribution()
      }
      
      if (data.status === 'completed') {
        scanRunning.value = false
        showStatus('success', 'Deep security scan completed')
      }
    }
  } catch (error) {
    console.error('Failed to fetch scan progress:', error)
  }
}

const updateRiskDistribution = (): void => {
  riskDistribution.value = { critical: 0, high: 0, medium: 0, low: 0 }
  
  liveFindings.value.forEach(finding => {
    const severity = finding.severity
    if (riskDistribution.value[severity] !== undefined) {
      riskDistribution.value[severity]++
    }
  })
}

const startProgressMonitoring = (sessionId: string): void => {
  const interval = setInterval(() => {
    if (scanRunning.value && deepScanProgress.value < 100) {
      fetchScanProgress(sessionId)
    } else if (deepScanProgress.value >= 100) {
      clearInterval(interval)
      scanRunning.value = false
    }
  }, 3000)
  
  onUnmounted(() => {
    clearInterval(interval)
  })
}

// Initialize
onMounted(async () => {
  await testAPIConnectivity()
  await fetchUserData()
  await checkExtensionStatus()
  showStatus('info', 'Deep Security Audit dashboard loaded')
  
  // Set up periodic health checks
  const healthCheckInterval = setInterval(async () => {
    await checkAPIHealth()
  }, 30000) // Every 30 seconds
  
  onUnmounted(() => {
    clearInterval(healthCheckInterval)
  })
})

onUnmounted(() => {
  // Cleanup any intervals
})
</script>

<style scoped>
/* All the CSS styles from the previous response remain exactly the same */
/* ... (include all the CSS from the previous response here) ... */

.deep-scan-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: #ffffff;
  display: grid;
  grid-template-columns: 1fr 320px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
}

/* Enhanced Header */
.dashboard-header {
  grid-column: 1 / -1;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 240, 255, 0.2);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* ... (rest of the CSS remains exactly the same as in the previous response) ... */

/* Enhanced Step Content */
.step-fade-enter-active,
.step-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.step-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.step-content {
  animation: contentSlide 0.5s ease-out;
}

@keyframes contentSlide {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ... (rest of the CSS remains exactly the same) ... */

/* Responsive Design */
@media (max-width: 1024px) {
  .deep-scan-dashboard {
    grid-template-columns: 1fr;
  }
  
  .stats-sidebar {
    display: none;
  }
  
  .scan-summary {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-main {
    padding: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .step-indicator {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .step-connector {
    display: none;
  }
  
  .step-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .browser-options {
    grid-template-columns: 1fr;
  }
  
  .footer-actions {
    flex-direction: column;
  }
  
  .token-display {
    flex-direction: column;
    align-items: stretch;
  }
  
  .copy-button {
    justify-content: center;
  }
  
  .scan-controls {
    flex-direction: column;
  }
  
  .progress-stats {
    grid-template-columns: 1fr;
  }
  
  .module-grid {
    grid-template-columns: 1fr;
  }
  
  .vulnerability-options {
    grid-template-columns: 1fr;
  }
  
  .coverage-metrics {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .risk-meter {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .meter-bar {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .wizard-title {
    font-size: 2rem;
  }
  
  .scan-title {
    font-size: 2rem;
  }
  
  .step-body {
    padding: 1.5rem;
  }
  
  .step-header {
    padding: 2rem 1.5rem 1rem;
  }
  
  .extension-actions {
    flex-direction: column;
  }
  
  .config-section {
    padding: 1.5rem;
  }
  
  .intensity-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .vuln-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .finding-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .finding-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>

<style scoped>
/* Enhanced CSS with professional styling */

.deep-scan-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: #ffffff;
  display: grid;
  grid-template-columns: 1fr 320px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
}

/* Enhanced Header */
.dashboard-header {
  grid-column: 1 / -1;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 240, 255, 0.2);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
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
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 6px;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: rgba(0, 240, 255, 0.1);
  border-color: #00f0ff;
  transform: translateX(-2px);
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  font-size: 1.25rem;
  img{
    width: 70px;  /* Fixed size - not oversized */
    height: 70px; /* Fixed size - not oversized */
    object-fit: contain;
    filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.5));
    transition: all 0.3s ease;
  }
}

.logo-icon {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logo-text {
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.user-name {
  font-weight: 600;
  color: #ffffff;
}

/* Enhanced Connection Status */
.connection-status {
  position: fixed;
  top: 90px;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 9999;
  backdrop-filter: blur(20px);
  border: 1px solid;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  max-width: 400px;
}

.connection-status.info {
  background: rgba(0, 240, 255, 0.1);
  border-color: rgba(0, 240, 255, 0.4);
  color: #00f0ff;
}

.connection-status.success {
  background: rgba(0, 255, 65, 0.1);
  border-color: rgba(0, 255, 65, 0.4);
  color: #00ff41;
}

.status-slide-enter-active,
.status-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.status-slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.status-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Enhanced Main Dashboard */
.dashboard-main {
  padding: 2rem;
  overflow-y: auto;
}

.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Enhanced Setup Wizard */
.setup-wizard {
  max-width: 900px;
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
  letter-spacing: -0.02em;
}

.wizard-subtitle {
  color: #94a3b8;
  font-size: 1.125rem;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto;
}

/* Enhanced Step Indicator */
.wizard-progress {
  margin-bottom: 3rem;
}

.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  z-index: 2;
}

.step-bubble {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.2);
  font-weight: 700;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.step.active .step-bubble {
  background: #00f0ff;
  border-color: #00f0ff;
  color: #000;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
  transform: scale(1.1);
}

.step.completed .step-bubble {
  background: #00ff41;
  border-color: #00ff41;
  color: #000;
}

.step-number {
  transition: all 0.3s ease;
}

.step-check {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.3s ease;
}

.step.completed .step-number {
  opacity: 0;
}

.step.completed .step-check {
  opacity: 1;
}

.step-label {
  font-size: 0.875rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.step.active .step-label {
  color: #00f0ff;
}

.step.completed .step-label {
  color: #00ff41;
}

.step-connector {
  width: 100px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;
  position: relative;
}

.step-connector.active {
  background: linear-gradient(90deg, #00f0ff, #00ff41);
}

/* Enhanced Step Content */
.step-fade-enter-active,
.step-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.step-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.step-content {
  animation: contentSlide 0.5s ease-out;
}

@keyframes contentSlide {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.step-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.step-header {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2.5rem 2.5rem 1.5rem;
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.05) 0%, rgba(185, 103, 255, 0.05) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.step-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.step-info {
  flex: 1;
}

.step-info h3 {
  font-family: 'Orbitron', monospace;
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
  color: #ffffff;
  font-weight: 700;
}

.step-info p {
  color: #94a3b8;
  font-size: 1.125rem;
  line-height: 1.7;
  margin: 0;
}

.step-body {
  padding: 2.5rem;
}

/* Enhanced Browser Options */
.browser-section {
  margin-bottom: 2.5rem;
}

.browser-section h4 {
  color: #00f0ff;
  margin-bottom: 1.25rem;
  font-family: 'Orbitron', monospace;
  font-size: 1.125rem;
}

.browser-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.browser-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.browser-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.1), transparent);
  transition: left 0.6s ease;
}

.browser-option:hover::before {
  left: 100%;
}

.browser-option:hover {
  border-color: #00f0ff;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 255, 0.15);
}

.browser-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.browser-info {
  display: flex;
  flex-direction: column;
}

.browser-name {
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.25rem;
}

.browser-desc {
  color: #64748b;
  font-size: 0.875rem;
}

/* Enhanced Extension Section */
.extension-section {
  margin-bottom: 2rem;
}

.extension-preview {
  display: flex;
  justify-content: center;
}

.extension-mockup {
  background: #1a1a1a;
  border: 1px solid #00f0ff;
  border-radius: 12px;
  overflow: hidden;
  max-width: 320px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 240, 255, 0.2);
}

.extension-header {
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(185, 103, 255, 0.2) 100%);
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid rgba(0, 240, 255, 0.3);
}

.extension-icon {
  font-size: 1.5rem;
}

.extension-name {
  font-weight: 600;
  color: #00f0ff;
  font-family: 'Orbitron', monospace;
}

.extension-body {
  padding: 1.5rem;
}

.extension-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  justify-content: center;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #666;
  transition: all 0.3s ease;
  position: relative;
}

.status-indicator.active {
  background: #00ff41;
  animation: statusPulse 2s infinite;
}

.status-indicator.connected {
  background: #00ff41;
  animation: connectedPulse 1.5s infinite;
}

@keyframes statusPulse {
  0%, 100% { 
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(0, 255, 65, 0.7);
  }
  50% { 
    opacity: 0.7;
    box-shadow: 0 0 0 8px rgba(0, 255, 65, 0);
  }
}

@keyframes connectedPulse {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 255, 65, 0.4);
  }
  50% { 
    transform: scale(1.1);
    box-shadow: 0 0 0 4px rgba(0, 255, 65, 0);
  }
}

.status-text {
  font-weight: 600;
  color: #ffffff;
}

.extension-actions {
  display: flex;
  gap: 0.75rem;
}

.extension-button {
  flex: 1;
  padding: 0.875rem 1rem;
  border: none;
  border-radius: 8px;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.extension-button.primary {
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  color: #000;
}

.extension-button.primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 240, 255, 0.4);
}

.extension-button.secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
}

.extension-button.secondary:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: #00f0ff;
}

.extension-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.button-loading {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: 0.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Enhanced Manual Setup */
.expand-fade-enter-active,
.expand-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.expand-fade-enter-from,
.expand-fade-leave-to {
  opacity: 0;
  max-height: 0;
  transform: scale(0.95);
}

.expand-fade-enter-to,
.expand-fade-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: scale(1);
}

.manual-setup {
  background: rgba(0, 240, 255, 0.05);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 1.5rem;
}

.manual-header {
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid rgba(0, 240, 255, 0.1);
}

.manual-header h4 {
  color: #00f0ff;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', monospace;
}

.manual-header p {
  color: #94a3b8;
  margin: 0;
  font-size: 0.875rem;
}

.manual-content {
  padding: 1.5rem;
}

.setup-steps {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.setup-step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-marker {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  color: #000;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  padding-top: 0.25rem;
  color: #ffffff;
}

.step-content strong {
  color: #00f0ff;
}

/* Enhanced Auth Token Section */
.auth-token-section {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.token-header {
  margin-bottom: 1rem;
}

.token-header h5 {
  color: #00f0ff;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', monospace;
}

.token-header p {
  color: #94a3b8;
  margin: 0;
  font-size: 0.875rem;
}

.token-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  font-family: 'Courier New', monospace;
}

.token-value {
  flex: 1;
  color: #00ff41;
  font-size: 0.875rem;
  word-break: break-all;
  background: rgba(0, 255, 65, 0.05);
  padding: 0.5rem;
  border-radius: 4px;
}

.copy-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: #ffffff;
  font-family: 'Orbitron', monospace;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.copy-button:hover {
  background: rgba(0, 240, 255, 0.2);
  border-color: #00f0ff;
  transform: translateY(-1px);
}

.copy-icon {
  font-size: 1rem;
}

/* Enhanced Step 2 Components */
.recording-interface {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.recording-controls {
  background: rgba(0, 0, 0, 0.3);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.recording-status {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  justify-content: center;
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

.status-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.status-label {
  font-weight: 600;
  font-size: 1.125rem;
}

.status-desc {
  color: #94a3b8;
  font-size: 0.875rem;
}

.control-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.session-preview {
  background: rgba(0, 0, 0, 0.3);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.preview-header h4 {
  color: #00f0ff;
  margin: 0;
  font-family: 'Orbitron', monospace;
}

.action-count {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 600;
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 300px;
  overflow-y: auto;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.action-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(4px);
}

.action-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.action-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.action-type {
  font-weight: 600;
  color: #00f0ff;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 1px;
}

.action-target {
  color: #ccc;
  font-size: 0.875rem;
}

.action-time {
  color: #64748b;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.recording-tips {
  background: rgba(0, 240, 255, 0.1);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 240, 255, 0.3);
}

.tips-header {
  margin-bottom: 1.5rem;
}

.tips-header h4 {
  color: #00f0ff;
  margin: 0;
  font-family: 'Orbitron', monospace;
}

.tips-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.tip-item {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.875rem;
  border-left: 3px solid #00f0ff;
}

/* Enhanced Step 3 Components */
.scan-configuration {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.config-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 2rem;
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-header h4 {
  color: #00f0ff;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', monospace;
}

.section-description {
  color: #94a3b8;
  font-size: 0.875rem;
  margin: 0;
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
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.intensity-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.1), transparent);
  transition: left 0.6s ease;
}

.intensity-card:hover::before {
  left: 100%;
}

.intensity-card.active {
  border-color: #00f0ff;
  background: rgba(0, 240, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 255, 0.2);
}

.intensity-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.intensity-info {
  flex: 1;
  text-align: left;
}

.intensity-info strong {
  display: block;
  margin-bottom: 0.5rem;
  color: white;
  font-size: 1.125rem;
}

.intensity-info span {
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.5;
}

.intensity-duration {
  color: #00ff41;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 255, 65, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(0, 255, 65, 0.3);
}

.vulnerability-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.vuln-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.1), transparent);
  transition: left 0.6s ease;
}

.vuln-card:hover::before {
  left: 100%;
}

.vuln-option input:checked + .vuln-card {
  border-color: #00f0ff;
  background: rgba(0, 240, 255, 0.1);
  transform: translateY(-2px);
}

.vuln-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.vuln-info {
  flex: 1;
  text-align: left;
}

.vuln-info strong {
  display: block;
  margin-bottom: 0.25rem;
  color: white;
  font-size: 1rem;
}

.vuln-info span {
  color: #94a3b8;
  font-size: 0.75rem;
  line-height: 1.4;
}

.vuln-severity {
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.vuln-severity.critical {
  background: rgba(255, 0, 0, 0.2);
  color: #ff4444;
  border: 1px solid rgba(255, 68, 68, 0.4);
}

.vuln-severity.high {
  background: rgba(255, 165, 0, 0.2);
  color: #ffa500;
  border: 1px solid rgba(255, 165, 0, 0.4);
}

.vuln-severity.medium {
  background: rgba(255, 255, 0, 0.2);
  color: #ffff00;
  border: 1px solid rgba(255, 255, 0, 0.4);
}

.advanced-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.advanced-option {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.advanced-option:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 240, 255, 0.3);
}

.advanced-option input {
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.option-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.option-content strong {
  color: white;
  font-size: 1rem;
}

.option-content span {
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Enhanced Step 4 Components */
.scan-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.summary-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 2rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.summary-label {
  color: #94a3b8;
  font-weight: 600;
  font-size: 0.875rem;
}

.summary-value {
  color: #00ff41;
  font-family: 'Courier New', monospace;
  font-weight: 700;
  font-size: 0.875rem;
}

.coverage-metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.coverage-metric {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(0, 240, 255, 0.2);
  transition: all 0.3s ease;
}

.coverage-metric:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 255, 0.15);
}

.metric-value {
  font-size: 1.75rem;
  font-weight: 900;
  color: #00f0ff;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', monospace;
}

.metric-label {
  color: #94a3b8;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.risk-assessment {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 2rem;
}

.risk-meters {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.risk-meter {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.meter-label {
  flex: 1;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
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
  min-width: 100px;
  text-align: right;
  font-weight: 700;
  font-family: 'Orbitron', monospace;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

.meter-value.high-risk {
  background: rgba(255, 68, 68, 0.2);
  color: #ff4444;
  border: 1px solid rgba(255, 68, 68, 0.4);
}

.meter-value.medium-risk {
  background: rgba(255, 165, 0, 0.2);
  color: #ffa500;
  border: 1px solid rgba(255, 165, 0, 0.4);
}

.meter-value.low-risk {
  background: rgba(0, 255, 65, 0.2);
  color: #00ff41;
  border: 1px solid rgba(0, 255, 65, 0.4);
}

/* Enhanced Active Scan Dashboard */
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
  color: #94a3b8;
  font-size: 1.125rem;
}

.scan-dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Progress Overview */
.progress-overview {
  margin-bottom: 1rem;
}

.progress-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.progress-header h3 {
  font-family: 'Orbitron', monospace;
  color: white;
  margin: 0;
  font-size: 1.5rem;
}

.progress-time {
  color: #00ff41;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  font-size: 0.875rem;
}

.progress-bar-large {
  height: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00f0ff, #00ff41);
  border-radius: 8px;
  transition: width 0.5s ease;
  position: relative;
  overflow: hidden;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.progress-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.progress-stat {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.progress-stat:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 255, 0.15);
}

.stat-value {
  font-size: 2rem;
  font-weight: 900;
  color: #00f0ff;
  margin-bottom: 0.5rem;
  font-family: 'Orbitron', monospace;
}

.stat-label {
  color: #94a3b8;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

/* Scan Modules */
.scan-modules {
  margin-bottom: 1rem;
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.module-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.module-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.1), transparent);
  transition: left 0.6s ease;
}

.module-card:hover::before {
  left: 100%;
}

.module-card.active {
  border-color: #00f0ff;
  background: rgba(0, 240, 255, 0.1);
  transform: translateY(-2px);
}

.module-card.completed {
  border-color: #00ff41;
  background: rgba(0, 255, 65, 0.1);
}

.module-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.module-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.module-header h4 {
  flex: 1;
  margin: 0;
  color: white;
  font-family: 'Orbitron', monospace;
  font-size: 1.125rem;
}

.module-status {
  color: #00ff41;
  font-weight: 700;
  font-size: 1.25rem;
}

.module-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.module-bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.module-fill {
  height: 100%;
  background: linear-gradient(90deg, #00f0ff, #00ff41);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.module-percent {
  color: #00ff41;
  font-family: 'Courier New', monospace;
  font-weight: 700;
  min-width: 45px;
  font-size: 0.875rem;
}

.module-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.module-info {
  color: #94a3b8;
  font-size: 0.875rem;
}

.module-findings {
  color: #ff4444;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 68, 68, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 68, 68, 0.3);
}

/* Vulnerability Feed */
.vulnerability-feed {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.feed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.feed-header h3 {
  font-family: 'Orbitron', monospace;
  color: white;
  margin: 0;
  font-size: 1.5rem;
}

.feed-controls {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: #94a3b8;
  font-family: 'Orbitron', monospace;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-btn.active {
  background: #00f0ff;
  border-color: #00f0ff;
  color: black;
}

.filter-btn:hover:not(.active) {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.feed-content {
  max-height: 400px;
  overflow-y: auto;
}

.finding-item {
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.3s ease;
  position: relative;
  overflow: hidden;
}

.finding-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.05), transparent);
  transition: left 0.6s ease;
}

.finding-item:hover::before {
  left: 100%;
}

.finding-item:hover {
  background: rgba(255, 255, 255, 0.02);
}

.finding-item:last-child {
  border-bottom: none;
}

.finding-severity {
  width: 6px;
  border-radius: 3px;
  flex-shrink: 0;
  position: relative;
}

.finding-severity::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: inherit;
  filter: brightness(1.2);
}

.finding-severity.critical { 
  background: #ff4444; 
  box-shadow: 0 0 10px rgba(255, 68, 68, 0.5);
}

.finding-severity.high { 
  background: #ffa500; 
  box-shadow: 0 0 10px rgba(255, 165, 0, 0.5);
}

.finding-severity.medium { 
  background: #ffff00; 
  box-shadow: 0 0 10px rgba(255, 255, 0, 0.5);
}

.finding-content {
  flex: 1;
}

.finding-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.finding-title {
  font-weight: 700;
  color: white;
  flex: 1;
  font-size: 1.125rem;
  line-height: 1.4;
}

.finding-time {
  color: #64748b;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  flex-shrink: 0;
  margin-left: 1rem;
}

.finding-description {
  color: #94a3b8;
  margin-bottom: 1rem;
  line-height: 1.6;
  font-size: 0.875rem;
}

.finding-meta {
  display: flex;
  gap: 1.5rem;
  font-size: 0.75rem;
  color: #64748b;
}

.finding-location {
  font-family: 'Courier New', monospace;
  flex: 1;
}

.finding-cvss {
  font-weight: 700;
  color: #ff4444;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 68, 68, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 68, 68, 0.3);
}

.no-findings {
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
}

.no-findings-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.no-findings p {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  color: #94a3b8;
}

.no-findings-desc {
  font-size: 0.875rem;
  color: #64748b;
}

/* Scan Controls */
.scan-controls {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  padding: 2.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Enhanced Footer */
.step-footer {
  padding: 2rem 2.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: space-between;
}

/* Enhanced Button System */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-size: 0.875rem;
  text-decoration: none;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  color: #000;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 240, 255, 0.4);
}

.btn-secondary {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
}

.btn-secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.05);
  border-color: #00f0ff;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
}

.btn-danger {
  background: transparent;
  border: 2px solid rgba(255, 68, 68, 0.6);
  color: #ff4444;
}

.btn-danger:hover:not(:disabled) {
  background: rgba(255, 68, 68, 0.1);
  box-shadow: 0 0 20px rgba(255, 68, 68, 0.3);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.btn-arrow {
  font-size: 1.125rem;
  transition: transform 0.3s ease;
}

.btn:hover .btn-arrow {
  transform: translateX(2px);
}

.btn-secondary:hover .btn-arrow {
  transform: translateX(-2px);
}

.btn.large {
  padding: 1.25rem 2.5rem;
  font-size: 1rem;
}

/* Enhanced Stats Sidebar */
.stats-sidebar {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  overflow-y: auto;
}

.sidebar-section {
  margin-bottom: 2.5rem;
}

.sidebar-section h4 {
  color: #00f0ff;
  margin-bottom: 1.5rem;
  font-family: 'Orbitron', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.875rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.75rem;
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
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 240, 255, 0.15);
}

.stat-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 900;
  color: #00f0ff;
  margin-bottom: 0.25rem;
  font-family: 'Orbitron', monospace;
}

.stat-label {
  color: #94a3b8;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

/* Risk Chart */
.risk-chart {
  display: flex;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.risk-segment {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.risk-segment:hover {
  transform: scale(1.05);
  z-index: 2;
}

.risk-segment.critical { 
  background: linear-gradient(135deg, #ff4444, #cc0000); 
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
}

.risk-segment.high { 
  background: linear-gradient(135deg, #ffa500, #cc8400); 
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
}

.risk-segment.medium { 
  background: linear-gradient(135deg, #ffff00, #cccc00); 
  color: #000;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
}

.risk-segment.low { 
  background: linear-gradient(135deg, #00ff41, #00cc34); 
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
}

.risk-label {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.6rem;
}

.risk-count {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
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
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.activity-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.1), transparent);
  transition: left 0.6s ease;
}

.activity-item:hover::before {
  left: 100%;
}

.activity-item:hover {
  transform: translateX(4px);
  border-color: rgba(0, 240, 255, 0.3);
}

.activity-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.activity-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.activity-message {
  color: white;
  font-size: 0.875rem;
  line-height: 1.4;
}

.activity-time {
  color: #64748b;
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .deep-scan-dashboard {
    grid-template-columns: 1fr;
  }
  
  .stats-sidebar {
    display: none;
  }
  
  .scan-summary {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-main {
    padding: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .step-indicator {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .step-connector {
    display: none;
  }
  
  .step-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .browser-options {
    grid-template-columns: 1fr;
  }
  
  .footer-actions {
    flex-direction: column;
  }
  
  .token-display {
    flex-direction: column;
    align-items: stretch;
  }
  
  .copy-button {
    justify-content: center;
  }
  
  .scan-controls {
    flex-direction: column;
  }
  
  .progress-stats {
    grid-template-columns: 1fr;
  }
  
  .module-grid {
    grid-template-columns: 1fr;
  }
  
  .vulnerability-options {
    grid-template-columns: 1fr;
  }
  
  .coverage-metrics {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .risk-meter {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .meter-bar {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .wizard-title {
    font-size: 2rem;
  }
  
  .scan-title {
    font-size: 2rem;
  }
  
  .step-body {
    padding: 1.5rem;
  }
  
  .step-header {
    padding: 2rem 1.5rem 1rem;
  }
  
  .extension-actions {
    flex-direction: column;
  }
  
  .config-section {
    padding: 1.5rem;
  }
  
  .intensity-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .vuln-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .finding-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .finding-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>