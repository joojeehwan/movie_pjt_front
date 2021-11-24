<template>
   <div>

     <v-expansion-panel
      :readonly="false"
      >
      <v-expansion-panel-header
       @click="[callAxiosDetailReview(review.id),clickviews()]"
       v-model="count"
       v-slot="{ open }"
      >
      <v-row no-gutters>
      <v-col cols="3">
       <p class="text-left" >  {{review.movie_title}} </p>
      </v-col> 
      <v-col cols="9">
         <v-fade-transition leave-absolute>
          <h5 v-if="open" style="text-align:left;">"what do you think about the movie?"</h5>
        <v-row
              v-else
              no-gutters
              style="width: 100%"
          >
        <v-col cols="4">
         {{review.created_at |  moment('YYYY-MM-DD HH:mm:ss')}} 
        </v-col>
        <v-col cols="4">
       {{review.title}}
        </v-col>
        <v-col cols="4"> 
         {{count}}
        </v-col> 
        </v-row>
        </v-fade-transition>
      </v-col>
        </v-row>
      </v-expansion-panel-header>

  <div class="float-start">
    <v-expansion-panel-content
    
    >
     <!-- // 영화 : {{reviewItem.movie_title}} --> 
       <img :src="`${getPostPath(imgSrc)}`" width="400" alt="NoPosterImage"> 
      </v-expansion-panel-content>
  </div>
  <div>
    <v-row no-gutters>
    <v-col cols="4">
    <v-expansion-panel-content class="text">
      <p class="text-left">제목 : {{reviewItem.title}} </p>
    </v-expansion-panel-content>
    </v-col>
    </v-row>

   <v-row no-gutters>
    <v-col cols="4">
    <v-expansion-panel-content class="text">
      평점 : {{reviewItem.rank}}
    </v-expansion-panel-content>
    </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
    <v-expansion-panel-content>
      <textarea name="reviewContent" cols="50" rows="10" v-model="reviewItem.content" placeholder="내용">
      </textareaname=>
    </v-expansion-panel-content>
      </v-col>
    </v-row>
  </div>
  <v-row>
    <v-col cols="4">
    <v-expansion-panel-content>
      <h3>Comments</h3>
      <CommentForm :review="review"/>
      <CommentList :review="review"/>
    </v-expansion-panel-content>
    <v-expansion-panel-content>
      <div>
        <button class="btn-modify" @click="updateReview">리뷰 수정</button>
        <button class="btn-delete" @click="deleteReview">리뷰 삭제</button>
      </div>
    </v-expansion-panel-content>
    </v-col>
  </v-row>
  </v-expansion-panel>
  </div>
</template>

<script>

import axios from 'axios'
import CommentForm from "@/components/CommentForm"
import CommentList from "@/components/CommentList"
import { mapGetters } from 'vuex'


export default {
name:"CommunityHomeItem",
 components: {
    CommentForm,
    CommentList
  },
  data() {
    return {
      reviewItem: {
        movie_title: this.review.movie_title,
        title: this.review.title,
        content: this.review.content,
        rank: this.review.rank

      },
      count: this.review.click,
      poster_path: ""
    }
  },
   props: {
     review: {
      type: Object,
      required: true,
    }
  },
  methods: {
    clickviews: function() {
        this.count = this.review.click
        this.count += 1
    },
 
    callAxiosDetailReview: function (review_pk) {
        axios({
          method: "GET", 
          url: `http://127.0.0.1:8000/community/${review_pk}`,
        })
        .then(res=> {
          console.log(res)
          this.reviewItem.movie_title = res.data.movie_title
          this.reviewItem.title = res.data.title
          this.reviewItem.content = res.data.content
          this.reviewItem.rank = res.data.rank
        })
        .catch(err =>{
          console.log(err)
        })

    },   
      setToken() {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    }, 
      updateReview() {

      const reviewItemSet = {
        reviewItem: this.reviewItem,
        review_id: this.review.id,
        token: this.setToken()
      }
     this.$store.dispatch('updateReview', reviewItemSet)
    },
    deleteReview() {
      const reviewItemSet = {
        review_id: this.review.id,
        token: this.setToken()
      }
      this.$store.dispatch('deleteReview', reviewItemSet)
    }, 
    getPostPath(number) {
      return this.posterPath[number].value
    }
  },
    computed: {
    ...mapGetters([
      'posterPath'
    ]),
    imgSrc: function () {
      
      const temp = this.posterPath.map(x=>x.name).indexOf(this.reviewItem.movie_title)
      
      return temp
    }
  },
   created() {
    console.log(this.review)
    this.$store.dispatch('getMovies', this.setToken())
  },
}


</script>

<style>


.btn-modify {
  font-weight: bold;
  background-color: #564d4d;
  color: white;
  margin-right: 5px;
}

.btn-delete {
  font-weight: bold;
  background-color: #831010;
  color: white;
  margin-left: 5px;
}

.v-expansion-panel input, textarea{
  color: white;
}

.text {
  font-size: 20px;
  text-align: left;
  font-weight: bold;
}


textarea {resize : vertical;} 
</style>