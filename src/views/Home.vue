<template>

  <div class="home">    
    1234
    {{this.$store.username}}
      <h1>Weekly Boxoffice Movies</h1>
 <div class="img d-flex justify-content-center">
     <carousel-3d
      :height="450"
      :width='300'
      :space="380"
      :count="weeklyBoxOfficeMovieList.length"
      :display="7"
      :border="0"
     >
    <slide  v-for="(movie, i) in weeklyBoxOfficeMovieList" :key="i" :index="i">
      <img class="carousel-item-img" :src="img_path + movie.poster_path">
    </slide>
  </carousel-3d>
 </div>
 <h2 style="text-align: left">#평점이 높은</h2>
  <div class="popular-list row row-cols-1 row-cols-md-5 gy-3">
      <MovieCard
      data-app
        v-for="(movie, idx) in weeklyBoxOfficeMovieList"
        :key="idx"
        :movie="movie"/>
  </div>

    <!-- 1. Weekly Boxoffice Area -->
    <!-- 수정하기 : 고화질 이미지로 다시 보내기 -->
<!--     
    <h1>Weekly Boxoffice Movies</h1>
    <div class="container">
      <div class="d-flex flex-wrap">
        <div
          v-for="movie in weeklyBoxOfficeMovieList"
          :key="movie.index"
        >
        <img :src="img_path + movie.poster_path" alt="">        
        <p>{{movie.title}}</p>
         
        </div>
      </div>
    </div> -->
    <!-- 
    <div class="detail-area">
      <iframe :src="videoUrl" frameborder="0"></iframe>
    </div> 
    -->
      <!-- 2. 해쉬태그 순  -->
    <hr>
    <br>
    <h2 v-if="isLogin" style="text-align: left"> #{{nameHashTag1}}(과) 관련된 영화들</h2>
    <div v-if="isLogin" class="popular-list row row-cols-1 row-cols-md-5 gy-3">
         <MovieCard
        data-app
          v-for="(movie, idx) in HashtagMovieList1"
          :key="idx"
          :movie="movie"/>
    </div>

    <hr>
    <br>
    <h3 v-if="isLogin"  style="text-align: left"> #{{nameHashTag2}}(과) 관련된 영화들</h3>
    <div v-if="isLogin" class="popular-list row row-cols-1 row-cols-md-5 gy-3">
         <MovieCard
        data-app
          v-for="(movie, idx) in HashtagMovieList2"
          :key="idx"
          :movie="movie"/>
    </div>

    <!-- <div class="container">
      <h3 style="text-align: left"> #{{nameHashTag2}}(과) 관련된 영화들</h3>
      <div class="row g-4">
        <div class="col-2 card"
          v-for="movie in HashtagMovieList2"
          :key="movie.rank">
            <img :src="movie.poster_path" alt="" class="card-img-top">           
            <div class="card-body">
              <h5 class="card-title">{{movie.title}}</h5>
              <p class="card-text">text:{{movie.title}}</p>
            </div>
          
        </div>
      </div> 
    </div> -->
    
  </div>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';
import {mapState} from "vuex"
import MovieCard from '@/components/MovieCard'
//import { mapGetters } from 'vuex'
import axios from 'axios'


// 1114 django local host url
const URL = 'http://127.0.0.1:8000/'

export default {
  name: 'Home',
  data: function () {
    return {
      nameHashTag1: "",
      nameHashTag2: "",

      weeklyBoxOfficeMovieList: [],
      HashtagMovieList1:[],
      HashtagMovieList2:[],

      img_path : "https://image.tmdb.org/t/p/w300/"
    }
  },

  components: {
    // ImgCarousel,
   Carousel3d,
    Slide,
    MovieCard
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    getWeeklyBoxOfficeMovieList: function() {
      this.$store.commit("getWeeklyBoxOfficeMovieList", this.setToken)
    },
      imageLoaded() {
                console.log('force load');
                this.$refs.carousel.$forceUpdate()
            },
    },
  // 화면 전환 시 로딩 오래 걸리는 것 수정
  watch: {
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
    computed: {
     ...mapState([
      'isLogin'
    ])
  },
  created() {

    //this.getWeeklyBoxOfficeMovieList()
    axios({
      method: 'get',
      url: URL+'movies/searchTopRatedMovies/',
      // params
    })
      .then( res => {
        console.log(res.data)
        this.weeklyBoxOfficeMovieList = res.data
      
      })
      .catch( err => {
        console.log(err)
      })
      
      axios({
        method: "get", 
        url: URL + "movies/searchHashtagMovies/1/"
      })
      .then(res =>{
      console.log(res.data)
       this.HashtagMovieList1 = res.data["movies"]
       this.nameHashTag1 = res.data["hashtag"]
        
      })
      .catch(err => {
        console.log(err)
      }),
      axios({
        method: "get", 
        url: URL + "movies/searchHashtagMovies/2/"
      })
      .then(res =>{
      console.log(res.data)
       this.HashtagMovieList2 = res.data["movies"]
       this.nameHashTag2 = res.data["hashtag"]
        
      })
      .catch(err => {
        console.log(err)
      })

  }
}
</script>

<style>

    .carousel-item-img {
        height:43vh!important ;
    }

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
