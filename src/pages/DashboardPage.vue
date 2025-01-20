<script lang="ts" setup>
import { useQuasar } from 'quasar'

import { i18nSubPath } from 'src/utils/common'
import { computed } from 'vue'

const { dark } = useQuasar()

const i18n = i18nSubPath('pages.DashboardPage')

const logoUrl = computed(
  () =>
    new URL(`/src/assets/logos/${dark.isActive ? 'light' : 'dark'}/colorful.svg`, import.meta.url)
      .href,
)
</script>

<template>
  <q-page class="column items-center justify-center q-gutter-y-xl">
    <q-img :src="logoUrl" height="50vmin" width="50vmin" />
    <div class="text-h1 text-weight-regular">
      {{ i18n('labels.title') }}
    </div>
    <div class="text-h5 text-grey">
      {{ i18n('labels.intro') }}
    </div>
  </q-page>
</template>
