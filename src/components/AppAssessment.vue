<template>
  <div class="container is-widescreen">
    <div id="page">
      <div class="header" v-show="index === 0">
       <!-- <span class="logo"><img src="/dist/sundawn.png" alt="Welcome to the DAAWN tool" class="daawn-logo"></span>-->
        <p  class="title is-3">Beginning the <strong>assessment</strong> session</p>
      </div>

      <div class="header" v-show="index > 0">
       <!-- <span class="logo"><img src="/dist/sundawn.png" alt="Welcome to the DAAWN tool" class="daawn-logo"></span> -->
        <p class="title is-3">Assessment {{ status }}</p>
      </div>

      <div class="level-item has-text-centered">
        <div class="box" >

          <div class="level">
            <div class="level-left icons" @click="hint">
              <span class="hint-icon" ><font-awesome-icon icon="lightbulb" size="2x"></font-awesome-icon></span>
              <span id="hint" class="special">Hint</span>
            </div>
            <div class="level-right icons" @click="endSet">
                <span class="exit-icon"><font-awesome-icon icon="times-circle" size="2x"></font-awesome-icon></span>
                <span id="exit" class="special">Exit</span>
            </div>
          </div>

          <div class="level">
            <div class="level-item has-text-centered">
              <img v-if="currentSet === 'one'" :src="getImage('setOne', index)">
              <img v-if="currentSet === 'two'"  :src="getImage('setTwo', index)">
              <img v-if="currentSet === 'three'" :src="getImage('setThree', index)">
              <img v-if="currentSet === 'four'" :src="getImage('setFour', index)">
            </div>
          </div>

          <div class="level-item has-text-centered">
            <div class="field">
              <div class="control">
                <input ref="text" class="input is-large" type="text" maxlength="50" v-model="responseText" v-on:keydown="keyLogger($event)" spellcheck="false" autocorrect="off" autocapitalize="none">
                <span id="forward-arrow" v-show="status !== 'completed'"><font-awesome-icon icon="arrow-circle-right" size="3x"  @click="activateModal()"></font-awesome-icon></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="level-item has-text-centered counter">
        <p class="title is-5">{{ index+1 }} of {{ numInSet }} </p>
      </div>

    </div>

     <ContinueModal v-if="showContinueModal" @close="showContinueModal = false" @clicked="nextImage(index)" />
  </div>

</template>

