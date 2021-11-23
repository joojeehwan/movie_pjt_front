<template>
<!-- style="margin-bottom: 81px" -->
  <div class="home bg-black" >    
    <!-- <h1>Weekly Boxoffice Movies</h1> -->
    <div class="p-5"> 
      <p class="text-white fw-bold fst-italic text-start fs-4"># Weekly Boxoffice</p>
      <div class="d-flex justify-content-center">
          <carousel-3d
            v-if="weeklyBoxOfficeMovieList.length"          
            :height='385'
            :width='300'
            :space="370"
            :count="weeklyBoxOfficeMovieList.length"          
            :border="0"                             
            :display="7"
            :autoplay="true" :autoplayTimeout="3500"            
          >          
            <slide :index="0">
              <img :src="weeklyBoxOfficeMovieList[0].poster_path" class="carousel-item-img">        
            </slide>
            <slide :index="1">
              <img :src="weeklyBoxOfficeMovieList[1].poster_path" class="carousel-item-img">        
            </slide>
            <slide :index="2">
              <img :src="weeklyBoxOfficeMovieList[2].poster_path" class="carousel-item-img">        
            </slide>
            <slide :index="3">
              <img :src="weeklyBoxOfficeMovieList[3].poster_path" class="carousel-item-img">        
            </slide>
            <slide :index="4">
              <img :src="weeklyBoxOfficeMovieList[4].poster_path" class="carousel-item-img">        
            </slide>
            <slide :index="5">
              <img :src="weeklyBoxOfficeMovieList[5].poster_path" class="carousel-item-img">        
            </slide>
            <slide :index="6">
              <img :src="weeklyBoxOfficeMovieList[6].poster_path" class="carousel-item-img">        
            </slide>
            <slide :index="7">
              <img :src="weeklyBoxOfficeMovieList[7].poster_path" class="carousel-item-img">        
            </slide>
            <slide :index="8">
              <img :src="weeklyBoxOfficeMovieList[8].poster_path" class="carousel-item-img">        
            </slide>
            <slide :index="9">
              <img :src="weeklyBoxOfficeMovieList[9].poster_path" class="carousel-item-img">        
            </slide>
            
            <!-- <slide v-for="(movie, i) in weeklyBoxOfficeMovieList" :key="i" :index="i">                         
                <img :src="weeklyBoxOfficeMovieList[i].poster_path" class="carousel-item-img">        
            </slide> -->
          </carousel-3d>
      </div>
    </div>
    <hr class="bg-white">
      
    <div class="p-5">    
      <p class="text-white fw-bold fst-italic text-start fs-5"># Top Rated Movies</p>
      
        <!-- <div class="row row-cols-5 gy-3">
          <MovieCard data-app v-for="(movie, idx) in topRatedMovieList" :key="idx" :movie="movie"/>
        </div> -->

      <vue-slick-carousel                
        v-if="topRatedMovieList.length"
        :arrows="true" :dots="true" :slidesToShow="5" :infinite="false" 
        >
        <MovieCard  
          data-app
          v-for="(movie, idx) in topRatedMovieList" :key="idx" :movie="movie"/>        
      </vue-slick-carousel>
    </div> 
  
    <br>
    <!-- 2. 해쉬태그 순  -->
    <div v-if="isLogin">
    <hr class="bg-white">
      <div class="p-5">    
        <p class="text-white fw-bold fst-italic text-start fs-5">#{{nameHashTag1}}와(과) 관련된 영화들</p>
        <VueSlickCarousel 
          :arrows="true" :dots="true" :slidesToShow="5" :infinite="false" 
          v-if="HashtagMovieList1.length">        
          <MovieCard       
            data-app    
            v-for="(movie, idx) in HashtagMovieList1" :key="idx" :movie="movie"/>        
        </VueSlickCarousel>
      </div> 
    </div>
    <!-- 2. 해쉬태그 순  -->
    <div v-if="isLogin">
    <hr class="bg-white">
      <div class="p-5">    
        <p class="text-white fw-bold fst-italic text-start fs-5">#{{nameHashTag2}}와(과) 관련된 영화들</p>
        <VueSlickCarousel :arrows="true" :dots="true" :slidesToShow="5" :infinite="false" v-if="HashtagMovieList2.length">        
          <MovieCard     
            data-app      
            v-for="(movie, idx) in HashtagMovieList2" :key="idx" :movie="movie"/>        
        </VueSlickCarousel>
      </div> 
    </div>

    
  </div>

   
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'
import VueSlickCarousel from 'vue-slick-carousel'  
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
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
      topRatedMovieList: [],
      HashtagMovieList1:[],
      HashtagMovieList2:[],   
      slickOptions: {
        slidesToShow: 5,
        arrows: true,
        dots: true,
        infinite: false,
      },      
    }
  },

  components: {    
    Carousel3d,
    Slide,
    MovieCard,
    VueSlickCarousel,
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
      console.log('getWeeklyBoxOfficeMovieList')
      this.$store.commit("getWeeklyBoxOfficeMovieList", this.setToken)
    },
    imageLoaded() {
      console.log('force load');
      this.$refs.carousel.$forceUpdate()
    },
    next() {
      this.$refs.slick.next();
    },
    prev() {
      this.$resfs.slcik.prev();
    },
    reInit() {
      this.$nextTick(() => {
        this.$resfs.slick.reSlick();
      })
    }
  },
  computed: {
     ...mapState([
      'isLogin'
    ])
  },
  created() {
    // 수정하기 : state에 넣기
    // this.getWeeklyBoxOfficeMovieList()
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
    

    axios({
      method: 'get',
      url: URL+'movies/searchTopRatedMovies/',
      // params
    })
      .then( res => {
        console.log(res.data)
        // this.weeklyBoxOfficeMovieList = res.data
        this.topRatedMovieList = res.data      
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

  },
  watch: {

  }
}
</script>

<style>
/* 아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ모르겠다 */
  .slick-list {    
    transform: none !important;

  }
  .slick-track {
    transform: none !important;
  }

  .slick-dots li button:before{    
    opacity: 0.4;
    color: white;
  }
  .slick-dots li.slick-active button::before {
    color: #fff;
    opacity: 1;
  }

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
