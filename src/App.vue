<template>
  <div id="app" class="page-container bg-black">
    <!-- 1. nav bar -->    
    <navbar @login="isLogin=true" :isLogin="isLogin"></navbar> 
    <!-- 2. main  -->
    <Main class="wrap"></Main>    
    <!-- 3. footer -->
    <Footer class="footer mb-0"></Footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Main from './components/Main.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Main,
    Footer,
  },
  data: function () {
    return {
      isLogin: false,
    }
  },
  methods: {
    logout: function () {
      this.isLogin = false
      localStorage.removeItem('jwt')
      localStorage.removeItem('isAdmin')
      this.$router.push({ name: 'Login' })
    }

  },
  created: function () {
    const token = localStorage.getItem('jwt')

    if (token) {
      this.isLogin = true
    }

  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
   color: #ffffff;
}

/* #nav {
  padding: 30px;
} */

/* #nav a {
  font-weight: bold;
  color: #2c3e50;
} */

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .page-container {
    position: relative;
    min-height: 100vh;
  }

  .wrap {    
    /* min-height: 100vh; */    
    padding-bottom: 81px;

  }

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 81px;
  }


</style>
