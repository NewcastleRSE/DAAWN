<template>
    <div class="container is-widescreen">
      <div id="page">
        <div id="header">
          <p class="title is-3">DAAWN copying task</p>
        </div>

        <div>
          <p class="text"> This tasks has two elements: </p>
          <ol id="cp-elements">
            <li>Copying a 35-character well-known phrase</li>
            <li>Copying a 35-character non-word sentence</li>
          </ol>
         <p class="text">The tool will record the client’s final response alongside keystroke logging and information on typing speed.</p>
        </div>
        <div class="level">
          <div class="level-item">
            <p class="highlight special">Click <strong>Next</strong> to see a task example</p>
          </div>
          <div class="level-item">
            <div class="buttons-section form-group">
              <button class="button exit-btn" @click=exit()>Exit</button>
              <button class="button next-btn" @click=next()>Next</button>
            </div>
          </div>

      </div>
      </div>
      <ExitModal v-if="showExitModal" @close="showExitModal = false" />
      <ContinueModal v-if="showContinueModal" @close="showContinueModal=false" @clicked="nextText(index)" />
  </div>
</template>

<script>

  import ContinueModal from "./ContinueModal";
  import ExitModal from "./ExitModal";

  export default {
      name: "CopyTaskInfo",
      components: {
          ContinueModal,
          ExitModal
      },
      data() {
          return {
             showExitModal: false,
             showContinueModal: false
          }
      },
      methods: {
          activateModal() {
                // prevents accidental moves forward
               this.showContinueModal=true;
          },
          exit() {
                this.$router.push({ path: './' });
          },
          next() {
              this.$router.push({ path: './ctinstructions' });
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

  #cp-elements {
    margin-left: 20px;
    font-weight: 600;
  }


</style>
