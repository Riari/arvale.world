<template>
  <div class="inputWrapper">
    <select class="input" :class="classesCompiled" v-on:input="$emit('input', $event.target.value)">
      <option value="" :selected="!value">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="value == option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <transition-group name="fade">
      <div v-for="(error, index) in errors" :key="index" class="inputError">{{ error }}</div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    options: Array,
    value: [String, Number, Object],
    errors: Array,
    multiline: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    autofocus: Boolean,
    classes: {
      type: Array,
      default: () => { return [] }
    },
    fullWidth: Boolean,
    placeholder: String
  }
})
export default class InputSelect extends Vue {
  get classesCompiled () {
    let base = ['input']

    if (this.fullWidth) {
      base.push('input--fullWidth')
    }

    if (this.errors) {
      base.push('input--error')
    }

    return [ ...this.classes, ...base ]
  }

  focus () {
    this.$refs.input.focus()
  }
}
</script>
