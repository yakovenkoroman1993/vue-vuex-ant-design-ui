<template>
    <el-aside width="auto">
        <el-menu
            class="menu"
            :default-active="activeRoute"
            :collapse="isCollapse"
            text-color="white"
            active-text-color="white"
        >
            <el-menu-item
                class="menu-item"
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
        <el-row
            type="flex"
            justify="center"
            align="middle"
            class="expander"
            @click.native="isCollapse = !isCollapse"
        >
            <i v-if="isCollapse" class="el-icon-arrow-right" />
            <i v-else class="el-icon-arrow-left" />
        </el-row>
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
                activeMenuItem: ROUTES.HOME,
            };
        },
        computed: {
            activeRoute() {
                return this.$route.name;
            }
        },
        methods: {
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
    $heightExpander: 56px;

    .menu {
        background-color: $colorAppNav;
        height: calc(100% - #{$heightExpander});
        border: 0;

        .menu-item:hover {
            background-color: $colorAppNavHover !important;
        }
        .is-active {
            color: white;
            background-color: $colorAppNavActive !important;
        }
    }

    .expander {
        height: $heightExpander;
        background-color: $colorAppNav;
        cursor: pointer;
        i {
            color: white;
        }
        &:hover {
            background-color: $colorAppNavHover !important;
        }
    }

    .menu:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>
