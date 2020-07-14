
export const dataService = {
  saveSettings,
  levenshtein,
  download,
  formatData
};

function saveSettings(set) {
  localStorage.setItem('set', set);
}

//algorithm to find levenshtein distance score
//before it sets the unit in the matrix, it will check what type of error it is and adds to an array
function levenshtein( a, b )
{
  var i;
  var j;
  var cost;
  var d = new Array();//d[i][j] is a 2d array of integers,

  if ( a.length == 0 )
  {
    return b.length;
  }

  if ( b.length == 0 )
  {
    return a.length;
  }

  //increments along the first column ech row
  for ( i = 0; i <= a.length; i++ )
  {
    d[ i ] = new Array();
    d[ i ][ 0 ] = i;
  }
  //increment each column on the first row
  for ( j = 0; j <= b.length; j++ )
  {
    d[ 0 ][ j ] = j;
  }

  for ( i = 1; i <= a.length; i++ )//fills in the matrix
  {
    for ( j = 1; j <= b.length; j++ )
    {
      if ( a.charAt( i - 1 ) == b.charAt( j - 1 ) )
      {
        cost = 0;//indicates correct
        var mistake="C";
      }
      else
      {
        cost = 1;
      }

      //checks which type of error it is
      if(Math.min( d[ i - 1 ][ j ] + 1, d[ i ][ j - 1 ] + 1, d[ i - 1 ][ j - 1 ] + cost ) ==d[ i - 1 ][ j ] + 1){
        var mistake="O";
      }
      else if(Math.min( d[ i - 1 ][ j ] + 1, d[ i ][ j - 1 ] + 1, d[ i - 1 ][ j - 1 ] + cost ) ==d[ i ][ j - 1 ] + 1){
        var mistake="A";
      }
      else if (Math.min( d[ i - 1 ][ j ] + 1, d[ i ][ j - 1 ] + 1, d[ i - 1 ][ j - 1 ] + cost )==d[ i - 1 ][ j - 1 ] + 1){
        var mistake="S";
      }
      //sets the values in the matrix
      d[ i ][ j ] = Math.min( d[ i - 1 ][ j ] + 1, d[ i ][ j - 1 ] + 1, d[ i - 1 ][ j - 1 ] + cost );


      //d[i-1][j]+1 indicates a omission
      //d[i][j-1]+1 indicates an addition
      //d[i-1][j-1]+cost indicates a substitution




      if(
        i > 1 &&
        j > 1 &&
        a.charAt(i - 1) == b.charAt(j-2) &&
        a.charAt(i-2) == b.charAt(j-1)
      ){//checks the type of mistake was a transposition
        if(Math.min(d[i][j],d[i - 2][j - 2] + cost) ==d[i - 2][j - 2] + 1/*cost*/){//this fixed the problem where T sometimes replaced C
          var mistake="T";
        }

        d[i][j] = Math.min(
          d[i][j],
          d[i - 2][j - 2] + cost
        )//the type of mistake was a transposition

      }


      //DL1.push(mistake);//adds to an array, i think i need to delete this one as it only tells you the bottom row of the matrix

    }

    //DL2.push(mistake);// adds to the array, does the whole matrix
  }

  return d[ a.length ][ b.length ];
}

function formatData(data){

console.log(data);

/*
[
  {
    "participantID": "5f0d70c69d9b8e10cfbdbd6c",
    "date": "2020-07-14T09:45:58 -01:00",
    "expected_outcome": "leg",
    "actual_response": "leg",
    "response_type": 0,
    "cat_score": 0,
    "dla_score": 0,
    "reaction_time": 2.39,
    "response_time": 3.1,
    "move_on_time": 4.13,
    "num_letters": 3,
    "keystrokes": 4,
    "num_deletions": 0,
    "processResponse": "Enter, Enter, Enter, Enter",
    "response": [
      {
        "timestamp": [nanotime],
        "keystroke": "PAGELOAD",
        "interimresponse": ""
      },
      {
        "timestamp": [nanotime],
        "keystroke": "r",
        "interimresponse": "r"
      },
      {
        "timestamp": [nanotime],
        "keystroke": "HINT",
        "interimresponse": "l"
      },
      {
        "timestamp": [nanotime],
        "keystroke": "e",
        "interimresponse": "le"
      },
      {
        "timestamp": [nanotime],
        "keystroke": "g",
        "interimresponse": "leg"
      },
      {
        "timestamp": [nanotime],
        "keystroke": "BACKSPACE",
        "interimresponse": "le"
      },
      {
        "timestamp": [nanotime],
        "keystroke": "g",
        "interimresponse": "leg"
      },
      {
        "timestamp": [nanotime],
        "keystroke": "SUBMIT",
        "interimresponse": "leg"
      }
    ],
    "hint_clicked": false
  }
] */

}

//function to create a txt file which JSON object can be sent to
function download(content, fileName, contentType) {

  let file = new Blob([content], { type: contentType });

   window.BlobBuilder = window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder;
   if (window.BlobBuilder) {
     var bb = new BlobBuilder();
     bb.append(content);
     file = bb.getBlob(contentType);
    }

   const a = document.createElement("a");

  	a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}




