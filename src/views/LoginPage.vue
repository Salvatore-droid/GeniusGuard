<template>
  <div class="login-page">
    <!-- Cyber Background -->
    <div class="cyber-background">
      <div class="cyber-grid"></div>
      <div class="floating-particles">
        <div class="particle" v-for="n in 20" :key="n" :style="getParticleStyle(n)"></div>
      </div>
      <div class="energy-orb orb-1"></div>
      <div class="energy-orb orb-2"></div>
      <div class="energy-orb orb-3"></div>
    </div>

    <!-- Main Content -->
    <div class="login-container">
      <!-- Header -->
      <header class="login-header">
        <router-link to="/" class="back-home">
          <span class="back-arrow">←</span>
          BACK TO HOME
        </router-link>
        <div class="header-logo">
          <img src="../assets/images/icon128.png" alt="GeniusGuard" class="logo-icon">
          <span class="logo-text">GENIUS GUARD</span>
        </div>
      </header>

      <!-- Login Card -->
      <div class="login-card">
        <!-- Card Header -->
        <div class="card-header">
          <div class="security-icon">🔐</div>
          <h1 class="card-title">SECURE ACCESS PORTAL</h1>
          <p class="card-subtitle">Authenticate to access the security dashboard</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="login-form">
          <!-- Form Status -->
          <div v-if="formStatus.message" class="form-status" :class="formStatus.type">
            <span class="status-icon">{{ formStatus.icon }}</span>
            {{ formStatus.message }}
          </div>

          <!-- Username Field -->
          <div class="form-group">
            <label for="username" class="form-label">
              <span class="label-icon">👤</span>
              USERNAME
            </label>
            <div class="input-container">
              <input
                id="username"
                v-model="loginData.username"
                type="text"
                class="cyber-input"
                :class="{ error: fieldErrors.username }"
                placeholder="Enter your username"
                required
                @focus="clearFieldError('username')"
              />
              <div class="input-decoration"></div>
            </div>
            <div v-if="fieldErrors.username" class="field-error">
              <span class="error-icon">⚠️</span>
              {{ fieldErrors.username }}
            </div>
          </div>

          <!-- Password Field -->
          <div class="form-group">
            <label for="password" class="form-label">
              <span class="label-icon">🔑</span>
              PASSWORD
            </label>
            <div class="input-container">
              <input
                id="password"
                v-model="loginData.password"
                :type="showPassword ? 'text' : 'password'"
                class="cyber-input"
                :class="{ error: fieldErrors.password }"
                placeholder="Enter your password"
                required
                @focus="clearFieldError('password')"
              />
              <div class="input-decoration"></div>
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                <span class="toggle-icon">{{ showPassword ? '👁️' : '👁️‍🗨️' }}</span>
              </button>
            </div>
            <div v-if="fieldErrors.password" class="field-error">
              <span class="error-icon">⚠️</span>
              {{ fieldErrors.password }}
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="form-options">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="loginData.remember"
                class="cyber-checkbox"
              />
              <span class="checkmark"></span>
              REMEMBER ME
            </label>
            <button type="button" class="forgot-password" @click="showForgotPassword">
              FORGOT PASSWORD?
            </button>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="login-button"
            :class="{ loading: isLoading }"
            :disabled="isLoading"
          >
            <span v-if="!isLoading" class="button-content">
              <span class="button-icon">🚀</span>
              ACCESS SECURITY DASHBOARD
            </span>
            <span v-else class="button-content">
              <span class="loading-spinner"></span>
              AUTHENTICATING...
            </span>
            <div class="button-glow"></div>
          </button>

          <!-- Demo Access -->
          <div class="demo-section">
            <div class="demo-divider">
              <span class="divider-text">QUICK ACCESS</span>
            </div>
            <button
              type="button"
              class="demo-button"
              @click="useDemoAccount"
              :disabled="isLoading"
            >
              <span class="demo-icon">🎮</span>
              TRY DEMO MODE
            </button>
            <p class="demo-note">Experience the platform with sample data</p>
          </div>
        </form>

        <!-- Registration Prompt -->
        <div class="register-prompt">
          <span class="prompt-text">NEW TO GENIUS GUARD?</span>
          <button class="register-link" @click="showRegistration">
            CREATE SECURITY ACCOUNT
          </button>
        </div>
      </div>

      <!-- Security Features -->
      <div class="security-features">
        <div class="feature">
          <div class="feature-icon">🛡️</div>
          <span class="feature-text">Military-Grade Encryption</span>
        </div>
        <div class="feature">
          <div class="feature-icon">🔍</div>
          <span class="feature-text">Real-time Monitoring</span>
        </div>
        <div class="feature">
          <div class="feature-icon">⚡</div>
          <span class="feature-text">AI-Powered Security</span>
        </div>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <div v-if="showForgotPasswordModal" class="modal-overlay" @click="closeModals">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>PASSWORD RECOVERY</h3>
          <button class="modal-close" @click="closeModals">×</button>
        </div>
        <div class="modal-body">
          <p>Enter your email to receive password reset instructions:</p>
          <input
            v-model="recoveryEmail"
            type="email"
            class="cyber-input"
            placeholder="security@yourcompany.com"
          />
        </div>
        <div class="modal-actions">
          <button @click="closeModals" class="btn-secondary">CANCEL</button>
          <button @click="sendRecovery" class="btn-primary">SEND RECOVERY</button>
        </div>
      </div>
    </div>

    <!-- Registration Modal -->
    <div v-if="showRegistrationModal" class="modal-overlay" @click="closeModals">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>CREATE SECURITY ACCOUNT</h3>
          <button class="modal-close" @click="closeModals">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleRegistration" class="registration-form">
            <!-- Form Status -->
            <div v-if="registrationStatus.message" class="form-status" :class="registrationStatus.type">
              <span class="status-icon">{{ registrationStatus.icon }}</span>
              {{ registrationStatus.message }}
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label for="reg-username" class="form-label">
                  <span class="label-icon">👤</span>
                  USERNAME
                </label>
                <input
                  id="reg-username"
                  v-model="registrationData.username"
                  type="text"
                  class="cyber-input"
                  :class="{ error: registrationErrors.username }"
                  placeholder="Choose username"
                  required
                  @focus="clearRegistrationError('username')"
                />
                <div v-if="registrationErrors.username" class="field-error">
                  <span class="error-icon">⚠️</span>
                  {{ registrationErrors.username }}
                </div>
              </div>

              <div class="form-group">
                <label for="reg-email" class="form-label">
                  <span class="label-icon">📧</span>
                  EMAIL
                </label>
                <input
                  id="reg-email"
                  v-model="registrationData.email"
                  type="email"
                  class="cyber-input"
                  :class="{ error: registrationErrors.email }"
                  placeholder="your@email.com"
                  required
                  @focus="clearRegistrationError('email')"
                />
                <div v-if="registrationErrors.email" class="field-error">
                  <span class="error-icon">⚠️</span>
                  {{ registrationErrors.email }}
                </div>
              </div>

              <div class="form-group">
                <label for="reg-firstname" class="form-label">
                  <span class="label-icon">🆔</span>
                  FIRST NAME
                </label>
                <input
                  id="reg-firstname"
                  v-model="registrationData.first_name"
                  type="text"
                  class="cyber-input"
                  placeholder="Optional"
                />
              </div>

              <div class="form-group">
                <label for="reg-lastname" class="form-label">
                  <span class="label-icon">🆔</span>
                  LAST NAME
                </label>
                <input
                  id="reg-lastname"
                  v-model="registrationData.last_name"
                  type="text"
                  class="cyber-input"
                  placeholder="Optional"
                />
              </div>

              <div class="form-group full-width">
                <label for="reg-password" class="form-label">
                  <span class="label-icon">🔑</span>
                  PASSWORD
                </label>
                <div class="input-container">
                  <input
                    id="reg-password"
                    v-model="registrationData.password"
                    :type="showRegistrationPassword ? 'text' : 'password'"
                    class="cyber-input"
                    :class="{ error: registrationErrors.password }"
                    placeholder="Minimum 6 characters"
                    required
                    @focus="clearRegistrationError('password')"
                  />
                  <div class="input-decoration"></div>
                  <button
                    type="button"
                    class="password-toggle"
                    @click="showRegistrationPassword = !showRegistrationPassword"
                  >
                    <span class="toggle-icon">{{ showRegistrationPassword ? '👁️' : '👁️‍🗨️' }}</span>
                  </button>
                </div>
                <div v-if="registrationErrors.password" class="field-error">
                  <span class="error-icon">⚠️</span>
                  {{ registrationErrors.password }}
                </div>
              </div>

              <div class="form-group full-width">
                <label for="reg-confirm" class="form-label">
                  <span class="label-icon">✅</span>
                  CONFIRM PASSWORD
                </label>
                <div class="input-container">
                  <input
                    id="reg-confirm"
                    v-model="registrationData.confirm_password"
                    :type="showRegistrationConfirm ? 'text' : 'password'"
                    class="cyber-input"
                    :class="{ error: registrationErrors.confirm_password }"
                    placeholder="Confirm your password"
                    required
                    @focus="clearRegistrationError('confirm_password')"
                  />
                  <div class="input-decoration"></div>
                  <button
                    type="button"
                    class="password-toggle"
                    @click="showRegistrationConfirm = !showRegistrationConfirm"
                  >
                    <span class="toggle-icon">{{ showRegistrationConfirm ? '👁️' : '👁️‍🗨️' }}</span>
                  </button>
                </div>
                <div v-if="registrationErrors.confirm_password" class="field-error">
                  <span class="error-icon">⚠️</span>
                  {{ registrationErrors.confirm_password }}
                </div>
              </div>
            </div>

            <div class="form-options">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="registrationData.agree_terms"
                  class="cyber-checkbox"
                  required
                />
                <span class="checkmark"></span>
                I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a>
              </label>
            </div>

            <div class="modal-actions">
              <button type="button" @click="closeModals" class="btn-secondary">CANCEL</button>
              <button 
                type="submit" 
                class="btn-primary"
                :class="{ loading: isRegistering }"
                :disabled="isRegistering"
              >
                <span v-if="!isRegistering">CREATE ACCOUNT</span>
                <span v-else>CREATING ACCOUNT...</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Connection Status -->
    <div v-if="connectionStatus" class="connection-status" :class="connectionStatus.type">
      <span class="status-icon">{{ connectionStatus.icon }}</span>
      {{ connectionStatus.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// API Configuration
const API_BASE = '/api'

// Reactive state
const isLoading = ref(false)
const isRegistering = ref(false)
const showPassword = ref(false)
const showRegistrationPassword = ref(false)
const showRegistrationConfirm = ref(false)
const showForgotPasswordModal = ref(false)
const showRegistrationModal = ref(false)
const recoveryEmail = ref('')

// Form data
const loginData = reactive({
  username: '',
  password: '',
  remember: false
})

// Registration data
const registrationData = reactive({
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  confirm_password: '',
  agree_terms: false
})

// Form status and errors
const formStatus = reactive({
  type: '', // 'success', 'error', 'warning', 'info'
  message: '',
  icon: ''
})

const registrationStatus = reactive({
  type: '', // 'success', 'error', 'warning', 'info'
  message: '',
  icon: ''
})

const fieldErrors = reactive({
  username: '',
  password: ''
})

const registrationErrors = reactive({
  username: '',
  email: '',
  password: '',
  confirm_password: ''
})

const connectionStatus = ref<{type: string, message: string, icon: string} | null>(null)

// Methods
const showStatus = (type: string, message: string) => {
  const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' }
  connectionStatus.value = { type, message, icon: icons[type as keyof typeof icons] }
  setTimeout(() => {
    connectionStatus.value = null
  }, 5000)
}

const setFormStatus = (type: string, message: string) => {
  const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' }
  formStatus.type = type
  formStatus.message = message
  formStatus.icon = icons[type as keyof typeof icons]
  
  const timeout = type === 'error' || type === 'warning' ? 8000 : 5000
  setTimeout(() => {
    formStatus.type = ''
    formStatus.message = ''
    formStatus.icon = ''
  }, timeout)
}

const setRegistrationStatus = (type: string, message: string) => {
  const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' }
  registrationStatus.type = type
  registrationStatus.message = message
  registrationStatus.icon = icons[type as keyof typeof icons]
  
  const timeout = type === 'error' || type === 'warning' ? 8000 : 5000
  setTimeout(() => {
    registrationStatus.type = ''
    registrationStatus.message = ''
    registrationStatus.icon = ''
  }, timeout)
}

const clearFieldError = (field: string) => {
  if (fieldErrors[field as keyof typeof fieldErrors]) {
    fieldErrors[field as keyof typeof fieldErrors] = ''
  }
}

const clearRegistrationError = (field: string) => {
  if (registrationErrors[field as keyof typeof registrationErrors]) {
    registrationErrors[field as keyof typeof registrationErrors] = ''
  }
}

const validateForm = (): boolean => {
  let isValid = true
  
  Object.keys(fieldErrors).forEach(key => {
    fieldErrors[key as keyof typeof fieldErrors] = ''
  })
  
  if (!loginData.username.trim()) {
    fieldErrors.username = 'Username is required'
    isValid = false
  } else if (loginData.username.length < 3) {
    fieldErrors.username = 'Username must be at least 3 characters'
    isValid = false
  }
  
  if (!loginData.password) {
    fieldErrors.password = 'Password is required'
    isValid = false
  } else if (loginData.password.length < 6) {
    fieldErrors.password = 'Password must be at least 6 characters'
    isValid = false
  }
  
  return isValid
}

const validateRegistration = (): boolean => {
  let isValid = true
  
  Object.keys(registrationErrors).forEach(key => {
    registrationErrors[key as keyof typeof registrationErrors] = ''
  })
  
  // Validate username
  if (!registrationData.username.trim()) {
    registrationErrors.username = 'Username is required'
    isValid = false
  } else if (registrationData.username.length < 3) {
    registrationErrors.username = 'Username must be at least 3 characters'
    isValid = false
  }
  
  // Validate email
  if (!registrationData.email.trim()) {
    registrationErrors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registrationData.email)) {
    registrationErrors.email = 'Please enter a valid email address'
    isValid = false
  }
  
  // Validate password
  if (!registrationData.password) {
    registrationErrors.password = 'Password is required'
    isValid = false
  } else if (registrationData.password.length < 6) {
    registrationErrors.password = 'Password must be at least 6 characters'
    isValid = false
  }
  
  // Validate confirm password
  if (!registrationData.confirm_password) {
    registrationErrors.confirm_password = 'Please confirm your password'
    isValid = false
  } else if (registrationData.password !== registrationData.confirm_password) {
    registrationErrors.confirm_password = 'Passwords do not match'
    isValid = false
  }
  
  // Validate terms
  if (!registrationData.agree_terms) {
    setRegistrationStatus('error', 'You must agree to the terms and conditions')
    isValid = false
  }
  
  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  setFormStatus('info', 'Authenticating...')

  try {
    const response = await fetch(`/api/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: loginData.username,
        password: loginData.password
      })
    })

    // Check if response is JSON
    const contentType = response.headers.get('content-type')
    let data
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      const text = await response.text()
      console.error('Non-JSON login response:', text.substring(0, 200))
      throw new Error('Server configuration error. Please try demo mode.')
    }

    if (response.ok && data.access) {
      // Successful login
      const userDataToStore = data.user || {
        username: loginData.username,
        email: data.email || '',
        first_name: data.first_name || '',
        last_name: data.last_name || ''
      }
      
      if (loginData.remember) {
        localStorage.setItem('auth_token', data.access)
        localStorage.setItem('user_data', JSON.stringify(userDataToStore))
      } else {
        sessionStorage.setItem('auth_token', data.access)
        sessionStorage.setItem('user_data', JSON.stringify(userDataToStore))
      }
      
      setFormStatus('success', 'Authentication successful! Redirecting...')
      showStatus('success', 'Welcome to Genius Guard Security Platform')
      
      setTimeout(() => {
        router.push('/deep-scan')
      }, 1500)
    } else {
      throw new Error(data.detail || data.message || 'Login failed')
    }
    
  } catch (error) {
    console.error('Login error:', error)
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      setFormStatus('error', 'Network error. Please check your connection.')
      showStatus('error', 'Cannot connect to authentication service')
    } else {
      setFormStatus('error', error.message || 'Authentication failed')
    }
  } finally {
    isLoading.value = false
  }
}

const handleRegistration = async () => {
  if (!validateRegistration()) {
    return
  }

  isRegistering.value = true
  setRegistrationStatus('info', 'Creating your account...')

  try {
    const response = await fetch(`/api/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: registrationData.username,
        email: registrationData.email,
        password: registrationData.password,
        first_name: registrationData.first_name,
        last_name: registrationData.last_name
      })
    })

    // Check if response is JSON
    const contentType = response.headers.get('content-type')
    let data
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      const text = await response.text()
      console.error('Non-JSON registration response:', text.substring(0, 200))
      throw new Error('Server configuration error. Please try again later.')
    }

    if (response.ok) {
      // Successful registration
      const token = data.access || data.token
      
      if (token) {
        // Auto-login after registration
        localStorage.setItem('auth_token', token)
        localStorage.setItem('user_data', JSON.stringify(data.user))
        
        setRegistrationStatus('success', 'Account created successfully! Logging you in...')
        showStatus('success', 'Welcome to Genius Guard Security Platform')
        
        // Close modal and redirect
        setTimeout(() => {
          closeModals()
          router.push('/deep-scan')
        }, 2000)
      } else {
        // No auto-login, just success message
        setRegistrationStatus('success', data.message || 'Account created successfully! You can now login.')
        
        // Close modal after success
        setTimeout(() => {
          closeModals()
        }, 2000)
      }
    } else {
      // Handle registration errors
      if (response.status === 400) {
        throw new Error(data.detail || 'Invalid registration data')
      } else if (response.status === 409) {
        throw new Error(data.detail || 'User already exists')
      } else {
        throw new Error(data.detail || `Registration failed: ${response.status}`)
      }
    }
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      setRegistrationStatus('error', 'Network error. Please check your connection.')
    } else if (error instanceof SyntaxError) {
      setRegistrationStatus('error', 'Server error. Please try again later.')
    } else {
      setRegistrationStatus('error', error.message || 'Registration failed')
    }
  } finally {
    isRegistering.value = false
  }
}

