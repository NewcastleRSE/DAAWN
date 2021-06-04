<template>
  <div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">Select a DAAWN assessment tool</p>
      </div>

      <p class="title is-5">Choose a typed naming task</p>
      <p class="text">Assesses single word typed naming. The SLT can choose from one of four stimulus picture sets</p>
      <p><button class="button ct-btn" @click=namingtask()>Image Naming Task</button></p>

      <p class="title is-5">Choose a sentence copying task</p>
      <p class="text">Assesses typing speed and copying ability using a well-known phrase and non-word sentence</p>
      <p><button class="button ct-btn" @click=copytask()>Copying Task</button></p>

      <p class="title is-5">Choose a free text task</p>
      <p class="text">Provides stimuli to elicit everyday written language at phrase, sentence, and narrative level. </p>
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

  .ct-btn {
    background-color: #FFBD68;
    font-size: 0.8em;
    margin: 20px 0 30px 0;
  }



</style>
