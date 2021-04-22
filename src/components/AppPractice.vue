<template>
  <div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">Practice</p>
      </div>

      <p class="text">After completing the practice items, the client will be taken straight to the assessment. To <strong>skip</strong> the practice items, click the <span class="special">Start</span> button below the image.</p>

      <div class="level-item has-text-centered">

        <div class="box" >

          <div class="level">
            <div class="level-left" @click="hint">
              <span class="hint-icon"><font-awesome-icon icon="lightbulb" size="2x"></font-awesome-icon></span>
              <span id="hint" class="special">Hint</span>
            </div>

            <div class="level-right">
                <span class="exit-icon"><font-awesome-icon icon="times-circle" size="2x"></font-awesome-icon></span>
                <span id="exit" class="special">Exit</span>
            </div>
          </div>

          <div class="level">
            <div class="level-item has-text-centered">

            <img v-bind:style="{ display: showPractice1 }"  :src="getImage('bell.jpg')">
            <img v-bind:style="{ display: showPractice2 }"  :src="getImage('baby.jpg')">
            </div>
          </div>

          <div class="level-item has-text-centered">
            <div class="field">
              <div class="control">
                <input ref="text" class="input is-large" type="text" maxlength="10" v-model="practiceImage" spellcheck="false" autocorrect="off" autocapitalize="none">
                <span id="forward-arrow" v-show="status !== 'completed'"><font-awesome-icon icon="arrow-circle-right" size="3x"  @click="nextPractice"></font-awesome-icon></span>
              </div>
            </div>
          </div>


        </div>
      </div>

        <div class="level-item has-text-centered counter">
          <p class="title is-5">Practice set {{ count}} of 2</p>
        </div>

        <div v-if="status==='completed'" class="start-text">
          <p class="title is-4">You are now ready to start the assessment!</p>
        </div>


      <div class="level">
        <div class="level-item">

          <p class="highlight special">Click <strong>Start</strong> to begin the ASSESSMENT section</p>
        </div>
        <div class="level-item">
          <div class="buttons-section form-group">
            <button class="button exit-btn" @click=exit()>Exit</button>
            <button class="button next-btn" @click=beginSet()>Start</button>
          </div>

        </div>
      </div>
      <ExitModal v-if="showExitModal" @close="showExitModal = false" />

    </div>
  </div>
</template>

<script>

  import Tooltip from 'vue-bulma-tooltip';
  import ExitModal from "./ExitModal";

  export default {
        name: "AppPractice",
        components: {
          Tooltip,
          ExitModal
        },
        data() {
            return {
                showPractice1 : 'flex',
                showPractice2: 'none',
                count: 1,
                practiceImage: '',
                status : 'in progress',
                name : '',
                hintClicked : false,
                showExitModal : false,
                currentSet : ''
            }
         },
        methods: {
            getImage(name){
               return require(`../assets/practiceSet/${name}`);
            },
            nextPractice() {
                this.$data.practiceImage = '';
                this.hintClicked = false;
                this.name = "bell";
                this.showPractice1 = 'none';
                this.showPractice2 = 'flex';
                if(this.count < 2){
                  this.count++;
                  this.focusInput();
                }
                else {
                  this.status = 'completed';
                 // this.$router.push({ path: './assessment/' + this.currentSet });
                }
            },
            beginSet() {
                this.$router.push({ path: './assessment?set=' + this.currentSet });
            },
            hint() {
                if(this.practiceImage === ""){
                    this.practiceImage = this.name.slice(0,1);
                    this.hintClicked = true;
                    this.focusInput();
                }
            },
            focusInput() {
              this.$refs.text.focus();
            },
            exit() {
              this.showExitModal = true;
            }
        },
        mounted() {
              this.currentSet = localStorage.getItem('set');
              this.focusInput();
              this.name = "boy";
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

  .box {
    width: 600px;
    margin: auto 0;
  }

  .text {
    margin-bottom: 40px;
  }

  .counter {
    padding: 30px 0;
  }

  .hint-icon {
    padding-right: 10px;
  }

  .exit-icon {
    padding-right: 12px;
  }

  #forward-arrow{
    float: right;
    margin-right: 6px;
    margin-top: -54px;
    position: relative;
    z-index: 2;
  }

  .start-text{
    text-align: center;
  }



</style>