const useDemoAccount = () => {
  setFormStatus('info', 'Initializing demo mode...')
  
  const demoData = {
    user: {
      id: 'demo-user',
      username: 'demo_security_analyst',
      email: 'demo@geniusguard.com',
      first_name: 'Demo',
      last_name: 'Analyst'
    },
    access: 'demo-token-' + Date.now()
  }
  
  sessionStorage.setItem('auth_token', demoData.access)
  sessionStorage.setItem('user_data', JSON.stringify(demoData.user))
  sessionStorage.setItem('demo_mode', 'true')
  
  setFormStatus('success', 'Demo mode activated! Redirecting...')
  showStatus('info', 'Demo mode - Limited functionality enabled')
  
  setTimeout(() => {
    router.push('/deep-scan')
  }, 1500)
}

const showForgotPassword = () => {
  showForgotPasswordModal.value = true
}

const showRegistration = () => {
  showRegistrationModal.value = true
}

const closeModals = () => {
  showForgotPasswordModal.value = false
  showRegistrationModal.value = false
  recoveryEmail.value = ''
  
  // Reset registration form
  Object.assign(registrationData, {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
    agree_terms: false
  })
  
  Object.keys(registrationErrors).forEach(key => {
    registrationErrors[key as keyof typeof registrationErrors] = ''
  })
  
  registrationStatus.type = ''
  registrationStatus.message = ''
  registrationStatus.icon = ''
}

