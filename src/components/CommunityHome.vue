<template>
 <v-row class="review-list-inset">
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
</template>

<script>
import { mapGetters } from 'vuex'
import CommunityHomeItem from '@/components/CommunityHomeItem'

export default {
  name: "CommunityHome", 
  components: {
    CommunityHomeItem
  },
  methods: {
    // getReivews: function() {
    //   axios({
    //     method: 'get',
    //     url: 'http://127.0.0.1:8000/community/',
    //   })
    //     .then(res => {
    //       console.log(res)
    //       this.reviews = res.data
    //     })
    //     .catch(err =>{
    //       console.log(err)
    //     })
    // },
    setToken: function () {
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
    //this.getReivews()
    
    this.$store.dispatch('getReviews', this.setToken())
    //console.log(this.setToken())
  }
}

</script>

<style>

</style>