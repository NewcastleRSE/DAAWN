<template>
  <div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">Assessment page example</p>
      </div>

      <p class="text">The image is an example of each item in the test.</p>



      <div class="level">
        <div class="level-left">
          <p class="large"><strong>Write</strong> the <strong>name</strong> of the <strong>picture</strong> on the screen. </p>
        </div>
      </div>

      <div class="level">
        <div class="level-left">
          <p class="large">Press <font-awesome-icon icon="arrow-circle-right"></font-awesome-icon> to <strong>continue</strong> to the next picture.</p>
        </div>
      </div>

      <div class="level">
        <div class="level-item has-text-centered">
            <img src="dist/shark-example.png" alt="picture of shark and help text">
        </div>
      </div>

      <div class="level">
        <div class="level-item">
          <p class="highlight special">Click <strong>Start</strong> to begin the PRACTICE section</p>
        </div>
        <div class="level-item">
          <div class="buttons-section form-group">
            <button class="button exit-btn" @click=exit()>Exit</button>
            <button class="button next-btn" @click=next()>Start</button>
          </div>

        </div>
      </div>

      <ExitModal v-if="showExitModal" @close="showExitModal = false" />

    </div>
  </div>
</template>

<script>

  import ExitModal from "./ExitModal";

  export default {
        name: "AppInstructions",
        components: {
          ExitModal
        },
        data() {
            return {
               showExitModal: false
            }
        },
        methods: {
            next() {
              this.$router.push({ path: './practice' });
            },
            exit() {
              this.showExitModal = true;
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

  .large {
    font-size: 1.2em;
  }

  .text {
    margin-bottom: 20px;
  }


</style>
