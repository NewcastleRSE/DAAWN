<template>
  <div class="container is-widescreen">
    <div id="page" ref="content">
      <div class="header">
        <span class="logo"><img src="../assets/sundawn.png" alt="Welcome to the DAAWN tool" class="daawn-logo"></span>
        <p class="title is-3">Assessment Report</p>
      </div>

      <table class="table table-striped" >
        <thead>
        <tr><th>Item</th><th>Correct/Incorrect</th><th>End Response</th><th>CAT</th><th>LD</th><th>Reaction Time</th><th>Response Time</th></tr>
        </thead>
        <tbody>
        <tr v-for="item in activeSet">
          <td>{{ item.expected_outcome }}</td>
          <td>{{ item.response_type }}</td>
          <td>{{ item.actual_response }}</td>
          <td>{{ item.cat_score }}</td>
          <td>{{ item.dla_score }}</td>
          <td>{{ item.reaction_time }}</td>
          <td>{{ item.response_time }}</td>
        </tr>
        </tbody>
      </table>

      <table class="table table-striped">
        <thead>
        <tr><th>Item</th><th>Process Response</th><th>No. Letters</th><th>Keystrokes</th><th>No. Deletions</th></tr>
        </thead>
        <tbody>
        <tr  v-for="item in activeSet">
          <td>{{ item.expected_outcome }}</td>
          <td>[ {{ item.processResponse }} ]</td>
          <td>{{ item.num_letters }}</td>
          <td>{{ item.keystrokes }}</td>
          <td>{{ item.num_deletions }}</td>
        </tr>
        </tbody>
      </table>

      <div class="level" >
        <div class="level-item">

          <p class="highlight special">Click <strong>Download</strong> to save a PDF.</p>
        </div>
        <div class="level-item">
          <div class="buttons-section form-group">
            <button class="button exit-btn" @click=exit()>Exit</button>
            <button class="button next-btn" @click=createPDF()>Download</button>
          </div>

        </div>
      </div>


      </div>
    </div>

</template>

<script>

    import {settings} from "../settings";
    import jsPDF from 'jspdf';
    import html2canvas from "html2canvas";

    export default {
        name: "AppReport",
        data() {
            return {
              currentSet: [],
              activeSet: []
            }
        },
        methods : {
            fillCatTable(){
                for(let index in this.currentSet){
                    if(this.currentSet.hasOwnProperty(index)){
                      this.activeSet.push(JSON.parse(localStorage.getItem(this.currentSet[index])));
                    }
                }
                this.filter(this.activeSet);
            },
            filter(set){
              for(let item in set){
                if(set.hasOwnProperty(item)){
                   let string = set[item].processResponse;
                    set[item].processResponse = string.join(', ');
                }
              }
            },
          createPDF () {
            let pdfName = 'test';
            let canvasElement = document.createElement('canvas');
            const doc = new jsPDF('p', 'mm', "a4");

            html2canvas(this.$refs.content, { canvas: canvasElement
            }).then(function (canvas) {
              const img = canvas.toDataURL("image/jpeg", 1.0);
              doc.addImage(img, 'JPG', 10, 10);
              doc.save(pdfName);
            });
          }
        },
        created() {
            let mySet = localStorage.getItem('set');
            if(mySet === 'one'){
              this.currentSet = settings.setOne;
            }
            else if(mySet === 'two'){
              this.currentSet = settings.setTwo;
            }
            else if(mySet === 'three'){
              this.currentSet = settings.setThree;
            }
            else if(mySet === 'four'){
              this.currentSet = settings.setFour;
            }
            this.fillCatTable();
        }
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

  .header {
    padding-bottom: 60px;
  }


  .logo {
    float:right;
  }

  .daawn-logo {
    height: 40px;

  }

</style>
