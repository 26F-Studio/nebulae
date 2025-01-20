import type { QSlideItemProps } from 'quasar'

export type QSliderItemActionDetails = Pick<
  Parameters<NonNullable<QSlideItemProps['onAction']>>['0'],
  'reset'
>

export type Writable<T> = { -readonly [P in keyof T]: T[P] }