<script>


  import {dataService} from "../services/data.service";
  import {settings} from "../settings";
  import ContinueModal from "./ContinueModal";

  export default {
        name: "AppPractice",
        components: {
          ContinueModal
        },
        data() {
            return {
                currentSet: '',
                numInSet : 0,
                index : 0,
                filename: '',
                name: '',
                showContinueModal : false,
                hintClicked : false,
                status : 'in progress',
                responseText: '',
                setOne : settings.setOne,
                setTwo : settings.setTwo,
                setThree : settings.setThree,
                setFour : settings.setFour,
                response: [],
                expectedOutcome: '',
                actualOutcome: '',
                responseType: '',
                interimResponse: '',
                keystroke : '',
                processResponse: [],
                jsonProcessResponse: [],
                keystrokeTimes: [],
                catScore: 0,
                DLScore: 0,
                firstCorrect: '',
                secondCorrect: '',
                startTime: 0,
                reactionTime: 0,
                responseTime: 0,
                moveOnTime: 0,
                numLetters : 0,
                numDeletions : 0,
                keystrokes: 0,
                participantId: '',
                dateStr: ''
            }
         },
        methods: {
            getImage(set, index){
              if(index !== this.numInSet) {
                if(this.currentSet === 'one'){
                  this.filename = this.setOne[index] + '.jpg';
                  this.name = this.setOne[index];
                }
                else if(this.currentSet === 'two') {
                  this.filename = this.setTwo[index] + '.jpg';
                  this.name = this.setTwo[index];
                }
                else if(this.currentSet === 'three') {
                  this.filename = this.setThree[index] + '.jpg';
                  this.name = this.setThree[index];
                }
                else if(this.currentSet === 'four') {
                  this.filename = this.setFour[index] + '.jpg';
                  this.name = this.setFour[index];
                }
                return require(`../assets/${set}/${this.filename}`);
              }
            },
            activateModal() {
                // prevents accidental moves forward
                this.showContinueModal=true;
            },
            nextImage(index) {
                // close the modal if its open
                this.showContinueModal= false;

                if(index === this.numInSet-1){
                  this.collectData();
                  this.clearData();
                  this.status = 'completed';
                  this.endSet();
                }
                else {
                  this.collectData();
                  this.clearData();
                  this.index++;
                  this.hintClicked = false;
                  this.focusInput();
                }
                this.$data.responseText = '';
                this.interimResponse = '';

                let response = {
                  "timestamp" : Date.now(),
                  "keystroke" : "IMAGELOAD",
                  "interimResponse" : this.interimResponse
                }
                this.jsonProcessResponse.push(response);

            },
            hint() {
                if(this.responseText === ""){
                    this.responseText = this.name.slice(0,1);
                    this.hintClicked = true;
                    this.focusInput();
                    this.processResponse.push('*');

                    // record the actual letter provided by the hint
                    this.interimResponse = this.responseText;

                    let response = {
                      "timestamp" : Date.now(),
                      "keystroke" : "HINT",
                      "interimResponse" : this.interimResponse
                    }
                    this.jsonProcessResponse.push(response);
                }
            },
            collectData() {
                this.expectedOutcome = this.name;
                // get rid of any auto capitalisation
                this.responseText = this.responseText.toLowerCase();
                this.actualOutcome = this.responseText;
                if(this.name === this.responseText){
                  this.responseType = 1;
                }
                else {
                  this.responseType = 0;
                }

                if(this.responseText !== ''){
                  this.DLScore = dataService.levenshtein(this.name, this.responseText);
                }

                this.numLetters = this.name.length;

                let imageNameLength=this.name.length;
                if(imageNameLength-this.DLScore > 0 && this.responseText !== ''){
                    this.catScore=imageNameLength-this.DLScore;
                }

                this.reactionTime = this.keystrokeTimes[0];
                this.responseTime = this.keystrokeTimes.pop();
                let newTime = Date.now();
                this.moveOnTime = this.calcTimePassed(this.startTime, newTime);
                this.numDeletions =  this.processResponse.filter(function(item){ return item === "Backspace"; }).length;

                let response = {
                  "timestamp" : newTime,
                  "keystroke" : "SUBMIT",
                  "interimResponse" : this.interimResponse
                }
                this.jsonProcessResponse.push(response);

                this.response = {
                                  "participant_id" : this.participantId,
                                  "date" : this.dateStr,
                                  "expected_outcome" : this.expectedOutcome,
                                  "actual_response" : this.actualOutcome,
                                  "response_type" : this.responseType,
                                  "cat_score" : this.catScore,
                                  "dla_score" : this.DLScore,
                                  "reaction_time": this.reactionTime,
                                  "response_time" : this.responseTime,
                                  "move_on_time" : this.moveOnTime,
                                  "num_letters" : this.numLetters,
                                  "keystrokes" : this.keystrokes,
                                  "num_deletions" : this.numDeletions,
                                  "processResponse" : this.processResponse,
                                  "json_process_response" : this.jsonProcessResponse,
                                  "hint_clicked" : this.hintClicked
                };

                localStorage.setItem(this.name, JSON.stringify(this.response));

            },
            clearData() {
                this.jsonProcessResponse = [];
                this.processResponse = [];
                this.keystrokeTimes = [];
                this.expectedOutcome = '';
                this.actualOutcome = '';
                this.responseType = '';
                this.catScore = 0;
                this.DLScore = 0;
                this.firstCorrect = '';
                this.secondCorrect = '';
                this.numLetters = 0;
                this.numDeletions = 0;
                this.keystrokes = 0;
                this.startTime = Date.now();
                this.reactionTime = 0;
                this.responseTime = 0;
                this.moveOnTime = 0;
            },
            endSet() {
                this.$router.push({ path: '../assessmentComplete' });
            },
            keyLogger: function($event) {

                let keystrokeTime = Date.now();

                let key = $event.key;
                key = key.toLowerCase();

                // ignore Delete key
                if(key !== 'delete'){
                  this.processResponse.push(key);
                  this.keystrokes++;
                  this.interimResponse = this.interimResponse.concat(key);
                  this.keystroke = key;
                }

              // TODO, look at this - should be lowercase?
              // if key is backspace remove previous char
                if(key === 'Backspace'){
                  this.interimResponse = this.interimResponse.slice(0, -1);
                  this.keystroke = "BACKSPACE";
                }

                // if its a single letter only, add it, ignore other keys
                if(key.length === 1){

                    let response = {
                        "timestamp" : keystrokeTime,
                        "keystroke" : this.keystroke,
                        "interimResponse" : this.interimResponse
                    }
                    this.jsonProcessResponse.push(response);
                }

                if(this.keystrokeTimes.length > 0){
                      // get the last array entry
                     let lastKeystrokeTime = this.keystrokeTimes.slice(-1);
                     // get the value for the current key event
                     let timePassed = this.calcTimePassed(this.startTime, keystrokeTime);

                     if(timePassed-lastKeystrokeTime > 1){
                       let formattedTime = (timePassed-lastKeystrokeTime).toFixed(2);
                       this.processResponse.push('\(' + formattedTime + ' sec\)');
                     }
                }
                this.keystrokeTimes.push(this.calcTimePassed(this.startTime, keystrokeTime));
            },
            // compares 2 timestamps, returns an integer
            calcTimePassed(startTime, newTime){
                let diff=(newTime-startTime)/1000;
                // truncates to 2 decimal places
                let timePassed=diff.toFixed(2);
                return timePassed;
            },
            focusInput() {
                this.$refs.text.focus();
            },
            shuffle(a) {
                for (let i = a.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [a[i], a[j]] = [a[j], a[i]];
                }
                return a;
            },
            returnID() {
              // Math.random should be unique because of its seeding algorithm.
              // Convert it to base 36 (numbers + letters), and grab the first 9 characters after the decimal.
              return Math.random().toString(36).substr(2, 9);
            },
            exit() {
                this.$router.push({ path: '../' });
            }
        },
        mounted() {
            this.currentSet = this.$route.query.set;
            if(this.currentSet === 'four'){
                this.numInSet = settings.numInSetFour;
            }
            else {
                this.numInSet = settings.numInSet;
                if(this.currentSet === 'one'){
                  this.shuffle(this.setOne);
                }
                else if(this.currentSet === 'two'){
                  this.shuffle(this.setTwo);
                }
                else if(this.currentSet === 'three'){
                  this.shuffle(this.setThree);
                }
            }
            this.focusInput();
            this.startTime = Date.now();
            this.dateStr = new Date;
            this.participantId = this.returnID();
            localStorage.setItem('ID', this.participantId);

            let response = {
               "timestamp" : this.startTime,
               "keystroke" : "IMAGELOAD",
               "interimResponse" : ""
            }
            this.jsonProcessResponse.push(response);
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

  .header {
    padding-bottom: 60px;
  }


  .logo {
    float:right;
  }

  .daawn-logo {
    height: 40px;
  }

  .box {
    width: 600px;
    margin: auto 0;
  }

  .text {
    margin-bottom: 25px;
  }

  .counter {
    padding: 30px 0;
  }

  .hint-icon {
    padding-right: 10px;
  }

  .exit-icon {
    padding-right: 40px;
  }

  #forward-arrow{
    float: right;
    margin-right: 6px;
    margin-top: -54px;
    position: relative;
    z-index: 2;
  }

  .icons {
    position: relative;
  }


  #hint{
     position: absolute;
     top : 5px;
     left: 30px;
   }

   #exit {
    position: absolute;
    top : 5px;
    right: 5px;
  }

  input::-ms-clear {
    display: none;
  }



</style>
