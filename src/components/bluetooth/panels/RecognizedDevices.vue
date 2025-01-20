<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import type { QSliderItemActionDetails } from 'src/types/common'
import { i18nSubPath } from 'src/utils/common'
import { useBluetoothStore } from 'stores/bluetooth'
import type { RecognizedDevice } from 'stores/bluetooth/types'

const { connectedDevices, recognizedDevices } = storeToRefs(useBluetoothStore())
const { request } = useBluetoothStore()

const toBeRemovedKeys = ref(new Set<string>())

const i18n = i18nSubPath('components.bluetooth.panels.RecognizedDevices')

const connect = async (device: RecognizedDevice) => {
  await (await request(device.services, device.filters))?.connect()
}

const edit = (key: string, details: QSliderItemActionDetails) => {
  console.log('key', key)
  setTimeout(() => {
    details.reset()
  }, 500)
}

const remove = (key: string, details: QSliderItemActionDetails) => {
  toBeRemovedKeys.value.add(key)
  setTimeout(() => {
    details.reset()
    delete recognizedDevices.value[key]
    toBeRemovedKeys.value.delete(key)
  }, 500)
}
</script>

<template>
  <q-card bordered class="q-gutter-y-sm" flat>
    <q-card-section>
      <div class="text-h5">
        {{ i18n('labels.title') }}
      </div>
    </q-card-section>
    <q-separator />
    <q-list separator>
      <q-slide-transition v-for="(recognizedDevice, key) in recognizedDevices" :key="key">
        <q-slide-item
          v-show="!toBeRemovedKeys.has(key)"
          left-color="primary"
          right-color="negative"
          @left="edit(key, $event)"
          @right="remove(key, $event)"
        >
          <template v-slot:left>
            <q-icon left name="mdi-pencil" />
          </template>
          <template v-slot:right>
            <q-icon left name="mdi-delete" />
          </template>
          <q-item>
            <q-item-section>
              <q-item-label>
                {{ recognizedDevice.name ?? recognizedDevice.id }}
              </q-item-label>
              <q-item-label v-if="recognizedDevice.name?.length" caption>
                {{ recognizedDevice.id }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                :color="connectedDevices[recognizedDevice.id] ? 'grey' : 'primary'"
                :disable="!!connectedDevices[recognizedDevice.id]"
                icon="mdi-link-plus"
                :label="
                  i18n(`labels.${connectedDevices[recognizedDevice.id] ? 'connected' : 'connect'}`)
                "
                no-caps
                :outline="!!connectedDevices[recognizedDevice.id]"
                @click="connect(recognizedDevice)"
              />
            </q-item-section>
          </q-item>
        </q-slide-item>
      </q-slide-transition>
    </q-list>
  </q-card>
</template>

<style scoped></style>
