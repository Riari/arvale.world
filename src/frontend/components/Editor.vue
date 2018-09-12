<template>
  <div class="inputWrapper editor">
    <textarea></textarea>
    <transition-group name="fade">
      <div v-for="(error, index) in errors" :key="index" class="inputError">{{ error }}</div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'

@Component({
  props: {
    options: Object,
    errors: Array
  }
})
export default class Editor extends Vue {
  editor: SimpleMDE

  mounted () {
    this.editor = new SimpleMDE(Object.assign({
      element: this.$el.firstElementChild,
      renderingConfig: {}
    }, this.options))
  }

  value (value?: string) {
    return this.editor.value(value)
  }
}
</script>

<style lang="scss">
.editor {
  text-align: left;
}
</style>

