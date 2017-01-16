export default {
    data() {
        return {
            currCtg: {primaryCtg: 'all', secondaryCtg: 'all'}
        }
    },
    methods: {
        setFilteredItems() {
            this.$store.commit('setFilter', this.currCtg);
        },
        resetFilter() {
            this.currCtg = {primaryCtg: 'all', secondaryCtg: 'all'};
            this.setFilteredItems();
        }
    },
    computed: {
        ctgs() {
            return this.$store.state.ctgs;
        },
    }
}