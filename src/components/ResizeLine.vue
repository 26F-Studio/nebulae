<script setup lang="ts">
import type { TouchPanValue } from 'quasar'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    maxSize: number
    minSize: number
    reverse?: boolean
    snapSize: number
    thickness?: number
    vertical?: boolean
  }>(),
  {
    reverse: false,
    thickness: 3,
    vertical: false,
  },
)

const width = defineModel<number>({ required: true })

const oldWidth = ref(width.value)

const resizing = ref(false)
const resizerVisibility = ref(0)

const thresholdWidth = (props.minSize + props.snapSize) / 2

const handleResize: TouchPanValue = (event) => {
  if (event.isFirst) {
    oldWidth.value = width.value
  }
  // Set the resizing flag only if needed
  if (!event.isFinal && !resizing.value) {
    resizing.value = true
  } else if (event.isFinal && resizing.value) {
    resizing.value = false
  }
  // Set the visibility flag only if needed
  if (resizing.value && resizerVisibility.value === 0) {
    resizerVisibility.value = 1
  } else if (!resizing.value && resizerVisibility.value === 1) {
    resizerVisibility.value = 0
  }
  // Calculate the new width
  const offset = props.vertical ? event.offset?.y : event.offset?.x
  if (!offset) {
    return
  }
  const result = oldWidth.value + (props.reverse ? -1 : 1) * offset
  // Update the width
  if (result < thresholdWidth) {
    width.value = props.minSize
  } else if (result < props.snapSize) {
    width.value = props.snapSize
  } else if (result > props.maxSize) {
    width.value = props.maxSize
  } else {
    width.value = result
  }
}
</script>

<template>
  <q-separator
    v-touch-pan.stop.mouse="handleResize"
    :vertical="vertical"
    @mouseenter.stop="resizerVisibility = 1"
    @mouseleave.stop="resizerVisibility = resizing ? 1 : 0"
    :style="{
      cursor: 'col-resize',
      opacity: resizerVisibility,
      width: `${thickness}px`,
    }"
  />
</template>

<style scoped></style>
