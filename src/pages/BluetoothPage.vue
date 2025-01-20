<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Dialog } from 'quasar'

import DeviceSelector from 'components/bluetooth/DeviceSelector.vue'
import SearchDialog from 'components/bluetooth/dialogs/SearchDialog.vue'

import { bus } from 'boot/bus'
import { i18nSubPath } from 'src/utils/common'
import { useBluetoothStore } from 'stores/bluetooth'

const { recognizedDevices, savedMessages, connectedDevices, recordedMessagesDict, selectedDevice } =
  storeToRefs(useBluetoothStore())

const i18n = i18nSubPath('pages.BluetoothPage')

if (!Object.keys(connectedDevices.value).length) {
  if (Object.keys(recognizedDevices.value).length) {
    bus.emit('drawer', 'open', 'right')
  } else {
    Dialog.create({
      component: SearchDialog,
    })
  }
} else if (savedMessages.value.length) {
  bus.emit('drawer', 'open', 'right')
}
</script>

<template>
  <q-page class="column q-pa-sm q-gutter-y-sm">
    <device-selector />
    <q-card class="col-grow row" bordered flat>
      <div class="col-grow">
        <div class="q-pa-md text-h6">
          {{ i18n('labels.messages') }}
        </div>
        <q-separator />
        <div class="column full-width full-height" style="padding-bottom: 4rem">
          <q-scroll-area class="full-height">
            <q-list separator>
              <q-item
                v-for="(recordedMessage, index) in selectedDevice.device?.id
                  ? recordedMessagesDict[selectedDevice.device?.id]
                  : []"
                :key="index"
                :class="{
                  'bg-green-1': recordedMessage.isSent,
                  'bg-blue-1': !recordedMessage.isSent,
                }"
                dense
              >
                <q-item-section side>
                  <q-icon
                    :color="recordedMessage.isSent ? 'green' : 'blue'"
                    :name="recordedMessage.isSent ? 'mdi-call-made' : 'mdi-call-received'"
                  />
                  <q-icon :name="recordedMessage.isHex ? 'mdi-hexadecimal' : 'mdi-unicode'" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ recordedMessage.message }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ recordedMessage.time.toFormat('HH:mm:ss.SSS') }}
                  </q-item-label>
                </q-item-section>
                <q-tooltip>{{ i18n('labels.characteristicId') }}{{ recordedMessage.id }}</q-tooltip>
              </q-item>
              <q-separator />
            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<style scoped></style>
