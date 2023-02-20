<template>
  <div v-if="!this.$root.store.is_done" id="binning" @dragover.prevent>
    
   <div>
    <div class="selection" >
      <!-- <viewer
        ref="viewer"
        :images="listLocal"
        rebuild
        class="viewer"
        @inited="inited"
      > -->
        <draggable
          class="im"
          @dragend="remove(item)"
          :list="listLocal"
          group="tasks"
        >
          <li
            style="list-style-type: none;"
            v-for="(Image, idx) in listLocal"
            :key="idx"
            @click="currPic=Image.src"
          >
            <Picture :link="Image.src" :id="Image.id" :draggable="false" v-b-modal.modal-1/>
          </li>
        </draggable>
      <!-- </viewer> -->
    </div>
    <!-- <img class="pic" v-bind:src="image" width="150px" height="100px" alt=".."> -->
    <br><br><br><br>

    <div class="leastLiked">Least liked</div>
    <div class="mostLiked">Most liked</div>

    <div class="bins">
      <div class="Row">
              <!-- The least liked -->
        <div class="Column">1
          <draggable :list="arrGrade1" group="tasks">
            <div v-for="image in arrGrade1" :key="image.id" class="bin" @click="currPic=image.src">
              <!-- <img v-bind:src="image" width="85px" height="55px" alt=".."> -->
              <Picture :link="image.src" :id="image.id" :draggable="true" v-b-modal.modal-1/>
            </div>
          </draggable>
        </div>

        <div class="Column">2
          <draggable :list="arrGrade2" group="tasks">
            <div
              v-for="(image, imageIndex) in arrGrade2"
              :key="imageIndex"
              class="bin"
              @click="currPic=image.src"
            >
              <Picture :link="image.src" :id="image.id" :draggable="true" v-b-modal.modal-1/>
            </div>
          </draggable>
        </div>

        <div class="Column">3
          <draggable :list="arrGrade3" group="tasks">
            <div
              v-for="(image, imageIndex) in arrGrade3"
              :key="imageIndex"
              class="bin"
              @click="currPic=image.src"
            >
              <Picture :link="image.src" :id="image.id" :draggable="true" v-b-modal.modal-1/>
            </div>
          </draggable>
        </div>

        <div class="Column">4
          <draggable :list="arrGrade4" group="tasks">
            <div
              v-for="(image, imageIndex) in arrGrade4"
              :key="imageIndex"
              class="bin"
              @click="currPic=image.src"
            >
              <Picture :link="image.src" :id="image.id" :draggable="true" v-b-modal.modal-1/>
            </div>
          </draggable>
        </div>

        <div class="Column">5
          <draggable :list="arrGrade5" group="tasks">
            <div
              v-for="(image, imageIndex) in arrGrade5"
              :key="imageIndex"
              class="bin"
              @click="currPic=image.src"
            >
              <Picture :link="image.src" :id="image.id" :draggable="true" v-b-modal.modal-1/>
            </div>
          </draggable>
        </div>

        <div class="Column">6
          <draggable :list="arrGrade6" group="tasks">
            <div
              v-for="(image, imageIndex) in arrGrade6"
              :key="imageIndex"
              class="bin"
              @click="currPic=image.src"
            >
              <Picture :link="image.src" :id="image.id" :draggable="true" v-b-modal.modal-1/>
            </div>
          </draggable>
        </div>

        <div class="Column">7
          <draggable :list="arrGrade7" group="tasks">
            <div
              v-for="(image, imageIndex) in arrGrade7"
              :key="imageIndex"
              class="bin"
              @click="currPic=image.src"
            >
              <Picture :link="image.src" :id="image.id" :draggable="true" v-b-modal.modal-1/>
            </div>
          </draggable>
        </div>

        <div class="Column">8
          <draggable :list="arrGrade8" group="tasks">
            <div
              v-for="(image, imageIndex) in arrGrade8"
              :key="imageIndex"
              class="bin"
              @click="currPic=image.src"
            >
              <Picture :link="image.src" :id="image.id" :draggable="true" v-b-modal.modal-1/>
            </div>
          </draggable>
        </div>

        <div class="Column">9
          <draggable :list="arrGrade9" group="tasks">
            <div
              v-for="(image, imageIndex) in arrGrade9"
              :key="imageIndex"
              class="bin"
              @click="currPic=image.src"
            >
              <Picture :link="image.src" :id="image.id" :draggable="true" v-b-modal.modal-1/>
            </div>
          </draggable>
        </div>

        <div class="Column">10
          <draggable :list="arrGrade10" group="tasks">
            <div
              v-for="(image, imageIndex) in arrGrade10"
              :key="imageIndex"
              class="bin"
              @click="currPic=image.src"
            >
              <Picture :link="image.src" :id="image.id" :draggable="true" v-b-modal.modal-1/>
            </div>
          </draggable>
        </div>
        <!-- The most liked -->
      </div>
    </div>
    </div>

<br>
<br>
<div>
  <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
 <b-modal v-model="show" id="modal-1" class="modalPic" size="lg">
    <p class="my-4"><img v-bind:src = this.currPic width="100%" height="50%"></p>
          <template #modal-footer>
        <div class="w-100">
          <b-button variant="primary" size="sm" class="float-right" @click="show=false">Close</b-button>
        </div>
      </template>
  </b-modal>
  <!-- <b-modal class="modal" id="modal-1" hide-footer title="BootstrapVue">
    <img v-bind:src = this.currPic width="200px" height="100px">
  </b-modal> -->
