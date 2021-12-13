export interface TreeNode {
  name: string
  children: TreeNode[]
  indent: number
}

export interface Point {
  x: number
  y: number
}

export type Color = string
export type Colors = Color[]
