<template>
    <div class="container is-widescreen">
       <div id="page">
          <div id="header">
             <p class="title is-3">Beginning the free task assessment</p>
          </div>

          <div class="level has-text-centered">
            <img v-if="taskOption === 'story'" :src="getImage('story-picture.jpg')">
            <img v-if="taskOption === 'social-media'" :src="getImage('water-fight.jpg')">
            <img v-if="taskOption === 'text-message'" :src="getImage('text-message.png')">
          </div>

          <div class="field">
            <label class="label"><strong>{{ taskLabel}}</strong></label>
            <div class="control">
              <textarea ref="text" class="textarea" placeholder="Type here..." v-model="responseText" v-on:keydown="keyLogger($event)" spellcheck="false" autocorrect="off" autocapitalize="none" maxlength="200" v-on:click="mouseclick($event)"></textarea>
            </div>
          </div>
          <div class="level">
            <div class="level-item">
              <div class="buttons-section form-group">
                <button class="button exit-btn" @click=exit()>Exit</button>
                <button class="button next-btn" @click=saveData() :disabled="isFormInvalid">Done</button>
              </div>
            </div>
          </div>
      </div>

  </div>
</template>

<script>

  import ContinueModal from "./ContinueModal";
  import {dataService} from "../services/data.service";

  export default {
      name: "FreeTaskAssessment",
      components: {
          ContinueModal
      },
      data() {
          return {
              taskOption: '',
              taskImage: '',
              taskLabel: '',
              showContinueModal : false,
              responseText: '',
              response: [],
              interimResponse: '',
              keystroke : '',
              processResponse: [],
              jsonProcessResponse: [],
              keystrokeTimes: [],
              startTime: 0,
              reactionTime: 0,
              responseTime: 0,
              keystrokes : 0,
              numMouseclicks: 0,
              participantId: '',
              dateStr: '',
          }
      },
      computed : {
          isFormInvalid() {
              if(!this.responseText){
                return true;
              }
              else {
                return false;
              }
          }
      },
      methods: {
          activateModal() {
                // prevents accidental moves forward
               this.showContinueModal=true;
          },
          getImage(image) {
            if(image){
               this.taskImage = image;
               return require(`../assets/freeText/${this.taskImage}`);
            }
          },
          saveData() {
                // close the modal if its open
              this.showContinueModal= false;

              this.collectData();
              this.clearData();
              this.$router.push({ path: '../ftAssessmentComplete' });
          },
          collectData() {

              this.responseText;
              this.reactionTime = this.keystrokeTimes[0];
              this.responseTime = this.keystrokeTimes.pop();
              let newTime = Date.now();

              // get the overall number of keystrokes
              let numOfKeystrokes = this.processResponse.length;
              const string = 'sec';
              // find the number of array elements that contain 'sec' i.e. are additional time elements, not an actual key press
              let numInserts = this.processResponse.filter(function(item){ return item.includes(string); }).length;
              this.keystrokes = numOfKeystrokes - numInserts;

              this.numDeletions =  this.processResponse.filter(function(item){ return item === "backspace"; }).length;
              this.numMouseclicks =  this.processResponse.filter(function(item){ return item === "MOUSECLICK"; }).length;

              let response = {
                "timestamp" : newTime,
                "keystroke" : "SUBMIT",
                "interimResponse" : this.interimResponse
              }
              this.jsonProcessResponse.push(response);

              this.response = {
                  "participant_id" : this.participantId,
                  "date" : this.dateStr,
                  "actual_response" : this.responseText,
                  "response_type" : this.responseType,
                  "reaction_time": this.reactionTime,
                  "response_time" : this.responseTime,
                  "keystrokes" : this.keystrokes,
                  "num_mouse_clicks" : this.numMouseclicks,
                  "processResponse" : this.processResponse,
                  "json_process_response" : this.jsonProcessResponse
              };
              localStorage.setItem('responseText', JSON.stringify(this.response));
          },
          clearData() {
              this.jsonProcessResponse = [];
              this.processResponse = [];
              this.keystrokeTimes = [];
              this.responseText = '';
              this.responseType = '';
              this.keystrokes = 0;
              this.startTime = Date.now();
              this.reactionTime = 0;
              this.responseTime = 0;
              this.numMouseclicks = 0;
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
            this.processResponse.push('MOUSECLICK');
          },
          focusInput() {
              this.$refs.text.focus();
          },
          returnID() {
              // Math.random should be unique because of its seeding algorithm.
              // Convert it to base 36 (numbers + letters), and grab the first 9 characters after the decimal.
              return Math.random().toString(36).substr(2, 9);
          },
          getTaskLabel(taskoption){
            switch(taskoption) {
              case 'address':
                this.taskLabel = "Write your address"
                break;
              case 'list':
                this.taskLabel = "Write a shopping list"
                break;
              case 'names':
                this.taskLabel = "Write the names of your family members"
                break;
              case 'social-media':
                this.taskLabel = "Someone posts this picture on social media. Write your comment"
                break;
              case 'text-message':
                this.taskLabel = "Reply to this text message"
                break;
              case 'diary':
                this.taskLabel = "Write a diary entry for yesterday"
                break;
              case 'email':
                this.taskLabel = "Write an email to a friend to tell them how you are and what you have been doing"
                break;
              case 'important':
                this.taskLabel = "Write about something important to you"
                break;
              case 'story':
                this.taskLabel = "Tell the story of this picture"
                break;
            default:
              // code block
            }
          },
          exit() {
                this.$router.push({ path: './' });
          }
      },
      mounted() {
          this.focusInput();
          this.startTime = Date.now();
          this.dateStr = new Date;
          this.participantId = this.returnID();
          localStorage.setItem('ID', this.participantId);
          this.taskOption = localStorage.getItem('option');
          this.getTaskLabel(this.taskOption);

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

  #header {
    padding-bottom: 20px;
  }

  #story-picture {
    height : 100%;
    width: auto;
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
