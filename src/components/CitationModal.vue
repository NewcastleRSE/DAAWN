<template>
  <transition name="modal">
    <div class="modal-mask">
      <div id='modalContainer'>
        <div class='modal-header'>
        </div>
        <div class='modal-body'>

          <p class="title is-4 text-header">Citation</p>

          <p id="citation">Menger, F., Forshaw, M., Morris, J., Osselton, R. (2021) <cite>Digitised Assessment for Aphasia of Writing.</cite> https://daawn.ncldata.dev</p>

          <p class="title is-4 text-header">BibTeX Entry</p>

          <div id="bibtext">
            <xmp>
                @misc{daawn_2021,
                    author       = {Menger, Fiona and
                                    Forshaw, Matthew and
                                    Morris, Julie and
                                    Osselton, Rebecca},
                    year         = 2021,
                    journal      = {Digitised Assessment for Aphasia of Writing},
                    url          = {https://daawn.ncldata.dev}
                }
            </xmp>
          </div>
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
    name: "CitationModal",
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

  .text-header {
    padding-bottom: 30px;
  }

  #refs {
    margin-top: 40px;
  }

  .close-btn {
    background-color: #FFBD68;
    float:right;
    margin: 50px;
    font-size: 1.2em;
  }

  .modal-body {
    padding: 30px;
    text-align: left;
  }

  .modal-body p {
    padding: 5px;
  }

  .modal-footer{
    position: fixed;
    width: 100%;
    bottom: 0;
  }

  #citation {
    margin-bottom: 40px;
  }

  #bibtext {
    margin-left: -110px;
  }


</style>
