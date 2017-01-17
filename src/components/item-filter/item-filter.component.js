export default {
    data() {
        return {
            currCtg: { primaryCtg: 'All', secondaryCtg: 'All' },
            ctgIndex: null
        }
    },
    methods: {
        setFilteredItems() {
            this.$store.commit('setFilter', this.currCtg);
            switch (this.currCtg.primaryCtg) {
                case 'Electronics':
                    this.ctgIndex = 0;
                    break;
                case 'Furniture':
                    this.ctgIndex = 1;
                    break;
                case 'Clothing':
                    this.ctgIndex = 2;
                    break;
                case 'Art':
                    this.ctgIndex = 3;
                    break;
            }
        },
    },
    computed: {
        ctgs() {
            return this.$store.state.ctgs;
        }
    }
}