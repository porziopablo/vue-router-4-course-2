<template>
    <div class="login">
       <form class="form" @submit.prevent="login">
           <h1>Login</h1>
           <label for="username">Username</label>
           <input v-model="username" name="username" type="text" class="input">
           <label for="password">Password</label>
           <input v-model="password" name="username" type="text" class="input">
           <button class="btn">Login</button>
       </form> 
    </div>
</template>

<script>
export default {
    data() { 
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        login() {
            /**
             * This is where the real authentication against and API would happen. 
             * However that is not covered by the course, so it's pretended that the user
             * logged in successfully.
            */
            const redirectPath = this.$route.query.redirect || '/protected';
            window.user = this.username;
            this.$router.push(redirectPath);
        }
    }
}
</script>