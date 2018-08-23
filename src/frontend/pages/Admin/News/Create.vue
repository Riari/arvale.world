<template>
  <div class="row center-xs">
    <div class="col-xs-8">
      <div class="panel">
        <h2>Create Article</h2>

        <input-text v-model="title" :fullWidth="true" placeholder="Title"></input-text>

        <editor ref="editor"></editor>

        <label>Category</label>
        <select v-model="category">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>

        <v-button @click.native="submit">Save</v-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Editor from '../../../components/Editor.vue'
import ArticleService from '../../../services/ArticleService'

@Component({
  components: { Editor }
})
export default class AdminUsers extends Vue {
  service: ArticleService

  title = null
  categories = []
  category = null

  created () {
    this.service = new ArticleService()

    this.service.listCategories()
      .then(response => {
        this.categories = response.data
      })
  }

  submit () {
    const markdown = this.$refs.editor.getMarkdown()

    this.service.create(this.title, markdown, this.category)
      .then(response => {
        console.log(response)
      })
  }
}
</script>

<style lang="scss">

</style>
