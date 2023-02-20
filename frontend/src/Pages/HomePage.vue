<template>
  <div>
    <br>
    <div class="container">
  <div class="row">
    <div class="col-md-12 text-center" style="margin-bottom: 3px">
      <div class="title"> Welcome to the Game of
        <br>
         Beautiful Images</div>
    </div>
  </div>
</div>
<br>
<div class="content">
<!-- <div class="im"> -->
  <img v-bind:src="'https://i.ibb.co/KGG6TW1/15.jpg'" class="in-im">
<!-- </div> -->
<!-- <div class="text"> -->
  <!-- <div class="exp">
  This game made as a part of a research
  <br>
  in the field of aesthetics of images.
  </div> -->
  <div class="start">
    <!-- <div class="text"> -->
      <!-- <br> -->
    <!-- <h3><strong>Info</strong></h3> -->
    <!-- <br> -->
    <p>This game was developed as a part
</p>
    <p>of research on aesthetic preferences.</p>
    <!-- </div> -->
  <br>
    <div v-if="!$root.store.email" >
    <div style="font-size: 1.2vw">
    <p>If you are new here </p>
    </div>
    <a href="#" class="btn btn-white btn-animate" style="margin-top: 4px" @click="register"> Sign up</a>
    <br>
    <!-- <router-link to="InstructionsPage"> Sign up</router-link></p> -->
    <br>
    <div style="font-size: 1.2vw">
     <p>If you already have an account</p>
     </div>
     <a href="#" class="btn btn-white btn-animate" style="margin-top: 4px" @click="login">Log in</a> 
    <!-- <router-link to="login"> Log in here</router-link></p> -->
    </div>
    <div v-if="$root.store.email">
        <!-- <p class="mt-4 mb-0"> -->
          <!-- <router-link to="RatePage">Click here</router-link> to start the game </p> -->
          <div style="font-size: 1.2vw">
          <p>To play the game,</p>
          <p>please click the button below</p>
          </div>
          <br>
          <a href="#" class="btn btn-white btn-animate" @click="submit">Start playing</a>  
    </div>
    </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>

export default {
  name: "HomePage",
  date() {
    return {
      image: "back.png",
      // backgroundImage: 'url(./back.jpg)'
    }
  },
  components: {
  },
  methods: {
    submit() {
      
      this.$router.push("MainPage").catch(failure =>
      {
        console.log(failure);
        this.$router.push("MainPage");
      });

    },
    login() {
      this.$router.push("/login").catch(failure =>
      {
       console.log(failure);
      this.$router.push("/login");
      });
      

    },
    register() {
      
      this.$router.push("InstructionsPage").catch(failure =>
      {
        console.log(failure);
        this.$router.push("InstructionsPage");
      });

    },
  },
  created() {},
};
</script>
<style >

 .title {
   font-family: Georgia, serif;
  font-weight: 800;
  font-size: 3.4vw;
  color: #15555a;
 }

.start
{
    /* margin-left: 400px; */
    margin: 0 auto;
    margin-top: 20px;
    text-align: center;
    font-weight: 600;
    font-size: 1.3vw;
    font-style: italic;
    margin-right: 22vw;
    color: #805745;
    /* font-family: 'Blippo, fantasy' */
}

  .btn:link,
  .btn:visited {
    margin-bottom: 5px;
      font-weight: 600;
      font-size: 16px;
      font-family:Arial, Helvetica, sans-serif;
      /* text-transform: uppercase; */
      text-decoration: none;
      padding: 12px 30px;
      display: inline-block;
      border-radius: 100px;
      transition: all .2s;
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
      transition: all .4s;
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


  .in-im {
    display:block;
    margin-top: 5px;
    margin-bottom: 30px;
    width: 34vw;
    height: 22vw;
    border-radius: 8px;
  }

  .content {
  display: flex;
  /* margin: 0 auto; */
}

.content img {
  margin-left: 16vw;
  margin-right: 10px;
  display: block;
}

.content h3,
.content p {margin: 0;}

</style>
