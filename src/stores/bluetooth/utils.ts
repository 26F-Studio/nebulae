import { Notify } from 'quasar'

import type { DeviceWrapper } from 'src/types/bluetooth'
import { i18nSubPath } from 'src/utils/common'

export const requestDeviceHandler = async (
  requestProcess: () => Promise<{
    device: DeviceWrapper
    isNew: boolean
  }>,
): Promise<DeviceWrapper | undefined> => {
  const i18n = i18nSubPath('stores.bluetooth')
  const requestNotify = Notify.create({
    group: false,
    timeout: 0,
    type: 'ongoing',
    message: i18n('notifications.request.pending'),
  })
  try {
    const result = await requestProcess()
    if (result) {
      const { device, isNew } = result
      if (isNew) {
        requestNotify({
          spinner: false,
          timeout: 2500,
          type: 'positive',
          message: i18n('notifications.request.success'),
          caption: i18n('labels.device', { deviceLabel: device.label }),
        })
      } else {
        requestNotify({
          spinner: false,
          timeout: 2500,
          type: 'info',
          message: i18n('notifications.request.existed'),
          caption: i18n('labels.device', { deviceLabel: device.label }),
        })
      }
      return device
    }
  } catch (e) {
    console.log(e)
    const error = <Error>e
    switch (error.name) {
      case 'NotFoundError': {
        requestNotify({
          spinner: false,
          timeout: 2500,
          type: 'warning',
          message: i18n('notifications.request.canceled'),
        })
        break
      }
      case 'TypeError': {
        requestNotify({
          spinner: false,
          timeout: 5000,
          type: 'negative',
          message: i18n('notifications.request.invalidServiceId'),
          caption: i18n('labels.serviceIdCriteria'),
        })
        break
      }
      default: {
        requestNotify({
          spinner: false,
          timeout: 10000,
          type: 'negative',
          message: i18n('notifications.request.failed'),
          caption: error.message,
        })
        break
      }
    }
  }
}
