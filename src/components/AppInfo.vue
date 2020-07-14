<template>
  <div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">Digitised Assessment for Aphasia of Written Naming (DAAWN) - Using the tool</p>
      </div>

      <p class="text">DAAWN is designed for use by <span class="special">Speech and Language Therapists</span> with people with acquired aphasia. At present, it is an assessment of single word naming for use with keyboard input via a web browser on any computer or mobile device. The assessment does not currently require any registration on the part of the user and does not collect or keep any of the assessment data. DAAWN will automatically calculate the number of items correctly named and will provide you with a range of other information you may find relevant as part of your assessment, e.g. timings, automated scoring, and a record of the process by which a person reaches their final response. When your assessment is complete, DAAWN generates an anonymised report, which will be a PDF download. We advise that you do not use the tool on devices that do not belong you to you or to your employer as you would then need to transfer the document to your own device.</p>

      <p class="text">The <span class="special">process response</span> records the keys pressed by the client when typing the word. This allows the SLT to see whether errors have been self-corrected during the typing process. It will also

        record any pause longer than one second. For example, the word ‘anchor’ could be typed as follows:

        [a, n, k, BACKSPACE, c, 2.3secs, o, r] with the end result ‘ancor’.</p>

      <p class="text">The application automatically calculates a score based on the system used in the writing section of the Comprehensive Aphasia Test. <span class="special">Swinburn K, Porter G, Howard D.</span> <cite>The Comprehensive Aphasia Test. Hove, East Sussex: Psychology Press; 2004. </cite>It also provides a score of Levenshtein distance. Click for more information about <a href="#" @click="showAboutModal = true">Levenshtein distance</a>.</p>

      <p>The SLT will make an appropriate choice from defined word sets for the client to complete. They can exit the assessment at any time. Click for information about  <a href="#" @click="showSetsModal = true">word sets</a>.</p>




      <div class="level" >
        <div class="level-item">

          <AboutModal v-if="showAboutModal"  @close="showAboutModal = false"  />
          <SetsModal v-if="showSetsModal"  @close="showSetsModal = false"  />

          <p class="highlight special">Click <strong>Next</strong> to select your options.</p>
        </div>
        <div class="level-item">
          <div class="buttons-section">
            <button class="button exit-btn" @click=exit()>Exit</button>
            <button class="button next-btn" @click=next()>Next</button>
          </div>

        </div>
      </div>

      <ExitModal v-if="showExitModal" @close="showExitModal = false" />
    </div>
  </div>
</template>

<script>

  import AboutModal from './AboutModal';
  import SetsModal from "./SetsModal";
  import ExitModal from "./ExitModal";

    export default {
        name: "AppInfo",
        components: {
          AboutModal,
          SetsModal,
          ExitModal
        },
        data() {
            return {
              showAboutModal : false,
              showSetsModal : false,
              showExitModal : false
            }
        },
        methods: {
            exit() {
                this.showExitModal = true;
            },
            next() {
              this.$router.push({ path: './select' });
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
