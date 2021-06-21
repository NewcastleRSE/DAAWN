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
      <div class="option" v-show="option === 'address'">Write your <strong>address</strong></div>
      <div class="option" v-show="option === 'list'">Write a <strong>shopping list</strong></div>
      <div class="option" v-show="option === 'names'">Write the <strong>names</strong> of your <strong>family members</strong></div>
      <div class="option" v-show="option === 'social-media'">Write a <strong>social media comment</strong></div>
      <div class="option" v-show="option === 'text'">Reply to a <strong>text message</strong></div>
      <div class="option" v-show="option === 'diary'">Write a <strong>diary entry</strong> for yesterday</div>
      <div class="option" v-show="option === 'email'">Write an <strong>email</strong> to a <strong>friend</strong> to tell them <strong>how you are</strong> and what you <strong>have been doing</strong></div>
      <div class="option" v-show="option === 'important'">Write about <strong>something important</strong> to you</div>
      <div class="option" v-show="option === 'story'">Tell the <strong>story</strong> of this picture</div>


      <div class="response-table">
          <table class="table table-striped" >
          <tbody>

          <tr><th>Final Response</th><td>{{ this.textData.actual_response }}</td></tr>
          <tr><th>Process Response</th><td>{{ this.textData.processResponse }}</td></tr>
          <tr><th>Number of words</th><td>{{ this.numWords }}</td></tr>
         <!-- <tr><th>Unedited words</th><td>{{ this.numEditedWords }}</td></tr> -->
          <tr><th>Reaction Time</th><td>{{ this.textData.reaction_time }}</td></tr>
          <tr><th>Response Time</th><td>{{ this.textData.response_time }}</td></tr>
          <tr><th>Mean interkey typing speed</th><td>{{ textDataInterkeyTimeMean }}</td></tr>
          <tr><th>Min number of keystrokes required</th><td>{{ minKeystrokes }}</td></tr>
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
          <div>
            <button class="button data-btn" @click=createJSON()>Download Raw Data</button>
            <button class="button next-btn" @click=createPDF()>Download PDF</button>
          </div>
           <div class="buttons-section form-group">
            <button class="button exit-btn" @click=exit()>Exit</button>
            <button class="button back-btn" @click=back()>Select another DAAWN task</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

    import {  freeTaskPdfService } from "../services/freetaskpdf.service";
    import { dataService } from "../services/data.service"

    export default {
        name: "CopyTaskReport",
        data() {
            return {
              id : '',
              option: '',
              textData: [],
              textResponseTime: '',
              textReactionTime: '',
              textKeyTimes: [],
              numWords: 0,
              numEditedWords: 0,
              minKeystrokes : 0
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
            returnOption(){
                this.option = localStorage.getItem('option');
            },
            returnData() {
               this.textData = JSON.parse(localStorage.getItem('responseText'));
               this.textKeyTimes = this.calcInterkeyInterval(this.textData.json_process_response);

               let charArray = Array.from(this.textData.actual_response);
               this.minKeystrokes = charArray.length;

               let responseString = this.textData.actual_response.replace(/,/g, "");
               // replace carriage returns with spaces
               responseString = responseString.replace(/[\n\r]/g, ' ');
               let words = this.splitString(responseString);
               this.numWords = words.length;
               // TODO
               /* let uneditedWords = this.findEditedWords(this.textData.processResponse, words); */
            },
            convert(string){
                 let newstring = string.join(' ');
                 return newstring;
            },
            splitString(str){
               return str.split(' ');
            },
             // TODO - not accurate enough as it is
            findEditedWords(process_response, final_response){

                // creates clone, not a reference to the original array
                let copiedPResponse = JSON.parse(JSON.stringify(process_response));
                let procResponse =  copiedPResponse.toString();
                 // replace the times in seconds with TEMP
                procResponse = procResponse.replace(/ *\([^)]*\) */g, "TEMP");
                // convert back to array
                procResponse = procResponse.split(/,/);
                 // filter out the TEMP elements
                procResponse = procResponse.filter(function(e) { return e !== 'TEMP' });


                for(let index in procResponse){
                    if(procResponse.hasOwnProperty(index)){
                         // if we find the shift key, uppercase the subsequent element
                        if(procResponse[index] === 'shift'){
                            procResponse[parseInt(index)+1] = procResponse[parseInt(index)+1].toUpperCase();
                        }
                    }
                }

                console.log('Copy ' + procResponse);

                // convert to string again
                procResponse =  procResponse.toString()
                // filter out more items
                procResponse = procResponse.replace(/,|shift|capslock|backspace|arrowright|arrowleft/g, "");
                 // split the json response on MOUSECLICK
                let processResponseArray = procResponse.split('MOUSECLICK');
                // this stops element being bunched together
                let processResponseString = this.convert(processResponseArray);
                processResponseArray = this.splitString(processResponseString);

                const intersection = processResponseArray.filter(element => final_response.includes(element));
                console.log(intersection);
                this.numEditedWords = intersection.length;
            },
            calcInterkeyInterval(data) {
                let timestampArray = [];
                let interkeyTimes = [];

                let json_response = data;
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

                const tableFreeText = [
                    this.textData.actual_response,
                    this.numWords,
                    this.textData.reaction_time,
                    this.textData.response_time,
                    this.textDataInterkeyTimeMean,
                    this.minKeystrokes,
                    this.textData.keystrokes,
                    this.textData.num_mouse_clicks,
                    this.textData.processResponse,
                  ]

                 freeTaskPdfService.createFreeTaskPDF(tableFreeText, dataService.returnFreeTextOption(this.option), this.id);
            },
            createJSON() {
              let data = JSON.stringify(this.textData);
              let datestr = this.getDate();
              dataService.download(data, "JSON-DATA-free-text-task-" + this.id + '-' + datestr, "text/plain");
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
            back() {
              this.$router.push({ path: './select' })
            },
            exit() {
              this.$router.push({ path: './' });
            }
        },
        mounted() {
            this.returnID();
            this.returnData();
            this.returnOption();
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

  .option {
    margin: 10px 0 30px 0;
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

  .back-btn {
     width: 268px;
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
