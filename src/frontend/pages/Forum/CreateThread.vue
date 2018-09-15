<template>
  <div class="row">
    <div class="col-xs-9">
      <panel v-if="category" :title="`Create Thread in ${category.name}`">
        <div class="go-back">
          <a href="#" @click="goBack($event)">← Go back</a>
        </div>

        <input-text
          v-model="thread.title"
          :fullWidth="true"
          placeholder="Title"
          :errors="errors.title"
        ></input-text>
        <editor ref="editor" :errors="errors.body"></editor>
        <v-button @click.native="submit">
          Create thread
        </v-button>
      </panel>
    </div>
    <div class="col-xs-3">
      <panel title="Latest threads" icon="activity">
      </panel>
      <panel title="Latest posts" icon="activity">
      </panel>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ForumCategoryService from '../../services/Forum/CategoryService'
import ForumThreadService from '../../services/Forum/ThreadService'
import Editor from '../../components/Editor.vue'

@Component({
  title: "Create Thread",
  components: { Editor }
})
export default class ForumCreateThread extends Vue {
  category = null

  thread = {
    title: null
  }

  errors = {
    title: null,
    body: null
  }

  async created () {
    const service = new ForumCategoryService()
    const { data } = await service.getByID(parseInt(this.$route.params.id))
    this.category = data
  }

  goBack (event) {
    event.preventDefault()
    this.$router.go(-1)
  }

  submit () {
    const service = new ForumThreadService()
    service.create(this.category.id, this.thread.title, this.$refs.editor.value())
      .then(response => {
        const thread = response.data
        this.$toasted.show("Thread created", { type: 'success' })
        this.$router.push({ name: 'forum-thread', params: { id: thread.id, slug: thread.slug }})
      })
      .catch(error => this.errors = error.response.data.errors)
  }
}
</script>

<style lang="scss">
.go-back {
  margin-bottom: 1em;
}
</style>
