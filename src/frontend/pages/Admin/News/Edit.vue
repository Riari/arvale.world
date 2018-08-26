<template>
  <div class="row center-xs">
    <div class="col-xs-8">
      <panel :title="this.article.id ? 'Edit Article' : 'Create Article'">
        <input-text
          v-model="article.title"
          :fullWidth="true"
          placeholder="Title"
          :errors="validationErrors.title"
        ></input-text>

        <editor ref="editor"></editor>

        <input-select
          v-model="article.category"
          :fullWidth="true"
          :options="getCategoryOptions()"
          :selectedOption="article.category ? article.category.id : null"
          :errors="validationErrors.category"
          placeholder="Select a category..."
        ></input-select>

        <label><input type="checkbox" v-model="article.published" value="1" /> Published</label>

        <div class="text-right">
          <v-button @click.native="submit">Save</v-button>
        </div>
      </panel>
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
export default class EditArticle extends Vue {
  service: ArticleService

  categories = []

  article = {
    id: null,
    title: null,
    body: null,
    category: null,
    published: false
  }

  validationErrors = {
    title: null,
    category: null
  }

  created () {
    this.service = new ArticleService()

    this.service.listCategories()
      .then(response => {
        this.categories = response.data
      })

    if (this.$route.params.id) {
      this.service.get(parseInt(this.$route.params.id)).then(response => {
        this.$refs.editor.value(response.data.body)
        this.article = response.data
      })
    }
  }

  getCategoryOptions () {
    const options = []

    this.categories.forEach(category => {
      options.push({ value: category.id, label: category.name })
    })

    return options
  }

  submit () {
    const markdown = this.$refs.editor.value()
    if (this.article.id) {
      this.article.body = markdown

      this.service.update(this.article).then(response => {
        this.$router.push({ name: 'news-article', params: { id: response.data.id, slug: response.data.slug } })
        this.$toasted.show("Article updated", { type: 'success' })
      })
    } else {
      this.service.create(this.article.title, markdown, this.article.category)
        .then(response => {
          this.$router.push({ name: 'news-article', params: { id: response.data.id, slug: response.data.slug } })
          this.$toasted.show("Article created", { type: 'success' })
        })
        .catch(error => this.validationErrors = error.response.data.errors)
    }
  }
}
</script>

<style lang="scss">
.editor-toolbar {
  border: none;
  background: #fff;
  opacity: .9;
  transition: opacity .2s ease;

  a {
    opacity: .75;
    transition: opacity .2s ease;
  }

  &:hover, &:hover a {
    opacity: 1;
  }
}
</style>
