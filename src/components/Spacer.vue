<template>
    <div :style="getStyle()" />
</template>

<script>
    export default {
        props: {
            size: {
                type: Number,
                required: true,
            },
            vertical: {
                type: Boolean,
                default: false
            },
            measure: {
                type: String,
                default: 'px'
            }
        },
        methods: {
            getStyle() {
                let {size, vertical, measure} = this;
                if (vertical) {
                    return {
                        height: size + measure
                    };
                }

                return {
                    width: size + measure,
                    display: 'inline-block'
                };
            }
        }
    };
</script>
