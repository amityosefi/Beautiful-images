<template >
<div>
<!-- <div class= "div">
    <h1 class="header">Instructions</h1>
    <p class="content" style="font-weight: bold; font-size: 20px; margin-bottom: 0px;">{{this.text}}</p>
</div>  -->
    <b-modal ref="mymodalA" id="modal-tall">
    <div class="modeTitle"> הוראות</div>
    <p class="right-to-left" dir="rtl" v-for="i in this.$props.Text" :key="i">
        <b-container fluid>
        {{i}}
        </b-container>
        </p>

        <template #modal-footer>
        <div class="w-100">
            <b-button variant="primary" size="sm" class="right-to-left" @click="setHide('mymodalA')">
            סגור
            </b-button>
        </div>
        </template>
    </b-modal>


    <b-modal ref="mymodalB" id="modal-tall">
      <div class="modeTitle"> !סיימת לדרג </div>

      <p class="right-to-left" dir="rtl">
        <b-container fluid>
        האם תרצה/י להמשיך לדרג תמונות נוספות?
        </b-container>
        </p>

        <template #modal-footer>
          <div class="w-100">
          <div class="c1">
            <b-button variant="primary" size="sm" class="right-to-left" @click="setHide('mymodalB')">
            לעבור למשחק
            </b-button>
            </div>
          <div class="c2">
            <b-button variant="primary" size="sm" class="right-to-left" @click="buttonClickHandler">
            להמשיך לדרג
            </b-button>            
        </div>
        </div>
        </template>
    </b-modal>


    <b-modal ref="mymodalC" id="modal-tall">
      <div class="modeTitle"> !סיימת לדרג </div>

      <p class="right-to-left" dir="rtl">
        <b-container fluid>
        אין תמונות נוספות לדירוג. המשך למשחק
        </b-container>
        </p>

        <template #modal-footer>
          <div class="w-100">
          <div class="c1">
            <b-button variant="primary" size="sm" class="right-to-left" @click="setHide('mymodalC')">
            לעבור למשחק
            </b-button>
            </div>
        </div>
        </template>
    </b-modal>


</div>
</template>
<script>
export default {
  name: "Modal",
  
  props: {
    Text: {
      type: Array,
      require: true,
    },
  },

  data() {
      return {
          Show: false
      }
  },
  methods: {
      buttonClickHandler() {
          this.$refs.mymodalB.hide();
          this.$emit('my-event');
      },
      setShow(modalSelected) {
          if (modalSelected == "mymodalA") {
            this.$refs.mymodalA.show();
          }
          else if (modalSelected == "mymodalB") {
              this.$refs.mymodalB.show();
          }
          else {
             this.$refs.mymodalC.show(); 
          }
        //   this.Show = !this.Show;
      },
      setHide(modalSelected) {
          if (modalSelected == "mymodalA") {
            this.$refs.mymodalA.hide();
          }
          else if (modalSelected == "mymodalB") {
              this.$refs.mymodalB.hide();
              this.$router.push("/FirstGamePage").catch(failure =>
            {
              console.log(failure);
              this.$router.push("/FirstGamePage");
            });

          }
          else {
             this.$refs.mymodalC.hide();
             this.$router.push("/FirstGamePage").catch(failure =>
            {
              console.log(failure);
              this.$router.push("/FirstGamePage");
            });

          }
      },
  },
};
</script>
<style>
.rtl {
    direction: rtl;
}
/* .div
{
    padding: 20px;
    background-color: beige;
    width: 30%;
    height: fit-content;
    box-shadow: 1px 1px 1px 1px black;
    
}

.header
{
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: black;
    text-shadow: 1px 1px #599e93;
}
.wrapper
{
    display: flex;
    justify-content: center;
    margin:5px;
    
}
.content
{
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: black;
    text-shadow: 1px 1px #599e93;
} */

.c1{
  float: left;
  margin-left: 1%;

}
.c2{
  float: right;
}

.right-to-left {
display: flex;
direction:rtl;
unicode-bidi:bidi-override;
margin-top: 10px;
margin-bottom: 10px;
}

.modal-content{
    text-align: right;
}

.modeTitle {
    margin-top: 3px;
    font-weight: bold;
    font-size: 32px;
    font-family: Calibri, san-serif; 
    text-align: center;
}


</style>