</div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Picture from "./Picture.vue";
// import "viewerjs/dist/viewer.css";
// import { component as Viewer } from "v-viewer";
export default {
  name: "binning",
  components: {
    // Viewer,
    draggable,
    Picture,
  },

  data() {
    return {
      index: 0,
      arrGrade1: [],
      arrGrade2: [],
      arrGrade3: [],
      arrGrade4: [],
      arrGrade5: [],
      arrGrade6: [],
      arrGrade7: [],
      arrGrade8: [],
      arrGrade9: [],
      arrGrade10: [],
      
      flag: true,
      text: "Start rate images",
      numrank: this.sizeFull,
      currPic: "",
      show: false,
      instructionsModal: false
    };
  },
  props: {
    Images: {
      require: true,
      type: Array,
    },
    Bins:
    {
      type:Array,
    },
  },
  model: {
    prop: "Images",
    event: "listchange",
  },
  computed: {
    listLocal: {
      get: function() {
        return this.Images;
      },
      set: function(value) {
        this.$emit("listchange", value);
        this.$root.store.numRank = this.numrank;
        
      },
    },
    sizeFull: function() {
      return (
        this.arrGrade1.length +
        this.arrGrade2.length +
        this.arrGrade3.length +
        this.arrGrade4.length +
        this.arrGrade5.length +
        this.arrGrade6.length +
        this.arrGrade7.length +
        this.arrGrade8.length +
        this.arrGrade9.length +
        this.arrGrade10.length
      );
    },
  },
  methods: {
    update(src) {
      this.currPic = src;
      console.log(this.currPic);
    },
    changeDivs(){
      this.flag = !this.flag;
      if (this.flag)
        this.text = "Back to instructions";
      else
        this.text = 'Back to rate images'
    },
    inited(viewer) {
      this.$viewer = viewer;
    },
    // show () {
    //   this.$viewer.show()
    // },
    rating(Arr, ratings) {
      let arr = [];
      if (Arr.length == 0) return null;
      for (const img in Arr) {
        let pic = Arr[img];
        arr.push({ picId: pic.id, rating: ratings });
      }
      return arr;
    },
    unrated()
    {
      let arr = []
      for(var img in this.listLocal)
      {
        arr.push(this.listLocal[img].id)
      }
      return arr;
    },
    clear_bins(){
        this.arrGrade1 = [];
        this.arrGrade2 = [];
        this.arrGrade3 = [];
        this.arrGrade4 = [];
        this.arrGrade5 = [];
        this.arrGrade6 = [];
        this.arrGrade7 = [];
        this.arrGrade8 = [];
        this.arrGrade9 = [];
        this.arrGrade10 = [];
    },
    ratingAll() {
      let arr = [
        this.arrGrade1,
        this.arrGrade2,
        this.arrGrade3,
        this.arrGrade4,
        this.arrGrade5,
        this.arrGrade6,
        this.arrGrade7,
        this.arrGrade8,
        this.arrGrade9,
        this.arrGrade10,
      ];
      let res = [];

      for (var i = 0; i < arr.length; i++) {
        let temp = arr[i];
        temp = this.rating(temp, i + 1);
        if (temp != null) {
          for (const dict in temp) {
            res.push(temp[dict]);
          }
        }
      }

      return res;
    },
  },

  created() {
    this.instructionsModal = true
    let binDict = {1:this.arrGrade1, 2:this.arrGrade2, 3:this.arrGrade3, 4:this.arrGrade4, 5:this.arrGrade5
      , 6:this.arrGrade6, 7:this.arrGrade7, 8:this.arrGrade8, 9:this.arrGrade9, 10:this.arrGrade10}
    console.log("my bins", this.$props.Bins);
    for(var i in this.$props.Bins)
    {
      let img = this.$props.Bins[i]
      let arr = binDict[img.rating];
      arr.push({id:img.id,src:img.src})
    }
  },
  mounted()
  {
    
  }
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.selection {
  width: 1000px;
  margin: 0 auto;
  padding: 0;
  display: block;
  top: 15px;
}
body {
  background-color: #fff0f0;
}
/* .display
{
  height:100px;
  overflow: scroll;
} */

.Row {
  /* position:absolute;
  top: 55vh; */
  margin-left: 15%;
  display: table;
  width: 70%;
  table-layout: fixed;
}

.Column {
  vertical-align: center;
  align-items: baseline;
  text-align: center;
  display: table-cell;
  border-bottom-style: solid;
  border-bottom-color: black;
  border-left-style: solid;
  border-right-style: solid;
  border-left-color: black;
  border-right-color: black;
  height: 5vh;
}

.im {
  width: 922px;
  max-height: 400px;
  overflow-y: scroll;
  justify-self: center;
  margin-bottom: 1.5%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-wrap: wrap;
  border-spacing: 10px;
}
.drag {
  display: flex;
  justify-content: center;
}
.bin {
  cursor: pointer;
}
.break {
  flex-basis: 100%;
  height: 0;
}
.bins {
  align-items: center;
  margin-left: 5px;
  margin-top: 1em;
}
#instructor{
  margin-bottom: 5%;
}

.modalPic {
    height:400px;
  width:700px;
}

div.modal.model-1{
  width: 400px;
}

.leastLiked {
  float: left;
  margin-left: 7em;
  margin-top: 1.5em;
}

.mostLiked {
  float: right;
  margin-right: 7em;
  margin-top: 1.5em;
}

/* .pic:hover
{
  height:50%;
  width:50%;
  overflow:-moz-hidden-unscrollable;
} */
</style>