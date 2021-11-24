<template>
  <div>
   <v-text-field v-model="commentItem.content"></v-text-field>
    <span style="font-family: 'Noto Sans KR', sans-serif;"> 댓글 작성일 : {{ comment.created_at | moment('YYYY-MM-DD HH:mm:ss')}}  </span>
    <span style="font-family: 'Noto Sans KR', sans-serif;"> 댓글 작성자 : {{ comment.created_at | moment('YYYY-MM-DD HH:mm:ss')}}  </span>
    <v-btn class="btn" style="font-family: 'Noto Sans KR', sans-serif;" @click="updateComment"
     color="accent"
      large
      outlined
      rounded
      v-if="getrealUser()===comment.user"
    >댓글 수정</v-btn>
    <v-btn class="btn" style="font-family: 'Noto Sans KR', sans-serif;" @click="deleteComment(comment.id)"
    color="accent"
    large
      outlined
      rounded
      v-if="getrealUser()===comment.user"
    >댓글 삭제</v-btn>
  </div>
</template>

<script>

//import router from '@/router'
const SERVER_URL = 'http://127.0.0.1:8000/'
import axios from 'axios'
import { mapGetters } from 'vuex'


export default {
  name:"CommentListItem", 
    props: {
      comment: {
        type: Object, 
        required: true, 
      }, 
  }, 
    data() {
      return {
        commentItem: {
          content: this.comment.content
        }, 
      }
    }, 
    methods: {
      setToken() {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
      updateComment() {
      const commentItemSet = {
        commentItem: this.commentItem,
        comment_id: this.comment.id,
        token: this.setToken()
      }
      console.log(this.comment.id)
      this.$store.dispatch('updateComment', commentItemSet)
    },
    deleteComment(comment_id) {
      // const commentItemSet = {
      //   comment_id: this.comment.id,
      //   token: this.setToken()
      // }
      // this.$store.dispatch('deleteComment', commentItemSet)
       axios({
        method: 'DELETE',
        url: `${SERVER_URL}community/${comment_id}/comments/detail/`,
        headers: this.setToken()
      })
      .then(res=> {
        this.$emit("delete")
        console.log(res)
      })
      .catch(err => {
        console.log(err.response)
      })
      },  
      getrealUser() {
        return this.getToken.user_id
      }
    }, 
    computed: {
      ...mapGetters([
      'getToken'
    ])
    }, 

}
</script>

<style>

</style>