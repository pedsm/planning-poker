<template>
    <div>
        <div class="hand">
            <div class="bt" @click="pickUp">Pick up card</div>
            <div class="bt" @click="flipCard">
                <template v-if="true || me.hidden">
                    Show
                </template>
                <template v-else>
                    Hide
                </template>
                card
            </div>
        </div>
        <div class="hand">
            <Card v-for="(card, index) in $store.getters.deck"
                v-bind:key="index"
                v-bind:value="card"
                v-bind:active="index != me.card"
                @click.native="pickCard(index)"
            ></Card>
        </div>
    </div>
</template>
<script>
import Card from './Card';

export default {
    name: 'Hand',
    components: {
        Card,
    },
    computed: {
        me() {
            return this.$store.getters.members
                .find(mem => mem.id == this.$socket.id)
        },
    },
    methods: {
        pickCard(index) {
            this.$socket.emit('pickCard', index)
        },
        pickUp() {
            this.$socket.emit('pickCard', null)
        },
        flipCard() {
            this.$socket.emit('flipCard')
        },
    }
}
</script>
<style scoped>
.hand {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    transition-duration: 1s;
}
.grow:hover {
    transition-duration: 0.1s;
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.75);
    transform: scale(1.1) translate(0,-10px);
}
.active {
    background-color: steelblue;
    color:white;
}

</style>