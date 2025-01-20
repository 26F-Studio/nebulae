<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Dialog } from 'quasar'
import { ref } from 'vue'

import SearchDialog from 'components/bluetooth/dialogs/SearchDialog.vue'

import type { DeviceWrapper } from 'src/types/bluetooth'
import { i18nSubPath } from 'src/utils/common'
import { useBluetoothStore } from 'stores/bluetooth'
import DoubleCheckButton from 'components/DoubleCheckButton.vue'

const { connectedDevices, selectedDevice } = storeToRefs(useBluetoothStore())
const { disconnect } = useBluetoothStore()

const loading = ref(false)

const i18n = i18nSubPath('components.bluetooth.DeviceSelector')

const disconnectDevice = async () => {
  if (!selectedDevice.value.device) {
    return
  }
  loading.value = true
  await disconnect(selectedDevice.value.device.id)
  selectedDevice.value.device = undefined
  selectedDevice.value.characteristicId = undefined
  loading.value = false
}

const openSearchDialog = () => {
  Dialog.create({
    component: SearchDialog,
  })
}

const refreshDevice = async () => {
  if (!selectedDevice.value.device) {
    return
  }
  loading.value = true
  await selectedDevice.value.device.load()
  loading.value = false
}

const selectDevice = async (device: DeviceWrapper) => {
  selectedDevice.value.device = device
  selectedDevice.value.characteristicId = undefined
  await refreshDevice()
}
</script>

<template>
  <q-card class="q-pt-md q-pt-md-none q-pb-md" bordered flat>
    <q-card-section v-if="!Object.keys(connectedDevices).length">
      <div class="row justify-between">
        <div class="text-h6 text-grey text-italic">
          {{ i18n('labels.noDevice') }}
        </div>
        <q-btn
          color="primary"
          icon="mdi-link-plus"
          :label="i18n('labels.connectNewDevice')"
          no-caps
          @click="openSearchDialog"
        />
      </div>
    </q-card-section>
    <div v-else class="column justify-center q-col-gutter-y-md q-col-gutter-md-y-none q-px-md">
      <div class="row justify-between q-gutter-y-md">
        <div class="col-12 col-lg-6 row items-center q-gutter-x-sm">
          <div class="text-body1">
            {{ i18n('labels.currentDevice') }}
          </div>
          <q-select
            class="col-grow"
            :disable="loading"
            :options="Object.values(connectedDevices)"
            option-label="label"
            style="min-width: 300px"
            :model-value="selectedDevice.device"
            @update:model-value="selectDevice($event)"
          >
            <template v-slot:option="{ itemProps, opt }">
              <q-item v-bind="itemProps" :disable="!opt.connected">
                <q-item-section>
                  <q-item-label>
                    {{ opt.label }}
                  </q-item-label>
                  <q-item-label v-if="opt.name?.length" caption>
                    {{ opt.id }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:selected-item="{ opt }">
              <q-item-section>
                <q-item-label>
                  {{ opt.label }}
                </q-item-label>
                <q-item-label v-if="opt.name?.length" caption>
                  {{ opt.id }}
                </q-item-label>
              </q-item-section>
            </template>
          </q-select>
        </div>
        <div class="col-12 col-lg-6 row items-center q-gutter-x-sm">
          <div class="text-body1">
            {{ i18n('labels.currentCharacteristics') }}
          </div>
          <q-select
            class="col-grow"
            :disable="loading"
            emit-value
            :options="selectedDevice.device?.writableCharacteristics"
            option-label="uuid"
            option-value="uuid"
            style="min-width: 300px"
            v-model="selectedDevice.characteristicId"
          >
            <template v-slot:option="{ itemProps, opt }">
              <q-item v-bind="itemProps">
                <q-item-section>
                  <q-item-label>
                    {{ opt.uuid }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:selected-item="{ opt }">
              <q-item-section>
                <q-item-label>
                  {{ opt }}
                </q-item-label>
              </q-item-section>
            </template>
          </q-select>
        </div>
      </div>
      <div class="row justify-between">
        <double-check-button
          color="negative"
          :disable="!selectedDevice.device?.connected"
          :label="i18n('labels.disconnect')"
          no-caps
          outline
          :pending-label="i18n('labels.confirm')"
          @confirm="disconnectDevice"
          style="white-space: pre"
        />
        <q-btn
          color="primary"
          :disable="!selectedDevice.device?.connected"
          :label="i18n('labels.refresh')"
          no-caps
          @click="refreshDevice"
        />
      </div>
    </div>
  </q-card>
</template>

<style scoped></style>
