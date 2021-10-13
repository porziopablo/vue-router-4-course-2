<template>
    <div class="home">
        <h1>All Destinations</h1>
        <div v-if="destinations.length > 0" class="destinations">
            <router-link
                v-for="destination in destinations"
                :key="destination.id"
                :to="{ name: 'destination.show', params: { id: destination.id, slug: destination.slug } }"
            >
                <h2>{{destination.name}}</h2>
                <img :src="`/images/${destination.image}`" :alt="destination.name">
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                destinations: [],
            }
        },
        /**
         * Chapter 2 - Lesson 16:
         * 
         * This hook isn't part of the lesson, but I wanted to use the dummy API for all the data because
         * it's more real than using a JSON. Since there is no endpoint to get all the data at once, I had
         * to manually fetch the data for each country. It's not ideal, but it's the only workaround.
         */
        async created() {
            const destinations = [];
            const countries = ['brazil', 'hawaii', 'panama', 'jamaica'];

            for (let country of countries) {
                const countryData = await fetch(`https://travel-dummy-api.netlify.app/${country}`);
                destinations.push(await countryData.json())
            }
            
            this.destinations = destinations;
        }
    };
</script>