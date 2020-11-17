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
        <div class="answerDiv" @click="showAnswer">
        <v-card-text v-show="isAnswerShown" >
          {{ card.answer }}
        </v-card-text>
        </div>
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
    isAnswerShown: false,
    correctAnswer: 0,
    totalQuestion: 0,
  }),
  methods: {
    showAnswer() {
      this.isAnswerShown = !this.isAnswerShown
    },
    right() {
      this.correctAnswer += 1;
    },
    left() {
      //to implement
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
        this.totalQuestion = this.cards.length;
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
.answerDiv {
  height: 85%;
}
</style>