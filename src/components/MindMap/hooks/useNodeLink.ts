import { generateCubicBezierPath } from '@/shared/path'
import { RootRectSymbol } from '@/shared/symbols'
import { UseElementBoundingReturn } from '@vueuse/core'
import { computed, inject, Ref } from 'vue'

/**
 * 生成每个节点之间的 path
 * @param parentRect
 * @param rect
 * @param level
 * @returns
 */
export function useNodeLink(
  parentRect: UseElementBoundingReturn,
  rect: UseElementBoundingReturn,
  level: Ref<number>
) {
  const rootRect = inject(RootRectSymbol)
  const path = computed(() => {
    if (rootRect && parentRect && rect) {
      const { x: rx, y: ry } = rootRect
      const { x: px, y: py, width: pw, height: ph } = parentRect
      const { x, y, height, width } = rect

      console.log('rect', rootRect, parentRect, rect)

      // 连线起点
      const start = {
        x: px.value - rx.value + pw.value,
        y: py.value - ry.value + ph.value,
      }

      // 连线终点
      const end = {
        x: x.value - rx.value,
        y: y.value - ry.value + height.value,
      }

      // 文本终点
      const endNode = {
        x: end.x + width.value,
        y: end.y,
      }

      // 根节点起点调整为居中
      if (level.value === 1) {
        start.x = start.x - pw.value / 2
        start.y = start.y - ph.value / 2
      }

      return generateCubicBezierPath(start, end) + ` L${endNode.x} ${endNode.y}`
    }
    return ''
  })

  return path
}
