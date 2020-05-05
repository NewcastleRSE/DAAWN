<template>
  <div class="container is-widescreen">
    <div id="page">
      <img src="../assets/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo">
      <p class="title is-4"> Welcome to the DAAWN project.<p>
      <p class="title is-6">Digitised Assessment of Aphasia using typed Word Naming</p>

       <div class="info">
         <span class="special">DAAWN</span> is an online assessment tool for aphasia, which uses the <span class="special">Comprehensive Aphasia Test (CAT)</span>. It has been developed in conjunction with the <span class="special">Fiona Menger</span> in the <span class="special">School of Education, Communication and Language Sciences</span> (HaSS Faculty) and the <span class="special">Digital Institute Research Software Engineering</span> team.
        </div>

        <div class="level" >
          <div class="level-item">
            <button class="button start-btn" @click=start()>Start</button>
          </div>
        </div>

      </div>
      <img src="../assets/di-logo.jpg" alt="Digital Institute" id="di-logo">
    </div>

</template>

<script>
    export default {
        name: "AppHome",
        methods: {
          start() {
            this.$router.push({ path: './appinfo' });
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
    text-align: center;
    padding: 30px;
  }

  #daawn-logo {
    height: 80px;
  }

  #di-logo {
    height: 60px;
    float: right;
    padding-right: 55px;
  }

  .info {
    margin: 50px;
  }

  .buttons {
    text-align: center;
  }

  .special {
    font-weight: 600;
  }


  .start-btn {
    background-color: #FFBD68;
    font-size: 1.2em;
    width: 120px;
    height: 48px;
    margin-left: 0;
  }


</style>
