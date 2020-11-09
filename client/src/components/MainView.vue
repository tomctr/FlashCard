<template>
  <v-container class="mainContainer" fluid>
    <v-list-item
      v-for="lesson in lessonList"
      v-bind:key="lesson.name"
      :to="{ name: 'lesson', params: { name: lesson.name } }"
    >
     {{lesson.name}}
    </v-list-item>
    <v-text-field
      v-show="showInputLesson"
      v-model="newLessonTitle"
      @keydown.enter="confirmAddLesson(newLessonTitle)"
    >
    </v-text-field>
    <v-btn fab v-on:click="addNewLesson">
      <v-icon> mdi-plus </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import Lesson from "../models/lesson.js";
const axios = require('axios').default;

var instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
});




export default {
  name: "MainView",
  data: () => ({
    lessonList: [],
    showInputLesson: false,
    newLessonTitle: "",
    dialog: false,
    dbPwd: "",
  }),
  methods: {
    addNewLesson() {
      this.showInputLesson = true;
    },
    confirmAddLesson(lessonTitle) {
      var lesson = new Lesson(lessonTitle, []);

      instance({
        method: 'post',
        url: '/lesson/create',
        data: {
          name: lesson.title,
          questions: [],
        }
      })

      this.lessonList.push(lesson);
      this.showInputLesson = false;
      this.newLessonTitle = "";
    },
  },
  mounted() {
   instance.get('/lesson/getall')
    .then(res => {
    this.lessonList = res.data;
    })
    .catch(err => {
      console.log(err)
    })
  },
};
</script>

<style scoped>
.mainContainer {
  height: 100%;
}
</style>