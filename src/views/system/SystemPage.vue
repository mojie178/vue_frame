<template>
    <div class="systemPage">
        <table-check
            :list="navList"
            :fatherRouter="{name: '系统管理', path: '/system'}" />
        <router-view />
    </div>
</template>

<script>
import TableCheck from '@/components/TableCheck'
export default {
    name: 'systemPage',
    data() {
        return {
            navList: [
                {id: '1-1', name: '用户管理', path: '/system/user'},
                {id: '1-2', name: '角色管理', path: '/system/post'},
            ]
        }
    },
    components: {
        TableCheck
    }
}
</script>