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
          <td>{{ item.response_type }} <img src="../assets/green-tick.png" alt="tick" id="tick-image"><img src="../assets/cross.png" alt="tick" id="cross-image"></td>
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
          <div class="buttons-section form-group">
            <button class="button exit-btn" @click=exit()>Exit</button>
            <button class="button next-btn" @click=createPDF()>Download PDF</button>
          </div>

        </div>
      </div>


      </div>
    </div>

</template>

<script>

    import {settings} from "../settings";
    import jsPDF from 'jspdf';

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
                      if(localStorage.getItem(this.currentSet[index]) !== null){
                        this.activeSet.push(JSON.parse(localStorage.getItem(this.currentSet[index])));
                      }
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
            createPDF() {
              const doc = new jsPDF();
              doc.setFontSize(22);
              doc.text(20,20, 'Assessment Report');
              doc.setFontSize(14);
              doc.text(20,35, 'Name');
              doc.rect(20, 40, 50, 10);
              doc.save('report.pdf');

            },
            exit() {
              this.$router.push({ path: './' });
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

  #tick-image {
    height: 20px;
  }

  #cross-image {
    height: 18px;
  }

  .header {
    padding-bottom: 60px;
  }

  .next-btn {
    width: 150px;
  }

  .logo {
    float:right;
  }

  .daawn-logo {
    height: 40px;

  }

</style>
