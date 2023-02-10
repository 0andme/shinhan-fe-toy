<template>
  <ul class="list">
    <li v-for="item in listDate" :key="item.id">
      <b>{{ item.time_ago }}</b>
      <!-- 현재 route.name이 news일 때 -->

      <template v-if="$route.name === 'news'">
        <span>
          by
          <router-link :to="`/user/${item.user}`">{{ item.user }}</router-link>
        </span>
        <br />
        <a :href="item.url">{{ item.title }} </a>
        <router-link :to="`item?id=${item.id}`"
          ><i> ({{ item.comments_count }})</i></router-link
        >
      </template>
      <!-- ask 일 때 -->
      <template v-else-if="$route.name === 'ask'">
        <span>
          by
          <router-link :to="`/user/${item.user}`">
            {{ item.user }}
          </router-link> </span
        ><br />
        <router-link :to="item.url"
          >{{ item.title }}<i>({{ item.comments_count }})</i></router-link
        >
      </template>
      <!-- 현재 route.name이 new,ask가 아닐 때 -->
      <template v-else>
        <span> by {{ item.user }}</span>
        <br />
        <a :href="item.url">{{ item.title }} </a>
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["listDate"],
};
</script>

<style></style>
