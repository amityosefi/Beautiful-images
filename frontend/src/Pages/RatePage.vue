<template>
  <div>
    <Modal @my-event="uploadExtra" ref="modal" :Text="this.text"> </Modal>
<!-- <div class= "div">
    <h1 class="header">Instructions</h1>
    <p class="content" style="font-weight: bold; font-size: 20px; margin-bottom: 0px;">{{this.text}}</p>
</div>  -->

    <br />
    <div>
      <div v-if="this.isLoading">
        <div class="load">Loading ... please wait</div>
        <div
          style="
            margin-top: 2%;
            position: absolute;
            left: 51%;
            margin-left: -51px;
          "
        >
          <b-spinner
            variant="danger"
            style="width: 4rem; height: 4rem"
            label="Large Spinner"
          ></b-spinner>
        </div>
      </div>
      <div v-else>
        <!-- <b-button variant="outline-secondary" class="but" @click="show=true">Instructions</b-button> -->
        <div v-if="!this.$root.store.is_done" class="secondery">
          <binning ref="bins" :Bins="this.Bins" :Images="this.Images"></binning>
          <div
            class="d-flex justify-content-center"
            style="margin-bottom: 5px; margin-top: 5px"
          >
            <a
              href="#"
              class="btn btn-white btn-animate"
              id="butt1"
              @click.prevent="showModal('mymodalA')"
              >Instructions</a
            >
            <a
              href="#"
              class="btn btn-white btn-animate"
              id="butt4"
              @click="saveRate(true)"
              >Save</a
            >
            <!-- <a
              href="#"
              class="btn btn-white btn-animate"
              id="butt3"
              @click="saveRate(false)"
              >Save and exit</a
            > -->
            <a
              href="#"
              class="btn btn-white btn-animate"
              id="butt2"
              @click="submit"
              >Submit</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import binning from "../Components/binning.vue";
import Modal from "../Components/Modal.vue";

