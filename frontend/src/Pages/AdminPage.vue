<template>
  <div id="admin">
    <br />
    <div class="title">Settings</div>
    <b-form id="form">
      <!-- <div class="inputs"> -->
        <!-- <label for="range-1">Rank page - images amount</label> -->
        <!-- <b-form-input
          id="range-1"
          v-model="form.rankImages"
          type="range"
          min="60"
          max="126"
          step="6"
        ></b-form-input> -->
        <!-- <div class="mt-2">Value: {{ form.rankImages }}</div> -->
        <div class="inputs">
       <b><label for="range-1">Choose number of images to appear in initial ranking:</label></b>
       <br />
        <b-form-select
          v-model="form.rankImages"
          :options="[60, 66, 72, 78, 84, 90, 96, 102, 108, 114, 120, 126]"
        ></b-form-select>
      </div>
      <div class="inputs">
        <b><label for="range-2">Choose number of images to appear in each round of the games:</label></b>
        <br />
        <b-form-select
          v-model="form.firstGameImages"
          :options="[6, 8, 9, 12]"
        ></b-form-select>
      </div>
      <div class="inputs">
        <b><label for="range-3">Choose number of 'correct' images to appear in each round of the games:</label></b>
        <br />
        <b-form-select
          v-model="form.firstGameImagesSelected"
          :options="[1, 2, 3, 4, 5]"
        ></b-form-select>
      </div>
      <br>
      <!-- <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button> -->
      <div class="buttons">
      <a href="#" class="btn btn-white btn-animate" @click="submit">Save</a>
      <br>
      <br>
      Download CSV:
      <br>
       <a href="#" class="btn btn-white btn-animate" @click="getAllUsers">Users data</a>
        <br>
       <a href="#" class="btn btn-white btn-animate" @click="advancedFirstGames">Advanced first game data</a>
        <br>
       <a href="#" class="btn btn-white btn-animate" @click="advancedSecondGames">Advanced second game data</a>
      <br>
       <a href="#" class="btn btn-white btn-animate" @click="getAllReview">Download CSV of reviews</a>
      <br>
       <a href="#" class="btn btn-white btn-animate" @click="getAllImages">Download CSV of images id & category</a>
      
      
      <!-- <a href="#" class="btn btn-white btn-animate" id="butt2" @click="reset">Reset</a>  -->
      <br>
       <a href="#" class="btn btn-white btn-animate" @click="getRanksByImage">Download CSV of ranks data per image</a>
      <!-- <a href="#" class="btn btn-white btn-animate" id="butt2" @click="reset">Reset</a>  -->
      <br>
       <a href="#" class="btn btn-white btn-animate" @click="getRanksByUser">Download CSV of ranks data per user</a>
      <br>
       <a href="#" class="btn btn-white btn-animate" @click="getRanksPerUser">Download CSV of ranks per user</a>
      </div>
    </b-form>
  </div>
</template>

<script>

