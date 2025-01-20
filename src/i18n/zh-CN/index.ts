export default {
  components: {
    bluetooth: {
      dialogs: {
        SearchDialog: {
          labels: {
            title: '搜索蓝牙设备',
            requiredServices: '需求的服务',
            savedServices: '已保存的服务',
            addService: '添加服务',
            serviceHint: '服务 ID',
            searchFilters: '搜索过滤器',
            savedFilters: '已保存的过滤器',
            addFilter: '添加过滤器',
            filterNamePrefixHint: '设备名称前缀',
            search: '搜索',
            cancel: '取消',
          },
        },
      },
      panels: {
        RecognizedDevices: {
          labels: {
            title: '已识别的设备',
            edit: '编辑',
            remove: '移除',
            connect: '连接',
            connected: '已连接',
          },
        },
        SavedMessages: {
          labels: {
            title: '保存的消息',
            newMessage: '新消息',
            send: '发送',
            delete: '删除',
          },
        },
      },
      DeviceSelector: {
        labels: {
          connectNewDevice: '连接新设备',
          currentCharacteristics: '当前特征: ',
          currentDevice: '当前设备: ',
          currentService: '当前服务: ',
          noDevice: '没有可用设备',
          refresh: '刷新',
          disconnect: '断开连接',
          confirm: '确认断开',
        },
      },
    },
    ThemeButton: {
      labels: {
        switchTheme: '切换主题',
      },
    },
  },
  layouts: {
    drawers: {
      LeftMainDrawer: {
        labels: {
          bluetooth: '蓝牙',
          dashboard: '仪表盘',
          hid: 'HID',
          serial: '串口',
          usb: 'USB',
        },
      },
      RightBluetoothDrawer: {
        labels: {
          recognizedDevices: '已识别的设备',
          savedMessages: '保存的消息',
        },
      },
      RightMainDrawer: {
        labels: {
          bluetooth: '蓝牙',
          hid: 'HID',
          serial: '串口',
          usb: 'USB',
        },
      },
    },
    footers: {
      BluetoothFooter: {
        labels: {
          hex: '十六进制',
          message: '消息',
          send: '发送',
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
        messages: '消息',
        clearMessages: '清除消息',
        confirm: '确认清除',
        characteristicId: '特征 ID: ',
      },
    },
    DashboardPage: {
      labels: {
        title: 'NebulaE',
        intro: '一个基于 Quasar 的硬件调试工具',
      },
    },
  },
  stores: {
    bluetooth: {
      labels: {
        device: '蓝牙设备: {deviceLabel}',
        serviceIdCriteria: '服务 ID 应为 4 个字符的十六进制字符串或 UUID 字符串或公认的标准名称',
      },
      notifications: {
        request: {
          pending: '正在请求蓝牙设备...',
          success: '新蓝牙设备已连接',
          existed: '已连接过此蓝牙设备',
          canceled: '请求已取消',
          invalidServiceId: '无效的服务 ID',
          failed: '请求蓝牙设备失败',
        },
      },
    },
  },
  types: {
    bluetooth: {
      DeviceWrapper: {
        labels: {
          anonymousDevice: '匿名设备',
          device: '设备: {name} ({id})',
          service: '服务: {serviceId}',
        },
        notifications: {
          gatt: {
            unavailable: 'GATT 服务器不可用',
            pending: '正在连接 GATT 服务器...',
            success: 'GATT 服务器连接成功',
            failed: 'GATT 服务器连接失败',
            reconnecting: '正在重新连接 GATT 服务器...',
            terminated: 'GATT 服务器连接已终止',
          },
          characteristic: {
            unavailable: '特征不可用',
            notFound: '特征未找到',
          },
          service: {
            unavailable: '服务不可用',
            notFound: '服务未找到',
          },
        },
      },
    },
  },
}
