<template>
    <div class="container">
        {{ user }}
        <!-- <pre>{{ user }}</pre> -->
    </div>
</template>

<script>
//import store from "../store";
export default {
    name: "profile",
    computed: {
        user() {
            return this.$store.state.user || {};
            // return store.state.user || {};
            // return this.$root.$data.user || {};
        } 
    }
};
</script>
