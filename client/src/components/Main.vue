<template>
  <div>
    <input v-model="longLink" placeholder="Введите ссылку">
    <button @click="createLink">Создать сокращенную ссылку</button>
    <br>
    <div v-if="linksList.length !== 0">
      <a v-for="(item, index) in linksList" :key="index" href="#" @click="goToLink(item._id)">
        <br>
        http://{{item.shortVersion}}/
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    linksList: [],
    longLink: ""
  }),
  created() {
    //get links by link id
    return axios.get("http://localhost:4000/links/1").then(res => {
      this.linksList = res.data;
    });
  },
  methods: {
    createLink() {
      //generate short link
      const shortLink = Math.random()
        .toString(36)
        .substring(7);

      if (this.longLink === "") return alert("Введите ссылку"); //simple check
      //send request to create link
      return axios
        .post("http://localhost:4000/links", {
          longVersion: this.longLink,
          shortVersion: shortLink
        })
        .then(res => {
          //get response and push it to linkList, without unnecessary query
          this.linksList.push(res.data);
        });
    },
    goToLink(linkId) {
      axios.patch(`http://localhost:4000/links/${linkId}`);//request to update link stats
    }
  }
};
</script>

<style>
</style>
