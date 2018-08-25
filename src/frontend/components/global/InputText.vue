<template>
  <div class="inputWrapper">
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
      <div v-for="(error, index) in errors" :key="index" class="inputError">{{ error }}</div>
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
@import "../../scss/variables";

.inputWrapper {
  position: relative;

  .inputText {
    padding: .8em 1.2em;
    margin: .5em 0;
    border: none;
    border-radius: 2px;
    background: #fff;
    font-size: .9em;
    font-family: 'Neuton', sans-serif;
    color: $color-background;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 2px 4px;
    box-sizing: border-box;
    transition: box-shadow .2s;

    &::placeholder {
      color: $color-background;
      opacity: .65;
    }

    &:focus {
      outline: none;
      box-shadow: #21469480 0px 0px 0px 3px;
    }

    &--fullWidth {
      width: 100%;
    }

    &--error {
      box-shadow: #c9002180 0px 0px 0px 3px;
    }
  }

  .inputError {
    position: absolute;
    left: 100%;
    top: 50%;
    padding: .4em .6em;
    margin-left: 15px;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 2px 4px;
    background: #c90021ee;
    font-size: .9em;
    color: #fff;
    white-space: nowrap;
    transform: translateY(-50%);
  }
}
</style>
