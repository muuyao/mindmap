<script lang="ts">
import { defineComponent, PropType, ref, toRefs } from 'vue'
import { Color, TreeNode } from '@/shared/types'
import { useElementBounding, UseElementBoundingReturn } from '@vueuse/core'
import { useNodeLink, useNodeStyle } from './hooks'

export default defineComponent({
  name: 'MindMapItem',
  props: {
    node: {
      type: Object as PropType<TreeNode>,
      default: () => ({}),
    },
    level: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
      default: 0,
    },
    color: {
      type: String as PropType<Color>,
      default: '',
    },
    parentRect: {
      type: Object as PropType<UseElementBoundingReturn>,
      default: null,
    },
  },
  setup(props) {
    const { color, level, index } = toRefs(props)
    const el = ref(null)
    const rect = useElementBounding(el)

    const { primaryColor } = useNodeStyle(level, index, color)
    const path = useNodeLink(props.parentRect, rect, level)

    return {
      path,
      rect,
      el,
      primaryColor,
    }
  },
})
</script>

<template>
  <div :key="path" :class="`level-${level}`" class="mind-map-item">
    <svg class="mind-map-link" width="100%" height="100%">
      <path
        :d="path"
        fill="transparent"
        :stroke="primaryColor"
        transform="translate(0, -2)"
        stroke-width="4"
        stroke-linecap="square"
      ></path>
    </svg>
    <div ref="el" class="mind-map-node">
      {{ node.name }}
    </div>
    <div v-if="node.children && node.children.length" class="mind-map-sub">
      <MindMapItem
        v-for="(childNode, childIndex) in node.children"
        :key="childIndex"
        :node="childNode"
        :level="level + 1"
        :index="childIndex"
        :color="primaryColor"
        :parent-rect="rect"
      ></MindMapItem>
    </div>
  </div>
</template>

<style lang="scss">
.mind-map {
  position: relative;
  &-item {
    display: flex;
    align-items: center;
  }

  &-link {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &-node {
    padding: 5px 15px;
    z-index: 1;
  }

  &-item + &-item {
    margin-top: 20px;
  }

  &-sub {
    margin-left: 150px;
  }

  .level-0 > .mind-map-node {
    /* position: relative;
    transform: translate(50%, 50%); */
    border: 2px solid #fff;
    background-color: #000;
  }
}
</style>
