<template>
  <button @click="confirmInput">Confirm</button>
  <router-view></router-view>
  <ul>
    <teams-item
      v-for="team in teams"
      :key="team.id"
      :id="team.id"
      :name="team.name"
      :member-count="team.members.length"
    ></teams-item>
  </ul>
</template>

<script>
import TeamsItem from '../teams/TeamsItem.vue';

export default {
  components: {
    TeamsItem,
  },
  inject: ['teams'],
  methods: {
    confirmInput() {
      // do something
      // At the end link programatically - trigger it from inside the javascript code
      this.$router.push("/users");
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 40rem;
  padding: 0;
}
</style>