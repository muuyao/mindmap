import { UseElementBoundingReturn } from '@vueuse/core'
import { InjectionKey, Ref } from 'vue'
import { Colors } from './types'

export const ColorsSymbol: InjectionKey<Ref<Colors>> = Symbol('Colors')
export const RootRectSymbol: InjectionKey<UseElementBoundingReturn> =
  Symbol('RootRect')
