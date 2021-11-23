<template>
  <div id="signup">    
    <p class="text-white fw-bold fst-italic text-center fs-2"># Signup</p>  
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
      <div class="input-group mb-3 ">
        <span class="input-group-text" id="basic-addon1">
          <font-awesome-icon icon="key" />
        </span>
        <input type="password" class="form-control" 
          id="password"
          v-model="credentials.passwordConfirmation"
          @keyup.enter="signup"
          placeholder="Password Confirmation" aria-label="Password Confirmation" aria-describedby="basic-addon1">
      </div> 

      <div class="d-flex justify-content-center input-group p-3">        
        <button
          class="btn btn-outline-light"
          style="width: 120px;"
          @click="signup">Sign Up</button>
      </div>      
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
        passwordConfirmation: null,
      }
    }
  },
  methods: {
    signup: function () {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/signup/',
        data: this.credentials
      })
        .then(res => {
          console.log(res)
          this.$router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
        })
      
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