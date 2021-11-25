<template>
<div class= "col-mb-6 movie-item">
  <v-dialog      
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"      
  >
    <template v-slot:activator="{ on, attrs }">
      <v-img
        v-if="imgSrc"
        
        style="height:330px; width:220px; object-fit:cover"
        :src="imgSrc" alt="포스터 없음"
        v-bind="attrs"
        v-on="on"
        @click="callAxios"
      >
      </v-img>
    </template>

    <div class="movie-detail-card">
      <div class="movie-detail-toolbar">
        <v-btn
          icon
          dark
          @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="movie-detail-body">
        <div class="movie-detail-poster">
          <img :src="imgSrc" alt="포스터 없음">
        </div>
          <div class="movie-detail-info">
              <!-- info header -->
              <div class="movie-detail-upper">
                <div class="movie-detail-info-header">
                  <div class="movie-detail-info-header-left">

                    <div class="movie-detail-title"
                    style="font-weight:bold"
                    >
                      <div>{{movieDetailInformation.title }}</div>

                      
                    </div>

                  </div>
                      <div >

                        <div
                        v-if="movieDetailInformation.release_date"
                        class="movie-release-date"
                        style="text-align:left;"
                          >
                          개봉 : {{ movieDetailInformation.release_date }}
                        </div>
                        <div
                        v-else>
                        해당 영화는 개봉일 정보를 제공하지 않습니다. 
                        </div>
                        <div class="movie-genres" 
                        v-if="movieDetailInformation.genres_list"
                        style="text-align:left;">
                          장르 : {{ movieDetailInformation.genres_list[0]}} , {{ movieDetailInformation.genres_list[1]}}
                        </div>
                        <div v-else>
                          해당 영화는 장르 정보를 제공하지 않습니다. 
                        </div>
                        <div class="movie-actors"
                        v-if="movieDetailInformation.actors_list">
                          {{ movieDetailInformation.actors_list[0]}} , {{ movieDetailInformation.actors_list[1]}}
                          </div>
                        <div
                        v-else
                        >
                        해당 영화는 배우 정보를 제공하지 않습니다.
                        </div>
                    </div>
                  <div class="movie-detail-info-header-right">
                    <div class="container justify-content-end">
                   <div 
                   v-if="movieDetailInformation.vote_average"
                   class="movie-vote"
                   style="text-align:left;"
                   >
                    평점 : {{ movieDetailInformation.vote_average }} 
                   </div>
                   <div
                   v-else
                   >
                    해당 영화는 평점 정보를 제공하지 않습니다.
                   </div>
                   <div 
                   v-if="movieDetailInformation.director"
                   class="movie-vote"
                   style="text-align:left;"
                   >
                     감독 : {{ movieDetailInformation.director }}
                   </div>
                   <div v-else>
                    해당 영화는 감독 정보를 제공하지 않습니다. 
                   </div>
                    </div>
                  </div>
                </div>
                 <!-- info overview -->
                  <div class="movie-detail-overview-header">
                    줄거리
                  </div>
                  <hr>
                  <div
                    v-if="movieDetailInformation.overview"
                    class="movie-detail-overview-body ">
                    {{movieDetailInformation.overview}}
                  </div>
                   <div v-else
                      class="movie-detail-overview-body">
                      해당 영화는 줄거리 정보를 제공하지 않습니다.
                    </div>          
              </div>
          </div>
      
      </div>
     </div>  
</v-dialog>

</div>
</template>

<script>
import axios from 'axios'
const URL = 'http://127.0.0.1:8000/'
export default {
  name:"MovieCard",
  props: {
    movie: {
      type: Object,
      required: true
    },    
    
  },
    data() {
    return {
      //뷰티파이
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,

      actor: [],

      //상세정보
      movieDetailInformation: []
    }
  },
  computed: {
    imgSrc: function () {
      return this.movie.poster_path
    },
  },
  methods: {
    getActorList: function () {
     this.actor =  this.movieDetailInformation.actors_list
     return this.actor.slice(0,2).join()
    },
    callAxios: function() {
      var detailTmdbID = this.movie.tmdb_id
      console.log(detailTmdbID)
      console.log("이걸 누르면 이게 뜬다. 이거에 맞는")
      axios({
      method: 'get',
      url: URL+`movies/${detailTmdbID}/`,
      // params
    })
      .then( res => {
        console.log(res.data)
        this.movieDetailInformation = res.data
      
      })
      .catch( err => {
        console.log(err)
      })
    },
  }
}

</script>

<style scoped>
/* html, body, template, #app {
  height: 100%;  
} */


.movie-item:hover {
  cursor: pointer;
}

.movie-item {
  /* 잠깐만 테스트 */  
  /* position: relative; */
  
  display: block;
  /* flex: 1 1 0px; */
  flex-flow: row wrap;
  transition: transform 500ms;
}




.movie-item:focus  .movie-item,
.movie-item:hover  .movie-item {
  /* 잠깐만 테스트 */  
  /* transform: translateX(25%); */
}

 #logo-image {
  height: 100%;
} 

.movie-detail-card {
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: 2rem;
  min-height: 100%;
  height: auto;
  /* 잠깐만 테스트 */  
  /* background-color: #000000;   */
  background-color: black;  
  
  /* position: absolute;   */
  
}

.movie-detail-toolbar {
  position: fixed;      
  top: 55px;
  left: 50%;
  /* height: 50px; */
}

.movie-detail-body {
  display: flex;
  flex-flow: row wrap;
  margin: 1rem;
}

.movie-detail-info {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  margin: 1rem 0 0 4rem;
  width: 60%;  
} 

.movie-detail-info-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 80px;
}
.movie-detail-poster > img {
  /* width: 500px; */
  width: 100%;
  opacity: 1;
}

.movie-detail-title {
  font-size: 40px;
  color: #dddddddd;
}

.movie-detail-info-header-left {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  flex-direction:column;
  
}

.movie-detail-info-header-right {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

#movie-star {
  height: 50%;
  margin-left: 1rem;
} 

.movie-detail-overview-header {
  margin-top: 5rem;
  font-size: 32px;
} 

 .movie-detail-overview-body {
  font-size: 20px;
  color: #dddddddd;  
  text-align: justify;
  text-justify: inter-word;
  }  

</style>