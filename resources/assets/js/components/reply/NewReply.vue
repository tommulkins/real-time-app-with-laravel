<template>
  <div class="mt-4">
    <markdown-editor v-model="body" preview-class="markdown-body"></markdown-editor>
    <v-btn color="green" dark @click="submit">
      Reply
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'NewReply',
    props: ['questionSlug'],
    data () {
      return {
          body: null
      }
    },
    methods: {
      submit () {
        axios.post(`/api/question/${this.questionSlug}/reply`, {body: this.body})
          .then(res => {
            this.body = ''
            EventBus.$emit('newReply', res.data.reply)
            window.scrollTo(0, 0)
          })
      }
    }
  }
</script>

<style scoped>

</style>