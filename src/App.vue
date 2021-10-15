<template>
  <TheNavigation />
  <div class="container">
    <router-view :key="$route.params.slug" />
    <!-- Another approach to re-fire the hook when the view changes, instead of
    watching from inside the created() hook in DestinationShow.vue -->
  </div>
</template>


<script>
import TheNavigation from '@/components/TheNavigation.vue';

export default {
    components: {
      TheNavigation,
    }
};
</script>
