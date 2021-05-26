<template>
  <div class="container is-widescreen">
    <div id="page" ref="content">
      <div class="header">
        <span class="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" class="daawn-logo"></span>
        <p class="title is-3">Free Task Assessment Report</p>
      </div>

      <div class="content">
        <p>This report captures data on:</p>
        <ul>
          <li>typing speed</li>
          <li>keystroke logging</li>
      </ul>
      </div>

      <h3>Free Text Analysis</h3>

      <div class="response-table">
          <table class="table table-striped" >
          <tbody>

          <tr><th>Final Response</th><td>{{ this.textData.actual_response }}</td></tr>
          <tr><th>Process Response</th><td>{{ this.textData.processResponse }}</td></tr>
          <tr><th>Number of words</th><td>{{ this.numWords }}</td></tr>
          <tr><th>Reaction Time</th><td>{{ this.textData.reaction_time }}</td></tr>
          <tr><th>Response Time</th><td>{{ this.textData.response_time }}</td></tr>
          <tr><th>Mean interkey typing speed</th><td>{{ textDataInterkeyTimeMean }}</td></tr>
          <tr><th>Keystrokes + mouseclicks</th><td>{{ this.textData.keystrokes}} + {{ this.textData.num_mouse_clicks }}</td></tr>
          </tbody>
        </table>
      </div>


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
              id : '',
              textData: [],
              textResponseTime: '',
              textReactionTime: '',
              textKeyTimes: [],
              numWords: 0
            }
        },
        computed : {
            textDataInterkeyTimeMean : function () {
                 return this.returnMean(this.textKeyTimes);
            }
        },
        methods : {
            returnID() {
                this.id = localStorage.getItem('ID');
            },
            returnData() {
               this.textData = JSON.parse(localStorage.getItem('responseText'));
               this.textKeyTimes = this.calcInterkeyInterval(this.textData);
               let words = this.textData.actual_response.split(' ');
               this.numWords = words.length;
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
                            this.allData[index].keystrokes,
                            this.allData[index].num_mouse_clicks
                        ];
                    }
                }
               /* copyTaskPdfService.createCopyTaskPDF(tableProcessData, tableWordAccuracy, this.responseTimeMean, this.reactionTimeMean, this.keyTimeMean, this.keyTimeMedian, this.nonWordInterkeyTimeMean, this.sentenceInterkeyTimeMean, this.id); */
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
