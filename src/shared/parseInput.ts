import { TreeNode } from './types'

const newLineSeparator = /[\r\n]+/g
const lineMark = '-'

function getPlainTreeNodes(input: string): TreeNode[] {
  const plainTreeNodes: TreeNode[] = []
  const lines = input.split(newLineSeparator)

  lines.forEach((node) => {
    const nodeArr = node.split(lineMark)
    if (nodeArr.length) {
      const indent = nodeArr.shift()?.length ?? 0
      const name = nodeArr.join(lineMark).trim()

      if (name) {
        plainTreeNodes.push({
          indent,
          name,
          children: [],
        })
      }
    }
  })

  return plainTreeNodes
}

function getLast(arr: TreeNode[]) {
  return arr[arr.length - 1]
}

/**
 * 解析树形文本为数据结构树
 * @param input
 * @returns
 */
export function parseInput(input: string): TreeNode[] {
  const root = {
    indent: -1,
    name: 'root',
    children: [],
  }
  const plainTreeNodes = getPlainTreeNodes(input)
  const pathStack: TreeNode[] = [root]
  let lastParent: TreeNode = root

  for (const node of plainTreeNodes) {
    // 寻找父元素
    lastParent = getLast(pathStack)
    while (lastParent?.indent >= node.indent) {
      pathStack.pop()
      lastParent = getLast(pathStack)
    }

    lastParent.children.push(node)
    pathStack.push(node)
  }

  return root.children
}
