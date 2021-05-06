<template>
  <div class="container is-widescreen">
    <div id="page" ref="content">
      <div class="header">
        <span class="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" class="daawn-logo"></span>
        <p class="title is-3">Copy Task Assessment Report</p>
      </div>

      <div class="content">
        <p>This report captures data on:</p>
        <ul>
          <li>typing speed</li>
          <li>keystroke logging</li>
          <li>accuracy</li>
      </ul>
      </div>


      <div class="response-table" v-for="item in allData">
          <table class="table table-striped" >
          <tbody>
          <tr><th>Expected Response</th><td>{{ item.expected_outcome }}</td></tr>
          <tr><th>Final Response</th><td>{{ item.actual_response }}</td></tr>
          <tr><th>Process Response</th><td>{{ item.processResponse }}</td></tr>
          <tr><th>Correct/Incorrect</th><td><img v-show="item.response_type ===1" src="dist/green-tick.png" alt="tick" class="tick-image"><img v-show="item.response_type===0" src="dist/cross.png" alt="tick" class="cross-image"></td></tr>
          </tbody>
        </table>
      </div>

      <div id="wordspeed">
        <table class="table">
          <caption>Overall time to complete/words</caption>
          <tr><th>Mean Typing Speed</th><td>{{ speedTimeMean }}</td></tr>
          <tr><th>Median Typing Speed</th><td>{{ speedTimeMedian }}</td></tr>
        </table>
      </div>


      <table class="table table-striped">
        <thead>
        <tr><th>Text</th><th>No. Words</th><th>Edited Words</th><th>Correct Words</th><th>Incorrect Words</th></tr>
        </thead>
        <tbody>
        <tr v-for="item in allData">
          <td><span v-bind:style="item.hint_clicked ? 'color: #eb9b34' : 'color: black' ">{{ item.expected_outcome }}</span></td>
          <td> {{  item.wordLength  }} </td>
          <td>{{ item.num_edited_words }}</td>
          <td>{{ item.num_correct_words }}</td>
          <td>{{ item.num_incorrect_words }}</td>
        </tr>
        </tbody>
      </table>
      <div class="level">
        <div class="level-item">
          <p class="btn-text">Please wait a few seconds after clicking either of the download buttons, your file is being generated.</p>
        </div>
      </div>

      <div class="level" >
        <div class="level-item">

          <div class="buttons-section form-group">
            <button class="button exit-btn" @click=exit()>Exit</button>
            <button class="button data-btn" @click=createJSON()>Download Raw Data</button>
            <button class="button next-btn" @click=createPDF()>Download PDF</button>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>

    import { settings } from "../settings";
    import { pdfService } from "../services/pdf.service";
    import { dataService } from "../services/data.service"

    export default {
        name: "CopyTaskReport",
        data() {
            return {
              data: settings.numTasksInSet,
              allData: [],
              allSpeedTimes: []
            }
        },
        computed : {
            speedTimeMean : function () {
                 return this.returnMean(this.allSpeedTimes);
            },
            speedTimeMedian : function () {
                return this.returnMedian(this.allSpeedTimes);
            }
        },
        methods : {
            returnData() {
               for(let i = 1; i <= this.data; i++){
                  let num = i.toString();
                  let data = JSON.parse(localStorage.getItem(num));
                  this.allData.push(data);
               }
            },
            fillSpeedTable(){
               this.filter(this.allData);
                for(let index in this.allData){
                    if(this.allData.hasOwnProperty(index)){
                        if(this.allData[index].averageSpeed !== undefined) {
                          this.allSpeedTimes.push(this.allData[index].averageSpeed);
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

                      let hinted_end_response = '';

                      // add a * to the actual response if hint clicked is true
                      if(this.activeSet[index].hint_clicked){
                        hinted_end_response = '*' + this.activeSet[index].actual_response;
                      }
                      else {
                        hinted_end_response = this.activeSet[index].actual_response;
                      }

                      tableReactionData[index] = [
                        this.activeSet[index].expected_outcome,
                        this.activeSet[index].response_type,
                        hinted_end_response,
                        this.activeSet[index].cat_score,
                        this.activeSet[index].dla_score,
                        this.activeSet[index].reaction_time,
                        this.activeSet[index].response_time
                      ];
                      tableProcessData[index] = [
                        this.activeSet[index].expected_outcome,
                        '[ ' + this.activeSet[index].processResponse + ' ]',
                        this.activeSet[index].num_letters,
                        this.activeSet[index].keystrokes,
                        this.activeSet[index].num_deletions
                      ];
                    }
                }
                let tableSummaryData = this.createSummaryData(this.activeSet);
                let tableCatSummaryData = this.createCatSummaryData(this.activeSet);
                pdfService.createPDF(tableReactionData, tableCatSummaryData, tableSummaryData, tableProcessData, this.responseTimeMean, this.reactionTimeMean, this.responseTimeMedian, this.reactionTimeMedian, this.id);
            },
            createJSON() {
              let data = JSON.stringify(this.activeSet);
              let datestr = this.getDate();
              dataService.download(data, "JSON-DATA-" + this.id + '-' + datestr, "text/plain");
            },
            createSummaryData(activeSet) {
            },
            createCatSummaryData(activeSet) {
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
            getDate() {
              let today = new Date();
              let year = today.getFullYear();
              let month = today.getMonth();
              month = parseInt(month)+ 1;
              let date = today.getDate();
              return date + '-' + month + '-' + year;
            },
            exit() {
              this.$router.push({ path: './' });
            }
        },
        mounted() {
            this.returnData();
            this.fillSpeedTable();
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

  #wordspeed {
     padding: 30px 0;
  }

  .response-table {
    margin-bottom: 20px;
  }

  .tick-image {
    height: 20px;
  }

  .cross-image {
    height: 18px;
  }

  .header {
    padding-bottom: 60px;
  }

  .next-btn {
    width: 150px;
  }

  .data-btn {
    width: 220px;
  }

  .logo {
    float:right;
  }

  .daawn-logo {
    height: 40px;

  }

  .btn-text {
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
