<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref } from 'vue'

import { bus } from 'boot/bus'

const { screen } = useQuasar()

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)

bus.on('drawer', (action, position) => {
  const targetDrawerOpen = position === 'left' ? leftDrawerOpen : rightDrawerOpen
  switch (action) {
    case 'open':
      targetDrawerOpen.value = true
      break
    case 'close':
      targetDrawerOpen.value = false
      break
    case 'toggle':
      targetDrawerOpen.value = !targetDrawerOpen.value
      break
  }
})
</script>

<template>
  <q-layout view="hHh LpR lFf">
    <router-view :mobile="screen.lt.md" name="header" />
    <router-view :mobile="screen.lt.md" :model-value="leftDrawerOpen" name="leftDrawer" />
    <q-page-container style="height: 100vh">
      <router-view />
    </q-page-container>
    <router-view :mobile="screen.lt.md" :model-value="rightDrawerOpen" name="rightDrawer" />
    <router-view :mobile="screen.lt.md" name="footer" />
  </q-layout>
</template>
