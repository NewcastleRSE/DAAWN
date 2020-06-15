<template>
  <div class="container is-widescreen">
    <div id="page" ref="content">
      <div class="header">
        <span class="logo"><img src="../assets/sundawn.png" alt="Welcome to the DAAWN tool" class="daawn-logo"></span>
        <p class="title is-3">Assessment Report</p>
      </div>

      <table class="table table-striped" >
        <thead>
        <tr><th>Item</th><th>Correct/Incorrect</th><th>End Response</th><th>CAT</th><th>LD</th><th>Reaction Time</th><th>Response Time</th></tr>
        </thead>
        <tbody>
        <tr v-for="item in activeSet">
          <td>{{ item.expected_outcome }}</td>
          <td><img v-show="item.response_type ===1" src="../assets/green-tick.png" alt="tick" id="tick-image"><img v-show="item.response_type===0" src="../assets/cross.png" alt="tick" id="cross-image"></td>
          <td>{{ item.actual_response }}</td>
          <td>{{ item.cat_score }}</td>
          <td>{{ item.dla_score }}</td>
          <td><span v-bind:style="item.reaction_time > 5 ? 'color: red;' : 'color: black;' ">{{ item.reaction_time }}</span></td>
          <td>{{ item.response_time }}</td>
        </tr>
        </tbody>
      </table>

      <table class="table">
        <tr><th>Mean Reaction Time</th><td>{{ reactionTimeMean }}</td></tr>
        <tr><th>Mean Response Time</th><td>{{ responseTimeMean }}</td></tr>
      </table>

      <table class="table table-striped">
        <thead>
        <tr><th>Item</th><th>Process Response</th><th>No. Letters</th><th>Keystrokes</th><th>No. Deletions</th></tr>
        </thead>
        <tbody>
        <tr  v-for="item in activeSet">
          <td>{{ item.expected_outcome }}</td>
          <td>[ {{  item.processResponse }} ]</td>
          <td>{{ item.num_letters }}</td>
          <td>{{ item.keystrokes }}</td>
          <td>{{ item.num_deletions }}</td>
        </tr>
        </tbody>
      </table>
      <div class="level">
        <div class="level-item">
          <p class="text">Please wait a few seconds after clicking the download button, your PDF is being generated.</p>
        </div>
      </div>

      <div class="level" >
        <div class="level-item">

          <div class="buttons-section form-group">
            <button class="button exit-btn" @click=exit()>Exit</button>
            <button class="button next-btn" @click=createPDF()>Download PDF</button>
          </div>

        </div>
      </div>
      </div>
    </div>

</template>

