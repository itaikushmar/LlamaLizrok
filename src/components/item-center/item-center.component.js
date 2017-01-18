import ItemList from '../item-list'
import ItemFilter from '../item-filter'
import GoogleMapsLoader from 'google-maps'
GoogleMapsLoader.KEY = 'AIzaSyCc7ltRRQHGvEF7OwlrhRMR1QtXrNH9cZc';
import MapView from '../map-view';

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
        ItemFilter,
        MapView
    }

}