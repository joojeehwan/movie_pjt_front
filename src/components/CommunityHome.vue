<template>
<div>
  <h1>리뷰 게시판</h1>
  <v-row>
    <v-expansion-panels inset dark>
      <v-expansion-panel
        v-for="(review, idx) in reviews"
        :key="idx"
      >
      <CommunityHomeItem
        :review="review"
      />
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommunityHomeItem from '@/components/CommunityHomeItem'

export default {
  name: "CommunityHomeItem", 
  components: {
    CommunityHomeItem
  },
  methods: {
      setToken() {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    }
  },
    computed: {
    ...mapGetters([
      'reviews'
    ])
  },
  created() {
    this.$store.dispatch('getReviews', this.setToken())
  }
}

</script>

<style>

</style>