export default {
  name: "RatePage",
  components: {
    binning,
    Modal,
  },
  data() {
    return {
      Images: [],
      Image: "",
      Bins: [],
      disableButton: true,
      flag: true,
      ask_more: false,
      isLoading: true,
      text: [],
      
    };
  },
  methods: {
    showModal(selectedModal) {
      console.log("selectedModal:");
      console.log(selectedModal);
      this.$refs.modal.setShow(selectedModal);
    },
    // hideModal(selectedModal) {
    //   this.$refs.modal.setHide(selectedModal);
    // },
    async checkFull() {
      let sizeFull = this.$refs;

      if (sizeFull == undefined || sizeFull == {}) return this.disableButton;

      return sizeFull.bins.sizeFull != this.size;
    },
    async saveRate(isContinue) {
      // let rates = this.$refs.bins.ratingAll();
      // let user_id = this.$root.store.u_id;
      localStorage.setItem(
        "numRanked",
        JSON.stringify(this.$refs.bins.sizeFull)
      );
      this.$root.store.numRanked = JSON.parse(localStorage.numRanked);
      console.log("numRanked", this.$root.store.numRanked);
      if (this.$root.store.numRanked > 0) {
        localStorage.setItem(
          "RankedImages",
          JSON.stringify(this.$refs.bins.ratingAll())
        );
        localStorage.setItem(
          "unRankedImages",
          JSON.stringify(this.$refs.bins.unrated())
        );

        this.$root.store.RankedImages = JSON.parse(localStorage.RankedImages);
        this.$root.store.unRankedImages = JSON.parse(
          localStorage.unRankedImages
        );

        // await this.axios.post(
        //   this.$root.store.address + `images/submitRatings`,
        //   {
        //     data_ratings: rates,
        //     id: user_id,
        //   }
        // );
        this.$root.toast(
          "State saved",
          "The rating saved successfully! \n You can keep rating",
          "success"
        );
        if (isContinue == true) {
          return;
        } 
        else 
        {
          this.$router.push("MainPage").catch(failure =>
            {
              console.log(failure);
              this.$router.push("MainPage");
            });
        }
      } 
      else {
        this.$root.toast(
          "warning",
          "You have to rate at least one picture before saving",
          "warning"
        );
      }
    },

    async submit() {
        localStorage.setItem(
          "numRanked",
          JSON.stringify(this.$refs.bins.sizeFull)
        );
        this.$root.store.numRanked = JSON.parse(localStorage.numRanked);
        console.log(this.$root.store.numRanked);
        if (localStorage.is_submitted==undefined || !localStorage.is_submitted ||
        this.$root.store.is_submitted==undefined || !this.$root.store.is_submitted) {
          try {
            console.log("submitted regular");
            await this.submit_regular(this.$root.store.rankImages);
            localStorage.setItem("is_submitted", true);
            this.$root.store.is_submitted = true;
          } catch (err) {
            console.log(err.response);
          }
        } else {
          try {
            console.log("submitted 6");
            await this.submit_regular(6);
            let temp = [];
            let len = this.$root.store.extra_pics.length;
            for (var j = 6; j < len; j++) {
                temp.push(this.$root.store.extra_pics[j]);
            }
        
            this.$root.store.extra_pics = temp;
            localStorage.extra_pics = JSON.stringify(this.$root.store.extra_pics);
            if(this.$root.store.extra_pics.length == 0)
            {
               localStorage.setItem("is_done", true);
              this.$root.store.is_done = true;
          
              await this.axios.post(
              this.$root.store.address + `images/is_done`,
              {
                is_done: true,
                user_id: this.$root.store.u_id
              }
              );
            }
            
          } catch (err) {
            console.log(err.response);
          }

          console.log("h2");
          console.log(this.$root.store.is_done == true);
          if (this.$root.store.is_done == true)
          {
            this.showModal("mymodalC");
          }
        }
        // if(Boolean(this.$root.store.is_done) == true)
        // {
        //   this.$root.toast(
        //   "warning",
        //   "you have rated all the pictures and cannot rate anymore",
        //   "warning"
        //   );
        //   this.$router.push("/MainPage");
        //   return;
        // }
    },

    async submit_regular(size_full) {
      console.log(size_full)
      let rates = this.$refs.bins.ratingAll();
      let user_id = this.$root.store.u_id;

      console.log("numRanked", this.$root.store.numRanked);
      if (this.$root.store.numRanked < size_full) { //CHANGE = size_full
        this.$root.toast(
          "warning",
          "You must rate at least " +
            size_full +
            " images in order to continue",
          "warning"
        );
        return;
      }
      else{

        // localStorage.setItem("RankedImages", undefined);
      // localStorage.setItem("unRankedImages", undefined);
      localStorage.removeItem("RankedImages");
      localStorage.removeItem("unRankedImages");

      this.$root.store.RankedImages = undefined;
      this.$root.store.unRankedImages = undefined;
      
      await this.axios.post(this.$root.store.address + `images/submitRatings`, {
        data_ratings: rates,
        id: user_id,
      });

      console.log("h1");
      if (this.$root.store.is_done == true ) {
        this.showModal("mymodalC"); 
      }
      else {
        this.showModal("mymodalB"); 
      }

      }

      
      // this.$router.push("/FirstGamePage");
    },
    async uploadImages() {
      try {
        const response = await this.axios.get(
          this.$root.store.address + `images/getImages`
        );

        let arr = [];
        this.$root.store.extra_pics = response.data.extras;
        localStorage.setItem(
          "extra_pics",
          JSON.stringify(this.$root.store.extra_pics)
        );
        console.log(this.$root.store.extra_pics);
        console.log(JSON.parse(localStorage.extra_pics));
        response.data.urls.map((img) => {
          let str = "data:image/jpg;base64, " + img.src;
          arr.push({ id: img.id, src: str });
        });
        this.Images = arr;
        this.isLoading = false;
        this.showModal("mymodalA");
      } catch (err) {
        console.log(err.response);
      }
    },
    async uploadExtra() {
      if(this.$refs.bins)
        this.$refs.bins.clear_bins();
      // this.$refs.modalRate.hide();
      // this.$refs.bins.clear_bins();
      try {
        this.$root.store.extra_pics = JSON.parse(localStorage.extra_pics);
        console.log("extra",this.$root.store.extra_pics);
        let arr1 = [];
        // let len = this.$root.store.extra_pics.length;
        for (var i = 0; i < 6; i++) {
          arr1.push(this.$root.store.extra_pics[i]);
        }

        let pic_arr = [];
        arr1.map((x) => pic_arr.push(x.id));
        

        const res = await this.axios.post(
          this.$root.store.address + `images/fetchSpecificImages`,
          {
            pics: pic_arr,
            bins: [],
          }
        );
        let response = res.data[0];

        let arr = [];
        let arr2 = [];
        response.map((img) => {
          let str = "data:image/jpg;base64, " + img.src;
          arr.push({ id: img.id, src: str });
        });
        this.Images = arr;
        this.Bins = arr2;
        this.isLoading = false;
      } catch (err) {
        console.log(err.response);
      }
    },
    async uploadAlt() {
      try {
        this.$root.store.unRankedImages = JSON.parse(
          localStorage.unRankedImages
        );
        this.$root.store.RankedImages = JSON.parse(localStorage.RankedImages);
        this.$root.store.numRanked = JSON.parse(localStorage.numRanked);
        console.log("pics", this.$root.store.RankedImages);
        const res = await this.axios.post(
          this.$root.store.address + `images/fetchSpecificImages`,
          {
            pics: this.$root.store.unRankedImages,
            bins: this.$root.store.RankedImages,
          }
        );

        let response = res.data[0];
        let response2 = res.data[1];
        console.log("response2",response2);
        let arr = [];
        let arr2 = [];
        response.map((img) => {
          let str = "data:image/jpg;base64, " + img.src;
          arr.push({ id: img.id, src: str });
        });
        response2.map((img) => {
          let str = "data:image/jpg;base64, " + img.src;
          arr2.push({ id: img.id, src: str, rating: img.rating });
        });

        this.Images = arr;
        this.Bins = arr2;
        console.log("BEANS", this.Bins);
        this.isLoading = false;
        // this.showModal("mymodalA");
      } catch (err) {
        console.log(err.response);
      }
    },
  },

  created() {
    // console.log(this.$root.store);
    // this.showModal("mymodalA");

    if(!(Boolean(localStorage.is_submitted) == false)){
    this.text = [
      `בשלב הראשון של המשחק, עליכם לצפות ב-${this.$root.store.rankImages} תמונות, ולתת להן ציון שמשקף עד כמה אתם אוהבים אותן. אנחנו נציג בפניכם את כל ${this.$root.store.rankImages} התמונות בתוך חלון קטן כשהן מוקטנות. השהיית העכבר על כל תמונה תגדיל אותה קצת, ולחיצה עם העכבר על כל התמונה תגדיל אותה עוד.`,
      "הציונים לכל תמונה ניתנים על ידי גרירתה לתא המתאים בתחתית המסך. המערכת מאפשרת להעביר תמונות מתא אחד לתא אחר, עד שתרגישו שהציונים לכל התמונות אכן משקפים את טעמכם.",
      `כדי שתצליחו במשחק, אנחנו ממליצים מאד שתהיה כמות דומה (לא בהכרח זהה) של תמונות בתאי הציון השונים. אחרי שתסיימו לתת ציונים ל-${this.$root.store.rankImages} התמונות, תוכלו לבחור בין האפשרות לראות עוד תמונות ולתת להם ציונים או לעבור לשלב המשחק.`,
    ];
    } else{
      this.text = [
        "כעת, תצפו ב-6 תמונות נוספות, להן עליכם לתת ציון שמשקף עד כמה אתם אוהבים אותן. הציונים לכל תמונה ניתנים על ידי גרירתה לתא המתאים בתחתית המסך (בדיוק כמו לפניכן).",
        "המערכת תאפשר להעביר תמונתו מתא אחד לתא אחר, עד שתרגישו שהציונים לכל התמונות אכן משקפים את טעמכם.",
        "כדי שתצליחו במשחק, אנחנו ממליצים מאד שתהיה כמות דומה (לא בהכרח זהה) של תמונות בתאי הציון השונים. לאחר שתסיימו לתת ציונים ל-6 התמונתו הללו, וכל עוד לא הגעתם לכמות המירבית, תוכלו להמשיך לדרג תמונות נוספות או לעבור למשחק."
    ];
    }
    
    console.log(localStorage.is_submitted);
    console.log(localStorage.RankedImages);
      // localStorage.removeItem("is_submitted");
      // localStorage.removeItem("is_done");
      // localStorage.removeItem("RankedImages");
      if (Boolean(this.$root.store.is_done) == true) {
        this.$root.toast(
          "warning",
          "you have rated all the pictures and cannot rate anymore",
          "warning"
        );
        this.$router.push("MainPage").catch(failure =>
            {
              console.log(failure);
              this.$router.push("MainPage");
            });
        return;
      }
      let ranked_a  = localStorage.RankedImages == undefined;
      let submitted_a = Boolean(this.$root.store.is_submitted) == true;
      console.log("is submitted?",this.$root.store.is_submitted);
      console.log("why?", submitted_a);
      // let ranked_b = typeof(localStorage.RankedImages) == "undefined";
      // let submitted_b = typeof(localStorage.is_submitted) == "undefined";
      if (!ranked_a) {
        console.log(localStorage.RankedImages)
        console.log(localStorage.RankedImages == undefined)
        this.uploadAlt();
        console.log("tried alt");
      } 
      else if (submitted_a) {
        this.uploadExtra();
        console.log("tried Extras");
      } 
      else {
        
        this.uploadImages();
        console.log("tried regular");
      }
        //       this.uploadImages();
        // console.log("tried regular");
    
  },
};
</script>
<style>
.content {
  position:relative;
}
.instructor {
  margin-bottom: 0px;
}

#butt2 {
    position:absolute;
    right: 88px;
    top: 158px;
    margin-bottom: 80px;
}
#butt4{
    position:absolute;
    right: 95px;
    top: 96px;
    margin-bottom: 80px;
}

#butt1 {
    position:absolute;
    left: 64px;
    top: 96px;
    margin-bottom: 80px;
}
#butt3 {
  margin-left: 1%;
}

.btn:link,
.btn:visited {
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  /* text-transform: uppercase; */
  text-decoration: none;
  padding: 12px 30px;
  display: inline-block;
  border-radius: 100px;
  transition: all 0.2s;
  /* position: absolute; */
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.btn-white {
  background-color: #fff;
  color: rgb(133, 133, 133);
}

.btn::after {
  content: "";
  display: inline-block;
  /* height: 100%;
      width: 100%; */
  border-radius: 100px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: all 0.4s;
}

.btn-white::after {
  background-color: #fff;
}

.btn:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}

.btn-animated {
  animation: moveInBottom 5s ease-out;
  animation-fill-mode: backwards;
}
.rtl {
    direction: rtl;
}

@keyframes moveInBottom {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.load {
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  margin-top: 8%;
}
</style>