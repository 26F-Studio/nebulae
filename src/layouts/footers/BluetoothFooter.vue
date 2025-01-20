<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import { i18nSubPath } from 'src/utils/common'
import { useBluetoothStore } from 'stores/bluetooth'

const { selectedDevice } = storeToRefs(useBluetoothStore())
const { send } = useBluetoothStore()

const isHex = ref(false)
const message = ref<string>()

const i18n = i18nSubPath('layouts.footers.BluetoothFooter')

const sendMessage = async () => {
  if (message.value) {
    await send(message.value, isHex.value)
  }
}
</script>

<template>
  <q-footer
    class="bg-transparent"
    :class="{
      'bg-white text-black': !$q.dark.isActive,
      'bg-dark text-white': $q.dark.isActive,
    }"
    bordered
  >
    <div class="row items-center justify-between q-col-gutter-sm q-px-md q-py-sm">
      <q-input
        class="col-12 col-md-grow"
        autogrow
        clearable
        :disable="!selectedDevice.characteristicId"
        :label="i18n('labels.message')"
        outlined
        type="textarea"
        v-model="message"
        @keydown.enter.shift.exact.prevent="sendMessage"
      />
      <div class="full-height">
        <q-toggle
          :disable="!selectedDevice.characteristicId"
          :label="i18n('labels.hex')"
          v-model="isHex"
        />
      </div>
      <div>
        <q-btn
          color="primary"
          :disable="!selectedDevice.characteristicId || !message"
          icon="send"
          no-caps
          round
          @click="sendMessage"
        />
      </div>
    </div>
  </q-footer>
</template>

<style scoped></style>
