<template>
  <div class="min-h-screen bg-black relative overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black"></div>
    
    <!-- Matrix rain effect -->
    <MatrixRain class="absolute inset-0 opacity-20" />
    
    <!-- Neural network lines -->
    <div class="absolute inset-0">
      <NeuralNetwork />
    </div>

    <!-- Main content -->
    <div class="relative z-10 flex flex-col justify-center items-center min-h-screen text-center px-4">
      <!-- Animated logo -->
      <div class="mb-8">
        <HologramLogo />
      </div>

      <!-- Main headline -->
      <h1 class="text-6xl md:text-8xl font-bold mb-6">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue to-neon-purple animate-glow">
          SENTINEL
        </span>
      </h1>

      <!-- Subheadline with typewriter -->
      <div class="text-2xl md:text-4xl text-white mb-8 h-12">
        <TypeWriter 
          :texts="['Quantum Security Scanning', 'AI-Powered Protection', 'Zero-Trust Defense']" 
        />
      </div>

      <!-- CTA Buttons -->
      <div class="flex gap-6 mt-8">
        <HolographicButton @click="startScan" class="text-lg">
          <ScanIcon class="w-5 h-5 mr-2" />
          Instant Security Scan
        </HolographicButton>
        
        <HolographicButton variant="outline" @click="showDemo">
          <PlayIcon class="w-5 h-5 mr-2" />
          Watch Demo
        </HolographicButton>
      </div>

      <!-- Live stats -->
      <div class="mt-16 grid grid-cols-3 gap-8 text-white">
        <LiveStat value="12,847" label="Threats Neutralized" />
        <LiveStat value="99.9%" label="Accuracy Rate" />
        <LiveStat value="<50ms" label="Scan Speed" />
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ChevronDownIcon class="w-8 h-8 text-cyber-blue" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const startScan = () => {
  // Launch scan modal
}

const showDemo = () => {
  // Show product demo
}
</script>