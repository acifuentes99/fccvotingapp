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
            auxStr = auxStr.concat('<tr><td><h3>'+aux3+'</h3></td></tr><tr><td><a class="poll-btn btn-sm btn-primary " href="/editPoll/'+aux3+'">Edit</a><a class="poll-btn btn-sm btn-primary" href="/poll/'+aux3+'">View or Share</a><a class="poll-btn btn-sm btn-primary delPoll" href="'+apiUrl2+aux3+'">Delete</a></td></tr>');
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
