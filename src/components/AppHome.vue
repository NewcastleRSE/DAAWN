<template>
  <div class="container is-widescreen">
    <div id="page">
      <div class="level" >
        <div class="level-item">

          <img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo">
        </div>
      </div>

      <p class="title is-3"> Welcome to DAAWN<p>
      <p>DAAWN is a <strong>D</strong>igitised <strong>A</strong>ssessment for <strong>A</strong>phasia of <strong>W</strong>ritten <strong>N</strong>aming</p>

       <div class="info">
         <p>Thank you for your interest in this project. <span class="special">DAAWN</span> was initially developed as part of a Newcastle University MSc Computing Science dissertation by <span class="special">Alex Smith</span>, supervised by <span class="special">Dr Matthew Forshaw</span> (Computing Science) with support from <span class="special">Dr Fiona Menger</span> (Speech and Language Sciences). The software has been further developed and deployed by the <span class="special">Newcastle University Research Software Engineering</span> Team.</p>
         <p>What you will see here is not intended to be a final version of an assessment tool. Instead, it is a pilot tool that aims to demonstrate the type of information that could be available to a Speech and Language Therapist as part of a digitised assessment. Our longer-term aim is to gather feedback and work with SLTs and people with aphasia to develop DAAWN further so it can be used in clinical practice and for research.</p>
         <p>Please feel free to use DAAWN as much as you like. There will be an opportunity to provide initial feedback as part of a Newcastle University Speech and Language Sciences dissertation research project later in the year. For further information or if you have any questions on DAAWN, please contact <span class="special">fiona.menger@ncl.ac.uk</span></p>
       </div>

        <div class="level" >
          <div class="level-item">
            <button class="button start-btn" @click=start()>Start</button>
          </div>
        </div>

      </div>
      <img src="dist/di-logo.jpg" alt="Digital Institute" id="di-logo">
    </div>

</template>

<script>
    export default {
        name: "AppHome",
        methods: {
          start() {
            this.$router.push({ path: './info' });
          }
      },
      created(){
          localStorage.clear();
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
    margin: auto 0;
  }

  #di-logo {
    height: 60px;
    float: right;
    padding-right: 55px;
  }

  .info {
    margin: 40px 0;
  }

  .info p {
    margin: 25px 0;
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
    margin-top: 40px;
  }


</style>
