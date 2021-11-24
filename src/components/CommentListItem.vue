<template>
  <div>
   <v-text-field v-model="commentItem.content"></v-text-field>
    <span style="font-family: 'Noto Sans KR', sans-serif;"> 댓글 작성일 : {{ comment.created_at | moment('YYYY-MM-DD HH:mm:ss')}}  </span>
    <v-btn class="btn" style="font-family: 'Noto Sans KR', sans-serif;" @click="updateComment"
     color="accent"
      large
      outlined
      rounded
    >댓글 수정</v-btn>
    <v-btn class="btn" style="font-family: 'Noto Sans KR', sans-serif;" @click="deleteComment"
    color="accent"
    large
      outlined
      rounded
    >댓글 삭제</v-btn>
  </div>
</template>

<script>

//import router from '@/router'


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
    deleteComment() {
      const commentItemSet = {
        comment_id: this.comment.id,
        token: this.setToken()
      }
      this.$store.dispatch('deleteComment', commentItemSet)
 
      }
      
    }
  
}
</script>

<style>

</style>