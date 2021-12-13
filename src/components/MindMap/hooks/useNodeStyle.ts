import { ColorsSymbol } from '@/shared/symbols'
import { Color } from '@/shared/types'
import { computed, inject, ref, Ref } from 'vue'

/**
 * 计算节点样式
 * @param level
 * @param index
 * @param color
 * @returns
 */
export function useNodeStyle(
  level: Ref<number>,
  index: Ref<number>,
  color: Ref<Color>
) {
  const colors = inject(ColorsSymbol, ref([]))

  // 获取主色
  const primaryColor = computed(() => {
    if (level.value === 1) {
      const value = colors.value
      return value[index.value % value.length]
    }

    return color.value
  })

  return {
    primaryColor,
  }
}
