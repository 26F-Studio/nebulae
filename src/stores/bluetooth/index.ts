import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import { DeviceWrapper } from 'src/types/bluetooth'
import type { RecognizedDevice, RecordedMessage, SelectedDevice } from 'stores/bluetooth/types'
import { requestDeviceHandler } from 'stores/bluetooth/utils'
import { hex2U8Array } from 'src/utils/common'
import { DateTime } from 'luxon'

export const useBluetoothStore = defineStore(
  'bluetooth',
  () => {
    // Persistent states
    const recognizedDevices = reactive<Record<string, RecognizedDevice>>({})
    const savedMessages = ref<string[]>([])
    // Non-persistent states
    const connectedDevices = reactive<Record<string, DeviceWrapper>>({})
    const recordedMessagesDict = reactive<Record<string, RecordedMessage[]>>({})
    const selectedDevice = reactive<SelectedDevice>({})

    const disconnect = async (deviceId: string) => {
      const device = connectedDevices[deviceId]
      if (!device) {
        return false
      }
      if (device.connected) {
        await device.disconnect()
      }
      delete connectedDevices[device.id]
      return true
    }

    const request = async (services: BluetoothServiceUUID[], filters: BluetoothLEScanFilter[]) => {
      return await requestDeviceHandler(async () => {
        const newDevice = new DeviceWrapper(
          await navigator.bluetooth.requestDevice(
            filters.length
              ? {
                  filters,
                  optionalServices: services,
                }
              : {
                  acceptAllDevices: true,
                  optionalServices: services,
                },
          ),
        )

        const existedDevice = connectedDevices[newDevice.id]
        if (existedDevice) {
          return { device: existedDevice, isNew: false }
        }

        const recognizedDevice = recognizedDevices[newDevice.id]
        if (newDevice.name) {
          filters.push({ name: newDevice.name })
        }
        if (recognizedDevice) {
          recognizedDevice.services = [...new Set([recognizedDevice.services, services].flat())]
          recognizedDevice.filters = [...new Set([recognizedDevice.filters, filters].flat())]
        } else {
          recognizedDevices[newDevice.id] = {
            id: newDevice.id,
            name: newDevice.name,
            services,
            filters,
          }
        }

        newDevice.notifyHandler = (id, data) => {
          console.log(`[Bluetooth] ${id}: ${data}`)
        }

        connectedDevices[newDevice.id] = newDevice
        return { device: newDevice, isNew: true }
      })
    }

    const send = async (message: string, isHex: boolean) => {
      if (!selectedDevice.device || !selectedDevice.characteristicId) {
        return false
      }

      await selectedDevice.device.write(
        selectedDevice.characteristicId,
        isHex ? hex2U8Array(message) : new TextEncoder().encode(message),
      )

      const recordedMessage = {
        id: selectedDevice.characteristicId,
        message,
        isHex,
        isSent: true,
        time: DateTime.now(),
      }

      const recordedMessages = recordedMessagesDict[selectedDevice.device.id]
      if (recordedMessages) {
        recordedMessages.push(recordedMessage)
      } else {
        recordedMessagesDict[selectedDevice.device.id] = [recordedMessage]
      }

      return true
    }

    return {
      recognizedDevices,
      savedMessages,
      connectedDevices,
      recordedMessagesDict,
      selectedDevice,
      disconnect,
      request,
      send,
    }
  },
  {
    persist: {
      pick: ['recognizedDevices', 'savedMessages'],
    },
  },
)
