<template>
  <div class="container is-widescreen">
    <div id="page" ref="content">
      <div class="header">
        <span class="logo"><img src="../assets/sundawn.png" alt="Welcome to the DAAWN tool" class="daawn-logo"></span>
        <p class="title is-3">Assessment Report</p>
      </div>

      <p class="text">Reaction times over 5 seconds are shown in red text.</p>

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
        <tr><th>Median Reaction Time</th><td>{{ reactionTimeMedian }}</td></tr>
        <tr><th>Median Response Time</th><td>{{ responseTimeMedian }}</td></tr>
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
                return this.returnMean(this.allResponseTimes);
            },
            reactionTimeMean : function () {
                return this.returnMean(this.allReactionTimes);
            },
            responseTimeMedian : function () {
                return this.returnMedian(this.allResponseTimes);
            },
            reactionTimeMedian : function () {
                return this.returnMedian(this.allReactionTimes);
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
                pdfService.createPDF(tableReactionData, tableSummaryData, tableProcessData, this.responseTimeMean, this.reactionTimeMean, this.responseTimeMedian, this.reactionTimeMedian);
            },
            createSummaryData(activeSet) {
                let totalCorrect = 0;
                let totalCorrectWithoutCue = 0;
                let count = 0;
                let countWithoutCue = 0;
                const letterCounts = {};
                const letterCountsWithoutCue = {};

                let tableSummaryData = [];
                for(let index in this.activeSet){
                    if(this.activeSet.hasOwnProperty(index)){

                        // add all the correct responses
                        if(this.activeSet[index].response_type === 1){
                          totalCorrect++;
                          if(!this.activeSet[index].hint_clicked){
                            totalCorrectWithoutCue++;
                          }
                        }

                        for(let i = 3; i < 10; i++){
                          if(this.activeSet[index].num_letters === i && this.activeSet[index].response_type === 1){
                            count++;
                            letterCounts['count'+ i+ 'letters'] = count;
                            if(!this.activeSet[index].hint_clicked){
                              countWithoutCue++;
                              letterCountsWithoutCue['count' + i + 'lettersCorrectWithoutCue'] = countWithoutCue;
                            }
                          }
                        }
                    }
                }
                if(this.mySet === 'four'){
                  tableSummaryData[0] = [ 'All items', 42, totalCorrect,  totalCorrectWithoutCue, this.calcPerCategory(totalCorrect, 42)];
                  tableSummaryData[1] = [ '3 letters', 21, letterCounts['count3letters'], letterCountsWithoutCue['count3lettersCorrectWithoutCue'], this.calcPerCategory(letterCounts['count3letters'], 21) ];
                  tableSummaryData[2] = [ '4 letters', 21, letterCounts['count4letters'], letterCountsWithoutCue['count4lettersCorrectWithoutCue'], this.calcPerCategory(letterCounts['count4letters'], 21) ];
                }
                else {
                  tableSummaryData[0] = [ 'All items', 30, totalCorrect, totalCorrectWithoutCue, this.calcPerCategory(totalCorrect, 30) ];
                  tableSummaryData[1] = [ '3 letters', 7, letterCounts['count3letters'], letterCountsWithoutCue['count3lettersCorrectWithoutCue'], this.calcPerCategory(letterCounts['count3letters'], 7) ];
                  tableSummaryData[2] = [ '4 letters', 7, letterCounts['count4letters'], letterCountsWithoutCue['count4lettersCorrectWithoutCue'], this.calcPerCategory(letterCounts['count4letters'], 7) ];
                  tableSummaryData[3] = [ '5 letters', 5, letterCounts['count5letters'], letterCountsWithoutCue['count5lettersCorrectWithoutCue'], this.calcPerCategory(letterCounts['count5letters'], 5) ];
                  tableSummaryData[4] = [ '6 letters', 4, letterCounts['count6letters'], letterCountsWithoutCue['count6lettersCorrectWithoutCue'], this.calcPerCategory(letterCounts['count6letters'], 6) ];
                  tableSummaryData[5] = [ '7 letters', 3, letterCounts['count7letters'], letterCountsWithoutCue['count7lettersCorrectWithoutCue'], this.calcPerCategory(letterCounts['count7letters'], 3) ];
                  tableSummaryData[6] = [ '8 letters', 2, letterCounts['count8letters'], letterCountsWithoutCue['count8lettersCorrectWithoutCue'], this.calcPerCategory(letterCounts['count8letters'], 2) ];
                  tableSummaryData[7] = [ '9 letters', 1, letterCounts['count9letters'], letterCountsWithoutCue['count9lettersCorrectWithoutCue'], this.calcPerCategory(letterCounts['count9letters'], 1) ];
                  tableSummaryData[8] = [ '10 letters', 1, letterCounts['count10letters'], letterCountsWithoutCue['count10lettersCorrectWithoutCue'], this.calcPerCategory(letterCounts['count10letters'], 1) ];
                }
                return tableSummaryData;
            },
            calcPerCategory(num, total){
              if(total !== 0) {
                return ((num/total) *100).toFixed(1);
              }
              return 0;
            },
            returnMean(times){
              let sum = 0;
              let numTimes = times.length;
              for(let index in times){
                sum += parseFloat(times[index]);
              }
              return (sum/numTimes).toFixed(2);
            },
            returnMedian(times) {
              let median = 0;
              let numTimes = times.length;
              times.sort();

              if(numTimes % 2 === 0){
                // average of two middle numbers
                median = (times[numTimes / 2 - 1] + times[numTimes / 2]) / 2;
              }
              else {
                median = times[(numTimes - 1) / 2];
              }
              return median;
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

  .text {
    margin: 0 0 20px 0;
  }

</style>
