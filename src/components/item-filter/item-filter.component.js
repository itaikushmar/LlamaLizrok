export default {
    data() {
        return {
            currCtg: { primaryCtg: 'all', secondaryCtg: 'all' }
        }
    },
    methods: {
        setFilteredItems() {
            this.$store.commit('setFilter', this.currCtg);
        },
        resetFilter() {
            // ************ why doesn't this work? ************
            // this.currCtg = {primaryCtg: 'all', secondaryCtg: 'all'};
            // this.setFilteredItems();
            this.$store.commit('setFilter', { primaryCtg: 'all', secondaryCtg: 'all' });
        }
    },
    computed: {
        ctgs() {
            return this.$store.state.ctgs;
        }
    }
}