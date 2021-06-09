<template>
  <div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">Digitised Assessment for Aphasia of WritiNg (DAAWN)</p>
        <p class="title is-4">Using the tools</p>
      </div>

      <div id="task-table">
        <table class="table">
          <thead>
           <tr><th>Single word typed naming task </th><th>Copying task</th><th>Free text generation (phrase/sentence/narrative) </th></tr>
          </thead>
          <tbody>
           <tr>
             <td>Assesses single word typed naming. The SLT can choose from one of four stimulus picture sets</td>
             <td>Assesses typing speed and copying ability using a well-known phrase and non-word sentence</td>
             <td>Provides stimuli to elicit everyday written language at phrase, sentence, and narrative level.</td>
           </tr>
           <tr>
             <td><span class="special">Select-></span> <a href="#" @click=namingtask()>Single Word Naming Task</a></td>
             <td><span class="special">Select-></span> <a href="#" @click=copytask()>Copying Task</a></td>
             <td><span class="special">Select-></span> <a href="#" @click=freetask()>Free Text Task</a></td>
           </tr>
          </tbody>
        </table>
      </div>
      <p class="text">All the DAAWN tasks provide an SLT with a report containing information generated from keystroke logging and timing data. The tool does not currently require any registration on the part of the user and does not collect or keep any of the assessment data. For each task, a PDF summary report is downloaded to the user’s computer. There is also the option to download a raw data (JSON) file. We advise that you do not use DAAWN on devices that do not belong you to you or to your employer as you would then need to transfer the PDF download to your own device. </p>

      <p class="text">We have provided a downloadable <a href="public/Client-record-form.docx" download>client record form</a> to accompany the DAAWN PDF downloads. Please feel free to use this to personalise the assessment information for your client. </p>
      <p class="text">Please see the DAAWN <a href="public/DAAWN-user-guide.docx" download>user guide</a> for detailed information on DAAWN output. You may also wish to visit our <a href="faqs" target="_blank">FAQ page</a>. </p>

      <div class="level" >
        <div class="level-item">

          <AboutLDModal v-if="showAboutLDModal"  @close="showAboutLDModal = false"  />

          <p class="highlight special">Click <strong>Next</strong> to select your options</p>
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

  import AboutLDModal from './AboutLDModal';
  import SetsModal from "./SetsModal";
  import ExitModal from "./ExitModal";

    export default {
        name: "AppInfo",
        components: {
          AboutLDModal,
          SetsModal,
          ExitModal
        },
        data() {
            return {
              showAboutLDModal : false,
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
            },
            namingtask() {
              this.$router.push({ path: './chooseimageset' });
            },
            copytask(){
               this.$router.push({ path: './ctinfo' });
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

  #task-table{
    margin: 25px;
    width: 90%;
  }

  .title.is-4 {
    margin: 20px 0;
  }

</style>
