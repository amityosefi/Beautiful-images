<template>
  <div class="mainDiv">
      <div class="title">
      Leave here a review for the webmasters
    </div>
    <br>
    <div class="text">
      <b-form-textarea
        id="textarea"
        v-model="text"
        placeholder="Write something..."
        rows="4"
        max-rows="6"
      ></b-form-textarea>
    </div>
    <div
      class="d-flex justify-content-center"
      style="margin-bottom: 15px; margin-top: 30px;"
    >
      <a href="#" class="btn btn-white btn-animate" @click="submit"
        >Submit</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewPage",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    async submit() {
      if(!this.text){
        this.$root.toast("Warning", "You must write something before submit", "warning");
      }
      else{
          try {
            const response = await this.axios.post(this.$root.store.address+"admin/review", {
            text: this.text,
            });
            console.log(response);
            if(response.status == 200){
                this.$root.toast("Review", "Thank you for the review", "success");
                this.text = "";
            }
            else{
                this.$root.toast("Error", "There was a problem", "error");
            }
            this.$router.push("MainPage").catch(failure =>
            {
              console.log(failure);
              this.$router.push("MainPage");
            });
          }
        catch(err){
            console.log(err)
        }
      }
    },
  },
};
</script>
<style>
@import "../assets/style.css";
.mainDiv {
  margin: 10%;
  text-align: center;
}

.text{
    text-align: center;
        /* width: 30%; */
}

 .title {
   margin: 0 auto;
   font-family: Georgia, serif;
  font-weight: 800;
  font-size: 2.3vw;
  color: #15555a;
 }

</style>
