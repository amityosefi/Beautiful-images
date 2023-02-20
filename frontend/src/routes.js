// import Instructions from "./Pages/Instructions.vue";

const routes = [{
    path: "/",
    name: "HomePage",
    // component: Instructions
    component: () => import("./Pages/HomePage")
},
{
    path: "/Leaderboard",
    name: "Leaderboard",
    component: () => import("./Pages/Leaderboard")
},
{
    path: "/LeaderboardTwo",
    name: "LeaderboardTwo",
    component: () => import("./Pages/LeaderboardTwo")
},
{
    path: "/InstructionsPage",
    name: "InstructionsPage",
    component: () => import("./Pages/InstructionsPage")
},
{
    path: "/ReviewPage",
    name: "ReviewPage",
    component: () => import("./Pages/ReviewPage")
},
{
    path: "/MainPage",
    name: "MainPage",
    component: () => import("./Pages/MainPage")
},
{
    path: "/LastPage",
    name: "LastPage",
    component: () => import("./Pages/LastPage")
},
{
    path: "/register",
    name: "register",
    component: () => import("./Pages/RegisterPage")
},
{
    path: "/login",
    name: "login",
    component: () => import("./Pages/LoginPage")
},
{
    path: "/About",
    name: "About",
    component: () => import("./Pages/AboutPage")
},
{
    path: "/RatePage",
    name: "RatePage",
    component: () => import("./Pages/RatePage")
},
{
    path: "/FirstGamePage",
    name: "FirstGamePage",
    component: () => import("./Pages/FirstGamePage")
},
{
    path: "/SecondGamePage",
    name: "SecondGamePage",
    component: () => import("./Pages/SecondGamePage")
},
{
    path: "/StructionsFirstGame",
    name: "StructionsFirstGame",
    component: () => import("./Pages/StructionsFirstGame")
}, 
{
    path: "/AdminPage",
    name: "AdminPage",
    component: () => import("./Pages/AdminPage")
},
]

export default routes;