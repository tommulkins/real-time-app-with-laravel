<template>
  <div>
    <Toolbar/>
    <router-view/>
    <AppFooter/>
  </div>
</template>

<script>
  import Toolbar from './Toolbar'
  import AppFooter from './AppFooter'
  import Login from './login/Login'

  export default {
    name: 'AppHome',
    components: {
      Toolbar,
      AppFooter,
      Login
    }
  }
</script>

<style scoped>

</style>