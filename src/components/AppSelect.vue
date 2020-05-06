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

            <validation-provider rules="required" v-slot="{ errors }">
            <div><input type="radio" name="question" v-model="set" value="one"> <label class="radio">Set One</label></div>
            <div><input type="radio" name="question" v-model="set" value="two"> <label class="radio">Set Two</label></div>
            <div><input type="radio" name="question" v-model="set" value="three"> <label class="radio">Set Three</label></div>
              <span>{{ errors[0] }}</span>
            </validation-provider>
          </div>
        </div>

        {{ set }}

        <div class="field">
          <div class="form-group">
            <p class="special">Please choose all that apply</p>
            <validation-provider rules="required" v-slot="{ errors }">
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
            </validation-provider>
          </div>
        </div>

        <div class="level" >
          <div class="level-item">

            <p id="highlight" class="special">Click <strong>Next</strong> to select your options.</p>
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
              settings: [],
              submitted: false,
          }
        },
        computed : {
          isFormInvalid() {
            if(!this.set || this.settings.length === 0){
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
              this.$router.push({ path: './appselect' });
            },
            saveData() {
              dataService.saveSettings(this.set, this.settings)
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
