<template>
  <v-container class="mainContainer">
    <vue-swing
      @throwoutleft="left"
      @throwoutright="right"
      @throwout="onThrowout"
      class="vswing"
    >
      <v-card
        v-for="card in cards"
        :key="card.title"
        elevation="10"
        outlined
        class="card"
        max-height="500"
        max-width="300"
        height="500"
        width="300"
      >
        <v-card-title> {{ card.body }} </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          {{ card.answer }}
        </v-card-text>
      </v-card>
    </vue-swing>
    <v-btn to="/"> Back to lesson </v-btn>
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
    cards: [],
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
      var idx = this.cards.findIndex((el) => {
        el == cardTitle;
      });
      this.cards.splice(idx, 1);
    },
  },
  mounted() {
    this.actualLesson = this.$route.params.name;

    instance
      .get("/lesson/getone/" + this.actualLesson)
      .then((res) => {
        this.cards = res.data.questions;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  created() {},
};
</script>

<style scoped>
.mainContainer {
  height: 100%;
  position: relative;
}
.card {
  position: absolute;
  top: 20%;
  left: 10%;
}

</style>