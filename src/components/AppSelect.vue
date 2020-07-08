<template>
  <div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">DAAWN Assessment</p>
      </div>

      <div class="content">
        <p class="special">DAAWN will collect the following information, which you can download as a PDF when the assessment is completed:</p>

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

        <p class="text">You can also download this information in a machine-readable JSON format</p>
      </div>

      <p class="text title is-4">Please select an appropriate image set</p>

      <p>Sets <span class="special">One</span>, <span class="special">Two</span> and <span class="special">Three</span> present 30 images of different word length in a random order. Set <span class="special">Four</span> contains 42 images of only 3 and 4 letter words, presented in respective groups.</p>


      <form id="options-form">
        <div class="field">
          <div class="form-group">

            <validation-provider rules="required" v-slot="{ errors }">
            <div><input type="radio" name="question" v-model="set" value="one"> <label class="radio">One</label></div>
            <div><input type="radio" name="question" v-model="set" value="two"> <label class="radio">Two</label></div>
            <div><input type="radio" name="question" v-model="set" value="three"> <label class="radio">Three</label></div>
            <div><input type="radio" name="question" v-model="set" value="four"> <label class="radio">Four</label></div>
              <span>{{ errors[0] }}</span>
            </validation-provider>
          </div>
        </div>

      </form>

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
        <ExitModal v-if="showExitModal" @close="showExitModal = false" />

    </div>
  </div>

</template>

<script>

  import { dataService } from '../services/data.service';
  import { ValidationProvider } from 'vee-validate';
  import ExitModal from "./ExitModal";


  export default {
        name: "AppSelect",
        components: {
          ValidationProvider,
          ExitModal
        },
        data() {
            return  {
              set : null,
              submitted: false,
              showExitModal: false
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
                this.showExitModal = true;
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

  #header {
    padding-bottom: 20px;
  }

  #options-form {
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

  .content {
    padding: 20px 0;
  }



</style>
