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
          <caption>Overall time to complete text</caption>
          <tr><th>Mean Reaction Time</th><td>{{ reactionTimeMean }}</td></tr>
          <tr><th>Mean Response Time</th><td>{{ responseTimeMean }}</td></tr>
        </table>
      </div>

       <div id="keyspeed">
        <table class="table">
          <caption>Interkey typing speeds</caption>
          <tr><th>Mean Key Typing Speed</th><td>{{ keyTimeMean }}</td></tr>
          <tr><th>Median Key Typing Speed</th><td>{{ keyTimeMedian }}</td></tr>
        </table>
      </div>



      <table class="table table-striped">
        <thead>
        <tr><th>Text</th><th>No. Words</th><th>Correct Edited Words</th><th>Incorrect Edited Words</th><th>Correct Words</th><th>Incorrect Words</th></tr>
        </thead>
        <tbody>
        <tr v-for="item in allData">
          <td><span v-bind:style="item.hint_clicked ? 'color: #eb9b34' : 'color: black' ">{{ item.expected_outcome }}</span></td>
          <td> {{  item.wordLength  }} </td>
          <td>{{ item.num_correct_edited_words }}</td>
          <td>{{ item.num_incorrect_edited_words }}</td>
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
    import { copyTaskPdfService } from "../services/copytaskpdf.service";
    import { dataService } from "../services/data.service"

    export default {
        name: "CopyTaskReport",
        data() {
            return {
              data: settings.numTasksInSet,
              id : '',
              allData: [],
              allResponseTimes: [],
              allReactionTimes: [],
              allKeyTimes: []
            }
        },
        computed : {
            responseTimeMean : function () {
                return this.returnMean(this.allResponseTimes);
            },
            reactionTimeMean : function () {
                return this.returnMean(this.allReactionTimes);
            },
            keyTimeMean : function () {
                 return this.returnMean(this.allKeyTimes);
            },
            keyTimeMedian : function () {
                return this.returnMedian(this.allKeyTimes);
            }
        },
        methods : {
            returnID() {
                this.id = localStorage.getItem('ID');
            },
            returnData() {
                for(let i = 1; i <= this.data; i++){
                    let num = i.toString();
                    let data = JSON.parse(localStorage.getItem(num));
                    this.allData.push(data);
                }
            },
            fillTextTable(){
                this.filter(this.allData);
                for(let index in this.allData){
                    if(this.allData.hasOwnProperty(index)){
                        if(this.allData[index].reaction_time !== undefined) {
                            this.allReactionTimes.push(this.allData[index].reaction_time);
                        }
                        if(this.allData[index].response_time !== undefined){
                          this.allResponseTimes.push(this.allData[index].response_time);
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
            calcInterkeyInterval() {
                let timestampArray = [];
                for(let index in this.allData){
                    if(this.allData.hasOwnProperty(index)){
                        if(this.allData[index].json_process_response !== undefined) {
                            // get the json process response data
                            let json_response = this.allData[index].json_process_response;
                            for(let item in json_response){
                                if(json_response.hasOwnProperty(item))
                                {
                                   timestampArray.push(json_response[item].timestamp);
                                }
                            }

                            for(let i = 0; i < timestampArray.length; i++) {
                                // check its not out of range
                                if(timestampArray[i+1] !== undefined){
                                    let timePassed = this.calcTimePassed(timestampArray[i], timestampArray[i+1]);
                                    this.allKeyTimes.push(timePassed);
                                }
                            }
                        }
                    }
                }
            },
             // compares 2 timestamps, returns an integer
            calcTimePassed(startTime, newTime){
                let diff=(newTime-startTime)/1000;
                // truncates to 4 decimal places
                let timePassed=diff.toFixed(4);
                return timePassed;
            },
            createPDF() {
                let tableProcessData = [];
                let tableWordAccuracy = [];

                for(let index in this.allData){
                    if(this.allData.hasOwnProperty(index)){
                        tableProcessData[index] = [
                            this.allData[index].expected_outcome,
                            this.allData[index].actual_response,
                            this.allData[index].processResponse,
                            this.allData[index].response_type
                        ];
                    }
                }

                for(let index in this.allData){
                    if(this.allData.hasOwnProperty(index)){
                         let textType = ''
                         if(index === '0'){
                            textType = 'Real words'
                         }
                         else {
                            textType = 'Non words'
                         }
                         tableWordAccuracy[index] = [
                            textType,
                            this.allData[index].wordLength,
                            this.allData[index].num_correct_edited_words,
                            this.allData[index].num_incorrect_edited_words,
                            this.allData[index].num_correct_words,
                            this.allData[index].num_incorrect_words
                        ];
                    }
                }

                console.log(tableWordAccuracy);

                let tableSummaryData = this.createSummaryData(this.allData);
                let tableCatSummaryData = this.createCatSummaryData(this.allData);
                copyTaskPdfService.createCopyTaskPDF(tableProcessData, tableWordAccuracy, this.responseTimeMean, this.reactionTimeMean, this.keyTimeMean, this.keyTimeMedian, this.id);
            },
            createJSON() {
              let data = JSON.stringify(this.allData);
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
            this.fillTextTable();
            this.calcInterkeyInterval();
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

  #wordspeed  {
     padding: 30px 0;
  }

  #keyspeed {
      padding: 30px 0 50px 0;
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
