<template>
  <div :class="classesCompiled">
    <i :data-feather="icon" />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    type: {
      type: String,
      default: 'info'
    },
    classes: {
      type: Array,
      default: () => { return [] }
    }
  }
})
export default class Notice extends Vue {
  get classesCompiled () {
    let base = ['alert', `alert-${this.type}`]

    return [ ...this.classes, ...base ]
  }

  get icon () {
    const iconMap = {
      info: 'info',
      success: 'check-circle',
      warning: 'alert-triangle',
      error: 'alert-octagon'
    }

    return iconMap[this.type]
  }
}
</script>

<style lang="scss">
.alert {
  margin: 1em 0;
  padding: .8em 1.2em;
  border-radius: 3px;
  box-shadow: 0 3px 0 rgba(0, 0, 0, .25);
  color: #fff;

  svg {
    width: 22px;
    height: 22px;
    margin: -4px .5em 0 0;
    vertical-align: middle;
  }

  &-info {
    background: #3e8eda;
  }

  &-warning {
    background: #f5a53c;
  }
}
</style>
