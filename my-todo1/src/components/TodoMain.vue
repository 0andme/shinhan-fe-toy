<template>
  <div class="page">
    <header>
      <h1>
        Vue Fire todo1
        <span class="pie">
          <svg viewBox="0 0 64 64">
            <circle
              class="pie"
              r="32"
              cx="32"
              cy="32"
              style="stroke-width: 64"
            ></circle>
            <circle
              class="slice"
              r="32"
              cx="32"
              cy="32"
              :style="{
                strokeWidth: 64,
                strokeDasharray: totalTodo + ', 201',
                transition: 'all 0.3s linear',
              }"
            ></circle>
          </svg>
        </span>
      </h1>
    </header>
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
            <!-- 체크 아이콘 -->
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
import {db} from "../firebase/db.js";
export default {
  data() {
    return {
      addItemText: "",
      crrEditItem: "",
      writeState: "add",
      editItemText: "",
      todos: [],
    };
  },

  methods: {
    addItem() {
      if (this.addItemText === "") {
        return;
      }

      db.collection("todos")
        .add({
          text: this.addItemText,
          state: "yet",
          createdAt: new Date(),
        })
        .then((sn) => {
          db.collection("todos").doc(sn.id).update({id: sn.id});
          // this.todos.push({
          //   id: sn.id,
          //   text: this.addItemText,
          //   state: "yet",
          // });
          this.addItemText = "";
        });
    },
    checkItem(index) {
      let state = this.todos[index].state;
      if (state === "yet") {
        // this.todos[index].state = "done";
        db.collection("todos")
          .doc(this.todos[index].id)
          .update({state: "done"});
      } else {
        // this.todos[index].state = "yet";
        db.collection("todos").doc(this.todos[index].id).update({state: "yet"});
      }
    },
    editShow(index) {
      this.crrEditItem = index;
      this.writeState = "edit";
      this.editItemText = this.todos[index].text;
      this.$refs.list.children[index].classList.add("editing");
      this.$refs.writeArea.focus();
    },
    editSave() {
      this.writeState = "add";

      db.collection("todos")
        .doc(this.todos[this.crrEditItem].id)
        .update({text: this.editItemText});

      // this.todos[this.crrEditItem].text = this.editItemText;
      this.$refs.list.children[this.crrEditItem].classList.remove("editing");
    },
    delItem(index) {
      db.collection("todos").doc(this.todos[index].id).delete();
      // this.todos.splice(index, 1);
    },
  },
  mounted() {
    this.$refs.writeArea.focus();
    //   db.collection("todos")
    //     .get()
    //     .then((result) => {
    //       result.forEach((doc) => {
    //         this.todos.push(doc.data());
    //       });
    //     });
  },
  computed: {
    totalTodo() {
      let doneNum = 0;
      this.todos.forEach((item) => {
        if (item.state === "done") doneNum++;
      });
      return (doneNum / this.todos.length) * 201;
    },
  },
  firestore: {
    todos: db.collection("todos").orderBy("createdAt", "desc"),
  },
};
</script>

<style></style>
