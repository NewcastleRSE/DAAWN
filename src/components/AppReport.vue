<template>
  <div class="container is-widescreen">
    <div id="page" ref="content">
      <div class="header">
        <span class="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" class="daawn-logo"></span>
        <p class="title is-3">Assessment Report</p>
      </div>

      <p class="toptext">Reaction times over 5 seconds are shown in <span id="red">red text</span>.</p>

      <table class="table table-striped" >
        <thead>
        <tr><th>Item</th><th>Correct/Incorrect</th><th>End Response</th><th>CAT</th><th>LD</th><th>Reaction Time</th><th>Response Time</th></tr>
        </thead>
        <tbody>
        <tr v-for="item in activeSet">
          <td>{{ item.expected_outcome }}</td>
          <td><img v-show="item.response_type ===1" src="dist/green-tick.png" alt="tick" id="tick-image"><img v-show="item.response_type===0" src="dist/cross.png" alt="tick" id="cross-image"></td>
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

      <p class="midtext">Items that were completed using the <span class="special">Hint</span> facility are shown in <span id="amber">amber text.</span> A star (*) in the process response indicates where the first letter was provided.</p>

      <table class="table table-striped">
        <thead>
        <tr><th>Item</th><th>Process Response</th><th>No. Letters</th><th>Keystrokes</th><th>No. Deletions</th></tr>
        </thead>
        <tbody>
        <tr  v-for="item in activeSet">
          <td><span v-bind:style="item.hint_clicked ? 'color: #eb9b34' : 'color: black' ">{{ item.expected_outcome }}</span></td>
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
                        if(this.activeSet[index].reaction_time !== undefined) {
                          this.allReactionTimes.push(this.activeSet[index].reaction_time);
                        }
                        if(this.activeSet[index].response_time !== undefined){
                          this.allResponseTimes.push(this.activeSet[index].response_time);
                        }
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
                pdfService.createPDF(tableReactionData, tableSummaryData, tableProcessData, this.responseTimeMean, this.reactionTimeMean, this.responseTimeMedian, this.reactionTimeMedian);
            },
            createSummaryData(activeSet) {
                let totalCorrect = 0;
                let totalCorrectWithoutCue = 0;
                let count3letters = 0;
                let count4letters = 0;
                let count5letters = 0;
                let count6letters = 0;
                let count7letters = 0;
                let count8letters = 0;
                let count9letters = 0;
                let count10letters = 0;
                let count3lettersCorrect = 0;
                let count4lettersCorrect = 0;
                let count5lettersCorrect = 0;
                let count6lettersCorrect = 0;
                let count7lettersCorrect = 0;
                let count8lettersCorrect = 0;
                let count9lettersCorrect = 0;
                let count10lettersCorrect = 0;
                let count3lettersCorrectWithoutCue = 0;
                let count4lettersCorrectWithoutCue = 0;
                let count5lettersCorrectWithoutCue = 0;
                let count6lettersCorrectWithoutCue = 0;
                let count7lettersCorrectWithoutCue = 0;
                let count8lettersCorrectWithoutCue = 0;
                let count9lettersCorrectWithoutCue = 0;
                let count10lettersCorrectWithoutCue = 0;

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

                        switch(this.activeSet[index].num_letters){
                            case 3:
                                count3letters++;
                                  if(this.activeSet[index].response_type === 1){
                                    count3lettersCorrect++;
                                    if(!this.activeSet[index].hint_clicked){
                                      count3lettersCorrectWithoutCue++;
                                    }
                                }
                                break;
                            case 4:
                                count4letters++;
                                if(this.activeSet[index].response_type === 1){
                                    count4lettersCorrect++;
                                    if(!this.activeSet[index].hint_clicked){
                                      count4lettersCorrectWithoutCue++;
                                    }
                                }
                                break;
                            case 5:
                                count5letters++;
                                if( this.activeSet[index].response_type === 1){
                                    count5lettersCorrect++;
                                    if(!this.activeSet[index].hint_clicked){
                                      count5lettersCorrectWithoutCue++;
                                    }
                                }
                                break;
                            case 6:
                                count6letters++;
                                if(this.activeSet[index].response_type === 1){
                                    count6lettersCorrect++;
                                    if(!this.activeSet[index].hint_clicked){
                                      count6lettersCorrectWithoutCue++;
                                    }
                                }
                                break;
                            case 7:
                                count7letters++;
                                if(this.activeSet[index].response_type === 1){
                                    count7lettersCorrect++;
                                    if(!this.activeSet[index].hint_clicked){
                                      count7lettersCorrectWithoutCue++;
                                    }
                                }
                                break;
                            case 8:
                                count8letters++;
                                if(this.activeSet[index].response_type === 1){
                                    count8lettersCorrect++;
                                    if(!this.activeSet[index].hint_clicked){
                                      count8lettersCorrectWithoutCue++;
                                    }
                                }
                                break;
                            case 9:
                                count9letters++;
                                if(this.activeSet[index].response_type === 1){
                                    count9lettersCorrect++;
                                    if(!this.activeSet[index].hint_clicked){
                                      count9lettersCorrectWithoutCue++;
                                    }
                                }
                                break;
                            case 10:
                                count10letters++;
                                if(this.activeSet[index].response_type === 1){
                                    count10lettersCorrect++;
                                    if(!this.activeSet[index].hint_clicked){
                                      count10lettersCorrectWithoutCue++;
                                    }
                                }
                                break;
                        }

                   }
                }
                if(this.mySet === 'four'){

                  let allItems = count3letters + count4letters;
                  tableSummaryData[0] = [ 'All items', allItems, totalCorrect,  totalCorrectWithoutCue, this.calcPerCategory(totalCorrect, allItems)];
                  tableSummaryData[1] = [ '3 letters', count3letters, count3lettersCorrect, count3lettersCorrectWithoutCue, this.calcPerCategory(count3lettersCorrect, count3letters) ];
                  tableSummaryData[2] = [ '4 letters', count4letters, count4lettersCorrect, count4lettersCorrectWithoutCue, this.calcPerCategory(count4lettersCorrect, count4letters) ];
                }
                else {

                  let allItems = count3letters + count4letters + count5letters + count6letters + count7letters + count8letters + count9letters + count10letters;
                  tableSummaryData[0] = [ 'All items', allItems, totalCorrect, this.calcPerCategory(totalCorrect, allItems), totalCorrectWithoutCue ];
                  tableSummaryData[1] = [ '3 letters', count3letters, count3lettersCorrect, this.calcPerCategory(count3lettersCorrect, count3letters),  count3lettersCorrectWithoutCue ];
                  tableSummaryData[2] = [ '4 letters', count4letters, count4lettersCorrect, this.calcPerCategory(count4lettersCorrect, count4letters),  count4lettersCorrectWithoutCue ];
                  tableSummaryData[3] = [ '5 letters', count5letters, count5lettersCorrect, this.calcPerCategory(count5lettersCorrect, count5letters), count5lettersCorrectWithoutCue ];
                  tableSummaryData[4] = [ '6 letters', count6letters, count6lettersCorrect, this.calcPerCategory(count6lettersCorrect, count6letters), count6lettersCorrectWithoutCue ];
                  tableSummaryData[5] = [ '7 letters', count7letters, count7lettersCorrect, this.calcPerCategory(count7lettersCorrect, count7letters), count7lettersCorrectWithoutCue ];
                  tableSummaryData[6] = [ '8 letters', count8letters, count8lettersCorrect, this.calcPerCategory(count8lettersCorrect, count8letters), count8lettersCorrectWithoutCue, ];
                  tableSummaryData[7] = [ '9 letters', count9letters, count9lettersCorrect, this.calcPerCategory(count9lettersCorrect, count9letters), count9lettersCorrectWithoutCue  ];
                  tableSummaryData[8] = [ '10 letters', count10letters, count10lettersCorrect, this.calcPerCategory(count10lettersCorrect, count10letters), count10lettersCorrectWithoutCue ];
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
                median = ( parseFloat(times[numTimes / 2 - 1]) + parseFloat(times[numTimes / 2]) / 2).toFixed(2);
              }
              else {
                median = parseFloat(times[(numTimes - 1) / 2]);
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
    margin: 30px 0 0 0;
  }

  .toptext {
    margin-bottom: 40px;
  }

  .toptext #red {
    color: red;
  }

  .midtext {
    margin: 45px 0;
  }

  #amber {
    color: #eb9b34;
  }

</style>
