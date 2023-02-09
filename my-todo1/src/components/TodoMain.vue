<template>
  <div class="page">
    <header><h1>Vue Fire todo1</h1></header>
    <main>
      <div class="todos">
        <transition name="fade">
          <div class="write add" v-if="writeState === 'add'" key="add">
            <!-- 등록 -->
            <input
              ref="writeArea"
              type="text"
              v-model="addItemText"
              @keyup.enter="addItem"
            />
            <button class="btn add" @click="addItem">Add</button>
          </div>
          <!-- 수정 -->
          <div v-else class="write edit" key="edit">
            <input
              ref="writeArea"
              type="text"
              v-model="editItemText"
              @keyup.enter="editSave"
            />
            <button class="btn add" @click="editSave">Save</button>
          </div>
        </transition>
        <ul class="list" ref="list">
          <li v-for="(todo, i) in todos" :key="i">
            <i
              @click="checkItem(i)"
              :class="[
                {far: todo.state === 'yet', fas: todo.state === 'done'},
                'fa-check-square',
              ]"
            ></i>
            <span>
              {{ todo.text }}
              <b>
                <a href="" @click.prevent="editShow(i)">Edit</a>
                <a href="" @click.prevent="delItem(i)">Del</a>
              </b>
            </span>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addItemText: "",
      crrEditItem: "",
      writeState: "add",
      editItemText: "",
      todos: [
        {text: "공부하기", state: "yet"},
        {text: "운동하기", state: "done"},
        {text: "글쓰기", state: "done"},
      ],
    };
  },

  methods: {
    addItem() {
      if (this.addItemText === "") {
        return;
      }
      this.todos.push({
        text: this.addItemText,
        state: "yet",
      });
      this.addItemText = "";
    },
    checkItem(index) {
      let state = this.todos[index].state;
      if (state === "yet") {
        this.todos[index].state = "done";
      } else {
        this.todos[index].state = "yet";
      }
    },
    editShow(index) {
      this.$refs.writeArea.focus();
      this.crrEditItem = index;
      this.writeState = "edit";
      this.editItemText = this.todos[index].text;
      this.$refs.list.children[index].classList.add("editing");
    },
    editSave() {
      this.$refs.list.children[this.crrEditItem].classList.remove("editing");

      this.todos[this.crrEditItem].text = this.editItemText;
      this.writeState = "add";
    },
    delItem(index) {
      this.todos.splice(index, 1);
    },
  },
  mounted() {
    this.$refs.writeArea.focus();
  },
};
</script>

<style></style>
