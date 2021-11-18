<template>
  <div>
    {{review}}
  </div>

</template>

<script>
export default {
name:"CommunityHomeItem",
 components: {

  },
  data() {
    return {
      reviewItem: {
        movie_title: this.review.movie_title,
        title: this.review.title,
        content: this.review.content,
        rank: this.review.rank,
      },
    }
  },
  props: {
    review: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log(this.review)
  }
}


</script>

<style>

</style>