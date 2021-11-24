<template>
  <div>
  

  <CommentListItem
  v-for="comment in comments"
  :key="comment.id"
  :comment="comment"
  @delete="deleteComment"
  />
  </div>
</template>

<script>
import CommentListItem from "@/components/CommentListItem"
import { mapGetters } from 'vuex'

export default {
  name: "CommentList", 
  props: {
    review: {
      type:Object, 
      required: true,
    }
  },
  components: {
    CommentListItem,
  }, 
  methods: {
      setToken() {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    deleteComment() {
      const commentListSet = {
      review_id: this.review.id,
      token: this.setToken()
    }
      this.$store.dispatch('getComments', commentListSet)
    }
  }, 
  filters: {
    reverse: function(value) {
      return value.slice().reverse()
    }
  },
  computed: {
     ...mapGetters([
      'comments'
    ])
  }, 
  created() {  
    const commentListSet = {
      review_id: this.review.id,
      token: this.setToken()
    }
    this.$store.dispatch('getComments', commentListSet)
  }

}

</script>

<style>

</style>