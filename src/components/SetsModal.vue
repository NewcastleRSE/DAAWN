<template>
  <transition name="modal">
    <div class="modal-mask">
      <div id='modalContainer'>
        <div class='modal-header'>
        </div>
        <div class='modal-body'>

          <p id="text-header" class="title is-4">Word sets</p>
          <p>DAAWN has four word sets. <strong>Sets 1-3</strong> contain:</p>
          <ul>
            <li>7 x 3-letter words</li>
            <li>7 x 4-letter words</li>
            <li>5 x 5-letter words</li>
            <li>4 x 6-letter words</li>
            <li>3 x 7-letter words</li>
            <li>1 x 8-letter words</li>
            <li>1 x 9-letter words</li>
            <li>1 x 10-letter words</li>
          </ul>

          <p>The sets are matched for frequency and concreteness. Data on spelling regularity is not currently available for this set as the images were obtained from a study on spoken naming. However, we have attempted to include a mix of regular and irregular orthographic forms. The items within the sets will be presented in random order.
          </p>

          <p><strong>Set four</strong> only contains three and four-letter words (42 items in total). We have offered this set as an option for assessment with people with severe writing difficulties who may struggle beyond this level. The items will appear in order with three-letter words first.</p>

          <p>Clinicians could use a combination of two or three sets to test up to 90-items, use one set for treatment and another for control items in therapy, or use different sets to test typed naming in different conditions, e.g., use of a mobile phone, use of a keyboard, tablet with word prediction. </p>

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
    name: "SetsModal",
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
    height: 80%;
    background: #FFF;
    border-radius: 25px;
  }

  #text-header {
    padding-bottom: 30px;
  }

  ul {
    padding: 15px 0;
    margin-left: 5px;
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