<script>

    import {settings} from "../settings";
    import {pdfService} from "../services/pdf.service";

    export default {
        name: "AppReport",
        data() {
            return {
              currentSet: [],
              activeSet: [],
              mySet: [],
              allResponseTimes: [],
              allReactionTimes: []
            }
        },
        computed : {
           responseTimeMean : function () {
             let sum = 0;
             let numResponseTimes = this.allResponseTimes.length;
             for(let index in this.allResponseTimes){
                 sum += parseFloat(this.allResponseTimes[index]);
             }
             return (sum/numResponseTimes).toFixed(2);
           },
            reactionTimeMean : function () {
              let sum = 0;
              let numReactionTimes = this.allReactionTimes.length;
              for(let index in this.allReactionTimes){
                sum += parseFloat(this.allReactionTimes[index]);
              }
              return (sum/numReactionTimes).toFixed(2);
            }
        },
        methods : {
            fillCatTable(){
                for(let index in this.currentSet){
                    if(this.currentSet.hasOwnProperty(index)){
                      if(localStorage.getItem(this.currentSet[index]) !== null){
                        this.activeSet.push(JSON.parse(localStorage.getItem(this.currentSet[index])));
                      }
                    }
                }
               this.filter(this.activeSet);
                for(let index in this.activeSet){
                  if(this.activeSet.hasOwnProperty(index)){
                     this.allReactionTimes.push(this.activeSet[index].reaction_time);
                     this.allResponseTimes.push(this.activeSet[index].response_time)
                  }
                }
            },
            filter(set){
              for(let item in set){
                if(set.hasOwnProperty(item)){
                   let string = set[item].processResponse;
                    set[item].processResponse = string.join(', ');
                }
              }
            },
            createPDF() {
                let tableReactionData = [];
                let tableProcessData = [];
                for(let index in this.activeSet){
                    if(this.activeSet.hasOwnProperty(index)){
                      tableReactionData[index] = [this.activeSet[index].expected_outcome, this.activeSet[index].response_type, this.activeSet[index].actual_response, this.activeSet[index].cat_score, this.activeSet[index].dla_score, this.activeSet[index].reaction_time, this.activeSet[index].response_time];
                      tableProcessData[index] = [this.activeSet[index].expected_outcome, '[ ' + this.activeSet[index].processResponse + ' ]', this.activeSet[index].num_letters, this.activeSet[index].keystrokes, this.activeSet[index].num_deletions];
                    }
                }
                let tableSummaryData = this.createSummaryData(this.activeSet);
                console.log(tableSummaryData);
                pdfService.createPDF(tableReactionData, tableSummaryData, tableProcessData, this.responseTimeMean, this.reactionTimeMean);
            },
            createSummaryData(activeSet) {
                let totalCorrect = 0;
                let count3letters = 0;
                let count4letters = 0;
                let count5letters = 0;
                let count6letters = 0;
                let count7letters = 0;
                let count8letters = 0;
                let count9letters = 0;
                let count10letters = 0;

                let tableSummaryData = [];
                for(let index in this.activeSet){
                    if(this.activeSet.hasOwnProperty(index)){

                        // add all the correct responses
                        if(this.activeSet[index].response_type === 1){
                          totalCorrect++
                        }

                        // add correct reponses by letter count
                        if(this.activeSet[index].num_letters === 3 && this.activeSet[index].response_type === 1){
                          count3letters++;
                        }
                        else if(this.activeSet[index].num_letters === 4 && this.activeSet[index].response_type === 1){
                          count4letters++;
                        }
                        else if(this.activeSet[index].num_letters === 5 && this.activeSet[index].response_type === 1){
                          count5letters++;
                        }
                        else if(this.activeSet[index].num_letters === 6 && this.activeSet[index].response_type === 1){
                          count6letters++;
                        }
                        else if(this.activeSet[index].num_letters === 7 && this.activeSet[index].response_type === 1){
                          count7letters++;
                        }
                        else if(this.activeSet[index].num_letters === 8 && this.activeSet[index].response_type === 1){
                          count8letters++;
                        }
                        else if(this.activeSet[index].num_letters === 9 && this.activeSet[index].response_type === 1){
                          count9letters++;
                        }
                        else if(this.activeSet[index].num_letters === 10 && this.activeSet[index].response_type === 1){
                          count10letters++;
                        }
                    }
                }
                if(this.mySet === 'four'){
                  tableSummaryData[0] = [ 'All items', 42, totalCorrect, this.calcPerCategory(totalCorrect, 42)];
                  tableSummaryData[1] = [ '3 letters', 21, count3letters, this.calcPerCategory(count3letters, 21) ];
                  tableSummaryData[2] = [ '4 letters', 21, count4letters, this.calcPerCategory(count4letters, 21) ];
                }
                else {
                  tableSummaryData[0] = [ 'All items', 30, totalCorrect, this.calcPerCategory(totalCorrect, 30)];
                  tableSummaryData[1] = [ '3 letters', 7, count3letters, this.calcPerCategory(count3letters, 7) ];
                  tableSummaryData[2] = [ '4 letters', 7, count4letters, this.calcPerCategory(count4letters, 7) ];
                  tableSummaryData[3] = [ '5 letters', 5, count5letters, this.calcPerCategory(count5letters, 5) ];
                  tableSummaryData[4] = [ '6 letters', 4, count6letters, this.calcPerCategory(count6letters, 6) ];
                  tableSummaryData[5] = [ '7 letters', 3, count7letters, this.calcPerCategory(count7letters, 3) ];
                  tableSummaryData[6] = [ '8 letters', 2, count8letters, this.calcPerCategory(count8letters, 2) ];
                  tableSummaryData[7] = [ '9 letters', 1, count9letters, this.calcPerCategory(count9letters, 1) ];
                  tableSummaryData[8] = [ '10 letters', 1, count10letters, this.calcPerCategory(count10letters, 1) ];
                }
                return tableSummaryData;
            },
            calcPerCategory(num, total){
              if(total !== 0) {
                return ((num/total) *100).toFixed(1);
              }
              return 0;
            },
            exit() {
              this.$router.push({ path: './' });
            }
        },
        created() {
            this.mySet = localStorage.getItem('set');
            if(this.mySet === 'one'){
              this.currentSet = settings.setOne;
            }
            else if(this.mySet === 'two'){
              this.currentSet = settings.setTwo;
            }
            else if(this.mySet === 'three'){
              this.currentSet = settings.setThree;
            }
            else if(this.mySet === 'four'){
              this.currentSet = settings.setFour;
            }
            this.fillCatTable();
        }
    }
</script>

<style scoped>

  #page {
    border: 1px solid #c4c4c4;
    border-radius: 25px;
    margin: 50px;
    background-color: #fff;
    padding: 30px;
  }

  #tick-image {
    height: 20px;
  }

  #cross-image {
    height: 18px;
  }

  .header {
    padding-bottom: 60px;
  }

  .next-btn {
    width: 150px;
  }

  .logo {
    float:right;
  }

  .daawn-logo {
    height: 40px;

  }

</style>
