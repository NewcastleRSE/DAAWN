<template>
<div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">Free text task example</p>
      </div>
      <p class="text">The client will be given a picture with a text entry area below. They will be asked to <em>'Tell the story of this picture'</em>.
      There are no restrictions on what the client can write, other than a fixed 200 character word limit.</p>


      <div class="level">
        <div class="level-item">
          <p class="highlight special">Click <strong>Start</strong> to begin the session</p>
        </div>
        <div class="level-item">
          <div class="buttons-section form-group">
            <button class="button exit-btn" @click=exit()>Exit</button>
            <button class="button next-btn" @click=beginFreeTask()>Start</button>
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
      name: "FreeTaskInstructions",
      data() {
        return {
            text: phrases,
            textToShow: '',
            textArray: []
        }
      },
      methods: {
          beginFreeTask() {
                this.$router.push({ path: './ftassessment' });
          },
          exit() {
            this.$router.push({ path: './' });
          }
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
