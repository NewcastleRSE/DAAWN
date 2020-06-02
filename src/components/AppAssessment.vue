<template>
  <div class="container is-widescreen">
    <div id="page">
      <div class="header" v-show="index === 0">
        <span class="logo"><img src="../assets/sundawn.png" alt="Welcome to the DAAWN tool" class="daawn-logo"></span>
        <p  class="title is-3">Beginning the <strong>assessment</strong> session</p>
      </div>

      <div class="header" v-show="index > 0">
        <span class="logo"><img src="../assets/sundawn.png" alt="Welcome to the DAAWN tool" class="daawn-logo"></span>
        <p class="title is-3">Assessment {{ status }}</p>
      </div>

      <div class="level-item has-text-centered">

        <div class="box" >

          <div class="level">
            <div class="level-left icons" >
              <span class="hint-icon"><font-awesome-icon icon="lightbulb" size="2x"></font-awesome-icon></span>
              <span id="hint" class="special">Hint</span>
            </div>
            <div class="level-right icons">
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
                <input ref="text" class="input is-large" type="text" maxlength="10" v-model="responseText" v-on:keydown="keyLogger($event)">
                <span id="forward-arrow" v-show="status !== 'completed'"><font-awesome-icon icon="arrow-circle-right" size="3x"  @click="nextImage(index)"></font-awesome-icon></span>
              </div>
            </div>
          </div>

          {{ currentSet }} / {{ index }} / {{ status }}

        </div>
      </div>

        <div class="level-item has-text-centered counter">
          <p class="title is-5">{{ index+1 }} of {{ numInSet }} </p>
        </div>

      <div class="level" v-if="status === 'completed'">
        <div class="level-item">

          <p class="highlight special">Click <strong>Next</strong> to access the ASSESSMENT REPORT</p>
        </div>
        <div class="level-item">
          <div class="buttons-section form-group">
            <button class="button exit-btn" @click=exit()>Exit</button>
            <button class="button next-btn" @click=endSet()>Next</button>
          </div>

        </div>
      </div>

    </div>
  </div>

</template>

<script>


  import {dataService} from "../services/data.service";
  import {settings} from "../settings";

  export default {
        name: "AppPractice",
        components: {
        },
        data() {
            return {
                currentSet: '',
                numInSet : 0,
                index : 0,
                filename: '',
                name: '',
                status : 'in progress',
                responseText: '',
                setOne : ['jar', 'zip', 'egg', 'fly', 'key', 'cow', 'ear', 'pear', 'crab', 'tray', 'frog', 'tyre', 'mask', 'comb', 'train', 'chair', 'sheep', 'horse', 'lemon', 'pencil', 'violin','saddle', 'magnet', 'giraffe','toaster', 'penguin','butterfly', 'cucumber', 'fountain', 'strawberry'],
                setTwo : ['mop', 'leg', 'fan', 'bed', 'fox', 'pen', 'jug', 'harp', 'sock', 'fork', 'doll', 'hook', 'shoe', 'worm', 'chain', 'plate', 'grass', 'table', 'clock', 'scales', 'wallet', 'slipper', 'candle', 'anchor','feather', 'pumpkin','skeleton', 'kangaroo','telescope','microphone'],
                setThree : ['eye', 'cat', 'tie', 'net', 'bat','owl', 'cot', 'tent', 'soap', 'lamp', 'dart','kite', 'cork', 'rake', 'knife', 'apple', 'brain','dress','house', 'coffin', 'grapes', 'teapot', 'cactus', 'battery','lettuce','hammock','necklace','starfish', 'pineapple','wheelchair'],
               /* setFour : ['jar', 'zip', 'egg', 'fly', 'key', 'cow', 'ear', 'mop', 'leg', 'fan', 'bed', 'fox', 'pen', 'jug','eye', 'cat', 'tie', 'net', 'bat','owl', 'cot', 'pear', 'crab', 'tray', 'frog', 'tyre', 'mask', 'comb', 'harp', 'sock', 'fork', 'doll', 'hook', 'shoe', 'worm', 'tent', 'soap', 'lamp', 'dart','kite', 'cork', 'rake'], */

                setFour : ['jar', 'zip', 'egg'],
                response: [],
                expectedOutcome: '',
                actualOutcome: '',
                responseType: '',
                processResponse: [],
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
                keystrokes: 0
            }
         },
        methods: {
            getImage(set, index){

              console.log('starting index ' + this.index);

              if(index !== this.numInSet) {
                if(this.currentSet === 'one'){
                 // this.shuffle(this.setOne);
                  this.filename = this.setOne[index] + '.jpg';
                  this.name = this.setOne[index];
                }
                else if(this.currentSet === 'two') {
                //  this.shuffle(this.setTwo);
                  this.filename = this.setTwo[index] + '.jpg';
                  this.name = this.setTwo[index];
                }
                else if(this.currentSet === 'three') {
                //  this.shuffle(this.setThree);
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
            nextImage(index) {
                if(index === this.numInSet-1){
                  this.collectData();
                  this.clearData();
                  this.status = 'completed';
                }
                else {
                  this.collectData();
                  this.clearData();
                  this.index++;
                  this.focusInput();
                }
                this.$data.responseText = '';
            },
            collectData() {
                this.expectedOutcome = this.name;
                this.actualOutcome = this.responseText;
                if(this.name === this.responseText){
                  this.responseType = 1;
                }
                else {
                  this.responseType = 0;
                }

                this.DLScore = dataService.levenshtein(this.name, this.responseText);
                this.numLetters = this.name.length;

                let imageNameLength=this.name.length;
                if(imageNameLength-this.DLScore > 0){
                    this.catScore=imageNameLength-this.DLScore;
                }

                this.reactionTime = this.keystrokeTimes[0];
                this.responseTime = this.keystrokeTimes.pop();
                let newTime = Date.now();
                this.moveOnTime = this.calcTimePassed(this.startTime, newTime);
                this.numDeletions =  this.processResponse.filter(function(item){ return item === "Backspace"; }).length;

                this.response = { "expected_outcome" : this.expectedOutcome,
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
                                  "processResponse" : this.processResponse };

                localStorage.setItem(this.name, JSON.stringify(this.response));

            },
            clearData() {
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

            },
            keyLogger: function($event) {
                this.processResponse.push($event.key);
                this.keystrokes++;
                let keystrokeTime = Date.now();

                if(this.keystrokeTimes.length > 0){
                      // get the last array entry
                     let lastKeystrokeTime = this.keystrokeTimes.slice(-1);
                     // get the value for the current key event
                     let timePassed = this.calcTimePassed(this.startTime, keystrokeTime);

                     if(timePassed-lastKeystrokeTime > 1){
                       this.processResponse.push(timePassed-lastKeystrokeTime + " sec");
                     }
                }
                this.keystrokeTimes.push(this.calcTimePassed(this.startTime, keystrokeTime));
            },
            // compares 2 timestamps, returns an integer
            calcTimePassed(startTime, newTime){
              let diff=(newTime-startTime)/1000;
              // rounds length of time down and expresses it in seconds
              let timePassed=Math.floor(diff);
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
           exit() {
              this.$router.push({ path: './' });
           }
        },
        mounted() {
            this.currentSet = this.$route.params.set;
            if(this.currentSet === 'four'){
              this.numInSet = settings.numInSetFour;
            }
            else {
              this.numInSet = settings.numInSet;
            }
            this.focusInput();
            this.startTime = Date.now();
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




</style>
