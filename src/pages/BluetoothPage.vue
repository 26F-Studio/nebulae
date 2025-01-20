<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Dialog, QScrollArea } from 'quasar'
import { computed, ref, watch } from 'vue'

import DeviceSelector from 'components/bluetooth/DeviceSelector.vue'
import SearchDialog from 'components/bluetooth/dialogs/SearchDialog.vue'

import { bus } from 'boot/bus'
import { i18nSubPath } from 'src/utils/common'
import { useBluetoothStore } from 'stores/bluetooth'
import DoubleCheckButton from 'components/DoubleCheckButton.vue'

const { recognizedDevices, savedMessages, connectedDevices, recordedMessagesDict, selectedDevice } =
  storeToRefs(useBluetoothStore())

const scrollArea = ref<QScrollArea>()

const recordedMessages = computed({
  get: () =>
    (selectedDevice.value.device?.id
      ? recordedMessagesDict.value[selectedDevice.value.device?.id]
      : []) ?? [],
  set: (value) => {
    if (selectedDevice.value.device?.id) {
      recordedMessagesDict.value[selectedDevice.value.device?.id] = value
    }
  },
})

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

watch(
  () => recordedMessages.value.length,
  () => {
    console.log(recordedMessages.value.length)
    setTimeout(() => {
      scrollArea.value?.setScrollPercentage('vertical', 1.0)
    }, 100)
  },
)
</script>

<template>
  <q-page class="column q-pa-sm q-gutter-y-sm">
    <device-selector />
    <q-card class="col-grow row" bordered flat>
      <div class="col-grow">
        <div class="row justify-between q-pa-md">
          <div class="text-h6">
            {{ i18n('labels.messages') }}
          </div>
          <double-check-button
            color="negative"
            icon="mdi-delete-sweep"
            :label="i18n('labels.clearMessages')"
            no-caps
            outline
            :pending-label="i18n('labels.confirm')"
            style="white-space: pre"
            @confirm="recordedMessages = []"
          />
        </div>
        <q-separator />
        <div class="column full-width full-height" style="padding-bottom: 4rem">
          <q-scroll-area ref="scrollArea" class="full-height">
            <q-list v-show="recordedMessages.length" separator>
              <q-item
                v-for="(recordedMessage, index) in recordedMessages"
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
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>
                    {{ recordedMessage.time.toFormat('HH:mm:ss.SSS') }}
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label style="white-space: pre">
                    {{ recordedMessage.message }}
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
