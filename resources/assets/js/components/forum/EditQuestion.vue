<template>
  <v-container fluid>
    <v-card>
      <v-form @submit.prevent="update">
        <v-text-field
          v-model="form.title"
          label="Title"
          type="text"
          required
        ></v-text-field>

        <markdown-editor v-model="form.body" preview-class="markdown-body"></markdown-editor>

        <v-card-actions>
          <v-btn icon small type="submit">
            <v-icon color="teal">save</v-icon>
          </v-btn>

          <v-btn icon small @click="cancel">
            <v-icon>cancel</v-icon>
          </v-btn>
        </v-card-actions>

      </v-form>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'EditQuestion',
    props: ['data'],
    data () {
      return {
        form: {
          title: null,
          body: null
        }
      }
    },
    methods: {
      cancel () {
        EventBus.$emit('cancelEditing')
      },
      update () {
        axios.patch(`/api/question/${this.form.slug}`, this.form)
          .then(res => this.cancel())
      }
    },
    mounted () {
      this.form = this.data
    }
  }
</script>

<style scoped>

</style>