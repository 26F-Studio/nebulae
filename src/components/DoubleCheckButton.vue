<script setup lang="ts">
import type { QBtnProps } from 'quasar'
import { ref } from 'vue'

defineProps<
  QBtnProps & {
    pendingLabel?: QBtnProps['label']
    pendingIcon?: QBtnProps['icon']
    pendingIconRight?: QBtnProps['iconRight']
    pendingOutline?: QBtnProps['outline']
    pendingFlat?: QBtnProps['flat']
    pendingUnelevated?: QBtnProps['unelevated']
    pendingPush?: QBtnProps['push']
    pendingGlossy?: QBtnProps['glossy']
    pendingColor?: QBtnProps['color']
    pendingTextColor?: QBtnProps['textColor']
    pendingRipple?: QBtnProps['ripple']
  }
>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const pending = ref(false)

const cancel = () => {
  if (pending.value) {
    pending.value = false
    emit('cancel')
  }
}

const confirm = () => {
  if (pending.value) {
    emit('confirm')
  } else {
    pending.value = true
  }
}
</script>

<template>
  <q-btn
    :size="size"
    :type="type"
    :label="pending ? (pendingLabel ?? label) : label"
    :icon="pending ? (pendingIcon ?? icon) : icon"
    :icon-right="pending ? (pendingIconRight ?? iconRight) : iconRight"
    :outline="pending ? (pendingOutline ?? outline) : outline"
    :flat="pending ? (pendingFlat ?? flat) : flat"
    :unelevated="pending ? (pendingUnelevated ?? unelevated) : unelevated"
    :rounded="rounded"
    :push="pending ? (pendingPush ?? push) : push"
    :square="square"
    :glossy="pending ? (pendingGlossy ?? glossy) : glossy"
    :fab="fab"
    :fab-mini="fabMini"
    :padding="padding"
    :color="pending ? (pendingColor ?? color) : color"
    :text-color="pending ? (pendingTextColor ?? textColor) : textColor"
    :no-caps="noCaps"
    :no-wrap="noWrap"
    :dense="dense"
    :ripple="pending ? (pendingRipple ?? ripple) : ripple"
    :tabindex="tabindex"
    :align="align"
    :stack="stack"
    :stretch="stretch"
    :loading="loading"
    :disable="disable"
    :round="round"
    :percentage="percentage"
    :dark-percentage="darkPercentage"
    @click="confirm"
    @mouseleave="cancel"
  />
</template>

<style scoped></style>
