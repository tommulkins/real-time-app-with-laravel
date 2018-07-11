<template>
  <div>
    <v-btn icon @click="likeIt">
      <v-icon :color="color">favorite</v-icon> {{ count }}
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'Like',
    props: ['content'],
    data () {
      return {
        liked: this.content.liked,
        count: this.content.like_count
      }
    },
    computed: {
      color () {
        return this.liked ? 'red' : 'red lighten-4'
      }
    },
    methods: {
      likeIt () {
        if (User.loggedIn()) {
          this.liked = !this.liked
          this.liked ? this.incr() : this.decr()
        }
      },
      incr () {
        axios.post(`/api/like/${this.content.id}`)
          .then(res => this.count++)
      },
      decr () {
        axios.delete(`/api/like/${this.content.id}`)
          .then(res => this.count--)
      }
    }
  }
</script>

<style scoped>

</style>