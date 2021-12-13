import { Point } from './types'

export function generateCubicBezierPath(point1: Point, point2: Point) {
  // 二次贝塞尔曲线的控制点
  const cx = point1.x + (point2.x - point1.x) * 0.2
  const cy = point1.y + (point2.y - point1.y) * 0.8
  return `M ${point1.x},${point1.y} Q ${cx},${cy} ${point2.x},${point2.y}`
}
