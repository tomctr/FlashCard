<template>
  <v-container class="mainContainer">
    <vue-swing
      @throwoutleft="left"
      @throwoutright="right"
      @throwout="onThrowout"
    >
      <v-card
        v-for="(idx, card) in cards"
        :key="card.title"
        elevation="10"
        outlined
        class="card p-0"
      >
        <v-card-title > {{ card }} </v-card-title>
        <v-card-text> okazpdokazpdokazpodkazpodkazpodkazpodkazpdokazpdokazpdokaz </v-card-text>
      </v-card>
    </vue-swing>
  </v-container>
</template>

<script>
import VueSwing from "vue-swing";
import Lesson from "../models/lesson.js";
const axios = require("axios").default;

var instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export default {
  name: "RevisionView",
  data: () => ({
    cards: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
  }),
  methods: {
    right() {
      console.log("right");
    },
    left() {
      console.log("left");
    },
    onThrowout({ target, throwDirection }) {
        var cardTitle = target.textContent.split(" ")[1];
        var idx = this.cards.findIndex((el) => { el == cardTitle});
        this.cards.splice(idx, 1);
    }
  },
  mounted() {},
  created() {},
};
</script>

<style scoped>
.mainContainer {
  height: 100%;
}
.card {
  position: absolute;
}
</style>