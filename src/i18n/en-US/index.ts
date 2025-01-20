export default {
  components: {
    bluetooth: {
      dialogs: {
        SearchDialog: {
          labels: {
            title: 'Search for Bluetooth Devices',
            requiredServices: 'Required Services',
            savedServices: 'Saved Services',
            addService: 'Add Service',
            serviceHint: 'Service ID',
            searchFilters: 'Search Filters',
            savedFilters: 'Saved Filters',
            filterNamePrefixHint: 'Device Name Prefix',
            addFilter: 'Add Filter',
            search: 'Search',
            cancel: 'Cancel',
          },
        },
      },
      panels: {
        RecognizedDevices: {
          labels: {
            title: 'Recognized Devices',
            edit: 'Edit',
            remove: 'Remove',
            connect: 'Connect',
            connected: 'Connected',
          },
        },
        SavedMessages: {
          labels: {
            title: 'Saved Messages',
            newMessage: 'New Message',
            send: 'Send',
            delete: 'Delete',
          },
        },
      },
      DeviceSelector: {
        labels: {
          connectNewDevice: 'Connect New Device',
          currentCharacteristics: 'Current Characteristics:',
          currentDevice: 'Current Device:',
          currentService: 'Current Service:',
          noDevice: 'No available device',
          refresh: 'Refresh',
          disconnect: 'Disconnect',
          confirm: '  Confirm  ',
        },
      },
    },
    ThemeButton: {
      labels: {
        switchTheme: 'Switch Theme',
      },
    },
  },
  layouts: {
    drawers: {
      LeftMainDrawer: {
        labels: {
          bluetooth: 'Bluetooth',
          dashboard: 'Dashboard',
          hid: 'HID',
          serial: 'Serial',
          usb: 'USB',
        },
      },
      RightBluetoothDrawer: {
        labels: {
          recognizedDevices: 'Recognized Devices',
          savedMessages: 'Saved Messages',
        },
      },
      RightMainDrawer: {
        labels: {
          bluetooth: 'Bluetooth',
          hid: 'HID',
          serial: 'Serial',
          usb: 'USB',
        },
      },
    },
    footers: {
      BluetoothFooter: {
        labels: {
          hex: 'Hex',
          message: 'Message',
          send: 'Send',
        },
      },
    },
    headers: {
      MainHeader: {
        labels: {
          title: 'NebulaE',
        },
      },
    },
  },
  pages: {
    BluetoothPage: {
      labels: {
        messages: 'Messages',
        characteristicId: 'Characteristic ID: ',
      },
    },
    DashboardPage: {
      labels: {
        title: 'NebulaE',
        intro: 'A Hardware Debugging Tool Powered by Quasar',
      },
    },
  },
  stores: {
    bluetooth: {
      labels: {
        device: 'Bluetooth device: {deviceLabel}',
        serviceIdCriteria:
          'Service ID should be a 4-character hexadecimal string or a UUID string or a recognized standard name',
      },
      notifications: {
        request: {
          pending: 'Requesting Bluetooth device...',
          success: 'New bluetooth device connected',
          existed: 'Bluetooth device already connected',
          canceled: 'Request canceled',
          invalidServiceId: 'Invalid service ID',
          failed: 'Failed to request Bluetooth device',
        },
      },
    },
  },
  types: {
    bluetooth: {
      DeviceWrapper: {
        labels: {
          anonymousDevice: 'Anonymous Device',
          device: 'Device: {name} ({id})',
          service: 'Service: {serviceId}',
        },
        notifications: {
          gatt: {
            unavailable: 'No available GATT server',
            pending: 'Connecting to GATT server...',
            success: 'Connected to GATT server',
            failed: 'Failed to connect to GATT server',
            reconnecting: 'Reconnecting to GATT server...',
            terminated: 'GATT server connection terminated',
          },
          characteristic: {
            unavailable: 'No available characteristics',
            notFound: 'Required characteristic not found: {characteristicId}',
          },
          service: {
            unavailable: 'No available services',
            notFound: 'Required service not found: {serviceId}',
          },
        },
      },
    },
  },
}
