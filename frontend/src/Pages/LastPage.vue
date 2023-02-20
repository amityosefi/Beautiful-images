<template>
  <div>
    <p class="parr">
      <br>
      <b><div style="font-size: 18px;">Hello {{ this.$root.store.fullname }}! </div></b>
      <br />
      <br>
      Game Over! You earned {{this.$root.store.today_score}} points out of {{4*this.$root.store.firstGameImagesSelected}} today. See you tomorrow!
      <br />
      In total, now you have {{ this.$root.store.user_score }} points.

      </p>
    <br />
  </div>
</template>

<script>
export default {
  name: "LastPage",

  data() {
    return {
      now:
        new Date().getDate() +
        "-" +
        String(Number(new Date().getMonth()) + 1) +
        "-" +
        new Date().getFullYear(),
    };
  },
  methods: {
    contactPage() {
      this.$router.push("RatePage").catch(failure =>
            {
              console.log(failure);
              this.$router.push("RatePage");
            });

    },
  },
};
</script>

<style>
@import "../assets/style.css";

.parr {
  font-family: sans-serif;
  padding-top: 1%;
  color: black;
  font-size: 2.5ch;
  text-align: center;
  /* padding-right: 25%; */
}
#butt5 {
  margin-left: 40%;
}
</style>
