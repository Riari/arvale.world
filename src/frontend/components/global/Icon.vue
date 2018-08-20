<template>
  <span v-html="svg"></span>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import feather from 'feather-icons'

@Component({
  props: {
    name: String
  }
})
export default class Icon extends Vue {
  get svg () {
    return feather.icons[this.name].toSvg()
  }
}
</script>
