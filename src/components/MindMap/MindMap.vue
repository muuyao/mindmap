<script lang="ts">
import { defineComponent, PropType, provide, ref, toRefs } from 'vue'
import { Colors, TreeNode } from '@/shared/types'
import MindMapItem from './MindMapItem.vue'
import { ColorsSymbol, RootRectSymbol } from '@/shared/symbols'
import { useElementBounding } from '@vueuse/core'

export default defineComponent({
  components: {
    MindMapItem,
  },
  props: {
    data: {
      type: Object as PropType<TreeNode>,
      default: () => ({}),
    },
    colors: {
      type: Array as PropType<Colors>,
      default: () => ['orange', 'yellow', 'green'],
    },
  },
  setup(props) {
    const el = ref(null)
    const { colors } = toRefs(props)
    const rootRect = useElementBounding(el)
    provide(ColorsSymbol, colors)
    provide(RootRectSymbol, rootRect)

    return {
      el,
    }
  },
})
</script>

<template>
  <div ref="el" class="mind-map">
    <MindMapItem :node="data"></MindMapItem>
  </div>
</template>

<style lang="scss">
.mind-map {
  padding: 20px;
  overflow: auto;
  display: flex;
  align-items: center;

  font-size: 20px;
  position: relative;
}
</style>
