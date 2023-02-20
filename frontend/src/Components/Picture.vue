<template>
<div>
    <div v-if="draggable"> 
        <img id ="pic2" v-bind:src = this.link>
    </div>
    <div v-else> 
        <img id ="pic" v-bind:src = this.link>
    </div>
</div>
</template>

<script>
    export default
    {
        name : "picture",
        data() {
        return {
        dialog: null
        }
        },
        props:
        {
            link:
            {
                type: String,
                require: false,
                default:"http://somethingstudio.co.il/wp-content/uploads/2017/12/logo-something.png"
            },
            id:
            {
                type: Number,
                require:false,
            },
            draggable:
            {
                type: Boolean,
                require:true
            }
        },
        methods:
        {
            // async Zoom()
            // {
            //     let start =new Date(localStorage.start_time);
            //     let end = new Date();
            //     // console.log(Date.parse(start),Date.parse(end));
            //     // let diff = (Date.parse(end) - Date.parse(start))/1000;
            //     let diff = end.getTime() - start.getTime();
            //     let url = this.link;
            //     try {
                    
                    
            //         const response = await this.axios.post(
            //         `http://localhost:3001/images/timestamp`,
            //         {
            //             "diff": diff,
            //             "PicURL": url
            //         });
                    
                    
            //         console.log(response);    
                
            //     }
            //     catch(err){
            //         console.log("There was a problem", err)
            //     }
            //     this.$router.push({name:"FullImagePage",params:{data: url} });
                
            // }
        }
    }
</script>
<style scoped>
#pic
{
    width:150px;
    height:85px;
    
    
}
#pic2
{
    width:100%;
    height:55px;
    
    
}
#pic:hover
{
    box-shadow: 2px 2px 2px 2px grey;
    cursor:pointer;
}
.dialog
{
     position: fixed
}

</style>
