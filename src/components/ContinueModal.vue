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
          <button id="yes" type="button"  @click="loadNext">Yes</button>
          <button id="no" type="button"  @click="close">No</button>
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
    width: 25%;
    height: 200px;
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
    height: 40px;
    width: 45px;
    font-size: 1.2em;
    margin: 30px;
  }

  #yes {
    float:left;
  }

  #no {
    float:right;
  }


</style>
