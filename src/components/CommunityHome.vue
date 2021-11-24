<template>
<div class="container">

 <v-row class="review-list-inset">
   
    
     <v-simple-table>
    <thead>
          <tr>
            <th class="text-left">
              제목
            </th>
            <th class="text-left">
              작성일자
            </th>
            <th class="text-left">
              리뷰제목
            </th>
            <th class="text-left">
              조회수
            </th>
          </tr>
      </thead>
      </v-simple-table>
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
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="4"
        circle
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
  </v-row>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommunityHomeItem from '@/components/CommunityHomeItem'

export default {
  name: "CommunityHome", 
  data() {
    return {
      page:1, 
    }
  },
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

.v-expansion-panel input, textarea{
  color: white;
}

.review-list-inset {
  padding-top: 2rem;
}
</style>