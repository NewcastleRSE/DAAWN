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
            <div class="level-left">
              <span class="icon"><font-awesome-icon icon="lightbulb" size="2x"></font-awesome-icon></span>
              <span class="special">Hint</span>
            </div>
            <div class="level-right">
                <span class="icon"><font-awesome-icon icon="times-circle" size="2x"></font-awesome-icon></span>
                <span class="special">Exit</span>
            </div>
          </div>

          <div class="level">
            <div class="level-item has-text-centered">

            <a href="#"><img v-bind:style="{ display: showPractice1 }"  :src="getImage('boy2.jpg')" @click="nextPractice" ></a>
            <a href="#"><img v-bind:style="{ display: showPractice2 }"  :src="getImage('tree.jpg')" @click="beginSet" ></a>
            </div>
          </div>

          <div class="level-item has-text-centered">
            <div class="field">
              <div class="control">
                <input ref="text" class="input is-large" type="text" maxlength="10" autofocus>
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

          <p class="highlight special">Click <strong>Start</strong> to begin the assessment section.</p>
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

  export default {
        name: "AppPractice",
        data() {
            return {
                showPractice1 : 'flex',
                showPractice2: 'none',
                count: 1
            }
         },
        methods: {
            getImage(name){
               return require(`../assets/practiceSet/${name}`);
            },
            nextPractice() {
                this.showPractice1 = 'none';
                this.showPractice2 = 'flex';
                this.count++;
            },
            beginSet() {

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

  .icon{
    padding-right: 20px;
  }



</style>
