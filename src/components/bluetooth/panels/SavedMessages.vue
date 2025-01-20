<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import { i18nSubPath } from 'src/utils/common'
import { useBluetoothStore } from 'stores/bluetooth'

const { savedMessages, selectedDevice } = storeToRefs(useBluetoothStore())
const { send } = useBluetoothStore()

const pendingRemoveIndex = ref<number>()

const i18n = i18nSubPath('components.bluetooth.panels.SavedMessages')

const newSavedMessage = () => {
  savedMessages.value.push('')
}

const updateSavedMessage = (index: number, message: string | number | null) => {
  savedMessages.value[index] = message ? message.toString() : ''
}

const sendSavedMessage = async (message: string) => {
  if (message) {
    await send(message, false)
  }
}

const tryRemove = (index: number) => {
  if (pendingRemoveIndex.value === index) {
    savedMessages.value.splice(index, 1)
    pendingRemoveIndex.value = undefined
  } else {
    pendingRemoveIndex.value = index
  }
}
</script>

<template>
  <q-card bordered class="q-gutter-y-sm" flat>
    <q-card-section>
      <div class="row justify-between">
        <div class="text-h5">
          {{ i18n('labels.title') }}
        </div>
        <q-btn
          :label="$q.screen.gt.sm ? i18n('labels.newMessage') : undefined"
          color="positive"
          icon="mdi-text-box-plus-outline"
          no-caps
          @click="newSavedMessage"
        />
      </div>
    </q-card-section>
    <q-separator />
    <q-list separator>
      <q-item v-for="(savedMessage, index) in savedMessages" :key="index">
        <q-item-section side>
          <q-btn
            color="negative"
            dense
            :icon="pendingRemoveIndex !== index ? 'mdi-delete' : 'mdi-delete-forever'"
            :flat="pendingRemoveIndex !== index"
            round
            @click="tryRemove(index)"
            @mouseleave="pendingRemoveIndex = undefined"
          />
        </q-item-section>
        <q-item-section>
          <q-input
            autogrow
            dense
            outlined
            type="text"
            :model-value="savedMessage"
            @update:model-value="updateSavedMessage(index, $event)"
          />
        </q-item-section>
        <q-item-section side>
          <q-btn
            color="primary"
            dense
            :disable="!selectedDevice.characteristicId || !savedMessage"
            icon="mdi-send"
            round
            @click="sendSavedMessage(savedMessage)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<style scoped></style>
