<template>
    <el-form :inline="true" class="container">
        <el-form-item v-if="label || !!$slots.default">
            <span>
                <template v-if="label">
                    {{label}}
                </template>
                <slot v-else />
            </span>
        </el-form-item>
        <el-form-item class="hidden-sm-and-down">
            <el-input-number
                controls-position="right"
                :value="value[0]"
                @change="$emit('change', [$event, value[1]])"
                :min="min"
                :max="value[1]"
            />
        </el-form-item>
        <el-form-item>
            <el-slider
                class="slider"
                :value="value"
                :max="max"
                :style="{width}"
                @input="$emit('change', $event)"
                range
            />
        </el-form-item>
        <el-form-item class="hidden-sm-and-down">
            <el-input-number
                controls-position="right"
                :value="value[1]"
                @change="$emit('change', [value[0], $event])"
                :min="value[0]"
            />
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        props: {
            min: {
                type: Number,
                default: 0,
            },
            max: {
                type: Number,
                default: 100,
            },
            value: {
                type: Array,
                required: true,
            },
            width: {
                type: [Number, String],
                default: '200px',
            },
            label: String,
        },
    }
</script>

<style lang="scss" scoped>
    .container {
        display: flex;
        align-items: center;
        & > * {
            margin-bottom: 0;
        }

        .slider {
            margin: 0 20px;
        }
    }
</style>