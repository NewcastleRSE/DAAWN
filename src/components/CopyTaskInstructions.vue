<template>
<div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">Copy task example</p>
      </div>

       <div class="level">
        <div class="level-left">
          <p class="large"><strong>Type</strong> the <strong>sentence</strong> shown into the input box on the screen. </p>
        </div>
      </div>

      <div class="level">
        <img src="/dist/cloud-text-example.png" alt="example sentence: Every cloud has a silver lining">
      </div>

      <div class="level">
        <div class="level-item">
          <p class="highlight special">Click <strong>Start</strong> to begin the session</p>
        </div>
        <div class="level-item">
          <div class="buttons-section form-group">
            <button class="button exit-btn" @click=exit()>Exit</button>
            <button class="button next-btn" @click=beginCopyTask()>Start</button>
          </div>

        </div>
      </div>

      <ExitModal v-if="showExitModal" @close="showExitModal = false" />

    </div>
  </div>
</template>

<script>

  import _ from 'lodash';
  import phrases from '../json/phrases.json';

  export default {
      name: "CopyTaskInstructions",
      data() {
        return {
            text: phrases,
            textToShow: '',
            textArray: []
        }
      },
      methods: {
          randomiseText(text){
             for(let index in text){
                if(text.hasOwnProperty(index)){
                   let temptext = text[index].text;
                   this.textArray.push(temptext);
                }
             }
             let shuffledArray = _.shuffle(this.textArray);
             this.textToShow = shuffledArray[0];
          },
          beginCopyTask() {
                this.$router.push({ path: './ctassessment' });

          },
          exit() {
            this.$router.push({ path: './' });
          }
      },
      created() {
          this.randomiseText(this.text);
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

  #logo {
    float:right;
  }

  #daawn-logo {
    height: 40px;
  }

   #displayText {
     border: 1px solid #c4c4c4;
     border-radius: 5px;
     font-size: 1.6em;
     padding: 10px 20px;
  }

  .large {
    font-size: 1.2em;
  }

  .text {
    margin-bottom: 20px;
  }



</style>
