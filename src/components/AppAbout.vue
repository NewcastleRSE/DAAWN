<template>
  <div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">About DAAWN</p>

      </div>

      <p class="text">DAAWN is a set of assessment tools designed to be used by <span class="special">Speech and Language Therapists</span> with people with aphasia.  </p>

      <p class="text">This website currently contains:</p>
      <div class="text special">
        <ol>
          <li>Single word picture naming task </li>
          <li>Copying task (words and non-words) </li>
          <li>Free text generation task (choice of stimulus prompts: phrase/sentence/narrative) </li>
        </ol>
      </div>

      <p class="text">These tools are not intended to be final polished versions of assessments. Instead, we have developed pilot tools to demonstrate the type of information that could be available as part of a digitised clinical assessment. Our longer-term aim is to continue to develop DAAWN and to explore the potential for the technology, so it can be of use in clinical practice and for research. Please feel free to use the DAAWN tools as much as you like. They can be conducted face to face with people with aphasia but may also be carried out via telehealth assessment. This would be possible via screenshare and remote-control using Zoom, Microsoft Teams, Jistsi or Google Meet with a Chrome extension. Please see the RCSLT guidance on telehealth for <a href="https://www.rcslt.org/members/delivering-quality-services/telehealth/telehealth-guidance#section-5" target="_blank">further support</a>.</p>

      <p class="text">Please send any comments or feedback on DAAWN to <span class="special">fiona.menger@ncl.ac.uk</span>. We would like to hear from you if you are using the tool for clinical practice or research. </p>

      <p class="text">Questions? You may find helpful information on our <a href="faqs" target="_blank">FAQ page</a>.</p>

      <p class="text"><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Digitised Assessment for Aphasia of WritiNg (DAAWN)</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="https://daawn.ncldata.dev/" property="cc:attributionName" rel="cc:attributionURL">https://daawn.ncldata.dev/</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.</p>

      <p class="text"><a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons Licence" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a></p>


      <div class="level" >
        <div class="level-item">

          <AboutModal v-if="showAboutModal"  @close="showAboutModal = false"  />
          <SetsModal v-if="showSetsModal"  @close="showSetsModal = false"  />

          <p class="highlight special">Click <strong>Next</strong> for further information</p>
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

  import ExitModal from "./ExitModal";

    export default {
        name: "AppAbout",
        components: {
          ExitModal
        },
        data() {
          return {
            showExitModal : false
          }
        },
        methods : {
            exit() {
              this.showExitModal = true;
            },
            next() {
              this.$router.push({ path: './info' });
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

  .text.special {
    margin-left: 20px;
  }


</style>
