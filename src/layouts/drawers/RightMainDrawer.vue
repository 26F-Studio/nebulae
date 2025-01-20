<script setup lang="ts">
import { ref } from 'vue'

import BluetoothPanel from 'components/HardwareInfoPanels/BluetoothPanel.vue'
import { i18nSubPath } from 'src/utils/common'
import { bus } from 'boot/bus'

const tabs = [
  {
    name: 'bluetooth',
    icon: 'mdi-bluetooth',
  },
  {
    name: 'serial',
    icon: 'mdi-serial-port',
  },
  {
    name: 'usb',
    icon: 'mdi-usb',
  },
  {
    name: 'hid',
    icon: 'mdi-keyboard-settings',
  },
] as const

const currentTab = ref<string>(tabs[0].name)

const i18n = i18nSubPath('layouts.drawers.RightMainDrawer')
</script>

<template>
  <q-drawer
    bordered
    no-swipe-backdrop
    no-swipe-close
    no-swipe-open
    overlay
    side="right"
    @hide="bus.emit('drawer', 'close', 'right')"
  >
    <q-tabs no-caps v-model="currentTab">
      <q-tab
        v-for="(tabItem, index) in tabs"
        :key="index"
        :icon="tabItem.icon"
        :label="i18n(`labels.${tabItem.name}`)"
        :name="tabItem.name"
      />
    </q-tabs>
    <q-separator />
    <q-tab-panels :model-value="currentTab">
      <q-tab-panel name="bluetooth">
        <bluetooth-panel />
      </q-tab-panel>
      <q-tab-panel name="serial"></q-tab-panel>
      <q-tab-panel name="usb"></q-tab-panel>
      <q-tab-panel name="hid"></q-tab-panel>
    </q-tab-panels>
  </q-drawer>
</template>

<style scoped></style>
