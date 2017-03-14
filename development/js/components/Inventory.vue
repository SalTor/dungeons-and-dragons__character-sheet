<template>
    <main role="main">
        <section>
            <div class="section__content section__content_extra-space-above">
                <h1 class="section__header">This is what we've got.</h1>

                <div class="field-wrapper field-wrapper_direction_vertical">
                    <div class="inventory">
                        <div class="inventory__item" v-for="item in user.inventory ">{{ item | item }}</div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    import Vue from "vue"

    export default {
        name: "inventory",
        props: ["user"],
        data() {
            return {}
        },
        created() {
            Vue.filter("item", value => {
                if(typeof value === "string") {
                    return value
                } else {
                    for(let item in value) {
                        if(value.hasOwnProperty(item)) {
                            console.log(item)

                            for(let attr in value[item]) {
                                if(typeof value[item][attr] === "object") {
                                    console.log(`\t${attr}:`)
                                    for(let detail in value[item][attr]) {
                                        console.log(`\t\t${detail}: ${value[item][attr][detail]}`)
                                    }
                                } else {
                                    console.log(`\t${attr}: ${value[item][attr]}`)
                                }
                            }
                        }
                    }
                }
            })
        }
    }
</script>
