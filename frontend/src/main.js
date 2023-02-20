require('vue-select-image/dist/vue-select-image.css')
import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
// import JsonCSV from "vue-json-csv";
axios.defaults.withCredentials = true;
import './assets/style.css';
import routes from "./routes";
import VueRouter from "vue-router";
import { ModalPlugin } from 'bootstrap-vue'
import { VBModal } from 'bootstrap-vue'
// Note: Vue automatically prefixes the directive name with 'v-'
// import { TablePlugin } from 'bootstrap-vue'
// Vue.use(TablePlugin)
import { BTable } from 'bootstrap-vue'
import { FormRadioPlugin } from 'bootstrap-vue'
import { FormCheckboxPlugin } from 'bootstrap-vue'
Vue.use(FormCheckboxPlugin)
Vue.use(FormRadioPlugin)
Vue.use(ModalPlugin)
Vue.directive('b-modal', VBModal)
Vue.use(VueRouter);
// Vue.component("downloadCsv", JsonCSV);

const router = new VueRouter({
     routes
});

import Vuelidate from "vuelidate";
import vSelect from 'vue-select';

import VueSelectImage from 'vue-select-image'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
    FormGroupPlugin,
    FormPlugin,
    FormInputPlugin,
    ButtonPlugin,
    CardPlugin,
    NavbarPlugin,
    FormSelectPlugin,
    AlertPlugin,
    SpinnerPlugin,
    ToastPlugin,
    LayoutPlugin,
    // BFormTextarea,
    FormTextareaPlugin ,
    InputGroupPlugin,
    TablePlugin
} from "bootstrap-vue";
[
    FormGroupPlugin,
    FormPlugin,
    FormInputPlugin,
    ButtonPlugin,
    // BFormTextarea,
    FormTextareaPlugin ,
    CardPlugin,
    SpinnerPlugin,
    NavbarPlugin,
    SpinnerPlugin,
    FormSelectPlugin,
    AlertPlugin,
    ToastPlugin,
    LayoutPlugin,
    InputGroupPlugin,
    TablePlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);
Vue.use(VueSelectImage)
Vue.component('v-select', vSelect)
Vue.component('b-table', BTable)

axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = true;

const shared_data = {
    email: localStorage.email,
    u_id: localStorage.u_id,
    isAdmin: localStorage.isAdmin,
    fullname: localStorage.fullname,
    rankImages: localStorage.rankImages,
    firstGameImages: localStorage.firstGameImages,
    firstGameImagesSelected: localStorage.firstGameImagesSelected,
    isAgreed: localStorage.isAgreed,
    numRanked:undefined,
    RankedImages:undefined,
    unRankedImages:undefined,
    // address:'http://localhost:443/',
    address:'https://coil2.cs.bgu.ac.il/',
    user_score: localStorage.user_score,
    last_time: localStorage.last_time,
    is_submitted: localStorage.is_submitted,
    extra_pics: localStorage.extra_pics,
    is_done: localStorage.is_done,

  login(username) {
        if (username) {
            localStorage.setItem("email", username.username);
            this.email = username.username;
            localStorage.setItem("u_id", username.u_id);
            this.u_id = username.u_id;
            localStorage.setItem("isAdmin", username.isAdmin)
            this.isAdmin = username.isAdmin;
            localStorage.setItem("fullname", username.fullname)
            this.fullname = username.fullname;
            localStorage.setItem("user_score", username.user_score)
            this.user_score = username.user_score;
            localStorage.setItem("last_time", username.last_time);
            this.last_time = username.last_time;
            localStorage.setItem("numRanked", username.numRanked);
            this.numRanked = username.numRanked;
            localStorage.setItem("is_submitted",Boolean(username.is_submitted))
            this.is_submitted = Boolean(username.is_submitted);
            localStorage.setItem("is_done",Boolean(username.is_done))
            this.is_done = Boolean(username.is_done);
            if(username.ranked && username.ranked.length > 0)
            {
                localStorage.setItem("RankedImages",JSON.stringify(username.ranked))
                this.RankedImages = JSON.stringify(username.ranked);
            }
            if(username.unranked  )
            {
                localStorage.setItem("unRankedImages",JSON.stringify(username.unranked))
                this.unRankedImages = JSON.stringify(username.unranked);
            }
            if(username.extras && username.extras.length > 0)
            {
                localStorage.setItem("extra_pics",JSON.stringify(username.extras))
                this.extra_pics = JSON.stringify(username.extras);
            }
            
            
            
            console.log("user details", this);
            console.log("is submitted?", Boolean(this.is_submitted))
            console.log("is_done?", Boolean(this.is_done))

            return true;        
        }
        return undefined;
    },
     logout() {
        
        localStorage.removeItem("u_id");
        this.u_id = undefined;
        localStorage.removeItem("email");
        this.email = undefined;
        localStorage.removeItem("isAdmin");
        this.isAdmin = undefined;
        localStorage.removeItem("fullname");
        this.fullname = false;
        localStorage.removeItem("user_score");
        this.user_score = undefined;
        localStorage.removeItem("last_time");
        this.last_time = undefined;
        localStorage.removeItem("numRanked");
        this.numRanked = undefined;
        localStorage.removeItem("RankedImages");
        this.RankedImages = undefined;
        localStorage.removeItem("unRankedImages");
        this.unRankedImages = undefined;
        localStorage.removeItem("today_score");
        this.today_score = undefined;
        this.is_submitted = false;
        localStorage.removeItem("is_submitted");
        this.is_done = false;
        localStorage.removeItem("is_done");
        console.log("logout");
    },
    setGlobalSettings(globalSettings){
        localStorage.setItem("rankImages", globalSettings.rankImages);
        this.rankImages = globalSettings.rankImages;
        localStorage.setItem("firstGameImages", globalSettings.firstGameImages);
        this.firstGameImages = globalSettings.firstGameImages;
        localStorage.setItem("firstGameImagesSelected", globalSettings.firstGameImagesSelected)
        this.firstGameImagesSelected = globalSettings.firstGameImagesSelected;
        console.log("setGlobalSettings", this.rankImages, this.firstGameImages, this.firstGameImagesSelected);
    },
    setUserScoreAndDate(score1){
        localStorage.setItem("today_score", Number(score1));
        this.today_score = score1;

        localStorage.user_score = Number(localStorage.user_score)+Number(score1);
        this.user_score = Number(localStorage.user_score);
        const now = new Date().getDate() + "-" + String(Number(new Date().getMonth()) + 1) + "-" + new Date().getFullYear();
        localStorage.setItem("last_time", now);
        this.last_time = now;
    },
};
if(localStorage.is_submitted)
{
    shared_data.is_submitted = JSON.parse(localStorage.is_submitted);
    console.log(shared_data.is_submitted)
}
if(localStorage.is_done)
{
    shared_data.is_done = JSON.parse(localStorage.is_done);
    console.log(shared_data.is_done)
}
// shared_data.username = "s" 

new Vue({
    router,
    data() {
        return {
            store: shared_data
        };
    },
    methods: {
        toast(title, content, variant = null, append = false) {
            this.$bvToast.toast(`${content}`, {
                title: `${title}`,
                toaster: "b-toaster-top-center",
                variant: variant,
                solid: true,
                appendToast: append,
                autoHideDelay: 6000
            });
        }
    },
    render: (h) => h(App)
}).$mount("#app");