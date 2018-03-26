<template>
    <div :style="getStyle()" />
</template>

<script>
    export default {
        props: {
            size: {
                type: [Number, String],
                required: true,
            },
            vertical: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            getStyle() {
                let {size, vertical} = this;

                let measure = '';
                if (Number.isInteger(size)) {
                    measure = 'px';
                }

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
