<template>
  <div>
    <div id="nav">
      <header class="p-3 bg-dark text-white">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><img src="@/assets/logo.png" alt="logo" style="width: 20px"></li>
              <li><router-link to="/" class="nav-link px-2 text-white">Home</router-link></li>
              <li><router-link :to="{ name: 'Index'}" class="nav-link px-2 text-white">Community</router-link></li>
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
export default {
  name: 'Navbar',
  data: function () {
    return {
      inputValue: null,
    }
  },
  methods: {
    searchKeyword: function () {
      if(this.$router.currentRoute.params.searchKeyword !== this.inputValue){ 
        console.log(this.inputValue)       
        this.$router.push({ name: 'Search', params: { searchKeyword: this.inputValue }})
      }
      this.inputValue = ''
    }
  }
}
</script>

<style>

</style>