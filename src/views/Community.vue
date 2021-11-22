<template>
  <div class="community">
    <header>
      <h2>리뷰 게시판</h2>
    </header>
    <CommunityForm data-app/>
    <CommunityHome/>
  </div>
  
</template>

<script>
import CommunityHome from '@/components/CommunityHome'
import CommunityForm from "@/components/CommunityForm"

export default {
  name: 'Community',
  components: {
    CommunityHome,
    CommunityForm,
  },
}
</script>

<style>

</style>