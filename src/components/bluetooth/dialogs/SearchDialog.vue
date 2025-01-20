<script setup lang="ts">
import { extend, useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'

import DoubleCheckButton from 'components/DoubleCheckButton.vue'

import type { Writable } from 'src/types/common'
import { i18nSubPath } from 'src/utils/common'
import { useBluetoothStore } from 'stores/bluetooth'

// const props = defineProps<{}>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const { request } = useBluetoothStore()

const loading = ref(false)
const filters = ref<BluetoothLEScanFilter[]>([])
const services = ref<string[]>([''])

const i18n = i18nSubPath('components.bluetooth.dialogs.SearchDialog')

const connect = async () => {
  loading.value = true
  if (await (await request(services.value, filters.value))?.connect()) {
    onDialogOK()
  }
  loading.value = false
}

const updateStringFilter = (
  index: number,
  key: 'name' | 'namePrefix',
  value: string | number | null,
) => {
  const currentFilter: Writable<BluetoothLEScanFilter> = extend({}, filters.value[index])
  currentFilter[key] = value ? value.toString() : ''
  filters.value[index] = currentFilter
}

const updateService = (index: number, value: string | number | null) => {
  const content: string = value ? value.toString() : ''
  services.value[index] = content.toLowerCase()
}
</script>

<template>
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h5">
          {{ i18n('labels.title') }}
        </div>
      </q-card-section>
      <q-card-section>
        <q-card>
          <q-card-section>
            <div class="row justify-between">
              <div class="text-h6">
                {{ i18n('labels.requiredServices') }}
              </div>
              <q-btn
                :label="i18n('labels.savedServices')"
                color="positive"
                dense
                disable
                icon="mdi-layers-search"
                no-caps
              />
            </div>
          </q-card-section>
          <q-separator />
          <q-list separator>
            <q-item v-for="(service, index) in services" :key="index">
              <q-item-section side>
                <double-check-button
                  color="negative"
                  dense
                  flat
                  icon="mdi-delete"
                  pending-icon="mdi-delete-forever"
                  pending-push
                  round
                  @confirm="services.splice(index, 1)"
                />
              </q-item-section>
              <q-item-section>
                <q-input
                  :autofocus="index === services.length - 1"
                  dense
                  outlined
                  :shadow-text="service ? undefined : i18n('labels.serviceHint')"
                  type="text"
                  :model-value="service"
                  @update:model-value="updateService(index, $event)"
                />
              </q-item-section>
            </q-item>
            <q-btn
              class="full-width"
              color="primary"
              icon="mdi-layers-plus"
              :label="i18n('labels.addService')"
              no-caps
              unelevated
              @click="services.push('')"
            />
          </q-list>
        </q-card>
      </q-card-section>
      <q-card-section>
        <q-card>
          <q-card-section>
            <div class="row justify-between">
              <div class="text-h6">
                {{ i18n('labels.searchFilters') }}
              </div>
              <q-btn
                :label="i18n('labels.savedFilters')"
                color="positive"
                dense
                disable
                icon="mdi-filter-cog"
                no-caps
              />
            </div>
          </q-card-section>
          <q-separator />
          <q-list separator>
            <q-item v-for="(filter, index) in filters" :key="index">
              <q-item-section side>
                <double-check-button
                  color="negative"
                  dense
                  flat
                  icon="mdi-delete"
                  pending-icon="mdi-delete-forever"
                  pending-push
                  round
                  @confirm="filters.splice(index, 1)"
                />
              </q-item-section>
              <q-item-section>
                <q-input
                  :label="i18n('labels.filterNamePrefixHint')"
                  outlined
                  type="text"
                  :model-value="filter.namePrefix"
                  @update:model-value="updateStringFilter(index, 'namePrefix', $event)"
                />
              </q-item-section>
            </q-item>
            <q-btn
              class="full-width"
              color="accent"
              icon="mdi-filter-plus"
              :label="i18n('labels.addFilter')"
              no-caps
              unelevated
              @click="filters.push({})"
            />
          </q-list>
        </q-card>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          color="primary"
          :disable="!services.length || services.some((service) => !service)"
          :label="i18n('labels.search')"
          no-caps
          @click="connect"
        />
        <q-btn
          color="negative"
          flat
          :label="i18n('labels.cancel')"
          no-caps
          @click="onDialogCancel"
        />
      </q-card-actions>
      <q-inner-loading :showing="loading">
        <q-spinner-radio size="100px" color="accent" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
