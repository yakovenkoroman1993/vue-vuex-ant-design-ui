export function vuexify(source, stateName, mutationName) {
    return {
        [stateName]: {
            get() {
                return this.$store.state[source][stateName];
            },
            set(value) {
                this.$store.commit(`${source}/${mutationName}`, {
                    [stateName]: value
                })
            }
        },
    };
}