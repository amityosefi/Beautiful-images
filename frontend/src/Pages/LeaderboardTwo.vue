<template>
<div>
<br>
<h3 class="titleLeader">Game 2</h3>
<br>
    <b-table
      :items="this.leaders"
      :fields="fields"
      class="lead"
    ></b-table>

</div>
</template>

<script>
export default {
  name: "LeaderboardTwoPage",
data() {
    return {
        sortBy: 'TotalScore',
        sortDesc: false,
        fields: [
          { key: 'Index', label: 'Position', thClass: 'text-left', tdClass: 'text-left'},
          { key: 'FullName', label: 'Name', thClass: 'text-left', tdClass: 'text-left'},
          { key: 'TotalScore', label: 'Score', thClass: 'text-left', tdClass: 'text-left'},
        ],
        // fields: ['FullName', 'TotalScore'],
        selected: [],
        leaders: [],
        selectMode: "single",
    }
},
methods: {
onRowSelected(items) {
    this.selected = items;
},
async uploadLeaders() {
      try {
        const response = await this.axios.get(
          this.$root.store.address+`images/getLeadersTwo`
        );

        this.leaders = response.data;
        
        let user_index = -1;
        let user_score = -1;
        let username = this.$root.store.fullname;
        console.log(username);
        for (let i=0; i<this.leaders.length; i++) {
          if (this.leaders[i].FullName.localeCompare(username) == 0) {
            user_index = i+1;
            user_score = this.leaders[i].TotalScore;
            username = this.leaders[i].FullName;
            this.leaders[i]._rowVariant = 'secondary';
          }
          this.leaders[i]["Index"] = i+1;
        }

        let max_leaders_len = 10;

        if (this.leaders.length > max_leaders_len) {
          this.leaders = response.data.slice(0,max_leaders_len);
          if (user_index > max_leaders_len && user_index != -1) {
            let user_fields = {"FullName": username, "Index": user_index, "TotalScore": user_score, _rowVariant: 'secondary'}
            this.leaders.push(user_fields);
          }
        }

      } catch (err) {
        console.log(err.response);
      }
    },

},
created() {
    this.uploadLeaders();
}
}
</script>

<style>
template {
  margin: 4%;
}
/* #body{
  padding: 5%;
} */

.lead {
    margin: 0 auto;
    margin-top: 20px;
    font-size: 16px;
    width: 800px;
    /* height: 1000px; */
    /* text-align: right; */
}
</style>