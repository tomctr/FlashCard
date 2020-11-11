<template>
  <v-container>
    <v-list-item
      v-for="question in questionList.questions"
      v-bind:key="question.body"
    >
      {{ question.body }}
    </v-list-item>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark v-bind="attrs" v-on="on" fab>
          <v-icon> mdi-plus </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title> Add new question </v-card-title>
        <v-card-text>
          <v-text-field label="Enter question" v-model="newQuestion" required></v-text-field>
          <v-text-field label="Enter answer" v-model="newAnswer" required></v-text-field>
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
  }),
  methods: {
    saveNewQuestion(){
      instance({
        method: 'post',
        url: '/lesson/addquestion/' + this.$route.params.name,
        data:{
          supplement: [],
          body: this.newQuestion,
          answer: this.newAnswer,
        }
      })

      this.dialog = false;
    }
  },
  mounted() {
    var name = this.$route.params.name;

    instance
      .get("/lesson/getone/" + name)
      .then((res) => {
        this.questionList = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
</style>