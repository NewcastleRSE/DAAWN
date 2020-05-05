<template>
  <div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="../assets/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">Using the DAAWN tool</p>
      </div>
      <p class="text">This tool is designed for use by <span class="special">Speech and Language Therapists (SLT)</span> and their patients.</p>

      <p class="text">The SLT will be able to choose from a set of output options, such as timings and corrected errors.</p>

      <p class="text">Once a patient has completed an assessment, the results will be made available in a downloadable PDF format.</p>

      <div class="level" >
        <div class="level-item">

          <p id="highlight" class="special">Click <strong>Next</strong> to select your options.</p>
        </div>
        <div class="level-item">
          <div class="buttons-section">
            <button class="button exit-btn" @click=exit()>Exit</button>
            <button class="button next-btn" @click=next()>Next</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AppInfo",
        methods: {
            exit() {
              this.$router.push({ path: './' });
            },
            next() {
              this.$router.push({ path: './appselect' });
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





</style>
