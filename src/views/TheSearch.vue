<template>
  <div>
    <h1>검색 결과</h1>
    <p>"{{ $route.params.searchKeyword }}"에 대한 검색 결과입니다.</p>

    <div       
      class="row row-cols-1 row-cols-md-5 gy-3 container">
      <div v-for="(movie, idx) in searchMovieList" :key="idx">
        {{movie.title}}
      </div>
<!-- 
      <MovieCard
        data-app
        v-for="(movie, idx) in searchMovieList"
        :key="idx"
        :movie="movie"        
      /> -->
    </div>

  </div>
</template>

<script>
import axios from 'axios'
// import MovieCard from '@/components/MovieCard'

export default {
  name: 'Search',
  data: function () {
    return {
      searchMovieList: null,   
       
    }
  },
  components: {
    // MovieCard,
  },
  methods:{       
    getSearchBarMovies: function () {      
      axios({
          method: 'GET',
          url: `http://127.0.0.1:8000/movies/searchBarMovies/${this.$route.params.searchKeyword}/`,                    
        })
          .then(res => {
            console.log(res.data)            
            this.searchMovieList = res.data            
          })
          .catch(err => {
            console.log(err)
          })        
    }
  },
  updated: function () {
    // this.getSearchBarMovies()    
  },
  watch: {
    searchKeyword: function() {
      console.log('Changed')
    }    
  }
}

</script>

<style>

</style>