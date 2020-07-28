<template>
  <v-app id="app">
    <app-header />
   <router-view />
  </v-app>
</template>

<script>
import header from "./views/app-header.vue";
import { Component, Vue } from "vue-property-decorator";
import { Action } from 'vuex-class'

@Component({
  components: {
    appHeader: header
  }
})
export default class AppComponent extends Vue {
  @Action('autoLogin') autoLogin
  created() {
    this.autoLogin();
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
