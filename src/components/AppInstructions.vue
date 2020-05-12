<template>
  <div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="src/assets/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">Completing a practice session</p>
      </div>

      <div class="level">
        <div class="level-left">
          <p>Please ensure the patients are introduced to the assessment through the practice session.</p>
        </div>
      </div>
      <div class="level">
        <div class="level-left">
          <p class="title is-4">Instructions</p>
        </div>
      </div>
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
            <img src="../assets/example.png" alt="picture of boy and text input box below">
        </div>
      </div>


      <div class="level">
        <div class="level-item">
          <p class="highlight special">Click <strong>Start</strong> to begin the PRACTICE section.</p>
        </div>
        <div class="level-item">
          <div class="buttons-section form-group">
            <button class="button exit-btn" @click=exit()>Exit</button>
            <button class="button next-btn" @click=next()>Start</button>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>

  export default {
        name: "AppInstructions",

        methods: {

            next() {
              this.$router.push({ path: './practice' });
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

  .large {
    font-size: 1.2em;
  }


</style>
