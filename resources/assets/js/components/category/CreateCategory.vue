<template>
  <v-container>
    <v-form @submit.prevent="submit">
      <v-text-field
        v-model="form.name"
        label="Category"
        type="text"
        required
      ></v-text-field>

      <v-btn type="submit" color="pink" v-if="editSlug">Update</v-btn>
      <v-btn type="submit" color="teal" v-else>Create</v-btn>
    </v-form>

    <v-card>
      <v-toolbar color="indigo" dense dark>
        <v-toolbar-title>Categories</v-toolbar-title>
      </v-toolbar>

      <v-list>

        <div v-for="(category, index) in categories" :index="category.id">
          <v-list-tile>

            <v-list-tile-action>
              <v-btn icon small @click="edit(index)">
                <v-icon color="orange">edit</v-icon>
              </v-btn>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>
                {{ category.name }}
              </v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon small @click="destroy(category.slug, index)">
                <v-icon color="red">delete</v-icon>
              </v-btn>
            </v-list-tile-action>

          </v-list-tile>
          <v-divider></v-divider>
        </div>

      </v-list>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'CreateCategory',
    data () {
      return {
        form: {
          name: null
        },
        categories: {},
        editSlug: null
      }
    },
    methods: {
      submit () {
        this.editSlug ? this.update() : this.create()
      },
      update () {
        axios.patch(`/api/category/${this.editSlug}`, this.form)
          .then(res => {
            this.categories.unshift(res.data)
            this.form.name = null
          })
      },
      create () {
        axios.post('/api/category', this.form)
          .then(res => {
            this.categories.unshift(res.data)
            this.form.name = null
          })
      },
      edit (index) {
        this.form.name = this.categories[index].name
        this.editSlug = this.categories[index].slug
        this.categories.splice(index, 1)
      },
      destroy (slug, index) {
        axios.delete(`/api/category/${slug}`)
          .then(res => this.categories.splice(index, 1))
      }
    },
    created () {
      if (!User.admin()) {
        this.$router.push('/forum')
      }
      axios.get('api/category')
        .then(res => this.categories = res.data.data)
    }
  }
</script>

<style scoped>

</style>