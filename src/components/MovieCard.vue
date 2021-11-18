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
              <v-list-item-title>{{movie.title}}</v-list-item-title>
              <v-list-item-subtitle>{{movie.overview}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{getGenre(movie.genre_ids)}}</v-list-item-subtitle>
        </v-list-item-content>
     
      </div>
    </div>
          
</v-dialog>

</div>
</template>

<script>
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
      genres_name : "" ,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      genres: [
          {
            "id": 28,
            "name": "액션"
          },
          {
            "id": 12,
            "name": "모험"
          },
          {
            "id": 16,
            "name": "애니메이션"
          },
          {
            "id": 35,
            "name": "코미디"
          },
          {
            "id": 80,
            "name": "범죄"
          },
          {
            "id": 99,
            "name": "다큐멘터리"
          },
          {
            "id": 18,
            "name": "드라마"
          },
          {
            "id": 10751,
            "name": "가족"
          },
          {
            "id": 14,
            "name": "판타지"
          },
          {
            "id": 36,
            "name": "역사"
          },
          {
            "id": 27,
            "name": "공포"
          },
          {
            "id": 10402,
            "name": "음악"
          },
          {
            "id": 9648,
            "name": "미스터리"
          },
          {
            "id": 10749,
            "name": "로맨스"
          },
          {
            "id": 878,
            "name": "SF"
          },
          {
            "id": 10770,
            "name": "TV 영화"
          },
          {
            "id": 53,
            "name": "스릴러"
          },
          {
            "id": 10752,
            "name": "전쟁"
          },
          {
            "id": 37,
            "name": "서부"
          }
      ],

    }
  },
  computed: {
    imgSrc: function () {
      return "https://image.tmdb.org/t/p/w300/" + this.movie.poster_path
    },
  },
  methods: {

    getGenre: function (genre_ids) {


      var result = []
  
      for (var i=0; i < genre_ids.length; i++) {
        if (genre_ids[i] in this.genres) {
          result.push(this.genres[i]["name"])
        }
      }
      if (result.length>0) {
        return result
      } else {
        const noGenreMessage = 'No Genre Defined'
        return noGenreMessage
      }

    //   const newGeners = this.genres.map((genre)=> {
    //       return genre.id
    //   })

    //   console.log(this.genres)

    //   const resGeners = newGeners.filter(id => genere_ids.includes(id))
    //   console.log(resGeners)

    //  var result = []
     
    //   for (var i=0;resGeners.length;i++) {
    //       if (resGeners[i] in this.genres["id"]){
    //         result.push(this.genres["name"])
    //       }
    //   }
    //   console.log(result)
  
    }
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