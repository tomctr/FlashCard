<template>
  <v-container>
    <v-list-item
      v-for="question in questionList.questions"
      v-bind:key="question.body"
    >
      {{ question.body }}
    </v-list-item>
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
  }),
  methods: {},
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