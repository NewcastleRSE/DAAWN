<template>
  <div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="../assets/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">Beginning the practice session</p>
      </div>

      <div class="text">
          <p>Please ensure the patient understands the page controls.</p>
      </div>

      <div class="level-item has-text-centered">

        <div class="box" >

          <div class="level">
            <tooltip label="This will add the first letter of the word to the input box" placement="top-right">
            <div class="level-left tooltip">
              <span class="hint-icon"><font-awesome-icon icon="lightbulb" size="2x"></font-awesome-icon></span>
              <span id="hint" class="special">Hint</span>
            </div>
            </tooltip>

            <tooltip label="This will close the picture set" placement="top-right">
            <div class="level-right tooltip">
                <span class="exit-icon"><font-awesome-icon icon="times-circle" size="2x"></font-awesome-icon></span>
                <span id="exit" class="special">Exit</span>
            </div>
            </tooltip>
          </div>

          <div class="level">
            <div class="level-item has-text-centered">

            <img v-bind:style="{ display: showPractice1 }"  :src="getImage('boy2.jpg')">
            <img v-bind:style="{ display: showPractice2 }"  :src="getImage('tree.jpg')">
            </div>
          </div>

          <div class="level-item has-text-centered">
            <div class="field">
              <div class="control">
                <input ref="text" class="input is-large" type="text" maxlength="10" v-model="practiceImage">
                <span id="forward-arrow"><font-awesome-icon icon="arrow-circle-right" size="3x"  @click="nextPractice"></font-awesome-icon></span>
              </div>
            </div>
          </div>


        </div>
      </div>

        <div class="level-item has-text-centered counter">
          <p class="title is-5">Practice set {{ count}} of 2</p>
        </div>

      <div class="level">
        <div class="level-item">

          <p class="highlight special">Click <strong>Start</strong> to begin the ASSESSMENT section.</p>
        </div>
        <div class="level-item">
          <div class="buttons-section form-group">
            <button class="button exit-btn" @click=exit()>Exit</button>
            <button class="button next-btn" @click=beginSet()>Start</button>
          </div>

        </div>
      </div>

    </div>
  </div>

</template>

<script>

  import Tooltip from 'vue-bulma-tooltip'

  export default {
        name: "AppPractice",
        components: {
          Tooltip
        },
        data() {
            return {
                showPractice1 : 'flex',
                showPractice2: 'none',
                count: 1,
                practiceImage: ''
            }
         },
        methods: {
            getImage(name){
               return require(`../assets/practiceSet/${name}`);
            },
            nextPractice() {
                this.$data.practiceImage = '';
                this.showPractice1 = 'none';
                this.showPractice2 = 'flex';
                if(this.count < 2){
                  this.count++;
                }
            },
            beginSet() {

              let currentSet = localStorage.getItem('set');
              this.$router.push({ path: './assessment/' + currentSet });
            },
            focusInput() {
              this.$refs.text.focus();
            },
            exit() {
              this.$router.push({ path: './' });
            }
        },
        mounted() {
              this.focusInput();
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

  .tooltip {
    position: relative;
  }

  .tooltip #hint{
    position: absolute;
    top : 0px;
  }

  .tooltip #exit {
    position: absolute;
    top : 5px;
    right: 5px;
  }



</style>
