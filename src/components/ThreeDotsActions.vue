<template>
    <el-dropdown
        trigger="click"
        class="dropdown"
        @visible-change="open = !open"
    >
        <el-button
            v-if="open"
            icon="el-icon-more-outline"
            class="active"
            round
        />
        <el-button
            v-else
            type="text"
            icon="el-icon-more"
        />
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
                v-for="option in options"
                :key="option"
                @click.native="$emit('select', option)"

            >
                {{labelsLocale ? $t(`${labelsLocale}.${option}`) : option}}
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    export default {
        props: {
            options: {
                type: Array,
                default: () => []
            },
            labelsLocale: String
        },
        data() {
            return {
                open: false,
            };
        },
    }
</script>

<style lang="scss" scoped>
    @import "../design/vars";

    .dropdown {
        button {
            color: $colorTextRegular;
            font-size: $fontSizeBase;
            padding: 5px;
            &.active:focus {
                background-color: $colorPrimary;
                color: white;
            }
        }
    }
</style>