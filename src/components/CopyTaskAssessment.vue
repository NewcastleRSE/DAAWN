<template>
    <div class="container is-widescreen">
    <div id="page">
      <div id="header">

        <p class="title is-3">Beginning the copy task assessment</p>
      </div>

      <div class="level-item has-text-centered">
        <div class="box" >

          <div class="level">
            <div class="level-left">
              <p id="displayText">{{ textToShow }}</p>
            </div>
          </div>

          <div class="level-item has-text-centered">
            <div class="field">
              <div class="control">
                <input ref="text" class="input is-large customwidth" type="text" maxlength="100" v-model="responseText" v-on:keydown="keyLogger($event)" spellcheck="false" autocorrect="off" autocapitalize="none" v-on:click="mouseclick($event)">
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

      <ContinueModal v-if="showContinueModal" @close="showContinueModal=false" @clicked="nextText(index)" />
  </div>
</template>

<script>

  import _ from 'lodash';
  import phrases from '../json/phrases.json';
  import {settings} from "../settings";
  import ContinueModal from "./ContinueModal";
  import {dataService} from "../services/data.service";

  export default {
      name: "CopyTaskAssessment",
      components: {
          ContinueModal
      },
      data() {
          return {
              text: phrases,
              textToShow: '',
              index : 0,
              numInSet : settings.numTasksInSet,
              wordLength : 0,
              textId : 0,
              averageSpeed : 0,
              showContinueModal : false,
              status : 'in progress',
              responseText: '',
              response: [],
              expectedOutcome: '',
              actualOutcome: '',
              responseType: '',
              interimResponse: '',
              keystroke : '',
              processResponse: [],
              jsonProcessResponse: [],
              keystrokeTimes: [],
              startTime: 0,
              reactionTime: 0,
              responseTime: 0,
              moveOnTime: 0,
              numCorrectWords : 0,
              numEditedWords : 0,
              numIncorrectWords: 0,
              participantId: '',
              dateStr: ''
          }
      },
      methods: {
          activateModal() {
                // prevents accidental moves forward
               this.showContinueModal=true;
          },
          nextText(index) {
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
                this.focusInput();
              }
              this.$data.responseText = '';
              this.interimResponse = '';

              let response = {
                "timestamp" : Date.now(),
                "keystroke" : "TEXTLOAD",
                "interimResponse" : this.interimResponse
              }
              this.jsonProcessResponse.push(response);
              this.getTextToShow(this.index);
          },
          collectData() {
              this.expectedOutcome = this.textToShow;
              this.actualOutcome = this.responseText;

              this.compareText(this.expectedOutcome, this.actualOutcome, this.processResponse);

              if(this.textToShow === this.responseText){
                this.responseType = 1;
              }
              else {
                this.responseType = 0;
              }
              this.numLetters = this.wordLength;
              this.reactionTime = this.keystrokeTimes[0];
              this.responseTime = this.keystrokeTimes.pop();
              let newTime = Date.now();
              this.moveOnTime = this.calcTimePassed(this.startTime, newTime);

              console.log('Moving on now ' + this.moveOnTime);

              this.averageSpeed = this.moveOnTime/this.wordLength;

              console.log('Average speed ' + this.averageSpeed);

              this.numDeletions =  this.processResponse.filter(function(item){ return item === "backspace"; }).length;

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
                  "reaction_time": this.reactionTime,
                  "response_time" : this.responseTime,
                  "move_on_time" : this.moveOnTime,
                  "averageSpeed" : this.averageSpeed,
                  "wordLength" : this.wordLength,
                  "keystrokes" : this.keystrokes,
                  "processResponse" : this.processResponse,
                  "json_process_response" : this.jsonProcessResponse,
                  "num_correct_words" : this.numCorrectWords,
                  "num_edited_words" : this.numEditedWords,
                  "num_incorrect_words" : this.numIncorrectWords
              };
              localStorage.setItem(this.textId, JSON.stringify(this.response));
          },
          clearData() {
              this.jsonProcessResponse = [];
              this.processResponse = [];
              this.keystrokeTimes = [];
              this.expectedOutcome = '';
              this.actualOutcome = '';
              this.responseType = '';
              this.keystrokes = 0;
              this.startTime = Date.now();
              this.reactionTime = 0;
              this.responseTime = 0;
              this.moveOnTime = 0;
              this.wordLength = 0;
              this.numCorrectWords = 0;
              this.numEditedWords = 0;
              this.numIncorrectWords = 0;
          },
          compareText(expectedOutcome, actualOutcome, processResponse) {

              let wordArray = expectedOutcome.split(' ');
              let outcomeArray = actualOutcome.split(' ');

                // check they are the same length
              if(wordArray.length === outcomeArray.length){

                // compare each word
                  for(let i = 0; i < wordArray.length; i++){
                      if(wordArray[i] === outcomeArray[i]){
                        console.log('word is the same ' + wordArray[i] + ' === ' + outcomeArray[i]);
                        this.numCorrectWords++;
                      }
                      else if(wordArray[i] !== outcomeArray[i]){
                         console.log('word is not the same ' + wordArray[i] + ' === ' + outcomeArray[i]);
                         this.numIncorrectWords++;
                      }
                  }
              }
              else {
                // do something else
                console.log('Word length differs')
              }

              // reverse engineer the processResponse
              let procResponse =  processResponse.toString();
              // filter out anything within ()
              procResponse = procResponse.replace(/ *\([^)]*\) */g, "");
              procResponse = procResponse.split(' ');
              for(let index in procResponse ) {
                  if(procResponse.hasOwnProperty(index)){
                      // look for a backspace, indicates word edit
                      if(procResponse[index].match(/backspace/g)){
                         this.numEditedWords++;
                      }
                  }
              }
              console.log(procResponse);
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

            // if key is backspace remove previous char
              if(key === 'backspace'){
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
          mouseclick: function($event) {
            this.processResponse.push('MOUSECLICK');
          },
          focusInput() {
              this.$refs.text.focus();
          },
          getTextToShow(index) {
              this.textId = this.text[index].id;
              this.textToShow = this.text[index].text;
              this.wordLength = this.text[index].wordlength;
          },
          returnID() {
              // Math.random should be unique because of its seeding algorithm.
              // Convert it to base 36 (numbers + letters), and grab the first 9 characters after the decimal.
              return Math.random().toString(36).substr(2, 9);
          },
          endSet() {
                this.$router.push({ path: '../ctAssessmentComplete' });
          },
          exit() {
                this.$router.push({ path: '../' });
          }
      },
      mounted() {
              this.getTextToShow(this.index);
              this.focusInput();
              this.startTime = Date.now();
              this.dateStr = new Date;
              this.participantId = this.returnID();
              localStorage.setItem('ID', this.participantId);

              let response = {
                 "timestamp" : this.startTime,
                 "keystroke" : "TEXTLOAD",
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

  #header {
    padding-bottom: 20px;
  }


   #displayText {
     border: 1px solid #c4c4c4;
     border-radius: 5px;
     font-size: 1.6em;
     padding: 10px 20px;
  }

  #forward-arrow {
    float: right;
    margin-right: 6px;
    margin-top: 8px;
    padding-left: 10px;
    position: relative;
    z-index: 2;
  }

  .large {
    font-size: 1.2em;
  }

  .text {
    margin-bottom: 20px;
  }

  .counter {
    padding: 30px 0;
  }


  .customwidth {
    width: 600px;
  }
</style>
