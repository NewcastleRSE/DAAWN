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

      <h3>Sentence Copying</h3>

      <div class="response-table">
          <table class="table table-striped" >
          <tbody>
          <tr><th>Target Response</th><td>{{ this.sentenceData.expected_outcome }}</td></tr>
          <tr><th>Final Response</th><td>{{ this.sentenceData.actual_response }}</td></tr>
          <tr><th>Process Response</th><td>{{ this.sentenceData.processResponse }}</td></tr>
          <tr><th>Correct/Incorrect</th><td><img v-show="this.sentenceData.response_type ===1" src="dist/green-tick.png" alt="tick" class="tick-image"><img v-show="this.sentenceData.response_type===0" src="dist/cross.png" alt="tick" class="cross-image"></td></tr>
          <tr><th>Reaction Time</th><td>{{ this.sentenceData.reaction_time }}</td></tr>
          <tr><th>Response Time</th><td>{{ this.sentenceData.response_time }}</td></tr>
          <tr><th>Mean interkey typing speed</th><td>{{ sentenceInterkeyTimeMean }}</td></tr>
          <tr><th>Min keystrokes/<br>keystrokes + mouseclicks</th><td>{{ this.sentenceData.minKeypresses }}/{{ this.sentenceData.actualKeypresses}}</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Non Word Copying</h3>

      <div class="response-table">
          <table class="table table-striped" >
          <tbody>
          <tr><th>Target Response</th><td>{{ this.nonWordData.expected_outcome }}</td></tr>
          <tr><th>Final Response</th><td>{{ this.nonWordData.actual_response }}</td></tr>
          <tr><th>Process Response</th><td>{{ this.nonWordData.processResponse }}</td></tr>
          <tr><th>Correct/Incorrect</th><td><img v-show="this.nonWordData.response_type ===1" src="dist/green-tick.png" alt="tick" class="tick-image"><img v-show="this.nonWordData.response_type===0" src="dist/cross.png" alt="tick" class="cross-image"></td></tr>
          <tr><th>Reaction Time</th><td>{{  this.nonWordData.reaction_time }}</td></tr>
          <tr><th>Response Time</th><td>{{  this.nonWordData.response_time }}</td></tr>
          <tr><th>Mean interkey typing speed</th><td>{{ nonWordInterkeyTimeMean }}</td></tr>
          <tr><th>Min strokes/<br>keystrokes + mouseclicks</th><td>{{ this.nonWordData.minKeypresses }}/{{ this.nonWordData.actualKeypresses }}</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Typing and Editing Accuracy</h3>

      <table class="table table-striped">
        <thead>
        <tr><th>Text</th><th>No. Words</th><th>Correct Edited Words</th><th>Incorrect Edited Words</th><th>Correct Words</th><th>Incorrect Words</th></tr>
        </thead>
        <tbody>
        <tr v-for="item in allData">
          <td>{{ item.expected_outcome }}</td>
          <td>{{ item.wordLength  }} </td>
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
              sentenceData: [],
              nonWordData: [],
              sentenceResponseTime: '',
              nonWordResponseTime: '',
              sentenceReactionTime: '',
              nonWordReactionTime: '',
              sentenceKeyTimes: [],
              nonWordKeyTimes: []
            }
        },
        computed : {
            sentenceInterkeyTimeMean : function () {
                 return this.returnMean(this.sentenceKeyTimes);
            },
            nonWordInterkeyTimeMean : function () {
                return this.returnMean(this.nonWordKeyTimes);
            }
        },
        methods : {
            returnID() {
                this.id = localStorage.getItem('ID');
            },
            returnData() {
               this.sentenceData = JSON.parse(localStorage.getItem('1'));
               this.nonWordData = JSON.parse(localStorage.getItem('2'));
               this.sentenceData.processResponse = this.filter(this.sentenceData.processResponse);
               this.nonWordData.processResponse = this.filter(this.nonWordData.processResponse);
               this.allData = [this.sentenceData, this.nonWordData ];
               this.sentenceKeyTimes = this.calcInterkeyInterval(this.sentenceData);
               this.nonWordKeyTimes = this.calcInterkeyInterval(this.nonWordData);
            },
            filter(string){
                 let newstring = string.join(', ');
                 return newstring;
            },
            calcInterkeyInterval(data) {
                let timestampArray = [];
                let interkeyTimes = [];

                let json_response = data.json_process_response;
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
                        interkeyTimes.push(timePassed);
                    }
                }
                return interkeyTimes;
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
                            this.allData[index].response_type,
                            this.allData[index].reaction_time,
                            this.allData[index].response_time,
                            this.allData[index].minKeypresses,
                            this.allData[index].actualKeypresses
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
                copyTaskPdfService.createCopyTaskPDF(tableProcessData, tableWordAccuracy, this.responseTimeMean, this.reactionTimeMean, this.keyTimeMean, this.keyTimeMedian, this.nonWordInterkeyTimeMean, this.sentenceInterkeyTimeMean, this.id);
            },
            createJSON() {
              let data = JSON.stringify(this.allData);
              let datestr = this.getDate();
              dataService.download(data, "JSON-DATA-" + this.id + '-' + datestr, "text/plain");
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
        }
    }
</script>

<style scoped>

  h3 {
    font-size: 1.2em;
    padding: 20px 0;
  }

  #page {
    border: 1px solid #c4c4c4;
    border-radius: 25px;
    margin: 50px;
    background-color: #fff;
    padding: 30px;
  }

  .response-table {
    margin-bottom: 20px;
  }

  .response-table th {
    max-width: 150px;
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





</style>
