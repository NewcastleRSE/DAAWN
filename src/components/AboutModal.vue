<template>
  <transition name="modal">
    <div class="modal-mask">
      <div id='modalContainer'>
        <div class='modal-header'>
        </div>
        <div class='modal-body'>

          <p id="text-header" class="title is-4">Levenstein distance</p>
          <p>Levenstein distance (LD) is a measure of how close the final attempt at writing the word is to the target item. The LD score is based on the number of single-character changes needed to transform the client’s attempt into the target word. Changes can be either insertions, omissions, or substitutions. DAAWN calculates LD automatically. The larger the number, the greater the distance between the attempt and the target word.</p>

          <table class="table table-striped">
            <thead>
             <tr><th>Target word</th><th>Final attempt</th><th>Scoring</th></tr>
            </thead>
            <tbody>
              <tr><td>CAT</td><td>CAR</td><td>1 x substitution = <strong>LD 1</strong></td></tr>
              <tr><td>SMILE</td><td>SIMILES</td><td>2 x insertions (I,S) = <strong>LD 2</strong></td></tr>
              <tr><td>SHOE</td><td>SOE</td><td>1 x omission (H) = <strong>LD 1</strong></td></tr>
              <tr><td>GIRAFFE</td><td>GIFAG</td><td>2 x substitutions (R to F and F to G), 2 x omissions (F, E) = <strong>LD 4</strong></td></tr>
            </tbody>
          </table>

          <p>Clinicians should be aware that LD does not take errors of meaning into account. People with aphasia may, therefore, make some errors for which LD is not a good measure of accuracy. This would be problematic if a person produced a semantic error that was orthographically similar to the target, e.g, a target word of MONKEY and final attempt DONKEY. This example would lead to a LD of one.</p>

        </div>
        <div class='modal-footer'>
          <button class="button close-btn" @click="close">Close</button>
        </div>


      </div>
    </div>
  </transition>
</template>

<script>

  export default {
    name: "AboutModal",
    methods: {
      close (){
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  #modalContainer {
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 80%;
    height: 70%;
    background: #FFF;
    border-radius: 25px;
  }

  #text-header {
    padding-bottom: 30px;
  }

  .close-btn {
    background-color: #FFBD68;
    float:right;
    margin: 50px;
    font-size: 1.2em;
  }

  .modal-body {
    padding: 30px;
  }

  .modal-body p {
    padding: 5px;
  }

  .modal-footer{
    position: fixed;
    width: 100%;
    bottom: 0;
  }


</style>