const sendRecovery = async () => {
  if (!recoveryEmail.value) {
    showStatus('error', 'Please enter your email address')
    return
  }

  try {
    const response = await fetch(`/api/auth/password/reset/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: recoveryEmail.value
      })
    })

    if (response.ok) {
      showStatus('success', 'Recovery instructions sent to your email')
      closeModals()
    } else {
      const data = await response.json()
      throw new Error(data.detail || 'Failed to send recovery email')
    }
  } catch (error) {
    console.error('Recovery error:', error)
    showStatus('error', error.message || 'Failed to send recovery instructions')
  }
}

const getParticleStyle = (index: number) => {
  const size = Math.random() * 4 + 1
  const duration = Math.random() * 10 + 10
  const delay = Math.random() * 5
  const left = Math.random() * 100
  const top = Math.random() * 100
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    top: `${top}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`
  }
}

// Check if user is already logged in
const checkExistingAuth = async () => {
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
  
  if (token) {
    try {
      const response = await fetch('/api/auth/user/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const userData = await response.json()
        setFormStatus('info', 'Existing session detected. Redirecting...')
        setTimeout(() => {
          router.push('/deep-scan')
        }, 1000)
      } else {
        // Token is invalid, clear it
        localStorage.removeItem('auth_token')
        sessionStorage.removeItem('auth_token')
        localStorage.removeItem('user_data')
        sessionStorage.removeItem('user_data')
      }
    } catch (error) {
      console.error('Token validation failed:', error)
      localStorage.removeItem('auth_token')
      sessionStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      sessionStorage.removeItem('user_data')
    }
  }
}

// Lifecycle
onMounted(() => {
  checkExistingAuth()
  showStatus('info', 'Please enter your credentials to access the security dashboard')
})
</script>

<style scoped>
/* Registration Form Styles */
.registration-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.terms-link {
  color: #00f0ff;
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    width: 95%;
    margin: 1rem;
  }
}

@media (max-width: 480px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

/* Keep all your existing CSS styles below */
.login-page {
  min-height: 100vh;
  background: #000;
  color: white;
  position: relative;
  overflow: hidden;
  font-family: 'Courier New', monospace;
}

/* Cyber Background */
.cyber-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.cyber-grid {
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

.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  background: #00f0ff;
  border-radius: 50%;
  opacity: 0.3;
  animation: floatParticle linear infinite;
}

@keyframes floatParticle {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.3;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

.energy-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.1;
  animation: pulseOrb 8s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: #00f0ff;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: #b967ff;
  top: 60%;
  left: 80%;
  animation-delay: 2s;
}

.orb-3 {
  width: 150px;
  height: 150px;
  background: #00ff41;
  top: 80%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes pulseOrb {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.1;
  }
  50% { 
    transform: scale(1.2);
    opacity: 0.2;
  }
}

/* Main Container */
.login-container {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* Header */
.login-header {
  width: 100%;
  max-width: 480px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.back-home {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #00f0ff;
  text-decoration: none;
  font-family: 'Orbitron', monospace;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.back-home:hover {
  color: #b967ff;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
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
  color: #00f0ff;
}

.logo-text {
  font-size: 1.2rem;
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Login Card */
.login-card {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 16px;
  padding: 3rem;
  width: 100%;
  max-width: 480px;
  box-shadow: 
    0 0 50px rgba(0, 240, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: cardAppear 0.6s ease-out;
}

@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.card-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.security-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.card-title {
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-subtitle {
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Login Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-status {
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.form-status.success {
  background: rgba(0, 255, 65, 0.1);
  border: 1px solid #00ff41;
  color: #00ff41;
}

.form-status.error {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid #ff4444;
  color: #ff4444;
}

.form-status.warning {
  background: rgba(255, 165, 0, 0.1);
  border: 1px solid #ffa500;
  color: #ffa500;
}

.form-status.info {
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid #00f0ff;
  color: #00f0ff;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Orbitron', monospace;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #00f0ff;
}

.label-icon {
  font-size: 1rem;
}

.input-container {
  position: relative;
}

.cyber-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 8px;
  color: white;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.cyber-input::placeholder {
  color: #666;
}

.cyber-input:focus {
  border-color: #00f0ff;
  box-shadow: 
    0 0 0 2px rgba(0, 240, 255, 0.1),
    0 0 10px rgba(0, 240, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
}

.cyber-input.error {
  border-color: #ff4444;
  box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.1);
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
  border-radius: 0 0 8px 8px;
}

.cyber-input:focus + .input-decoration {
  transform: scaleX(1);
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #00f0ff;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.password-toggle:hover {
  background: rgba(0, 240, 255, 0.1);
}

.toggle-icon {
  font-size: 1.2rem;
}

.field-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ff4444;
  font-size: 0.8rem;
  font-weight: 600;
}

.error-icon {
  font-size: 0.8rem;
}

/* Form Options */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #ccc;
  cursor: pointer;
  transition: color 0.3s ease;
}

.checkbox-label:hover {
  color: #00f0ff;
}

.cyber-checkbox {
  display: none;
}

.checkmark {
  width: 16px;
  height: 16px;
  border: 1px solid #00f0ff;
  border-radius: 3px;
  position: relative;
  transition: all 0.3s ease;
}

.cyber-checkbox:checked + .checkmark {
  background: #00f0ff;
}

.cyber-checkbox:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 0.7rem;
  font-weight: bold;
}

.forgot-password {
  background: none;
  border: none;
  color: #b967ff;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #00f0ff;
}

/* Login Button */
.login-button {
  position: relative;
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  border: none;
  border-radius: 8px;
  padding: 1.2rem 2rem;
  color: black;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 
    0 10px 30px rgba(0, 240, 255, 0.3),
    0 5px 15px rgba(185, 103, 255, 0.3);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.login-button.loading {
  background: linear-gradient(135deg, #666, #888);
}

.button-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.button-icon {
  font-size: 1.2rem;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid black;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.button-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s ease;
}

.login-button:hover .button-glow {
  left: 100%;
}

/* Demo Section */
.demo-section {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.demo-divider {
  position: relative;
  margin-bottom: 1.5rem;
}

.demo-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.divider-text {
  background: #000;
  padding: 0 1rem;
  color: #888;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
}

.demo-button {
  background: transparent;
  border: 1px solid #ffa500;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  color: #ffa500;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto 0.5rem;
}

.demo-button:hover:not(:disabled) {
  background: rgba(255, 165, 0, 0.1);
  border-color: #ffa500;
  box-shadow: 0 0 15px rgba(255, 165, 0, 0.3);
}

.demo-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.demo-icon {
  font-size: 1.1rem;
}

.demo-note {
  color: #888;
  font-size: 0.7rem;
  margin: 0;
}

/* Register Prompt */
.register-prompt {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.prompt-text {
  color: #ccc;
  font-size: 0.8rem;
  margin-right: 0.5rem;
}

.register-link {
  background: none;
  border: none;
  color: #00f0ff;
  font-family: 'Orbitron', monospace;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: #b967ff;
}

/* Security Features */
.security-features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(0, 240, 255, 0.2);
}

.feature-icon {
  font-size: 1rem;
}

.feature-text {
  font-size: 0.7rem;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

/* Modals */
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
  z-index: 1000;
}

.modal-content {
  background: #0a0a0a;
  border: 1px solid #00f0ff;
  border-radius: 12px;
  padding: 0;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: rgba(0, 240, 255, 0.1);
  border-bottom: 1px solid rgba(0, 240, 255, 0.3);
}

.modal-header h3 {
  font-family: 'Orbitron', monospace;
  color: #00f0ff;
  margin: 0;
  font-size: 1.1rem;
}

.modal-close {
  background: none;
  border: none;
  color: #00f0ff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.modal-close:hover {
  background: rgba(0, 240, 255, 0.1);
}

.modal-body {
  padding: 1.5rem;
}

.modal-body p {
  color: #ccc;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #00f0ff;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.contact-icon {
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-family: 'Orbitron', monospace;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
}

.btn-primary {
  background: linear-gradient(135deg, #00f0ff, #b967ff);
  color: black;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(0, 240, 255, 0.3);
}

.btn-secondary {
  background: transparent;
  border: 1px solid #00f0ff;
  color: #00f0ff;
}

.btn-secondary:hover {
  background: rgba(0, 240, 255, 0.1);
}

/* Connection Status */
.connection-status {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 10000;
  animation: slideInRight 0.3s ease-out;
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

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .login-container {
    padding: 1rem;
  }
  
  .login-card {
    padding: 2rem;
  }
  
  .login-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .security-features {
    gap: 1rem;
  }
  
  .feature {
    padding: 0.5rem 0.75rem;
  }
  
  .feature-text {
    font-size: 0.6rem;
  }
  
  .modal-content {
    width: 95%;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 1.5rem;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
  
  .form-options {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .security-features {
    flex-direction: column;
    align-items: center;
  }
}
</style>