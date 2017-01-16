import ItemList from '../item-list'
import ItemFilter from '../item-filter'

export default {
    data() {
        return {
        }
    },
    created() {
        this.$store.dispatch('getItems');
    },
    computed: {
        filterItems() {
            return this.$store.getters.filterItems;
        }
    },
    components: {
        ItemList,
        ItemFilter
    }

}