<template>
  <div>
    <div id="nav">
      <header class="bg-dark text-white">
        <div class="p-3">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><img src="@/assets/logo1.png" alt="logo" style="width: 30px;"></li>
              <li><router-link to="/" class="nav-link px-2 text-white">Home</router-link></li>
              <ul style= "-webkit-padding-start:0px" v-if="isLogin">
                  <li><router-link :to="{ name: 'Index'}" class="nav-link px-2 text-white">Community</router-link></li>
                  <li><router-link @click.native="logout" to="#" class="nav-link px-2 text-white">Logout</router-link></li> 
                  <li v-if="isAdmin"><a href="http://127.0.0.1:8000/admin" class="nav-link px-2 text-white">Admin</a></li>
                  
              </ul>
              <ul style= "-webkit-padding-start:0px" v-else>
                <!-- 로그아웃 했을 경우 -->
                <!-- <li><router-link :to="{ name: 'Login'}" class="nav-link px-2 text-white">Community</router-link></li> -->
                <li><router-link :to="{ name: 'Login'}"  class="nav-link px-2 text-white">Login</router-link></li>              
              </ul>
            </ul>
          
            <div class="d-flex gap-3 col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input 
                v-model="inputValue"
                @keyup.enter="searchKeyword"
                type="search" class="form-control form-control-dark" placeholder="제목, 사람, 장르" aria-label="Search">
              <v-btn
                color="#01579B"
                @click="searchKeyword"
                type="button" class="btn btn-warning">
                
                <v-icon 
                dark
                >
                mdi-check
                </v-icon>
                          
                </v-btn>
            </div>            
          </div>
        </div>
      </header>
    </div>

  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'Navbar',
  data: function () {
    return {
      inputValue: null,
    }
  },
  // props: {
  //    isLogin: {
  //     type: Boolean, 
  //   }
  // },
  methods: {
    searchKeyword: function (inputValue) {
      console.log(inputValue)
      if(this.$router.currentRoute.params.searchKeyword !== this.inputValue){ 
        console.log(this.inputValue)       
        this.$router.push({ name: 'Search', params: { searchKeyword: this.inputValue }})
      }
      this.inputValue = ''
    }, 
    logout() {
      this.$store.dispatch("logout")
    }, 
    getToken() {
      const token = localStorage.getItem("jwt")
      return token
      },
    
    setToken() {
     const token = localStorage.getItem("jwt")
     const config = {
        Authorization: `JWT ${token}`
      }
      return config
    }

  },
   computed: {
    ...mapActions([
      'checkLogin'
    ]),
    ...mapState([
      'isLogin', 'user_list', 'isAdmin'
    ])
  },
  created() {
    this.$store.dispatch('checkLogin', this.getToken())    
  }

}
</script>

<style>


ul{
   list-style:none;
    margin:0;
    padding:0;

   }

  li{
    margin: 0 0 0 0;
    padding: 0 0 0 0;
    border : 0;
    float: left;
  }

</style>