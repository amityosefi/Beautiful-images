<template>
  <div class="bg">
    <div class="gradient-custom-3">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-7">
            <div class="card" style="border-radius: 15px;">
              <div class="card-body p-5">
                <h2 class="text-uppercase text-center mb-5">Create an account</h2>

                <form>
                  <b-form-group id="input-group-fullname" label-cols="4" label-cols-lg="4" label="Name / Nickname" label-for="fullname">
                    <b-form-input id="fullname" v-model="$v.form.fullname.$model" type="text" :state="validateState('fullname')" style="width: 300px;" > </b-form-input>
                    <b-form-invalid-feedback v-if="!$v.form.fullname.required">
                      Name is required
                    </b-form-invalid-feedback>
                    <!-- <b-form-invalid-feedback v-if="!$v.form.fullname.alpha">
                      Name should contain only letters
                    </b-form-invalid-feedback> -->
                  </b-form-group>

                  <!-- <b-form-group id="input-group-lastname" label-cols-sm="3" label="Last Name" label-for="lastname">
                    <b-form-input id="lastname" v-model="$v.form.lastname.$model" type="text" :state="validateState('lastname')" style="width: 300px;" > </b-form-input>
                    <b-form-invalid-feedback v-if="!$v.form.lastname.required">
                      Last name is required
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-if="!$v.form.lastname.alpha">
                      Last name should contain only letters
                    </b-form-invalid-feedback>
                  </b-form-group> -->

                  <b-form-group id="input-group-email"  label-cols="4" label-cols-lg="4" label="Email" label-for="email" >
                    <b-form-input id="email" type="text" v-model="$v.form.email.$model" :state="validateState('email')" style="width: 300px;"></b-form-input>
                    <b-form-invalid-feedback v-if="!$v.form.email.required">
                      Email is required
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback
                        v-else-if="!$v.form.email.style">
                      Email is not valid
                    </b-form-invalid-feedback>
                  </b-form-group>

                  <!-- <b-form-group id="input-group-password" label-cols="4" label-cols-lg="4" label="Password" label-for="password">
                    <b-form-input id="password" type="password" v-model="$v.form.password.$model" :state="validateState('password')" style="width: 300px;"></b-form-input>
                    <b-form-invalid-feedback v-if="!$v.form.password.required">
                      Password is required
                    </b-form-invalid-feedback> -->
                    <!-- <b-form-invalid-feedback v-if="$v.form.password.required && !$v.form.password.length">
                      Password length should be between 5-10 characters
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.form.password.style">
                      Password must contain at least one digit and one letter
                    </b-form-invalid-feedback> -->
                  <!-- </b-form-group>

                  <b-form-group id="input-group-confirmedPassword" label-cols="4" label-cols-lg="4" label="Repeat your password" label-for="confirmedPassword" style="margin-bottom: 1px">
                    <b-form-input id="confirmedPassword" type="password" v-model="$v.form.confirmedPassword.$model" :state="validateState('confirmedPassword')" style="width: 300px;"></b-form-input>
                    <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
                      Password confirmation is required
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.form.confirmedPassword.sameAsPassword">
                      Passwords don't match
                    </b-form-invalid-feedback>
                  </b-form-group> -->

                  <br>

                  <b-form-group id="input-group-gender" label-cols="4" label-cols-lg="4" label="Gender" label-for="gender">
                    <!-- <b-form-select id="gender" class="gender" v-model="$v.form.gender.$model" :options="genderList" :state="validateState('gender')" style="width: 300px;"></b-form-select> -->
                    <b-form-radio-group
                      id="gender"
                      v-model="$v.form.gender.$model"
                      :options="genderList"
                    ></b-form-radio-group>
                    <!-- <b-form-valid-feedback :state="state">Thank you</b-form-valid-feedback> -->
                    <!-- <div v-if="this.start == 1"> -->
                    <b-form-invalid-feedback :state="$v.form.gender.required" v-if="this.start == 1">
                      Gender is required
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback :state="!$v.form.gender.required" v-if="this.start == 1">
                    </b-form-valid-feedback>
                    <!-- </div> -->
                  </b-form-group>

                  <b-form-group id="input-group-age" label-cols="4" label-cols-lg="4" label="Age" label-for="age">
                    <b-form-input id="age" v-model="$v.form.age.$model" type="text" :state="validateState('age')" style="width: 300px;" > </b-form-input>
                    <b-form-invalid-feedback v-if="!$v.form.age.required">
                      Age is required
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-if="!$v.form.age.numeric">
                      Age should contain only numbers
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-if="!$v.form.age.minMax">
                      Age should be at least 12 and maximum 99
                    </b-form-invalid-feedback>
                  </b-form-group>

                  <div class="button-container">
                    <div class="btnn btnn-succes btnn-lg text-body">
                      <div class="text-center text-muted mt-4 mb-0">
                      <a class="btnn" @click="this.onRegister">
                        <h3>Register</h3>
                        </a>
                        </div>
                    </div>
                  </div>
                  
                  <p class="text-center text-muted mt-4 mb-0">Already have an account?
                    <router-link to="login"> Login here</router-link></p>
