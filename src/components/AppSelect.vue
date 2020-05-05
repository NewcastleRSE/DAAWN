<template>
  <div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="../assets/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">Selecting your output options</p>
      </div>


      <div id="options-form">

        <div class="field">
          <div class="control">
            <p class="special">Please select an appropriate image set</p>

            <div><input type="radio" name="question"> <label class="radio">Set One</label></div>

            <div><input type="radio" name="question"> <label class="radio">Set Two</label></div>

            <div><input type="radio" name="question"> <label class="radio">Set Three</label></div>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <p class="special">Please choose all that apply</p>
            <input type="checkbox" name="CAT" id="CAT"  value="CAT"/> <label for="CAT">Automatically scored results using the CAT system</label><br />
            <input type="checkbox" name="DL" id="DL" value="DL" /> <label for="DL">Automatically scored results using the Damerau-Levenshtein alrgorithm</label><br />
            <input type="checkbox" name="reaction" id="reaction" value="reaction"/> <label for="reaction">Reaction time (time taken to type first letter)</label><br />
            <input type="checkbox" name="responseTime" id="responseTime" value="responseTime"/> <label for="responseTime">Response time (time taken to write entire response)</label><br />
            <input type="checkbox" name="process" id="process" value="process"/> <label for="process">Process response (letters, pauses and deletions)</label><br />
            <input type="checkbox" name="end" id="end" value="end" /> <label for="end">End response</label><br />
            <input type="checkbox" name="firstLetter" id="firstLetter" value="firstLetter" /> <label for="firstLetter">% of items with the first letter correct</label><br />
            <input type="checkbox" name="secondLetter" id="secondLetter" value="secondLetter" /> <label for="secondLetter">% of items with the first and second letter correct</label><br />
            <input type="checkbox" name="correct" id="correct" value="correct"/> <label for="correct">% of items correct</label>
          </div>
        </div>


      </div>


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
        name: "AppSelect",
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

 .field {
   padding: 10px;
 }



</style>
