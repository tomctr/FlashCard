<template>
  <v-container class="mainContainer" fluid>
    <v-list-item
      v-for="lesson in lessonList"
      v-bind:key="lesson"
      :to="{ name: 'lesson', params: { name: lesson } }"
    >
     {{lesson}}
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
  baseURL: process.env.VUE_APP_API_URL,
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
      instance({
        method: 'post',
        url: '/lesson/create',
        data: {
          name: lessonTitle,
          questions: [],
        }
      })

      this.lessonList.push(lessonTitle);
      this.showInputLesson = false;
      this.newLessonTitle = "";
    },
  },
  mounted() {
   instance.get('/lesson/getall')
    .then(res => {
    this.lessonList = res.data.map((x) => { return x.name } );
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