<template>
    <div class="platformPage">
        <table-check
            :list="navList"
            :fatherRouter="{name: '平台管理', path: '/platform'}" />
        <router-view />
    </div>
</template>

<script>
import TableCheck from '@/components/TableCheck'
export default {
    name: 'platformPage',
    data() {
        return {
            navList: [
                {id: '2-1', name: '平台设置', path: '/platform/set'},
            ]
        }
    },
    components: {
        TableCheck
    }
}
</script>