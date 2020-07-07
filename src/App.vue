<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import 'bulma/css/bulma.css'

export default {
  name: 'app'
}
</script>

<style>

  .highlight {
    background-color: #EEEEEE;
    padding: 12px;
  }

  .special {
    font-weight: 600;
  }

  .text {
    padding: 10px 0;
  }

  .buttons-section {
    padding: 40px 0;
  }

  .next-btn, .data-btn {
    background-color: #FFBD68;
    font-size: 1.2em;
  }

  .exit-btn {
    background-color: #c7c7c7;
    font-size: 1.2em;
  }

  button {
    width: 120px;
    height: 40px;
    font-size: 1.2em;
    margin-left: 50px;
  }


</style>
