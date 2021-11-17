<template>
  <div>
    <div id="nav">
      <header class="p-3 bg-dark text-white">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><img src="@/assets/logo.png" alt="logo" style="width: 20px"></li>
              <li><router-link to="/" class="nav-link px-2 text-secondary">Home</router-link></li>
              <li class="nav-item dropdown">
                <router-link :to="{ name: 'Index'}"  
                  class="nav-link px-2 text-white dropdown-toggle">
                  Community
                </router-link>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>

              <li><router-link :to="{ name: 'Login'}"  class="nav-link px-2 text-white">Login</router-link></li>              
            </ul>
          
            <div class="d-flex gap-3 col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input 
                v-model="inputValue"
                @keyup.enter="searchKeyword"
                type="search" class="form-control form-control-dark" placeholder="제목, 사람, 장르" aria-label="Search">
              <button 
                @click="searchKeyword"
                type="button" class="btn btn-warning">Search</button>
            </div>            
          </div>
        </div>
      </header>
    </div>

  </div>
</template>

<script>
// import axios from 'axios'

// const API_URL = 'https://openapi.naver.com/v1/search/movie.json'
// 추후 환경변수에 넣기
// const CLIENT_SECRET = 'tB6QZ6LzyG'
// const CLIENT_ID = 'NhnBdNZiKhE0vPj73Foz'

export default {
  name: 'Navbar',
  data: function () {
    return {
      inputValue: null,
    }
  },
  methods: {
    searchKeyword: function () {
      this.$router.push({ name: 'Search', params: { searchKeyword: this.inputValue }})
   
   
   //   // TODO: 추후 django에서 데이터 받는 부분으로 변경하기
    //   const params = {
    //     query: this.inputValue,
    //     display: 10, //최대 100개 가능
    //   }

    //   const headers= {
    //     'X-Naver-Client-Id':CLIENT_ID,
    //     'X-Naver-Client-Secret':CLIENT_SECRET
    //   }

    //   axios({
    //     method: 'get',
    //     url: '/v1/search/movie.json',//API_URL,
    //     params,
    //     headers
    //   })
    //     .then( res => {
    //       console.log('된건가')
    //       console.log(res.data)

    //     })
    //     .catch( err => {
    //       console.log(err)
    //     })
    }
  }
}
</script>

<style>

</style>