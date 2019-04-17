<template>
    <div class="container">
        {{ user }}
        <!-- <pre>{{ user }}</pre> -->
    </div>
</template>

<script>
export default {
    name: "profil",
    computed: {
        user() {
            return this.$root.$data.user || {};
        } 
    }
};
</script>