<!--                    <a href="#!" class="fw-bold text-body"><u>Login here</u></a></p>-->
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  // minLength,
  // maxLength,
  // alpha,
  // sameAs,
} from "vuelidate/lib/validators";
import numeric from "vuelidate/lib/validators/numeric";
// import numeric from "vuelidate/lib/validators/numeric";
export default {
  name: "RegisterPage",

  data() {
    return {
      start: 0,
      form: {
        fullname: "",
        // lastname: "",
        email: null,
        // password: "",
        // confirmedPassword: "",
        gender: null,
        age: "",
      },
      // genderList: [
      //   {value: "Female", text: "Female"},
      //   {value: "Male", text: "Male"},
      // ],
        genderList: [
          { text: 'Female', value: 'Female' },
          { text: 'Male', value: 'Male' },
          { text: 'Other', value: 'Other' }
        ],
      errors: [],
      validated: false
    }
  },
  created() {
    this.start = 0;
  },
  // computed: {
  //     state() {
  //       return ($v.form.password.required);
  //     },
  // },
  methods: {
    validateState(param) {
      const {$dirty, $error} = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    onRegister() {
      this.start = 1;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    async Register() {
        try {

          let genderToSend = 1;
          if (this.form.gender == "Male") {
              genderToSend = 2;
          }
            const response = await this.axios.post(
              this.$root.store.address+"register",
              {
                Email: this.form.email,
                // Password: this.form.password,
                Fullname:  this.form.fullname,
                // LastName: this.form.lastname,
                Gender: genderToSend,
                Age: Math.floor(this.form.age),
              }
            );
            console.log(response.data)
            if(response.data.message == 'User was added successfully'){

              // try {
              //   const response2 = await this.axios.post("https://coil2.cs.bgu.ac.il/login", {
              //     Email: this.form.email,
              //     Password: this.form.password,
              //   });

              //   const response3 = await this.axios.post("https://coil2.cs.bgu.ac.il/getFullname", {
              //     Email: this.form.email,
              //     });

                // if (response2.status == 200) {
                  const user = {
                    username: this.form.email,
                    u_id: response.data.Id,
                    isAdmin: response.data.IsAdmin,
                    fullname: response.data.FullName,
                    user_score: 0,
                    last_time: undefined,
                    is_submitted: 0,
                    is_done: 0,
                  };

                  localStorage.setItem("numRanked", 0);           
                  this.$root.store.numRanked = 0;

                  // const globalSettings = {
                  //   rankImages: response2.data.globalSettings.rankImages,
                  //   firstGameImages: response2.data.globalSettings.firstGameImages,
                  //   firstGameImagesSelected: response2.data.globalSettings.firstGameImagesSelected
                  // };
                  let reg = false;

                  while(!reg)
                  {
                    reg = this.$root.store.login(user);
                  }
                  this.$root.store.setGlobalSettings(response.data.globalSettings);

                  this.$root.toast("Register", "The user has registered successfully", "success");
                  this.$router.push("RatePage").catch(failure =>
            {
              console.log(failure);
              this.$router.push("RatePage");
            });

                  // this.$router.go(0);
                // }
              }
              // catch (err) {
              //   this.$root.toast("Register", "The user has registered unsuccessfully", "fail");
              // // axios.defaults.withCredentials = true;
              // }
            // }
            else{
              this.$root.toast("Register", response.data.message, "fail");
            }
      } catch (err) {
        console.log(err.response.data);
        this.form.submitError = err.response.data.message;
      }
    }
  },
  validations: {
    form: {
      fullname: {
        required
        // alpha
      },
      // lastname: {
      //   required,
      //   alpha
      // },
      email: {
        required,
        style: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
      },
      // password: {
      //   required,
      // },
      // confirmedPassword: {
      //   required,
      //   sameAsPassword: sameAs("password")
      // },
      gender: {
        required
      },
      age: {
        required,
        minMax: (v) => (v > 11 && v < 100),
        numeric
      }
    }
  },
}

</script>

<style scoped>
.center {
  margin: 0 auto;
}
.gradient-custom-3 {
  /* fallback for old browsers */
  /* background: #84fab0; */

  /* Chrome 10-25, Safari 5.1-6 */
  /* background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5)); */

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  /* background: linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5)); */

  height: 100%;
  overflow: auto;
  /* position: fixed; */

  /* Preserve aspet ratio */
  min-width: 100%;
  min-height: 100%;


}


.button-container{
  /* position: relative; */
  overflow: hidden !important;
  /* display: inline-block; */
}



.button-container a h3{
  display: inline-block;
  margin: auto;
  color: #fff;
  font-size: 20px;
  padding: 8px 155px;
  /*border: 1px solid;*/
  /* border-image-source: -webkit-linear-gradient(-45deg, rgb(255, 255, 255) 0%, rgb(255, 183, 183) 100%); */
  /* background: -webkit-linear-gradient(-45deg, rgb(248, 206, 196) 0%, rgb(241, 140, 115) 100%); */
  background: linear-gradient(to right, rgb(184, 224, 233), rgb(9, 118, 151));
}

.button-container a h3:after {
  content: "";
  position: absolute;
  top: -130%;
  left: -200%;
  width: 200%;
  height: 300%;
  opacity: 0;
  transform: skew(-40deg);
  background: rgb(98, 250, 232);
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.13) 77%, rgba(255, 255, 255, 0.5) 92%, rgba(255, 255, 255, 0.0) 100%);
}

.button-container a h3:hover:after {
  opacity: 1;
  /* top: 0%; */
  left: 30%;
  transition-property: left, top, opacity;
  transition-duration: 0.7s, 0.7s, 0.15s;
  transition-timing-function: ease;
}

.bg {
  /* background-image: url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.jpg'); */
  /* The image used */
  overflow: auto;

  /* Full height */
  height: 100%;
  position: fixed;

  /* Preserve aspet ratio */
  min-width: 100%;
  min-height: 100%;
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

}

/* .gender {
  margin-left: -2px;
} */

.btnn {
  cursor: pointer;
  /*
  text-align: center;
  margin: auto; */
  /* display: flex;
  justify-content: center; */
}
</style>