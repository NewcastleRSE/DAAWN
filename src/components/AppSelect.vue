<template>
  <div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">DAAWN Assessment</p>
      </div>

      <div class="content">
        <p class="special">DAAWN will collect the following information from the Image Naming Task, which you can download as a PDF when the assessment is completed:</p>

        <ul>
          <li>Correct or incorrect (final response)</li>
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

        <p class="text">At the end of the assessment, it is also possible to download the results in a machine-readable JSON format. This option will appear as a ‘download raw data’ button and is not designed for clinical use; its purpose is to demonstrate how the tool can produce complex data on written naming for  further analysis. Please be aware that the use of DAAWN for this purpose would be clinical research and would require the relevant ethical and research and development approvals for your country.</p>
        <p class="text">Please get in touch with fiona.menger@ncl.ac.uk if you are interested in using DAAWN for research purposes.</p>
      </div>

      <p class="title is-5">Choose an image naming task</p>
      <p class="text">The image naming task will present a sequence of images. Click the button to choose a word set for the task.</p>
      <p><button class="button ct-btn" @click=namingtask()>Image Naming Task</button></p>

      <p class="title is-5">Choose a sentence copying task</p>
      <p class="text">The sentence copying task will present a sequence of phrases to be copied. These will be analysed in a similar way to the image task.</p>
      <p><button class="button ct-btn" @click=copytask()>Copying Task</button></p>

      <p class="title is-5">Choose a free text task</p>
      <p class="text">The client will be presented with a free text task. Click the button to choose from the task options. </p>
      <p><button class="button ct-btn" @click=freetask()>Free Text Task</button></p>

      <div class="level" >

        <div class="level-item">
          <div class="buttons-section form-group">
            <button class="button exit-btn" @click=exit()>Exit</button>
          </div>
        </div>
      </div>
      <ExitModal v-if="showExitModal" @close="showExitModal = false" />

    </div>
  </div>

</template>

<script>

  import { dataService } from '../services/data.service';
  import ExitModal from "./ExitModal";


  export default {
        name: "AppSelect",
        components: {
          ExitModal
        },
        data() {
            return  {
              showExitModal: false
          }
        },
        methods: {
            exit() {
                this.showExitModal = true;
            },
            namingtask() {
              this.$router.push({ path: './chooseimageset' });
            },
            copytask(){
               this.$router.push({ path: './ctinstructions' });
            },
            freetask(){
               this.$router.push({ path: './ftinstructions' });
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

  .ct-btn {
    background-color: #FFBD68;
    font-size: 0.8em;
    margin: 20px 0 30px 0;
  }



</style>
