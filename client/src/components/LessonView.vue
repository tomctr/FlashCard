<template>
  <v-container>
    <v-list-item
      v-for="(question, index) in questionList"
      v-bind:key="question.body"
      v-on:click="showQuestionDetails(index)"
    >
      {{ question.body }}
    </v-list-item>

    <v-dialog v-model="dialogQuestionDetails" v-if="questionIsSelect">
      <v-card>
        <v-card-title> Question Details </v-card-title>
        <v-card-text>
          <v-text-field
            outlined
            v-model="selectedQuestion.body"
            label="Question"
          >
          </v-text-field>
          <v-text-field
            outlined
            v-model="selectedQuestion.answer"
            label="Answer"
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn v-on:click="updateQuestion"> Save </v-btn>
          <v-btn v-on:click="deleteQuestion" color="error"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark v-bind="attrs" v-on="on" fab>
          <v-icon> mdi-plus </v-icon>
        </v-btn>
        <v-btn to="/">
          Back to lesson
        </v-btn>
      </template>
      <v-card>
        <v-card-title> Add new question </v-card-title>
        <v-card-text>
          <v-text-field
            label="Enter question"
            v-model="newQuestion"
            required
          ></v-text-field>
          <v-text-field
            label="Enter answer"
            v-model="newAnswer"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn v-on:click="saveNewQuestion"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
const axios = require("axios").default;
var instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export default {
  name: "LessonView",
  data: () => ({
    questionList: [],
    showInputQuestion: false,
    newQuestionTitle: "",
    dialog: false,
    newQuestion: "",
    newAnswer: "",
    dialogQuestionDetails: false,
    selectedQuestionIdx: -1,
    selectedQuestion: {},
    questionIsSelect: false,
    questionUpdateMode: false,
  }),
  methods: {
    saveNewQuestion() {
      instance({
        method: "post",
        url: "/lesson/addquestion/" + this.$route.params.name,
        data: {
          supplement: [],
          body: this.newQuestion,
          answer: this.newAnswer,
        },
      });

      this.questionList.push({
        supplement: [],
        body: this.newQuestion,
        answer: this.newAnswer,
      });

      this.newQuestion = "";
      this.newAnswer = "";
      this.dialog = false;
    },
    showQuestionDetails(index) {
      this.questionIsSelect = true;
      this.selectedQuestionIdx = index;
      instance
        .get("/lesson/getquestion/" + this.$route.params.name + "/" + index)
        .then((res) => {
          this.selectedQuestion = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialogQuestionDetails = true;
    },
    updateQuestion() {
      instance({
        method: "post",
        url:
          "/lesson/updatequestion/" +
          this.$route.params.name +
          "/" +
          this.selectedQuestionIdx,
        data: {
          body: this.selectedQuestion.body,
          answer: this.selectedQuestion.answer,
          supplement: [],
        },
      });

      this.questionList.splice(this.selectedQuestionIdx, 1, {
        body: this.selectedQuestion.body,
        answer: this.selectedQuestion.answer,
        supplement: [],
      });
      this.dialogQuestionDetails = false;
    },
    deleteQuestion() {
      instance({
        method: "post",
        url:
          "/lesson/deletequestion/" +
          this.$route.params.name +
          "/" +
          this.selectedQuestionIdx,
      });

      this.questionList.splice(this.selectedQuestionIdx, 1);
      this.dialogQuestionDetails = false;
    }
  },
  mounted() {
    var name = this.$route.params.name;

    instance
      .get("/lesson/getone/" + name)
      .then((res) => {
        this.questionList = res.data.questions;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
</style>