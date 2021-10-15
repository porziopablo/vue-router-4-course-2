<template>
    <div>
        <h1>Invoices</h1>
    </div>
</template>

<script>
    import { onBeforeRouteLeave } from 'vue-router';

    export default {
        setup() {
            function confirmLeave() {

                return window.confirm('Are you sure you want to leave?');
            } 

            onBeforeRouteLeave(confirmLeave);
        }
    }
</script>
