<template>
    <div>
        <TopBar/>
        <BottomBar/>
    </div>
</template>

<style>

</style>

<script>
    import BottomBar from "../components/BottomNavigation.vue";
    import TopBar from "../components/TopNavigation.vue"
    export default {
        name: 'bar-ba',
        components: {
            BottomBar,
            TopBar
        }
    }
</script>