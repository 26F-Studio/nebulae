<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { ref } from 'vue'

import RecognizedDevices from 'components/bluetooth/panels/RecognizedDevices.vue'
import SavedMessages from 'components/bluetooth/panels/SavedMessages.vue'
import ResizeLine from 'components/ResizeLine.vue'

import { i18nSubPath } from 'src/utils/common'
import { useBluetoothStore } from 'stores/bluetooth'
import { bus } from 'boot/bus'

const { connectedDevices, savedMessages } = storeToRefs(useBluetoothStore())
const { screen } = useQuasar()

const tabs = [
  {
    name: 'recognizedDevices',
    icon: 'mdi-devices',
  },
  {
    name: 'savedMessages',
    icon: 'mdi-message-bookmark',
  },
] as const

const currentTab = ref<string>(tabs[0].name)
const width = ref(screen.gt.sm ? 420 : 370)

const i18n = i18nSubPath('layouts.drawers.RightBluetoothDrawer')

if (!Object.keys(connectedDevices.value).length) {
  currentTab.value = tabs[0].name
} else if (savedMessages.value.length) {
  currentTab.value = tabs[1].name
}
</script>

<template>
  <q-drawer
    bordered
    no-swipe-backdrop
    no-swipe-open
    side="right"
    :width="width"
    @hide="bus.emit('drawer', 'close', 'right')"
  >
    <div class="column">
      <q-tabs class="full-height" v-model="currentTab">
        <q-tab
          v-for="(tabItem, index) in tabs"
          :key="index"
          :icon="tabItem.icon"
          :label="i18n(`labels.${tabItem.name}`)"
          :name="tabItem.name"
          no-caps
        />
      </q-tabs>
      <q-separator />
      <q-tab-panels class="full-height" keep-alive :model-value="currentTab">
        <q-tab-panel name="recognizedDevices">
          <RecognizedDevices />
        </q-tab-panel>
        <q-tab-panel name="savedMessages">
          <SavedMessages />
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <resize-line
      v-show="!screen.lt.md"
      class="absolute-left full-height"
      :max-size="screen.width * 0.7"
      :min-size="370"
      reverse
      :snap-size="370"
      v-model="width"
    />
  </q-drawer>
</template>

<style scoped></style>
