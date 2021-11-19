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
          primary
          @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="movie-detail-body">
        <div class="movie-detail-poster">
          <img :src="imgSrc" alt="포스터 없음">
        </div>

        <v-list-item-content>
              <v-list-item-title>{{movieDetailInformation.title}}</v-list-item-title>
              <v-list-item-subtitle>{{movieDetailInformation.release_date}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{movieDetailInformation.vote_average}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{movieDetailInformation.genres_list}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{movieDetailInformation.actors_list}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{movieDetailInformation.overview}}</v-list-item-subtitle>              
              <!-- <v-list-item-subtitle>{{getGenre(movie.genre_ids)}}</v-list-item-subtitle> -->
        </v-list-item-content>
     
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
    }
  },
    data() {
    return {
      //뷰티파이
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,

      //상세정보
      movieDetailInformation: []
    }
  },
  computed: {
    imgSrc: function () {
      return "https://image.tmdb.org/t/p/w300/" + this.movie.poster_path
    },
  },
  methods: {
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

<style>

/* .popular-list {
  display: flex;
  margin-left: 5rem;
  margin-right: 5rem;
}

.movie-item {
  position: relative;
  display: block;
  flex: 1 1 0px;
  transition: transform 500ms;
}
*/

 /* .movie-item:hover {
  cursor: pointer;
} 

 .popular-list .movie-item:focus,
.popular-list .movie-item:hover {
  transform: scale(1.4);
  z-index: 1;
}

.popular-list:focus-within ~ .movie-item,
.popular-list:hover ~ .movie-item {
  transform: translateX(-25%);
}

.movie-item:focus  .movie-item,
.movie-item:hover  .movie-item {
  transform: translateX(25%);
} 

 movieCards 
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
  background-color: #000000;
}

.movie-detail-toolbar {
  height: 56px;
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
  width: 500px;
}

.movie-detail-title {
  font-size: 40px;
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
} */ 
</style>