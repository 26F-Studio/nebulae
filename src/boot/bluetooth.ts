import { defineBoot } from '#q-app/wrappers'

import { BluetoothManager } from 'src/types/bluetoothManager'

declare module 'vue' {
  // noinspection JSUnusedGlobalSymbols
  interface ComponentCustomProperties {
    $bluetooth: BluetoothManager
  }
}

export const bluetoothManager = new BluetoothManager()

export default defineBoot(({ app }) => {
  app.config.globalProperties.$bluetooth = bluetoothManager
})
