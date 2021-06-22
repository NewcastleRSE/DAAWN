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

  .next-btn, .data-btn, .back-btn, .select-btn {
    background-color: #FFBD68;
  }

  .exit-btn {
    background-color: #c7c7c7;
  }

  button {
    width: 120px;
    height: 40px;
    margin-left: 10px;
  }


</style>
