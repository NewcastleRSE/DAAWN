<template>
  <div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">DAAWN Assessment</p>
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
