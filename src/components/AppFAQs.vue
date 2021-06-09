<template>
    <div class="container is-widescreen">
    <div id="page">
      <div id="header">
        <span id="logo"><img src="dist/sundawn.png" alt="Welcome to the DAAWN tool" id="daawn-logo"></span>
        <p class="title is-3">DAAWN FAQs</p>
      </div>

     <div>
       <p class="faq-header">Frequently reported issues</p>

       <p class="title is-5">I cannot get the DAAWN website to work at my workplace.</p>

       <p class="text">This may be an issue with your IT service blocking DAAWN. We suggest you raise an IT ticket with them, explaining the tool’s purpose, and ask for the tool to be available via your workplace.</p>

       <p class="title is-5">The picture stimulus item is obscured by my client’s on-screen keyboard.</p>

       <p class="text">This issue may arise when using a tablet device. It is easily solved by using portrait rather than landscape orientation.</p>

       <p class="title is-5">The DAAWN PDF report will not download.</p>

        <p class="text">This may be a local issue/blocking of downloads by your employer. We suggest you contact your IT dept. as a first step then email <a href="mailto:fiona.menger@ncl.ac.uk">fiona.menger@ncl.ac.uk</a> if there is an ongoing problem.</p>

       <p class="faq-header">Other Questions</p>

       <p class="title is-5">Why can’t the PDF report be emailed to me instead of downloaded to the local device?</p>

        <p class="text">We have developed DAAWN as a proof-of-concept tool and wanted to initially avoid collecting any personal data from users of the tool. The assessment does not currently require any registration on the part of the user and does not collect or keep any of the assessment data. This means it is not possible to email the PDF report to a clinician without collecting and storing their email address or the content of the report. Future iterations of the tool may allow for greater flexibility.</p>

       <p class="title is-5">Can you help me to interpret DAAWN results?</p>

       <p class="text">DAAWN does not provide any clinical interpretation of assessment. We have created a <a href="public/Client-record-form.docx" download>client record form</a> to support you to interpret DAAWN output using your own clinical reasoning skills and knowledge of language processing in aphasia. We also provide some suggested reading in our <a href="public/DAAWN-user-guide.docx" download>user guide</a>, which may inform your interpretation.</p>

       <p class="title is-5">Can I use DAAWN to try out assistive technology such as word prediction or speech to text?</p>

       <p class="text">We have not tested the DAAWN tools in this way. However, the user interface would support the use of accessibility tools to generate text. Word prediction would still generate a keystroke log. However, voice recognition would not and this would likely impact the generation of a PDF report.</p>

       <p class="title is-5">Feedback and suggestions</p>

       <p class="text">Recent feedback via a student dissertation project gave us many helpful suggestions, which fed into the current iteration of DAAWN and the addition of a copy task and assessment beyond the single word. We were unable to address all of the feedback during our recent funded developer time. For example, respondents to our survey asked whether the report could be made aphasia accessible, whether the assessment items could be personalised, or the report customised. We have kept hold of all these suggestions for future opportunities to develop DAAWN and welcome any further comments. Please email <span class="special">fiona.menger@ncl.ac.uk</span>.</p>


     </div>

    </div>
  </div>

</template>

<script>
    export default {
        name: "AppFAQs"
    }
</script>

<style scoped>


  #page {
    border: 1px solid #c4c4c4;
    border-radius: 25px;
    margin: 50px;
    background-color: #fff;
    padding: 30px;
  }

  #header {
    padding-bottom: 20px;
  }


  #logo {
    float:right;
  }

  #daawn-logo {
    height: 40px;
  }


  .faq-header{
    font-size: 2em;
    color: #FFBD68;
    padding: 20px 0;
  }

  .title.is-5 {
    margin-bottom: 0;
  }



</style>
