<template>
  <div class="container is-widescreen">
    <div id="page" ref="content">
      <div class="header">
        <span class="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" class="daawn-logo"></span>
        <p class="title is-3">Assessment Report</p>
      </div>
     <div class="toptext">
         <p class="text"><span class="special">Reaction time</span> is the time taken from when the image appears to when the person either enters a letter response or uses the hint button. Reaction times over five seconds are shown in <span id="red">red</span>.</p>
         <p class="text"><span class="special">Response time</span> is the time taken to type the word from the first letter or hint key to the last letter typed. This does not include any hesitation before clicking on the arrow button to move on to the next item.</p>
       <p class="text">A star (*) in front of the word in the 'End Response' column indicates where the first letter was provided by the <span class="special">hint</span> button.</p>
     </div>


      <table class="table table-striped" >
        <thead>
        <tr><th>Item</th><th>Correct/Incorrect</th><th>End Response</th><th>CAT</th><th>LD</th><th>Reaction Time</th><th>Response Time</th></tr>
        </thead>
        <tbody>
        <tr v-for="item in activeSet">
          <td>{{ item.expected_outcome }}</td>
          <td><img v-show="item.response_type ===1" src="dist/green-tick.png" alt="tick" id="tick-image"><img v-show="item.response_type===0" src="dist/cross.png" alt="tick" id="cross-image"></td>
          <td><span v-show="item.hint_clicked === true">*</span>{{ item.actual_response }}</td>
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
        name: "AppReport",
        data() {
            return {
              id: '',
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
            returnID() {
                this.id = localStorage.getItem('ID');
            },
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
                let tableCatSummaryData = this.createCatSummaryData(this.activeSet);
                pdfService.createPDF(tableReactionData, tableCatSummaryData, tableSummaryData, tableProcessData, this.responseTimeMean, this.reactionTimeMean, this.responseTimeMedian, this.reactionTimeMedian, this.id);
            },
            createJSON() {
              let data = JSON.stringify(this.activeSet);
              let datestr = this.getDate();
              dataService.download(data, "JSON-DATA-" + this.id + '-' + datestr, "text/plain");
            },
            createSummaryData(activeSet) {
                let totalCorrectWithCue = 0;
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
                let count3lettersCorrectWithCue = 0;
                let count4lettersCorrectWithCue = 0;
                let count5lettersCorrectWithCue = 0;
                let count6lettersCorrectWithCue = 0;
                let count7lettersCorrectWithCue = 0;
                let count8lettersCorrectWithCue = 0;
                let count9lettersCorrectWithCue = 0;
                let count10lettersCorrectWithCue = 0;

                let tableSummaryData = [];
                for(let index in this.activeSet){
                    if(this.activeSet.hasOwnProperty(index)){

                        // add all the correct responses
                        if(this.activeSet[index].response_type === 1){

                          if(!this.activeSet[index].hint_clicked){
                            totalCorrectWithoutCue++;
                          }
                          else {
                            totalCorrectWithCue++;
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
                                    else {
                                      count3lettersCorrectWithCue++;
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
                                    else {
                                      count4lettersCorrectWithCue++;
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
                                    else {
                                      count5lettersCorrectWithCue++;
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
                                    else {
                                      count6lettersCorrectWithCue++;
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
                                    else {
                                      count7lettersCorrectWithCue++;
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
                                    else {
                                      count8lettersCorrectWithCue++;
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
                                    else {
                                      count9lettersCorrectWithCue++;
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
                                    else {
                                      count10lettersCorrectWithCue++;
                                    }
                                }
                                break;
                        }

                   }
                }
                if(this.mySet === 'four'){

                  let allItems = count3letters + count4letters;
                  tableSummaryData[0] = [ 'All items', allItems, totalCorrectWithoutCue, this.calcPerCategory(totalCorrectWithoutCue, allItems),  totalCorrectWithCue ];
                  tableSummaryData[1] = [ '3 letters', count3letters, count3lettersCorrectWithoutCue, this.calcPerCategory(count3lettersCorrectWithoutCue, count3letters),  count3lettersCorrectWithCue ];
                  tableSummaryData[2] = [ '4 letters', count4letters, count4lettersCorrectWithoutCue, this.calcPerCategory(count4lettersCorrectWithoutCue, count4letters), count4lettersCorrectWithCue ];
                }
                else {

                  let allItems = count3letters + count4letters + count5letters + count6letters + count7letters + count8letters + count9letters + count10letters;
                  tableSummaryData[0] = [ 'All items', allItems, totalCorrectWithoutCue, this.calcPerCategory(totalCorrectWithoutCue, allItems), totalCorrectWithCue ];
                  tableSummaryData[1] = [ '3 letters', count3letters, count3lettersCorrectWithoutCue, this.calcPerCategory(count3lettersCorrectWithoutCue, count3letters),  count3lettersCorrectWithCue ];
                  tableSummaryData[2] = [ '4 letters', count4letters, count4lettersCorrectWithoutCue, this.calcPerCategory(count4lettersCorrectWithoutCue, count4letters), count4lettersCorrectWithCue ];
                  tableSummaryData[3] = [ '5 letters', count5letters, count5lettersCorrectWithoutCue, this.calcPerCategory(count5lettersCorrectWithoutCue, count5letters), count5lettersCorrectWithCue ];
                  tableSummaryData[4] = [ '6 letters', count6letters, count6lettersCorrectWithoutCue, this.calcPerCategory(count6lettersCorrectWithoutCue, count6letters), count6lettersCorrectWithCue ];
                  tableSummaryData[5] = [ '7 letters', count7letters, count7lettersCorrectWithoutCue, this.calcPerCategory(count7lettersCorrectWithoutCue, count7letters), count7lettersCorrectWithCue ];
                  tableSummaryData[6] = [ '8 letters', count8letters, count8lettersCorrectWithoutCue, this.calcPerCategory(count8lettersCorrectWithoutCue, count8letters), count8lettersCorrectWithCue, ];
                  tableSummaryData[7] = [ '9 letters', count9letters, count9lettersCorrectWithoutCue, this.calcPerCategory(count9lettersCorrectWithoutCue, count9letters), count9lettersCorrectWithCue  ];
                  tableSummaryData[8] = [ '10 letters', count10letters, count10lettersCorrectWithoutCue, this.calcPerCategory(count10lettersCorrectWithoutCue, count10letters), count10lettersCorrectWithCue ];
                }
                return tableSummaryData;
            },
            createCatSummaryData(activeSet) {
                let totalPossibleCatScore = 0;
                let totalCatScoreWithCue = 0;
                let totalCatScoreWithoutCue = 0;

                let totalPossibleCatScore3letters = 0;
                let totalPossibleCatScore4letters = 0;
                let totalPossibleCatScore5letters = 0;
                let totalPossibleCatScore6letters = 0;
                let totalPossibleCatScore7letters = 0;
                let totalPossibleCatScore8letters = 0;
                let totalPossibleCatScore9letters = 0;
                let totalPossibleCatScore10letters = 0;

                let totalCatScore3lettersWithCue = 0;
                let totalCatScore3lettersWithoutCue = 0;
                let totalCatScore4lettersWithCue = 0;
                let totalCatScore4lettersWithoutCue = 0;
                let totalCatScore5lettersWithCue = 0;
                let totalCatScore5lettersWithoutCue = 0;
                let totalCatScore6lettersWithCue = 0;
                let totalCatScore6lettersWithoutCue = 0;
                let totalCatScore7lettersWithCue = 0;
                let totalCatScore7lettersWithoutCue = 0;
                let totalCatScore8lettersWithCue = 0;
                let totalCatScore8lettersWithoutCue = 0;
                let totalCatScore9lettersWithCue = 0;
                let totalCatScore9lettersWithoutCue = 0;
                let totalCatScore10lettersWithCue = 0;
                let totalCatScore10lettersWithoutCue = 0;

                let tableCatSummaryData = [];
                for(let index in this.activeSet){
                    if(this.activeSet.hasOwnProperty(index)){

                        if(this.activeSet[index].num_letters){

                            totalPossibleCatScore += this.activeSet[index].num_letters;
                            if(this.activeSet[index].hint_clicked){
                              totalCatScoreWithCue += this.activeSet[index].cat_score;
                            }
                            else {
                              totalCatScoreWithoutCue += this.activeSet[index].cat_score;
                            }

                            // get scores for each letter count
                            switch(this.activeSet[index].num_letters){
                                case 3:
                                    totalPossibleCatScore3letters += 3;
                                    if(this.activeSet[index].hint_clicked){
                                      totalCatScore3lettersWithCue += this.activeSet[index].cat_score;
                                    }
                                    else {
                                      totalCatScore3lettersWithoutCue += this.activeSet[index].cat_score;
                                    }
                                    break;
                                case 4:
                                    totalPossibleCatScore4letters += 4;
                                    if(this.activeSet[index].hint_clicked){
                                      totalCatScore4lettersWithCue += this.activeSet[index].cat_score;
                                    }
                                    else {
                                      totalCatScore4lettersWithoutCue += this.activeSet[index].cat_score;
                                    }
                                    break;
                                case 5:
                                   totalPossibleCatScore5letters += 5;
                                    if(this.activeSet[index].hint_clicked){
                                      totalCatScore5lettersWithCue += this.activeSet[index].cat_score;
                                    }
                                    else {
                                      totalCatScore5lettersWithoutCue += this.activeSet[index].cat_score;
                                    }
                                    break;
                                case 6:
                                    totalPossibleCatScore6letters += 6;
                                    if(this.activeSet[index].hint_clicked){
                                      totalCatScore6lettersWithCue += this.activeSet[index].cat_score;
                                    }
                                    else {
                                      totalCatScore6lettersWithoutCue += this.activeSet[index].cat_score;
                                    }
                                    break;
                                case 7:
                                    totalPossibleCatScore7letters += 7;
                                    if(this.activeSet[index].hint_clicked){
                                      totalCatScore7lettersWithCue += this.activeSet[index].cat_score;
                                    }
                                    else {
                                      totalCatScore7lettersWithoutCue += this.activeSet[index].cat_score;
                                    }
                                    break;
                                case 8:
                                    totalPossibleCatScore8letters += 8;
                                    if(this.activeSet[index].hint_clicked){
                                      totalCatScore8lettersWithCue += this.activeSet[index].cat_score;
                                    }
                                    else {
                                      totalCatScore8lettersWithoutCue += this.activeSet[index].cat_score;
                                    }
                                    break;
                                case 9:
                                    totalPossibleCatScore9letters += 9;
                                    if(this.activeSet[index].hint_clicked){
                                      totalCatScore9lettersWithCue += this.activeSet[index].cat_score;
                                    }
                                    else {
                                      totalCatScore9lettersWithoutCue += this.activeSet[index].cat_score;
                                    }
                                    break;
                                case 10:
                                    totalPossibleCatScore10letters += 10;
                                    if(this.activeSet[index].hint_clicked){
                                      totalCatScore10lettersWithCue += this.activeSet[index].cat_score;
                                    }
                                    else {
                                      totalCatScore10lettersWithoutCue += this.activeSet[index].cat_score;
                                    }
                                    break;
                                }
                        }
                    }
                }

                // create the first few rows
                tableCatSummaryData[0] = [ 'All items', totalPossibleCatScore, totalCatScoreWithoutCue, this.calcPerCategory(totalCatScoreWithoutCue, totalPossibleCatScore), totalCatScoreWithCue, this.calcPerCategory(totalCatScoreWithCue, totalPossibleCatScore)];

                tableCatSummaryData[1] = [ '3 letters', totalPossibleCatScore3letters, totalCatScore3lettersWithoutCue, this.calcPerCategory(totalCatScore3lettersWithoutCue, totalPossibleCatScore3letters), totalCatScore3lettersWithCue, this.calcPerCategory(totalCatScore3lettersWithCue, totalPossibleCatScore3letters) ];

                tableCatSummaryData[2] = [ '4 letters', totalPossibleCatScore4letters, totalCatScore4lettersWithoutCue, this.calcPerCategory(totalCatScore4lettersWithoutCue, totalPossibleCatScore4letters), totalCatScore4lettersWithCue, this.calcPerCategory(totalCatScore4lettersWithCue, totalPossibleCatScore4letters) ];

                // if not using set four, then create the extra rows
                if(this.mySet !== 'four'){

                  tableCatSummaryData[3] = [ '5 letters', totalPossibleCatScore5letters, totalCatScore5lettersWithoutCue, this.calcPerCategory(totalCatScore5lettersWithoutCue, totalPossibleCatScore5letters), totalCatScore5lettersWithCue, this.calcPerCategory(totalCatScore5lettersWithCue, totalPossibleCatScore5letters) ];

                  tableCatSummaryData[4] = [ '6 letters', totalPossibleCatScore6letters, totalCatScore6lettersWithoutCue, this.calcPerCategory(totalCatScore6lettersWithoutCue, totalPossibleCatScore6letters), totalCatScore6lettersWithCue, this.calcPerCategory(totalCatScore6lettersWithCue, totalPossibleCatScore6letters) ];

                  tableCatSummaryData[5] = [ '7 letters', totalPossibleCatScore7letters, totalCatScore7lettersWithoutCue, this.calcPerCategory(totalCatScore7lettersWithoutCue, totalPossibleCatScore7letters), totalCatScore7lettersWithCue, this.calcPerCategory(totalCatScore7lettersWithCue, totalPossibleCatScore7letters) ];

                  tableCatSummaryData[6] = [ '8 letters', totalPossibleCatScore8letters, totalCatScore8lettersWithoutCue, this.calcPerCategory(totalCatScore8lettersWithoutCue, totalPossibleCatScore8letters), totalCatScore8lettersWithCue, this.calcPerCategory(totalCatScore8lettersWithCue, totalPossibleCatScore8letters) ];

                  tableCatSummaryData[7] = [ '9 letters', totalPossibleCatScore9letters, totalCatScore9lettersWithoutCue, this.calcPerCategory(totalCatScore9lettersWithoutCue, totalPossibleCatScore9letters), totalCatScore9lettersWithCue, this.calcPerCategory(totalCatScore9lettersWithCue, totalPossibleCatScore9letters) ];

                  tableCatSummaryData[8] = [ '10 letters', totalPossibleCatScore10letters, totalCatScore10lettersWithoutCue, this.calcPerCategory(totalCatScore10lettersWithoutCue, totalPossibleCatScore10letters), totalCatScore10lettersWithCue, this.calcPerCategory(totalCatScore10lettersWithCue, totalPossibleCatScore10letters) ];

                }
                return tableCatSummaryData;
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
            this.returnID();
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
