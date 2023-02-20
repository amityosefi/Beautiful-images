<template>
  <div>
    
    <h3 style="text-align: center;">Page {{this.$parent.runs}} / 4</h3>
    <br>
    <!-- <br><br> -->
    <div class="selector">
      <VueSelectImage
        ref="selector"
        :dataImages="this.Images"
        :is-multiple="true"
        :h="height"
        :w="weight"
        :limit="Number(this.$root.store.firstGameImagesSelected)"
        @onselectmultipleimage="onSelectMultipleImage"
        @onreachlimit="onreachlimit"
      >
      </VueSelectImage>

      <br />
      <!-- <div class="d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-outline-danger"
          v-on:click="submit"
        >
          Submit
        </button>
      </div> -->
        <div
          class="d-flex justify-content-center"
          style="margin-bottom: 15px; margin-top: 30px;"
        >
        <a href="#" class="btn btn-white btn-animate" @click="show=true">Instructions</a>
        <a href="#" class="btn btn-white btn-animate" id="butt2" @click="submit">Submit</a> 
        </div>
      <br />
    </div>

  </div>

  <!-- <div class="submitDiv">
      <button class="submitButton" v-on:click="submit">Submit</button>
    </div> -->
  <!-- </div> -->
</template>

<script>
import VueSelectImage from "vue-select-image";
export default {
  name: "FirstGame",
  components: {
    VueSelectImage,
  },
  props: {
    Images: {
      type: Array,
      require: true,
    },
    best: {
      type: Array,
      require: true,
    },
  },

  data() {
    return {
      height: "200px",
      weight: "300px",
      selectedImages: [],
      res: [],
      wins: [],
    };
  },
  methods: {

    onSelectMultipleImage(selectedImages) {
      // console.log(this.Images);
      this.selectedImages = selectedImages;
      return selectedImages;
    },
    resetMultipleSelection() {
      return [];
    },
    onreachlimit() {
      this.$root.toast(
        "warning",
        "got the limit selected images \r You have to choose up to " +
          this.$root.store.firstGameImagesSelected +
          " images.",
        "warning"
      );
    },
    async submit() {
      let app = this.$parent;
      if (
        this.selectedImages.length ==
        Number(this.$root.store.firstGameImagesSelected)
      ) {
        let result = 0;

        for (let i = 0; i < this.selectedImages.length; i++) {
          if (this.best.includes(this.selectedImages[i].id)) {
            result += 1;
            app.goodImages.push(this.selectedImages[i].id);
          }
        }

        this.$refs.selector.resetMultipleSelection(1);

        let wins = app.wins;
        wins.push(result);
        let no_runs = app.runs;
        if (no_runs == 4) {
          let score = wins.reduce((x, y) => x + y);
          this.$root.toast(
            "Score",
            "you scored " +
              score +
              " out of " +
              this.$root.store.firstGameImages,
            "success"
          );
          app.runs = 0;
          app.wins = [];
          try { 
            await this.axios.post(
              this.$root.store.address+"images/submitFirstGame",
              {
                id: this.$root.store.u_id,
                score: score,
                result: app.goodImages,
                allImages: app.allImagesId,
              }
            );
            app.goodImages = [];
            this.$router.push("/SecondGamePage").catch(failure =>
            {
              console.log(failure);
              this.$router.push("/SecondGamePage");
            });

          } catch (err) {
            console.log(err);
          }
        }

        app.shuffleArr(app.allImages.slice(2*app.runs,2*app.runs+2).concat(app.allImages.slice(8*app.runs,8*app.runs+6))) //2,4 - 14,20 app.runs=2
        app.runs++;
        app.key++;
      } else {
        this.$root.toast(
          "warning",
          "Need to choose " + this.$root.store.selectedImages + " pictures",
          "warning"
        );
      }
    },
    
  },
  created() {
  },
};
</script>
<style scoped>
@import "../assets/style.css";
</style>
