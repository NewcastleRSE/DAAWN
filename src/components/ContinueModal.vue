<template>
  <transition name="modal">
    <div class="modal-mask">
      <div id='modalContainer'>
        <div class='modal-header'>

        </div>
        <div class='modal-body'>
         <p>Are you sure you want to continue?</p>
        </div>
        <div class='modal-footer'>
          <span id="yes"><button type="button"  @click="loadNext">Yes</button><img src="dist/green-tick.png" alt="tick" id="tick-image" width="44px"></span>
          <span id="no"><button type="button"  @click="close">No</button><img src="dist/cross.png" alt="tick" id="cross-image" width="80px"></span>
        </div>

      </div>
    </div>
  </transition>

</template>

<script>

    export default {
        name: "ContinueModal",
      data() {
          return {
            box: ''
          }
      },
      methods: {
        close(){
          this.$emit('close')
        },
        loadNext() {
          this.$emit('clicked', 'continue')
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
    width: 50%;
    height: 300px;
    background: #FFF;
    border-radius: 25px;
  }

  .modal-body {
    padding: 30px 30px;
  }

  .modal-body p {
    padding-bottom: 10px;
    margin: 10px;
    font-size: 1.2em;
  }

  .modal-footer{
    position: fixed;
    width: 100%;
    bottom: 10px;
  }

  button {
    height: 80px;
    width: 90px;
    font-size: 1.4em;
    margin: 30px;
    border: 1px solid #000;

  }

  #yes {
    float:left;
  }

  #no {
    float:right;
  }

  #cross-image{
    padding-right: 35px;
    margin-bottom: -10px;
  }

  #tick-image {
    margin-bottom: -10px;
  }

</style>
