<template>
  <div class="container is-widescreen">
    <div id="page">
      <div class="level" >
        <div class="level-item">

          <img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo">
        </div>
      </div>

      <p class="title is-3"> Welcome to DAAWN<p>
      <p>DAAWN is a <strong>D</strong>igitised <strong>A</strong>ssessment for <strong>A</strong>phasia of <strong>W</strong>riti<strong>N</strong>g</p>

       <div class="info">
         <p>Thank you for your interest in this project. <span class="special">DAAWN</span> was initially developed as an assessment of single word typed naming as part of a Newcastle University MSc Computing Science dissertation by  <span class="special">Alex Smith</span>, following a collaboration between Computing Science and Speech and Language Sciences. The software in its current form contains an expanded set of writing assessment tasks and was produced thanks to funding from the <span class="special">Newcastle University Humanities and Social Sciences Faculty Research Software Engineering Fund</span>.</p>

         <p><strong>DAAWN Team</strong></p>

         <p><span class="special"><a href="https://www.ncl.ac.uk/ecls/staff/profile/fionamengernewcastleacuk.html#background" target="_blank">Dr Fiona Menger</a></span> and <span class="special"><a href="https://www.ncl.ac.uk/ecls/staff/profile/juliemorris.html#background" target="_blank">Dr Julie Morris</a></span>, Speech and Language Sciences, Newcastle University. <a href="https://www.ncl.ac.uk/ecls/about/sls/" target="_blank">https://www.ncl.ac.uk/ecls/about/sls/</a></p>
         <p><span class="special"><a href="https://www.ncl.ac.uk/computing/people/profile/matthewforshaw.html#background" target="_blank">Dr Matt Forshaw</a></span>, School of Computing, Newcastle University</p>
         <p><span class="special">Rebecca Osselton</span>, Newcastle University Research Software Engineering Team. <a href="https://research.ncl.ac.uk/rse/" target="_blank">https://research.ncl.ac.uk/rse/</a></p>

         <p>With thanks to: <span class="special">Ella Creet</span> for support with stimulus items, members of the Newcastle University Speech and Language Sciences aphasia lab group for comments on the student dissertation version, and <span class="special">Christos Salis</span> and <span class="special">Janet Webster</span> for testing the software and providing comments. </p>

       </div>

        <div class="level" >
          <div class="level-item">
            <button class="button start-btn" @click=start()>Start</button>
          </div>
        </div>

      </div>
      <img src="dist/di-logo.jpg" alt="Digital Institute" id="di-logo">
      <img src="dist/NU-SLS.png" alt="School of Speech and Language Sciences" id="sls-logo">
    </div>

</template>

<script>
    export default {
        name: "AppHome",
        methods: {
          start() {
            this.$router.push({ path: './about' });
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

  #sls-logo {
    padding-left: 50px;
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
