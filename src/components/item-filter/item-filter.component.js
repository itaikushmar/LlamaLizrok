export default {
    data() {
        return {
            currCtg: { primaryCtg: 'All', secondaryCtg: 'All' },
            ctgIndex: null,
            toggleView: 'list',
            viewMarker: 'map'
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
        toggleMap() {
            if (this.toggleView === 'list') {
                this.toggleView = 'map';
                this.viewMarker = 'list'
            }
            else {
                this.toggleView = 'list';
                this.viewMarker = 'map'
            }
            this.$store.commit('setItemsView', this.toggleView);
        }
    },
    computed: {
        ctgs() {
            return this.$store.state.ctgs;
        }
    },
    created() {
        this.toggleView = 'list';
        this.$store.commit('setItemsView', this.toggleView);
    }
}