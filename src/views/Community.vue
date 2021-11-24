<template>
  <div class="community">
    <header>
      <h2 class="text-white fw-bold fst-italic text-center fs-2">#Community Board</h2>
    </header>
    <CommunityForm class="CommunityForm" data-app/>
    <CommunityHome calss="CommunityHome"/>
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

.CommunityForm {
  margin-top: 30px;
}

</style>