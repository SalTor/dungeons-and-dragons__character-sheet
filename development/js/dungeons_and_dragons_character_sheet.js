let dungeons_and_dragons__character_sheet = new Vue({
    el: '#dungeons_and_dragons__character_sheet',
    mounted() {
        this.fetch_user_data()

        Vue.filter('capitalize', string => string.charAt(0).toUpperCase() + string.slice(1))
        Vue.filter('lowercase',  string => string.toLowerCase())
        Vue.filter('oxford_comma', array => {
            let string = ""

            array.map(item => string += `${array[0] === item ? `${item}` : array[array.length - 1] === item ? `, and ${item}` : `, ${item}`}`)

            return string
        })
    },
    data: {
        loading: true,
        view__introduction: false,
        message__introduction_1: "Broadly speaking, this is the front-end of a service to manage Dungeons and Dragons character sheets.",
        message__introduction_2: "<strong>More specifically,</strong> this is the front-end of a service to manage Dungeons and Dragons character information. This includes, but will not be limited to:",
        message__introduction_2_list: [ "Stats", "Name", "Alignment", "Inventory", "Experience", "Saving throws" ],
        character: []
    },
    methods: {
        fetch_user_data() {
            fetch(`../data/character_sheet__player_name.json`)
                .then(response => response.json())
                .then(data => {
                    this.character = data[0]

                    this.loading = false
                })
        }
    }
})
