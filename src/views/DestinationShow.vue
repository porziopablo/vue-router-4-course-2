<template>
    <section v-if="destination" class="destination">
        <h1>{{destination.name}}</h1>
        <div class="destination-details">
            <img :src="`/images/${destination.image}`" alt="destination.name">
            <p>{{destination.description}}</p>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            destination: { },
        }
    },
    computed: {
        destinationId() {
            return parseInt(this.$route.params.id);
        },
    },
    methods: {
        async initData() {
            const response = await fetch(`https://travel-dummy-api.netlify.app/${this.$route.params.slug}`);
            this.destination = await response.json();
        },
    },
    async created() {
        this.initData();
        /**
         * Chapter 2 - Lesson 16:
         * 
         * This hook was removed at the end of the lesson, but I wanted to keep using the dummy API for all the data because
         * it's more real than using a JSON.
        */ 

        // Another approach to re-fire the hook when the view changes, instead of adding a key to the router-view in App.vue 
        // this.$watch(() => this.$route.params, this.initData); 
    }
};
</script>