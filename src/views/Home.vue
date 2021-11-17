<template>
  <div class="home">    
    <!-- 1. Weekly Boxoffice Area -->
    <h1>Weekly Boxoffice Movies</h1>
    <div class="container">
      <div class="d-flex flex-wrap">
        <div
          v-for="movie in weeklyBoxOfficeMovieList"
          :key="movie.index"
        >
        <!-- 수정하기 : 고화질 이미지로 다시 보내기 -->
        <img :src="img_path + movie.poster_path" alt="">        
        <p>{{movie.title}}</p>
        <!-- {{movie}} -->        
        </div>
      </div>
    </div>
    <!-- 
    <div class="detail-area">
      <iframe :src="videoUrl" frameborder="0"></iframe>
    </div> 
    -->
    <hr>
    <div class="container">
      <!-- 2. 해쉬태그 순  -->
      <h3 style="text-align: left">#커피와(과) 관련된 영화들</h3>
      <div class="row g-4">
        <div class="col-2 card"
          v-for="movie in weeklyBoxOfficeMovieList"
          :key="movie.rank">
            <img :src="img_path + movie.poster_path" alt="" class="card-img-top">           
            <div class="card-body">
              <h5 class="card-title">{{movie.title}}</h5>
              <p class="card-text">text:{{movie.title}}</p>
            </div>
          
        </div>
      </div>


      <h3 style="text-align: left">#겨울와(과) 관련된 영화들</h3>    

    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
// 1114 django local host url
const URL = 'http://127.0.0.1:8000/'

export default {
  name: 'Home',
  data: function () {
    return {
      weeklyBoxOfficeMovieList: [],
      img_path : "https://image.tmdb.org/t/p/w300/"
    }
  },
  methods: {
    
    },
  // 화면 전환 시 로딩 오래 걸리는 것 수정
  computed: {
    // videoUrl: function () {
    //   const videoId = 'DJs_ihmMZfg'// this.video.id.videoId
    //   return `https://www.youtube.com/embed/${videoId}`
    // },

    // 1114 - 1. 주간 박스오피스 영화
    // weeklyBoxOfficeMovies: function () {
    //   axios({
    //     method: 'get',
    //     url: URL+'movies/searchWeeklyBoxOfficeMovies',
    //     // params
    //   })
    //     .then( res => {
    //       console.log(res.data)
    //       this.weeklyBoxOfficeMovieList = res.data
    //     })
    //     .catch( err => {
    //       console.log(err)
    //     })      
    //   return this.weeklyBoxOfficeMovieList
    // },
    
  },
  created() {
    axios({
      method: 'get',
      url: URL+'movies/searchWeeklyBoxOfficeMovies',
      // params
    })
      .then( res => {
        console.log(res.data)
        this.weeklyBoxOfficeMovieList = res.data
      })
      .catch( err => {
        console.log(err)
      })            
  }
}
</script>

<style>
  .detail-area {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; 
    background-color: aqua;
  }

  .detail-area > iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

</style>