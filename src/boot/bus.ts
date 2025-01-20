import { EventBus } from 'quasar'
import { boot } from 'quasar/wrappers'

declare module 'vue' {
  // noinspection JSUnusedGlobalSymbols
  interface ComponentCustomProperties {
    $bus: typeof bus
  }
}

export const bus = new EventBus<{
  drawer: (action: 'close' | 'open' | 'toggle', position: 'left' | 'right') => void
}>()

// noinspection JSUnusedGlobalSymbols
export default boot(({ app }) => {
  app.config.globalProperties.$bus = bus
})
