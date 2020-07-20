<template>
  <div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">About DAAWN</p>

      </div>

      <p class="text">DAAWN is an assessment of single word typed naming designed to be used by <span class="special">Speech and Language Therapists</span> with people with aphasia.  </p>

      <p class="text">What you will see here is not intended to be a final version of an assessment. Instead, it is a pilot tool that aims to demonstrate the type of information that could be available as part of a digitised clinical assessment. Our longer-term aim is to gather feedback and work with SLTs and people with aphasia to develop DAAWN further so it can be used in clinical practice and for research. </p>

      <p class="text">Please feel free to use DAAWN as much as you like. It can be used face to face with people with aphasia but may also be carried out as a telehealth assessment. This would be possible via screenshare and remote control using Zoom, Microsoft Teams, Jistsi or Google Meet with a Chrome extension. Please see the RCSLT guidance on telehealth for <a href="https://www.rcslt.org/members/delivering-quality-services/telehealth/telehealth-guidance#section-5" target="_blank">further support</a>. </p>

      <p>If you are using DAAWN, please do get in touch to let us know. There will be an opportunity to provide detailed feedback as part of a Newcastle University Speech and Language Sciences dissertation research project later in the year, but in the meantime, we would be delighted to hear from you about how it is being used. </p>

      <p>For further information or to get in touch about DAAWN, please contact <span class="special">fiona.menger@ncl.ac.uk</span>. </p>




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

</style>
