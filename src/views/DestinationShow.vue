<template>
    <div v-if="destination.name">
        <section class="destination">
            <h1>{{destination.name}}</h1>
            <GoBack />
            <div class="destination-details">
                <img :src="`/images/${destination.image}`" alt="destination.name">
                <p>{{destination.description}}</p>
            </div>
        </section>
        <section class="experiences">
            <h2>Top Experiences in {{ destination.name }}</h2>
            <div class="cards">
                <AppLink
                    v-for="experience in destination.experiences"
                    :key="experience.slug"
                    :to="{name: 'experience.show', params: { experienceSlug: experience.slug }}"
                >
                    <ExperienceCard :experience="experience" />
                </AppLink>
            </div>
            <router-view />
        </section>
    </div>
</template>

<script>
import ExperienceCard from '@/components/ExperienceCard.vue';
import GoBack from '@/components/GoBack.vue';

export default {
    components: {
        ExperienceCard,
        GoBack,
    },
    props: {
        id: { type: Number, required: true },
        slug: { type: String, default: '' },
        experienceSlug: { type: String, default: '' },
    },
    data() {
        return {
            destination: { },
        }
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