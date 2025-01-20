import { Notify } from 'quasar'

import { base64ToUuid, i18nSubPath, sleep } from 'src/utils/common'

export class DeviceWrapper {
  private _characteristics: BluetoothRemoteGATTCharacteristic[] = []
  private _device: BluetoothDevice
  private _notifyHandler?: (id: BluetoothCharacteristicUUID, data: string) => void
  // private _services: BluetoothRemoteGATTService[] = []
  private _terminated = false
  private _i18n = i18nSubPath('types.bluetooth.DeviceWrapper')

  constructor(device: BluetoothDevice) {
    this._device = device
  }

  get writableCharacteristics(): BluetoothRemoteGATTCharacteristic[] {
    return this._characteristics.filter(({ properties }) => properties.write)
  }

  get connected(): boolean {
    return this._device.gatt?.connected ?? false
  }

  get id(): string {
    return base64ToUuid(this._device.id)
  }

  get label(): string {
    return this.name ?? this.id
  }

  get name(): string | undefined {
    return this._device.name ?? this._i18n('labels.anonymousDevice')
  }

  set notifyHandler(handler: (id: BluetoothCharacteristicUUID, data: string) => void) {
    this._notifyHandler = handler
  }

  async connect(): Promise<boolean> {
    const gattServer = this._gattServer
    if (!gattServer) {
      return false
    }
    if (gattServer.connected) {
      return true
    }

    const connectNotify = Notify.create({
      group: false,
      timeout: 0,
      type: 'ongoing',
      message: this._i18n('notifications.gatt.pending'),
      caption: this._deviceLabel,
    })

    try {
      await gattServer.connect()
    } catch (e) {
      console.warn('gatt.connect', e)
    }

    try {
      if (gattServer.connected) {
        this._addDisconnectHandler()
        await this.load(true)
        this._characteristics
          .filter(({ properties }) => properties.notify)
          .forEach((characteristic) => this._listenNotify(characteristic))
        connectNotify({
          spinner: false,
          timeout: 2500,
          type: 'positive',
          message: this._i18n('notifications.gatt.success'),
          caption: this._deviceLabel,
        })
        return true
      }
    } catch (e) {
      console.log(e)
      const error = <Error>e
      switch (error.name) {
        default: {
          connectNotify({
            spinner: false,
            timeout: 10000,
            type: 'negative',
            multiLine: true,
            message: this._i18n('notifications.gatt.failed'),
            caption: [this._deviceLabel, error.message].join('\n'),
          })
          break
        }
      }
    }
    return false
  }

  async disconnect(): Promise<boolean> {
    const gattServer = this._gattServer
    if (!gattServer) {
      return false
    }
    if (!gattServer.connected) {
      return true
    }

    this._terminated = true
    gattServer.disconnect()
    Notify.create({
      type: 'info',
      message: this._i18n('notifications.gatt.terminated'),
      caption: this._deviceLabel,
    })
    return true
  }

  async load(notify = false): Promise<boolean> {
    const gattServer = this._gattServer
    if (!gattServer) {
      return false
    }

    const services = await gattServer.getPrimaryServices()
    if (notify && !services.length) {
      Notify.create({
        type: 'warning',
        message: this._i18n('notifications.service.unavailable'),
        caption: this._deviceLabel,
      })
    }

    // this._services = services

    const characteristics = (
      await Promise.all(
        services.map(async (service) => {
          const characteristics = await service.getCharacteristics()
          if (notify && !characteristics.length) {
            Notify.create({
              type: 'warning',
              message: this._i18n('notifications.characteristic.unavailable'),
              caption: [
                this._deviceLabel,
                this._i18n('labels.service', { serviceId: service.uuid }),
              ].join('\n'),
            })
          }
          return characteristics
        }),
      )
    ).flat()
    this._characteristics = [...new Set(characteristics)]
    return true
  }

  async write(
    characteristicId: BluetoothCharacteristicUUID,
    payload: Uint8Array,
  ): Promise<boolean> {
    const characteristic = this.writableCharacteristics.find(
      ({ uuid }) => uuid === characteristicId,
    )
    if (!characteristic) {
      Notify.create({
        type: 'warning',
        message: this._i18n('notifications.characteristic.notFound', { characteristicId }),
        caption: this._deviceLabel,
      })
      return false
    }

    try {
      characteristic.writeValue(payload)
      return true
    } catch (e) {
      console.warn(e)
      return false
    }
  }

  private get _deviceLabel(): string {
    return this._i18n('labels.device', { name: this.name, id: this.id })
  }

  private get _gattServer(): BluetoothRemoteGATTServer | undefined {
    if (!this._device.gatt) {
      Notify.create({
        type: 'warning',
        message: this._i18n('notifications.noGatt'),
        caption: this._deviceLabel,
      })
    }
    return this._device.gatt
  }

  private _addDisconnectHandler() {
    this._device.addEventListener('gattserverdisconnected', async () => {
      while (!this._terminated) {
        Notify.create({
          type: 'warning',
          message: this._i18n('notifications.gatt.reconnecting'),
          caption: this._deviceLabel,
        })
        if (await this.connect()) {
          return
        }
        await sleep(5000)
      }
    })
  }

  private async _listenNotify(characteristic: BluetoothRemoteGATTCharacteristic) {
    let isRegistered = false
    while (!isRegistered) {
      try {
        await characteristic.startNotifications()
        characteristic.addEventListener('characteristicvaluechanged', (event: Event) => {
          console.log(event)
          const value = (<BluetoothRemoteGATTCharacteristic>event.target).value
          if (value) {
            this._notifyHandler?.(characteristic.uuid, new TextDecoder().decode(value))
          }
        })
        isRegistered = true
      } catch (e) {
        console.log(e)
      }
      await sleep(10)
    }
  }
}
