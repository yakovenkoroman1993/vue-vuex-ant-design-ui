<template>
    <el-aside width="auto">
        <el-menu
            class="menu"
            :default-active="activeRoute"
            :collapse="isCollapse"
        >
            <el-menu-item
                v-for="{name, iconClassName} in menuItems"
                :key="name"
                :index="name"
                @click="handleNavigate(name)"
            >
                <i :class="iconClassName" />
                <span slot="title">
                    {{$t(`app.menuNavigationItems.${name}`)}}
                </span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
    import {ROUTES} from '../../router/routes';

    export default {
        data() {
            return {
                isCollapse: true,
                menuItems: [{
                    name: ROUTES.HOME,
                    iconClassName: 'el-icon-tickets',
                }, {
                    name: ROUTES.CALENDAR,
                    iconClassName: 'el-icon-date',
                }],
                activeMenuItem: ROUTES.HOME
            };
        },
        computed: {
            activeRoute() {
                return this.$route.name;
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleNavigate(routeName) {
                this.$router.push({
                    name: routeName
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../design/theme/vars";

    .menu {
        height: 100%;

        .is-active {
            color: white;
            background-color: $colorPrimary !important;
            border-bottom-color: $colorPrimary !important;
        }
    }
</style>