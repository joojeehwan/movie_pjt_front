<template>
  <div>
    <input type="text" style="font-family: 'Noto Sans KR', sans-serif;" class="input-box" placeholder="댓글 내용" v-model="commentItem.content">
    <v-btn 
    class="btn-create mx-2" 
    style="font-family: 'Noto Sans KR', sans-serif;"
     @click="createComment"
    fab
    dark
    color="indigo"
     >
      <v-icon dark>
          mdi-plus
        </v-icon>
     </v-btn>
  </div>
</template>

<script>
export default {
  name: "CommentForm",
   props: {
    review: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      commentItem: {
        content: null,
      }
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
    createComment() {
      const commentItemSet = {
        commentItem: this.commentItem,
        review_id: this.review.id,
        token: this.setToken()
      }
      this.$store.dispatch('createComment', commentItemSet)
      this.commentItem.content = null
    },

}
}
</script>

<style>
.input-box {
  width: 100px;
  border-bottom: solid 1px white;
  margin-right: 20px;
}

</style>