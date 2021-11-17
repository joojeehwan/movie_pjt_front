<template>
  <div>    
    <h1>community</h1>
    <p>create</p>    
    <CommunityHome/>
  </div>
  
</template>

<script>
import CommunityHome from '@/components/CommunityHome'

export default {
  name: 'Index',
  components: {
    CommunityHome,
  },
  data: function () {
    return {
      articles: [],
    }
  },
}
</script>

<style>

</style>