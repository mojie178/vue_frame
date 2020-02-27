<template>
    <div class="mainPage">
        <header-box />
        <router-view />
    </div>
</template>

<script>
import HeaderBox from '@/components/HeaderBox'
export default {
    name: 'mainPage',
    data() {
        return {}
    },
    components: {
        HeaderBox
    },
}
</script>
