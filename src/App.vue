<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { parseInput } from './shared/parseInput'
import { TreeNode } from './shared/types'
import MindMap from './components/MindMap/MindMap.vue'

const mockInput = `- Front end tech
      - Compiler/language
          - Elm
          - Svelte
          - ClojureScript
      - Reactive framework
          - React
          - Vue
          - Angular
      - packager
          - Webpack
          - Snowpack`

export default defineComponent({
  components: {
    MindMap,
  },
  setup() {
    const text = ref(mockInput)
    const tree: Ref<TreeNode[]> = ref([])
    const handleClick = () => {
      tree.value = parseInput(text.value)
    }

    return {
      text,
      handleClick,
      tree,
    }
  },
})
</script>

<template>
  <header>文本转脑图</header>

  <main>
    <textarea v-model="text" class="box input"></textarea>
    <div class="action">
      <button @click="handleClick">转换 >></button>
    </div>
    <div class="box map">
      <MindMap
        v-for="(item, index) in tree"
        :key="index"
        :data="item"
      ></MindMap>
    </div>
  </main>
</template>

<style lang="scss">
@import './assets/base.css';

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  text-align: center;
  padding: 20px;
  line-height: 1.5;

  font-size: 20px;
}

main {
  padding: 20px;
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.box {
  height: 100%;
  flex: 1;

  &.map {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #000;
    color: #fff;
  }
}

.action {
  display: flex;
  align-items: center;

  margin: 0 50px;
}
</style>
