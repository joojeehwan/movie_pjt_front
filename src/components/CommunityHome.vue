<template>
<div class="container mb-5">

 <v-row class="review-list-inset">
   
    
     <v-simple-table>
    <thead>
          <tr>
            <th class="text-left" >
              <p>제목</p>
            </th>
            <th class="text-left">
              <p>작성일자</p>
            </th>
            <th class="text-left">
              <p>리뷰제목</p>
            </th>
            <th class="text-left">
              <p>조회수</p>
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

  </v-row>
</div>
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

th p {
  text-align: center;
  font-size: 25px;  
  font-family: 'Noto Sans KR', sans-serif;
}

.v-expansion-panel input, textarea{
  color: white;
}

.review-list-inset {
  padding-top: 2rem;
}
</style>