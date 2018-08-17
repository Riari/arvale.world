<template>
  <div>
    <textarea
      v-if="multiline"
      :class="classesCompiled"
      :autofocus="autofocus"
      :placeholder="placeholder"
      :value="value"
      ref="input"
      v-on:input="$emit('input', $event.target.value)"
      v-on:keyup="$emit('keyup', $event)"
    >
    </textarea>
    <input
      v-else
      :class="classesCompiled"
      :type="type"
      :autofocus="autofocus"
      :placeholder="placeholder"
      :value="value"
      ref="input"
      v-on:input="$emit('input', $event.target.value)"
      v-on:keyup="$emit('keyup', $event)"
    />
    <transition-group name="fade">
      <div v-for="(error, index) in errors" :key="index" class="inputError">{{ $t(error) }}</div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    value: String,
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
export default class InputText extends Vue {
  get classesCompiled () {
    let base = ['inputText']

    if (this.fullWidth) {
      base.push('inputText--fullWidth')
    }

    if (this.errors) {
      base.push('inputText--error')
    }

    return [ ...this.classes, ...base ]
  }

  focus () {
    this.$refs.input.focus()
  }
}
</script>

<style lang="scss">
@import "../scss/variables";

.inputText {
  padding: .8em 1.2em;
  margin: .5em 0;
  border: none;
  background: #fff;
  font-size: .9em;
  font-family: 'Noto Sans', sans-serif;
  color: $color-background;
  box-shadow: 0 3px 0 rgba(0, 0, 0, .25);
  box-sizing: border-box;
  transition: all .3s;

  &::placeholder {
    color: $color-background;
    opacity: .65;
  }

  &:focus {
    outline: none;
    box-shadow: 0 3px 0 $color-background;
  }

  &--fullWidth {
    width: 100%;
  }
}
</style>
