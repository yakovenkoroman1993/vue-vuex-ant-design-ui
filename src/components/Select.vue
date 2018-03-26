<template>
    <el-select
        :size="size"
        :value="value"
        @change="$emit('change', $event)"
        :placeholder="placeholder"
        :clearable="clearable"
    >
        <el-option
            v-for="option in options"
            :key="option"
            :label="labelsLocale ? $t(`${labelsLocale}.${option}`) : option"
            :value="option"
        />
    </el-select>
</template>

<script>
    export default {
        props: {
            options: {
                type: Array,
                required: true,
            },
            labelsLocale: String,
            size: {
                type: String,
                default: 'small'
            },
            value: {
                type: [String, Number],
                default: null
            },
            placeholder: String,
            clearable: {
                type: Boolean,
                default: false,
            }
        },
    }
</script>