export default {
  name: "AdminPage",

  data() {
    return {
      form: {
        rankImages: 72,
        firstGameImages: 8,
        firstGameImagesSelected: 2,
      },
    };
  },
  methods: {
    async submit() {
      // event.preventDefault();
      if (this.firstGameImages <= this.firstGameImagesSelected) {
        this.$root.toast(
          "First game",
          "Number of correct images has to be less than or equal to the total number of images",
          "error"
        );
      } else {
        try {
          const response = await this.axios.post(
            (this.$root.store.address+"admin/changeSettings"),
            {
              isAdmin: this.$root.store.isAdmin,
              rankImages: Number(this.form.rankImages),
              firstGameImages: Number(this.form.firstGameImages),
              firstGameImagesSelected: Number(
                this.form.firstGameImagesSelected
              ),
            }
          );

          if (response.status == 200) {
            this.$root.toast(
              "Settings",
              "All settings saved successfully!",
              "success"
            );
            const globalSettings = {
              rankImages: Number(this.form.rankImages),
              firstGameImages: Number(this.form.firstGameImages),
              firstGameImagesSelected: Number(
                this.form.firstGameImagesSelected
              ),
            };
            this.$root.store.setGlobalSettings(globalSettings);
          } else {
            this.form.rankImages = "72";
            this.form.firstGameImages = "8";
            this.form.firstGameImagesSelected = "2";
            this.$root.toast(
              "Server error",
              "The user is not authorized to change settings",
              "warning"
            );
          }
        } catch (error) {
          this.form.rankImages = "72";
          this.form.firstGameImages = "8";
          this.form.firstGameImagesSelected = "2";
          this.$root.toast("Settings", "There was a server error", "error");
        }
      }
    },
    reset() {
      // event.preventDefault();
      // Reset our form values
      this.form.rankImages = "72";
      this.form.firstGameImages = "8";
      this.form.firstGameImagesSelected = "2";
    },


    async getAllImages(){
     try {
        const response = await this.axios.post(
          this.$root.store.address+"admin/images",
          {
            isAdmin: this.$root.store.isAdmin,
          }
        );

         let csv = 'Id, imagesInFolder, Category \n';
        response.data.forEach((row) => {
                csv += row.Id + ',';
                csv += row.Url.slice(17) + ',';
                csv += row.Category + ',';
                csv += "\n";
        });
        this.downloadCSV(csv, 'Images.csv');
        
      } catch (error) {
        console.log(error);
      }
    },
    async advancedFirstGames() {
      try {
        const response = await this.axios.post(
          this.$root.store.address+"admin/firstGameData",{
           isAdmin: this.$root.store.isAdmin,
          }
        );
        let num;
        let csv = 'User1_id, Game_time, Images_id, Target, User_successful_selection, Score, Max_score\n';
        response.data.forEach((row) => {
                csv += row.user_id + ',';
                console.log(row.timestamp);
                csv += row.timestamp + ',';
                csv += row.allImages.toString().replaceAll(',','.') + ',';
                num = parseInt(row.max_score);
                csv += row.allImages.split(',').slice(0, num).toString().replaceAll(',','.') + ',';
                csv += row.goodImages.toString().replaceAll(',','.') + ',';
                csv += row.score + ',';
                csv += row.max_score + ',';
                csv += "\n";
        });
        this.downloadCSV(csv, 'AdvancedFirstGames.csv');

    } catch (error) {
        console.log(error);
      }
    },

    async getAllReview(){
     try {
        const response = await this.axios.post(
          this.$root.store.address+"admin/reviews",
          {
            isAdmin: this.$root.store.isAdmin,
          }
        );
                let csv = 'review \n';
        response.data.forEach((row) => {
                csv += row.review + ',';
                csv += "\n";
        });
        this.downloadCSV(csv, 'Reviews.csv');
        
      } catch (error) {
        console.log(error);
      }
    },
    async advancedSecondGames() {
      try {
        const response = await this.axios.post(
          this.$root.store.address+"admin/secondGameData",{
           isAdmin: this.$root.store.isAdmin,
          }
        );

        let num;
        let csv = 'User1_id, User2_id, Game_time, Images_id, Target, User_successful_selection, Score, Max_score\n';
        response.data.forEach((row) => {
                csv += row.user_id + ',';
                csv += row.other_id + ',';
                console.log(row.timestamp);
                csv += row.timestamp + ',';
                csv += row.allImages.toString().replaceAll(',','.') + ',';
                num = parseInt(row.max_score);
                csv += row.allImages.split(',').slice(0, num).toString().replaceAll(',','.') + ',';
                csv += row.goodImages.toString().replaceAll(',','.') + ',';
                csv += row.score + ',';
                csv += row.max_score + ',';
                csv += "\n";
        });
        this.downloadCSV(csv, 'AdvancedSecondGames.csv');

        } catch (error) {
        console.log(error);
      }
    },


    async getAllUsers() {
      try {
        const response = await this.axios.post(
          this.$root.store.address+"admin/users",
          {
            isAdmin: this.$root.store.isAdmin,
          }
        );


        let csv = 'Id, Email,FullName,Gender,Age \n';
        response.data.forEach((row) => {
                csv += row.Id + ',';
                csv += row.Email + ',';
                csv += row.FullName + ',';
                if (row.Gender)
                  csv += 'Female' + ',';
                else
                  csv += 'Male' + ',';
                csv += row.Age + ',';
                csv += "\n";
        });
        this.downloadCSV(csv, 'Users.csv');
        
      } catch (error) {
        console.log(error);
      }
    },
    async getRanksByImage()
    {
      try {
        const response = await this.axios.post(
          this.$root.store.address+"admin/ranksbyimage",
          {
            isAdmin: this.$root.store.isAdmin,
          }
        );
        let dict = response.data;
        console.log(response.data);
        let csv = 'Image, Rating1, Rating2, Rating3, Rating4, Rating5, Rating6, Rating7, Rating8, Rating9, Rating10, \n';
        console.log(csv);
        for(var key in dict)
        {
          let value = dict[key]
          csv += key + ',';
          for(var i = 0; i < value.length; i++)
          {
            csv+=value[i]+',';
          } 
          csv += "\n";
        }
        this.downloadCSV(csv, 'InitialRating_Images.csv');
        
      } catch (error) {
        console.log(error);
      }
    },
    async getRanksByUser()
    {
      try {
        const response = await this.axios.post(
          this.$root.store.address+"admin/ranksbyuser",
          {
            isAdmin: this.$root.store.isAdmin,
          }
        );
        console.log(response.data);
        let dict = response.data[0];
        let size = response.data[1]
        let csv = 'User,'
        for(var i = 1; i <= size; i++)
        {
          csv+=" Image "+i+","
        }
        csv+="\n"
        for(var key in dict)
        {
          let value = dict[key]
          csv+=key+","
          for(var j = 0; j < value.length; j++)
          {
            if(value[j]!=null)
              csv+=value[j]+',';
            else
              csv+=',';
          } 
          csv += "\n";

        }
        this.downloadCSV(csv, 'InitialRating_Users.csv');
        console.log(csv);
        console.log(dict);
        
        
      } catch (error) {
        console.log(error);
      }
    },
    async getRanksPerUser()
    {
        try {
        const response = await this.axios.post(
          this.$root.store.address+"admin/ranksperuser",
          {
            isAdmin: this.$root.store.isAdmin,
          }
        );
        let dict = response.data;
        let csv = 'User, Rating1, Rating2, Rating3, Rating4, Rating5, Rating6, Rating7, Rating8, Rating9, Rating10, \n';
        for(var key in dict)
        {
          let value = dict[key]
          let rate_arr = new Array(10).fill(0);
          for(let i=0; i < value.length;i++)
          {
            let ind = value[i][0];
            let rates = value[i][1];
            rate_arr[ind - 1] = rates;
          }
          csv+= key+',';
          for(let i=0; i < rate_arr.length;i++)
          {
            csv+=rate_arr[i]+", ";
          }
          csv+="\n";

        }
       
        this.downloadCSV(csv, 'RatePerUser.csv');
        
      } catch (error) {
        console.log(error);
      }
    },
    downloadCSV(csv, csvName){
      const anchor = document.createElement('a');
        anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        anchor.target = '_blank';
        anchor.download = csvName;
        anchor.click();
    },
  },
};
</script>

<style scoped>
#admin {
  text-align: center;
}

#form {
  margin-top: 5px;
}
.custom-range {
  width: 40%;
  margin-left: 5%;
  margin-top: 5%;
}
.btn {
  margin: 1%;
  /* margin-top: 5%; */
}
.custom-select {
  width: 10%;
  margin-left: 3%;
}
.inputs {
  margin-top: 3%;
}
 .title {
   font-family: Georgia, serif;
  font-weight: 800;
  font-size: 2.5vw;
  color: #15555a;
 }

 .input-wrapper {
  /* display: inline-block; */
  text-align: left;
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
  .vue-select-image__thumbnail{
    padding: 10px;
  }

  .buttons {
    margin: 0 auto;
  }

</style>
