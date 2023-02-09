<template>
  <div id="app"><todo-main></todo-main></div>
</template>

<script>
import TodoMain from "./components/TodoMain.vue";
export default {
  components: {TodoMain},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@900&family=Noto+Sans+KR:wght@100;400&display=swap");
/* reset */
* {
  margin: 0;
  padding: 0;
}
html {
  font-size: 16px;
}
body {
  font-family: "Noto Sans KR", sans-serif;
}
li {
  list-style: none;
}
a {
  text-decoration-line: none;
  color: black;
}
input,
button,
a {
  outline: none;
}
</style>
