<template>
  <div class="editor"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import TuiEditor from 'tui-editor'
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'

@Component({
  props: {
    options: Object
  }
})
export default class Editor extends Vue {
  editor: TuiEditor

  mounted () {
    this.editor = new TuiEditor(Object.assign({
      el: this.$el,
      initialEditType: 'wysiwyg',
      previewStyle: 'vertical',
      height: '300px'
    }, this.options))
  }

  getMarkdown () {
    return this.editor.getMarkdown()
  }
}
</script>

<style lang="scss">
.editor {
  text-align: left;

  .te-mode-switch-section {
    display: none !important;
  }
}
</style>

