<template>
   <div>
      <v-expansion-panel-header
       @click="callAxiosDetailReview(review.id)"
       >
       {{review.movie_title}} |
       {{review.title}} |
       {{review.created_at | moment('YYYY-MM-DD HH:mm:ss') }}    
        </v-expansion-panel-header>

    <v-expansion-panel-content>
      영화 : {{reviewItem.movie_title}}
      </v-expansion-panel-content>
    <v-expansion-panel-content>
      제목 : {{reviewItem.title}}
      </v-expansion-panel-content>
    <v-expansion-panel-content>
      <textarea name="reviewContent" cols="30" rows="10" v-model="reviewItem.content" placeholder="내용">
      </textarea>
    </v-expansion-panel-content>
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

  </div>
</template>

<script>
import axios from 'axios'
import CommentForm from "@/components/CommentForm"
import CommentList from "@/components/CommentList"


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

      },
    }
  },
   props: {
     review: {
      type: Object,
      required: true,
    }
  },
  methods: {
    callAxiosDetailReview: function (review_pk) {
        axios({
          method: "GET", 
          url: `http://127.0.0.1:8000/community/${review_pk}`,
        })
        .then(res=> {
          this.reviewItem.movie_title = res.data.movie_title
          this.reviewItem.title = res.data.title
          this.reviewItem.content = res.data.content
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
    }
  },
   created() {
    console.log(this.review)
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

</style>