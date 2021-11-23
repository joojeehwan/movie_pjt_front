<template>
  <div id="login">     
    <p class="text-white fw-bold fst-italic text-center fs-2"># Login</p>  
    <div class="p-5">
      <img src="@/assets/movie-icon.png" alt="" style="width: 150px; heigth:150px;">    
    </div>

    <div class="mt-10">
      <div class="input-group mb-3 ">
        <span class="input-group-text" id="basic-addon1">
          <font-awesome-icon icon="user" />
        </span>
        <input type="text" class="form-control" 
          id="username"
          v-model="credentials.username"
          placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3 ">
        <span class="input-group-text" id="basic-addon1">
          <font-awesome-icon icon="key" />
        </span>
        <input type="password" class="form-control" 
          id="password"
          v-model="credentials.password"
          @keyup.enter="login"
          placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
      </div>   

      <div class="d-flex justify-content-center input-group p-3">        
        <button
          class="btn btn-outline-light"
          style="width: 120px;"
          @click="login">Log In</button>
      </div>
      <div class="d-flex input-group">
        <div class="ms-auto text-secondary">
          Not a member yet?
        <button 
          class="btn btn-link"          
          @click="signup">Sign up now</button>
        </div>        
      </div>
    </div>
    
  </div>
</template>

<script>
//import axios from 'axios'

export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
      }
    }
  },
  methods: {
    
      login() {
        this.$store.dispatch("login", this.credentials)
        this.$store.dispatch("userName", this.credentials.username)
      },
    // login: function () {
    //   axios({
    //     method: 'post',
    //     url: 'http://127.0.0.1:8000/accounts/api-token-auth/',
    //     data: this.credentials
    //   })
    //     .then(res => {
    //       console.log(res)
    //       localStorage.setItem('jwt', res.data.token)
    //       this.$router.push({ name: 'Home' })
    //       this.$emit('login')


    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
      
    // },
    signup: function () {
      this.$router.push({ name: 'Signup' })
    }
  }
}
</script>

<style scoped>

  .input-group {
    width: 400px;
    margin: 0 auto;
  }
</style>