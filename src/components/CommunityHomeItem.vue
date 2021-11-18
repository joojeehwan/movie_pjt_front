<template>
   <div>
      <v-expansion-panel-header>
   {{review[0].movie_title}}   
   {{review[0].title}}   
   {{review[0].created_at | moment('YYYY-MM-DD HH:mm:ss') }}   
   {{review[0].title}}   
        </v-expansion-panel-header>

    <v-expansion-panel-content>
      영화 : {{ review[0].movie_title }}</v-expansion-panel-content>
    <v-expansion-panel-content>
      <textarea name="reviewContent" cols="30" rows="10" v-model="reviewItem.content" placeholder="내용">
      </textarea>
      </v-expansion-panel-content>
    <v-expansion-panel-content>별점 :
      <v-rating
        v-model="reviewItem.rank"
        color="yellow darken-3"
        background-color="grey darken-1"
        empty-icon="$ratingFull"
        half-increments
        hover
        large
      ></v-rating>
    </v-expansion-panel-content>
  
  
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
  },
}


</script>

<style>

</style>