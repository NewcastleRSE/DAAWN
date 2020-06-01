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

            </div>
          </div>

          <div class="level-item has-text-centered">
            <div class="field">
              <div class="control">
                <input ref="text" class="input is-large" type="text" maxlength="10" v-model="responseText" v-on:keydown="keyLogger($event)">
                <span id="forward-arrow"><font-awesome-icon icon="arrow-circle-right" size="3x"  @click="nextImage"></font-awesome-icon></span>
              </div>
            </div>
          </div>

          {{ currentSet}} / {{ index }}

        </div>
      </div>

        <div class="level-item has-text-centered counter">
          <p class="title is-5">{{ index+1}} of 30 </p>
        </div>

      <div class="level" v-if="index >= 30">
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

  export default {
        name: "AppPractice",
        components: {
        },
        data() {
            return {
                currentSet: '',
                index : 0,
                setComplete : false,
                filename: '',
                name: '',
                status : 'in progress',
                responseText: '',
                response: [],
                startTime: 0,
                setOne : ['jar', 'zip', 'egg', 'fly', 'key', 'cow', 'ear', 'pear', 'crab', 'tray', 'frog', 'tyre', 'mask', 'comb', 'train', 'chair', 'sheep', 'horse', 'lemon', 'pencil', 'violin','saddle', 'magnet', 'giraffe','toaster', 'penguin','butterfly', 'cucumber', 'fountain', 'strawberry'],
                setTwo : ['mop', 'leg', 'fan', 'bed', 'fox', 'pen', 'jug', 'harp', 'sock', 'fork', 'doll', 'hook', 'shoe', 'worm', 'chain', 'plate', 'grass', 'table', 'clock', 'scales', 'wallet', 'slipper', 'candle', 'anchor','feather', 'pumpkin','skeleton', 'kangaroo','telescope','microphone'],
                setThree : ['eye', 'cat', 'tie', 'net', 'bat','owl', 'cot', 'tent', 'soap', 'lamp', 'dart','kite', 'cork', 'rake', 'knife', 'apple', 'brain','dress','house', 'coffin', 'grapes', 'teapot', 'cactus', 'battery','lettuce','hammock','necklace','starfish', 'pineapple','wheelchair'],
                setFour : ['jar', 'zip', 'egg', 'fly', 'key', 'cow', 'ear', 'mop', 'leg', 'fan', 'bed', 'fox', 'pen', 'jug','eye', 'cat', 'tie', 'net', 'bat','owl', 'cot', 'pear', 'crab', 'tray', 'frog', 'tyre', 'mask', 'comb', 'harp', 'sock', 'fork', 'doll', 'hook', 'shoe', 'worm', 'tent', 'soap', 'lamp', 'dart','kite', 'cork', 'rake'],
                expectedOutcome: '',
                actualOutcome: '',
                responseType: '',
                processResponse: [],
                catScore: 0,
                DLScore: 0,
                firstCorrect: '',
                secondCorrect: '',
                responseTime: 0,
                reactionTime: 0
            }
         },
        methods: {
            getImage(set, index){

              if(index !== 30) {
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
                else {
                  this.filename = this.setFour[index] + '.jpg';
                  this.name = this.setFour[index];
                }
                return require(`../assets/${set}/${this.filename}`);
              }
            },
            nextImage() {
                if(this.index < 29){
                  this.collectData();
                  this.clearData();
                  this.index++;
                  this.focusInput();
                }
                else {
                  this.status = 'completed';
                  this.setComplete = true;
                  let now = Date.now();
                  this.responseTime =  this.calcTimePassed(now);

                  console.log(this.response);
                  this.saveToFile(this.response);
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

                //ensures the score is not negative
                let imageNameLength=this.name.length;
                if(imageNameLength-this.DLScore < 0){
                    this.catScore=imageNameLength-this.DLScore;
                }

                if(this.responseText.charAt(0) === this.name.charAt(0)) {
                  this.firstCorrect = 1;
                }
                else {
                  this.firstCorrect = 0;
                }
                if(this.responseText.charAt(0)+this.responseText.charAt(1)  === this.name.charAt(0)+this.name.charAt(1)) {
                  this.secondCorrect = 1;
                }
                else {
                  this.secondCorrect = 0;
                }

                let newTime = Date.now();
                this.reactionTime = this.calcTimePassed(newTime);

                /*let processObject = { 'processResponse' : this.processResponse };
                localStorage.setItem(this.name, JSON.stringify(processObject)); */

                this.response = { "expected_outcome" : this.expectedOutcome, "actual_response" : this.actualOutcome, "response_type" : this.responseType, "cat_score" : this.catScore, "dla_score" : this.DLScore, "first_correct": this.firstCorrect, "second_correct" : this.secondCorrect, 'processResponse' : this.processResponse };

                localStorage.setItem(this.name, JSON.stringify(this.response));

            },
            clearData() {
               this.processResponse = [];
               this.expectedOutcome = '';
               this.actualOutcome = '';
               this.responseType = '';
               this.catScore = 0;
               this.DLScore = 0;
               this.firstCorrect = '';
               this.secondCorrect = '';
            },
            endSet() {

            },
            keyLogger: function($event) {
              console.log($event.key);
              this.processResponse.push($event.key);
            },
            calcTimePassed(newTime){
              let diff=(newTime-this.startTime)/1000;
              // rounds length of time down and expresses it in seconds
              let timePassed=Math.floor(diff);
              console.log(timePassed);
              return timePassed;
            },
            focusInput() {
              this.$refs.text.focus();
            },
             saveToFile(mydata) {
                console.log('saving file!');
               const data = JSON.stringify(mydata);
               console.log(data);

               let todayDate = new Date().toISOString().slice(0,10);

               const blob = new Blob([data], {type: 'text/plain'});
               const e = document.createEvent('MouseEvents'),
                 a = document.createElement('a');


               a.download = "outcomes-" + todayDate + ".txt";
               a.href = window.URL.createObjectURL(blob);
               a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
               e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
               a.dispatchEvent(e);

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
            this.focusInput();
            this.startTime = Date.now();
            console.log('Start time ' + this.startTime);
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
