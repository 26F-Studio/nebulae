import type { DateTime } from 'luxon'

import type { DeviceWrapper } from 'src/types/bluetooth'

export interface RecordedMessage {
  id: BluetoothCharacteristicUUID
  message: string
  isHex: boolean
  isSent: boolean
  time: DateTime
}

export interface RecognizedDevice {
  id: string
  name: string | undefined
  services: BluetoothServiceUUID[]
  filters: BluetoothLEScanFilter[]
}

export interface SelectedDevice {
  device?: DeviceWrapper | undefined
  characteristicId?: BluetoothCharacteristicUUID | undefined
}
