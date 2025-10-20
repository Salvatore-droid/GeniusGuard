<template>
  <div id="app" class="app-container">
    <!-- Global Background Effects - BEHIND content -->
    <div class="global-background">
      <canvas ref="backgroundCanvas" class="cyber-background"></canvas>
      <div ref="particleNetwork" class="particle-network"></div>
    </div>

    <!-- Router View - IN FRONT of background -->
    <div class="router-container">
      <RouterView />
    </div>

    <!-- Global Scan Status Indicator -->
    <div v-if="globalScanActive" class="global-scan-indicator">
      <div class="scan-pulse"></div>
      <span class="scan-text">GLOBAL THREAT DETECTED</span>
    </div>

    <!-- Global Notification System -->
    <div class="notification-container">
      <div v-for="notification in notifications" 
           :key="notification.id"
           class="cyber-notification"
           :class="notification.type">
        <span class="notification-icon">{{ getNotificationIcon(notification.type) }}</span>
        <span class="notification-message">{{ notification.message }}</span>
        <button class="notification-close" @click="removeNotification(notification.id)">×</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'

const backgroundCanvas = ref<HTMLCanvasElement>()
const particleNetwork = ref<HTMLElement>()
const globalScanActive = ref(false)
const notifications = ref<Array<{id: number, type: string, message: string}>>([])
let notificationId = 0

// Minimal background animation
onMounted(() => {
  initMinimalBackground()
  startGlobalEffects()
  simulateThreatNotifications()
})

const initMinimalBackground = () => {
  const canvas = backgroundCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')!
  let animationId: number

  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  const drawBackground = () => {
    // Very subtle background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Minimal grid lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)'
    ctx.lineWidth = 0.5

    const gridSize = 100
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    animationId = requestAnimationFrame(drawBackground)
  }

  drawBackground()

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resizeCanvas)
  })
}

const startGlobalEffects = () => {
  // Create minimal particles
  const container = particleNetwork.value
  if (!container) return

  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div')
    particle.className = 'global-particle'
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 10}s;
    `
    container.appendChild(particle)
  }
}

const simulateThreatNotifications = () => {
  // Your existing notification code...
}

const addNotification = (type: string, message: string) => {
  const id = notificationId++
  notifications.value.push({ id, type, message })
  setTimeout(() => removeNotification(id), 5000)
}

const removeNotification = (id: number) => {
  notifications.value = notifications.value.filter(n => n.id !== id)
}

const getNotificationIcon = (type: string) => {
  const icons: { [key: string]: string } = {
    warning: '⚠️',
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  }
  return icons[type] || '🔔'
}
</script>

<style scoped>
.app-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background: #000;
  font-family: 'Courier New', monospace;
}

/* Global Background - BEHIND content */
.global-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* Behind content */
  pointer-events: none;
}

.cyber-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.particle-network {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

/* Router Container - IN FRONT of background */
.router-container {
  position: relative;
  z-index: 10; /* In front of background */
  width: 100%;
  min-height: 100vh;
}

/* Global Scan Indicator */
.global-scan-indicator {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid #ff4444;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  animation: scan-alert 0.6s ease-out;
}

.scan-pulse {
  width: 12px;
  height: 12px;
  background: #ff4444;
  border-radius: 50%;
  animation: scan-pulse 1.5s infinite;
}

.scan-text {
  color: #ff4444;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
}

@keyframes scan-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 68, 68, 0.7);
  }
  50% {
    transform: scale(1.2);
    box-shadow: 0 0 0 10px rgba(255, 68, 68, 0);
  }
}

/* Global Particles */
.global-particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(0, 240, 255, 0.3);
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  animation: global-particle-float 15s infinite linear;
}

@keyframes global-particle-float {
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

/* Notification System */
.notification-container {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
}

.cyber-notification {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid;
  border-radius: 6px;
  backdrop-filter: blur(10px);
  animation: notification-slide 0.3s ease-out;
  font-size: 12px;
}

.cyber-notification.warning {
  border-color: #ffa500;
  color: #ffa500;
}

@keyframes notification-slide {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>