<template>
  <div class="container is-widescreen">
    <div id="page" ref="content">
      <div class="header">
        <span class="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" class="daawn-logo"></span>
        <p class="title is-3">Free Task Assessment Complete</p>
      </div>

      <div id="main" class="level">
        <div class="level-item">
            <h4 class="title">Thank you for completing the assessment</h4>
            <span><img src="dist/orange-tick.png" alt="tick" id="tick-image"></span>
        </div>
      </div>

      <div class="level">
        <div class="level-item">

          <p class="highlight special">Click <strong>Free Task Report</strong> to view the assessment results.</p>
        </div>
        <div class="level-item">
          <div class="buttons-section form-group">
            <button class="button exit-btn" @click=exit()>Exit</button>
            <button class="button report-btn" @click=report()>Free Task Report</button>
          </div>

        </div>
      </div>


    </div>
  </div>
</template>

<script>
    export default {
        name: "FreeTaskAssessmentComplete",
        methods: {
          report() {
            this.$router.push({ path: './ftreport'});
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

  #tick-image {
    height: 80px;
    padding-left: 20px;
    margin-top: -20px;
  }

  #main {
    height: 300px;
  }

  .header {
    padding-bottom: 20px;
  }

  .logo {
    float:right;
  }

  .daawn-logo {
    height: 40px;
  }

  .report-btn {
    background-color: #FFBD68;
    font-size: 1.2em;
    width: 170px;
  }

  .exit-btn {
    font-size: 1.2em;
  }

</style>
