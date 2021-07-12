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

      <div v-if="errorMessage">
        The number of words do not match the example, please try again
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
              averageKeySpeed : 0,
              showContinueModal : false,
              status : 'in progress',
              responseText: '',
              response: [],
              responseType: '',
              interimResponse: '',
              keystroke : '',
              processResponse: [],
              jsonProcessResponse: [],
              keystrokeTimes: [],
              editedWords: [],
              startTime: 0,
              reactionTime: 0,
              responseTime: 0,
              moveOnTime: 0,
              minKeystrokes : 0,
              numCorrectEditedWords : 0,
              numIncorrectEditedWords : 0,
              numCorrectWords : 0,
              numIncorrectWords: 0,
              participantId: '',
              dateStr: '',
              errorMessage : false
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

              //clear 'removed' in local storage
              dataService.clearRemovedValue();
              this.getTextToShow(this.index);
          },
          collectData() {
              this.compareText(this.textToShow, this.responseText, this.processResponse);
              if(this.textToShow === this.responseText){
                this.responseType = 1;
              }
              else {
                this.responseType = 0;
              }

              this.reactionTime = this.keystrokeTimes[0];
              this.responseTime = this.keystrokeTimes.pop();
              let newTime = Date.now();

              this.moveOnTime = this.calcTimePassed(this.startTime, newTime);

              // get the overall number of keystrokes
              let numOfKeystrokes = this.processResponse.length;
              const string = 'sec';
              // find the number of array elements that contain 'sec' i.e. are additional time elements, not an actual key press
              let numInserts = this.processResponse.filter(function(item){ return item.includes(string); }).length;
              this.keystrokes = numOfKeystrokes - numInserts;

              this.numDeletions =  this.processResponse.filter(function(item){ return item === "backspace"; }).length;

              // if part of the string was split off earlier, add it back to the interim response
              let removed = localStorage.getItem('removed');
              if(removed !== null){
                  this.interimResponse = this.interimResponse.concat(removed);
              }

              let response = {
                "timestamp" : newTime,
                "keystroke" : "SUBMIT",
                "interimResponse" : this.interimResponse
              }
              this.jsonProcessResponse.push(response);

              this.response = {
                  "participant_id" : this.participantId,
                  "date" : this.dateStr,
                  "expected_outcome" : this.textToShow,
                  "actual_response" : this.responseText,
                  "response_type" : this.responseType,
                  "reaction_time": this.reactionTime,
                  "response_time" : this.responseTime,
                  "move_on_time" : this.moveOnTime,
                  "averageSpeed" : this.averageSpeed,
                  "wordLength" : this.wordLength,
                  "minKeystrokes" : this.minKeystrokes,
                  "keystrokes" : this.keystrokes,
                  "processResponse" : this.processResponse,
                  "json_process_response" : this.jsonProcessResponse,
                  "num_correct_edited_words" : this.numCorrectEditedWords,
                  "num_incorrect_edited_words" : this.numIncorrectEditedWords,
                  "num_correct_words" : this.numCorrectWords,
                  "num_incorrect_words" : this.numIncorrectWords
              };
              localStorage.setItem(this.textId, JSON.stringify(this.response));
          },
          clearData() {
              this.jsonProcessResponse = [];
              this.processResponse = [];
              this.keystrokeTimes = [];
              this.textToShow = '';
              this.responseText = '';
              this.responseType = '';
              this.minKeystrokes = 0;
              this.keystrokes = 0;
              this.startTime = Date.now();
              this.reactionTime = 0;
              this.responseTime = 0;
              this.moveOnTime = 0;
              this.wordLength = 0;
              this.numCorrectEditedWords = 0;
              this.numIncorrectEditedWords = 0;
              this.numCorrectWords = 0;
              this.numIncorrectWords = 0;
          },
          compareText(expectedOutcome, actualOutcome, processResponse) {

              let wordArray = expectedOutcome.split(' ');
              let outcomeArray = actualOutcome.split(' ');

                // check they are the same length
              if(wordArray.length === outcomeArray.length){

                  // reverse engineer the processResponse
                  let procResponse =  processResponse.toString();
                  // filter out anything within () like the times in seconds
                  procResponse = procResponse.replace(/ *\([^)]*\) */g, "");
                  procResponse = procResponse.split(' ');
                  for(let index in procResponse ) {
                      if(procResponse.hasOwnProperty(index)){
                          // look for a backspace, indicates word edit
                          if(procResponse[index].match(/backspace/g)){
                              // keep a record of the index number of the edited word
                              this.editedWords.push(parseInt(index));
                          }
                      }
                  }
                  // console.log(procResponse);

                  // compare each word
                  for(let i = 0; i < wordArray.length; i++){
                      if(wordArray[i] === outcomeArray[i]){
                          console.log('word is the same ' + wordArray[i] + ' === ' + outcomeArray[i]);
                          this.numCorrectWords++;
                          if(this.editedWords.indexOf(i) > -1){
                             this.numCorrectEditedWords++;
                          }
                      }
                      else if(wordArray[i] !== outcomeArray[i]){
                          console.log('word is not the same ' + wordArray[i] + ' === ' + outcomeArray[i]);
                          this.numIncorrectWords++;
                          if(this.editedWords.indexOf(i) > -1){
                             this.numIncorrectEditedWords++;
                          }
                      }
                  }
                  this.editedWords = [];
              }
              else {
                // do something else
                console.log('Word length differs')
                this.errorMessage = true;
              }
          },
          keyLogger: function($event) {

              let keystrokeTime = Date.now();
              let key = $event.key;
              key = key.toLowerCase();

              // ignore Delete key
              if(key !== 'delete'){
                this.processResponse.push(key);
                this.keystrokes++;
                if(key !== 'backspace' && key !== 'arrowleft' && key !== 'arrowright') {
                     this.interimResponse = this.interimResponse.concat(key);
                }
                this.keystroke = key;
              }

              // if key is backspace remove previous char
              if(key === 'backspace'){
                this.interimResponse = this.interimResponse.slice(0, -1);
              }

              // if the key is arrowleft, get the last letter and store it in local storage before slicing it off the array
              // if there are already existing letters in local storage, append them to the new letter
              if(key === 'arrowleft'){
                  let removed = this.interimResponse.charAt(this.interimResponse.length-1);
                  dataService.appendToRemoved(removed);
                  this.interimResponse = this.interimResponse.slice(0, -1);
              }


              // if its a single letter only, add it, ignore other keys
              if(key.length === 1){

                 const strToMatch = 'shift';
                  // check to see if the preceding key is a shift
                  if(this.interimResponse.match(strToMatch)){
                     // filter out shift
                     this.interimResponse = this.interimResponse.replace('shift', '');
                     // copy the last char and make it uppercase
                     let removed = this.interimResponse.charAt(this.interimResponse.length-1);
                     if(removed.match(/[a-z]/)){
                          removed = removed.toUpperCase();
                     }
                     // remove the last char from the string and replace it with the uppercase version
                     this.interimResponse = this.interimResponse.slice(0, -1);
                     this.interimResponse = this.interimResponse.concat(removed);
                  }


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

                   // calculate the time passed since the text has loaded on screen
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
             this.processResponse.push('mouseclick');
             this.jsonProcessResponse.push('mouseclick');
          },
          focusInput() {
              this.$refs.text.focus();
          },
          getTextToShow(index) {
              this.textId = this.text[index].id;
              this.textToShow = this.text[index].text;
              this.wordLength = this.text[index].wordLength;
              this.minKeystrokes = this.text[index].minKeystrokes;
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
                this.$router.push({ path: './' });
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
