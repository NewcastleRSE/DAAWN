<template>
  <div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">DAAWN single word typed naming task</p>
      </div>

      <p class="text">You can choose from one of four stimulus picture sets to carry out this assessment.  Click for information about <a href="#" @click="showSetsModal = true">word sets</a>.
        DAAWN will automatically calculate the number of items correctly named and will provide you with a range of other information you may find relevant as part of your assessment, e.g., timings, automated scoring, and a record of the process by which a person reaches their final response. When your assessment is complete, DAAWN generates an anonymised report, which will be a PDF download.</p>

      <p class="text special">Images</p>

      <p class="text">The photographs used as stimulus images in DAAWN were initially selected as part of a PhD research project by <span class="special">Dr Ella Creet</span> and were obtained from various sources: <cite>Hemera Photo Object Library (Hemera Technologies Inc, 1997-2000)</cite>, Newcastle University picture library or from other open access sources.</p>


      <p class="title is-4">Please select an appropriate image set</p>

      <p class="text">Before starting the Image Naming Task, you will see an example of an assessment page followed by two practice items.</p>

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
          <p class="highlight special">Click <strong>Next</strong> to proceed</p>
        </div>
        <div class="level-item">
          <div class="buttons-section form-group">
            <button class="button exit-btn" @click=exit()>Exit</button>
            <button class="button next-btn" @click=next() :disabled="isFormInvalid">Next</button>
          </div>
        </div>
      </div>
      <ExitModal v-if="showExitModal" @close="showExitModal = false" />
      <SetsModal v-if="showSetsModal"  @close="showSetsModal = false"  />

    </div>
  </div>

</template>

<script>
    import {ValidationProvider} from "vee-validate";
    import ExitModal from "./ExitModal";
    import SetsModal from "./SetsModal";
    import {dataService} from "../services/data.service";

    export default {
        name: "ChooseImageSet",
        components: {
          ValidationProvider,
          ExitModal,
          SetsModal
        },
        data() {
            return  {
              set : null,
              submitted: false,
              showExitModal: false,
              showSetsModal : false,
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

  #logo {
    float:right;
  }

  #daawn-logo {
    height: 40px;
  }

  .field {
   padding: 10px;
  }

  #options-form {
    padding-bottom: 20px;
  }

   .title.is-4 {
    margin: 20px 0;
  }

</style>
