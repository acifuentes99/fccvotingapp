(function() {

    var testbtn = document.querySelector('.test');
    var campo = document.querySelector('.conejo');
    var tryget = document.querySelector('.tryget');
    var pollSquare = document.querySelector('.pollcontainer');
    var newForm = document.querySelector('.newPoll');
    var deletePoll = document.querySelector('.delPoll');
    var apiUrl = appUrl + '/api/polls';
    var apiUrl2 = appUrl + '/api/pollDel/';


    function renderPolls(data) {
        var aux = JSON.parse(data);
        var auxStr = '<table>';
        for(var i=0; i<aux.length; i++){
            var aux3 = aux[i].pollname;
            auxStr = auxStr.concat('<td><span>'+aux3+'</span></td><td><a class="btn delPoll" href="'+apiUrl2+aux3+'">Delete</a></td><td><a class="btn" href="/editPoll/'+aux3+'">Edit</a></td><td><a class="btn" href="/poll/'+aux3+'">View or Share</a></td></tr>');
        }
        auxStr.concat('</table>');
        pollSquare.innerHTML = auxStr; 
    }

    function renderPollPage(data){
       pollInfo.innerHTML = 'funciona'; 
    }

// Profile Page
    
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, renderPolls));

    testbtn.addEventListener('click', function(){
        campo.innerHTML = asd; 

    });




})();
