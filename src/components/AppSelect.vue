<template>
  <div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="../assets/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">Selecting your output options</p>
      </div>

      <form id="options-form">

        <div class="field">
          <div class="form-group">
            <p class="special">Please select an appropriate image set</p>

            <p>Sets 'One', 'Two' and 'Three' present 30 images of different word length in a random order. Set 'Four' contains only 3 and 4 letter words, presented in respective groups.</p>

            <validation-provider rules="required" v-slot="{ errors }">
            <div><input type="radio" name="question" v-model="set" value="one"> <label class="radio">Set One</label></div>
            <div><input type="radio" name="question" v-model="set" value="two"> <label class="radio">Set Two</label></div>
            <div><input type="radio" name="question" v-model="set" value="three"> <label class="radio">Set Three</label></div>
            <div><input type="radio" name="question" v-model="set" value="three"> <label class="radio">Set Four</label></div>
              <span>{{ errors[0] }}</span>
            </validation-provider>
          </div>
        </div>

        <div class="content">

            <p class="special">These are the data categories that will be recorded</p>

            <ul>
              <li>Correct or incorrect response</li>
              <li>End response</li>
              <li>Automatically scored results using the CAT system</li>
              <li>Automatically scored results using the Damerau-Levenshtein algorithm</li>
              <li>Reaction time (time taken to type first letter from seeing the image)</li>
              <li>Response time (time taken to write the entire response)</li>
              <li>Process response (all letters, pauses over 1 second and deletions)</li>
              <li>Number of letters</li>
              <li>Number of keystrokes</li>
              <li>Number of deletions</li>
            </ul>


          <!--  <validation-provider rules="required" v-slot="{ errors }">
            <input type="checkbox" name="CAT" id="CAT"  value="CAT" v-model="settings" > <label for="CAT">Automatically scored results using the CAT system</label><br />
            <input type="checkbox" name="DL" id="DL" value="DL" v-model="settings" > <label for="DL">Automatically scored results using the Damerau-Levenshtein alrgorithm</label><br />
            <input type="checkbox" name="reaction" id="reaction" value="reaction" v-model="settings"> <label for="reaction">Reaction time (time taken to type first letter)</label><br />
            <input type="checkbox" name="responseTime" id="responseTime" value="responseTime" v-model="settings"> <label for="responseTime">Response time (time taken to write entire response)</label><br />
            <input type="checkbox" name="process" id="process" value="process" v-model="settings"> <label for="process">Process response (letters, pauses and deletions)</label><br />
            <input type="checkbox" name="end" id="end" value="end"  v-model="settings"> <label for="end">End response</label><br />
            <input type="checkbox" name="firstLetter" id="firstLetter" value="firstLetter" v-model="settings"> <label for="firstLetter">% of items with the first letter correct</label><br />
            <input type="checkbox" name="secondLetter" id="secondLetter" value="secondLetter" v-model="settings"> <label for="secondLetter">% of items with the first and second letter correct</label><br />
            <input type="checkbox" name="correct" id="correct" value="correct" v-model="settings"> <label for="correct">% of items correct</label>
              <span>{{ errors[0] }}</span>
            </validation-provider> -->

        </div>

        <div class="level" >
          <div class="level-item">

            <p class="highlight special">Click <strong>Next</strong> to proceed.</p>
          </div>
          <div class="level-item">
            <div class="buttons-section form-group">
              <button class="button exit-btn" @click=exit()>Exit</button>
              <button class="button next-btn" @click=next() :disabled="isFormInvalid">Next</button>
            </div>

          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<script>

  import { dataService } from '../services/data.service';
  import { ValidationProvider } from 'vee-validate';


  export default {
        name: "AppSelect",
        components: {
          ValidationProvider
        },
        data() {
            return  {
              set : null,
              submitted: false,
          }
        },
        computed : {
          isFormInvalid() {
            if(!this.set){
              return true;
            }
            else {
              return false;
            }
          }
        },
        methods: {
            exit() {
              this.$router.push({ path: './' });
            },
            next() {
              this.submitted = true;
              this.saveData();
              this.$router.push({ path: './instructions' });
            },
            saveData() {
              dataService.saveSettings(this.set);
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

  #page p {
    padding: 10px 0;
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
