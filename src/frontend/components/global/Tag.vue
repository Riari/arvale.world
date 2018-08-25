<template>
  <span class="tag" :class="{ primary: type == 'primary', secondary: type == 'secondary' }">
    <template v-if="route">
      <router-link :to="route">
        <slot></slot>
      </router-link>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: tag => ['primary', 'secondary'].includes(tag)
    },
    route: String
  }
})
export default class Tag extends Vue {
}
</script>

<style lang="scss">
@import "../../scss/variables";

.tag {
  display: inline-block;
  padding: .1em .6em .3em .6em;
  border-radius: 3px;
  background: rgba(255, 255, 255, .1);
  font-size: .9em;
  vertical-align: middle;

  &.primary {
    color: $color-primary;
  }

  &.secondary {
    color: $color-secondary;
  }
}
</style>
