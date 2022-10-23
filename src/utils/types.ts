/**
 * Adapted from https://github.com/element-plus/element-plus/blob/8ab9d9ce951d98d1d23d8e30b1a8ef848feaaecf/packages/utils/types.ts
 * MIT License
 */

import type { PropType } from 'vue'

export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined')
    return false
  return e instanceof Element
}

export const definePropType = <T>(val: any): PropType<T> => val
