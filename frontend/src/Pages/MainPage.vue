<template>
  <div>
    <!-- 5 possible cases:
  1. didnt finish rating
  2. didnt played today and can rate
  3. didnt played today and can not rate because already rate 126 images
  4. played today and can rate
  5. played today and can not rate because already rate 126 images

  rankImages = 72
  numRanked = user ranks
   -->

    <!-- case 1 -->

    <div v-if="!this.$root.store.is_submitted">
      <p class="parr">
        <b>Hello {{ this.$root.store.fullname }}</b>
      <br>
        <br />
        To participate in the game you must first complete the grading of the
        pictures.
        <br />
        Please choose "Continue Ratings"
      <br><br>
      <a href="#" class="btn btn-white btn-animate" @click="rate"
        >Continue Ratings</a
      >
      </p>
    </div>

    <!-- case 2 -->
    <div
      v-if="
        !this.is_done && this.submitted &&
          (this.last_date != 'never' ||
          this.now != this.$root.store.last_time)
      "
    >
      <div class="parr" >
        <br>
        <b>Hello {{ this.$root.store.fullname }}</b>
        <br />
        <br>
        <div v-if="this.last_date == 'never'">You didnt play today</div>
        <div v-else>Your last time you played was {{ this.last_date }}</div>
        Until now you earned: {{ this.$root.store.user_score }} points
             <br />
      <br />
        To start the game please choose Take me to the game!
      <br /><br>
      <a
        href="#"
        class="btn btn-white btn-animate"
        @click="firstGame"
        >Take me to the game!</a
      >
      </div>
      <br>
      <p class="parr">To rate additional images please choose Continue Ratings
        <br /><br>
      <a href="#" class="btn btn-white btn-animate" @click="rate"
        >Continue Rating</a
      >
      </p>
    </div>

    <!-- case 3 -->
    <div
      v-if="
        this.is_done &&
          (this.last_date != 'never' ||
          this.now != this.$root.store.last_time)
      "
    >
      <div class="parr">
        <br>
        <b>Hello {{ this.$root.store.fullname }}</b>
        <br />
        <br>
        <div v-if="this.last_date == 'never'">You didnt play today,</div>
        <div v-else>The last time you played the game was {{ this.last_date }}</div>
        <br />
        Your current score is {{ this.$root.store.user_score }} points
      <br />
        To start the game please choose Take me to the game!
        <br><br>
      <a
        href="#"
        class="btn btn-white btn-animate"
        @click="firstGame"
        >Take me to the game!</a
      >
      </div>
    </div>

    <!-- case 4 -->
    <div
      v-if="this.$root.store.is_submitted && !this.$root.store.is_done && this.now == this.$root.store.last_time"
    >
      <p class="parr">
        <b>Hello {{ this.$root.store.fullname }}</b>
        <br>
        <br />
        According to our records you have already played today, and according to
        the rules of the game you can only play again tomorrow.
        <br />
        However, you can continue to rate photos. To do this, please select
        Continue Ratings.
      
      <br /><br />
      <a href="#" class="btn btn-white btn-animate" @click="rate"
        >Continue Rating</a
      >
      </p>
    </div>

    <!-- case 5 -->
    <div
      v-if="
        this.is_done &&
          this.$root.store.last_time &&
          this.now == this.$root.store.last_time
      "
    >
      <p class="parr">
        <b>Hello {{ this.$root.store.fullname }}</b>
        <br>
        <br />
        Until now you earned: {{ this.$root.store.user_score }} points
        <br />
        According to our records you have already played today, 
        <br>and according to
        the rules of the game you can only play once on any given day. 
        <br>
        See you!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",

  data() {
    return {
      now:
        new Date().getDate() +
        "-" +
        String(Number(new Date().getMonth()) + 1) +
        "-" +
        new Date().getFullYear(),
      submitted: true,
      is_done: true,
      last_date: "never"
    };
  },
  methods: {
    rate() {
          console.log("hello");
          this.$router.push("RatePage").catch(failure =>
            {
              console.log(failure);
              this.$router.push("RatePage");
            });

      
      
    },
    firstGame() {
        this.$router.push("FirstGamePage").catch(failure =>
            {
              console.log(failure);
              this.$router.push("FirstGamePage");
            });
      
    },
  },
  created() {
    // console.log("is_submitted? ", this.$root.store.is_submitted);
    // console.log("is_done? ", this.$root.store.is_done);
    // console.log("is_submitted? ", Boolean(this.$root.store.is_submitted));
    // console.log("is_done? ", Boolean(this.$root.store.is_done));
    
    if (Boolean(this.$root.store.is_submitted) == false) {
        this.submitted = false;
    }
    // console.log("this.submitted ", this.submitted);

    if (Boolean(this.$root.store.is_done) == false) {
      this.is_done = false;
    }
        // console.log("this.is_done ", this.is_done);

    if (!this.$root.store.last_time){
      this.last_date = "never";
    }
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
  margin-top: 5px;
  /* padding-right: 25%; */
}
/* #butt5 {
  margin-left: 43%;
} */
</style>
