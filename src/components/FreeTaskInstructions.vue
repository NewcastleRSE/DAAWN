<template>
<div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">Free text task instructions</p>
      </div>

       <div class="content">

         <p class="text">This tool allows you to elicit written language from a person with aphasia using different stimulus prompts. The suggested tasks offer varying levels of complexity and aim to be functional and relevant to the type of written language people may wish to produce. </p>


          <p class="special">Regardless of the task stimulus, DAAWN will collect the following information which you can download as a PDF when the assessment is completed:</p>

          <ul>
            <li>Final produced text​</li>
            <li>Keystroke log/process response – including pauses and deletions as with single word data</li>
            <li>Typing speed – mean inter-key interval</li>
            <li>Response time (time taken to write the entire response)</li>
            <li>Process response (all letters, pauses over 1 second and deletions)</li>
            <li>No of words produced in final text</li>
          </ul>

         <p class="title is-4">Choose a level of complexity</p>

           <form id="options-form">
            <div class="field">
              <div class="form-group">
                <validation-provider rules="required" v-slot="{ errors }">
                  <div><input type="radio" name="options" v-model="option" value="phrase"> <label class="radio">Short Phrase</label></div>
                  <div><input type="radio" name="options" v-model="option" value="sentence"> <label class="radio">Sentence</label></div>
                  <div><input type="radio" name="options" v-model="option" value="narrative"> <label class="radio">Narrative</label></div>
                  <span>{{ errors[0] }}</span>
                </validation-provider>
              </div>
            </div>
          </form>

         <div v-show="option === 'phrase'">
           <p class="title is-4">Short phrase level options</p>

           <div class="level">
            <form id="phrase-options-form">
              <div class="field">
                <div class="form-group">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <div><input type="radio" name="short-phrase" v-model="phrase" value="address"> <label class="radio">Write your <strong>address</strong></label></div>
                    <div><input type="radio" name="short-phrase" v-model="phrase" value="list"> <label class="radio">Write a <strong>shopping list</strong></label></div>
                    <div><input type="radio" name="short-phrase" v-model="phrase" value="names"> <label class="radio">Write the <strong>names</strong> of your <strong>family members</strong></label></div>
                    <span>{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>
            </form>
           </div>
         </div>

         <div v-show="option === 'sentence'">
           <p class="title is-4">Sentence level options</p>

           <div class="level">
            <form id="sentence-options-form">
              <div class="field">
                <div class="form-group">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <div><input type="radio" name="sentence-option" v-model="sentence" value="social-media"> <label class="radio">Write a <strong>social media comment</strong></label></div>
                    <div><input type="radio" name="sentence-option" v-model="sentence" value="text-message"> <label class="radio">Your <strong>friend</strong> has sent you a <strong>text</strong> message. Please <strong>reply</strong>.</label></div>
                    <span>{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>
            </form>
           </div>
         </div>


         <div v-show="option === 'narrative'">
           <p class="title is-4">Narrative level options</p>

           <div class="level">
            <form id="narrative-options-form">
              <div class="field">
                <div class="form-group">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <div><input type="radio" name="narrative-option" v-model="narrative" value="diary"> <label class="radio">Write a <strong>diary entry</strong> for yesterday</label></div>
                    <div><input type="radio" name="narrative-option" v-model="narrative" value="email"> <label class="radio">Write an <strong>email</strong> to a <strong>friend</strong> to tell them <strong>how you are</strong> and what you <strong>have been doing</strong></label></div>
                    <div><input type="radio" name="narrative-option" v-model="narrative" value="important"> <label class="radio">Write about <strong>something important</strong> to you</label></div>
                    <div><input type="radio" name="narrative-option" v-model="narrative" value="story"> <label class="radio">Tell the <strong>story</strong> of this picture</label></div>
                    <span>{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>
            </form>
           </div>
         </div>

       <div v-show="optionerror === true">
         <p>No choice has been selected, please choose from one of the options provided</p>
       </div>

       </div>

      <div class="level">
        <div class="level-item">
          <p class="highlight special">Click <strong>Start</strong> to begin the session</p>
        </div>
        <div class="level-item">
          <div class="buttons-section form-group">
            <button class="button exit-btn" @click=exit()>Exit</button>
            <button class="button next-btn" @click=saveFreeTextSettings() :disabled="isFormInvalid">Start</button>
          </div>


        </div>
      </div>

      <ExitModal v-if="showExitModal" @close="showExitModal = false" />

    </div>
  </div>
</template>

<script>
  import {ValidationProvider} from "vee-validate";
  import ExitModal from "./ExitModal";
  import {dataService} from "../services/data.service";

  export default {
      name: "FreeTaskInstructions",
      components: {
          ValidationProvider,
          ExitModal
      },
      data() {
          return {
            option: '',
            phrase: '',
            sentence: '',
            narrative: '',
            final: null,
            optionerror: false
          }
      },
      computed : {
          isFormInvalid() {
            if(!this.phrase && !this.narrative && !this.sentence){
              return true;
            }
            else {
              return false;
            }
          }
      },
      methods: {
          saveFreeTextSettings(){
               if(this.option === 'phrase'){
                 this.final = this.phrase;
               }
               else if(this.option === 'sentence'){
                 this.final = this.sentence;
               }
               else if(this.option === 'narrative'){
                 this.final = this.narrative;
               }
               else {
                 this.optionerror = true;
               }
               this.saveData()
          },
          saveData() {
              dataService.saveFreeTextOption(this.final);
              this.$router.push({ path: './ftassessment' });
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

  #options-form {
    margin-bottom: 30px;
  }

  form {
    margin-left: 10px;
  }

  .title.is-4 {
    margin: 20px 0;
  }

</style>
