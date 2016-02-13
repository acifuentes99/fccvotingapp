(function() {

    var testbtn = document.querySelector('.test');
    var tryget = document.querySelector('.tryget');
    var pollSquare = document.querySelector('.pollcontainer2');
    var newForm = document.querySelector('.newPoll');
    var deletePoll = document.querySelector('.delPoll');
    var getWork = document.querySelector('.getworking');
    var campo = document.querySelector('.campo');
    var apiUrl = appUrl + '/api/polls2/';
    //var apiUrl = appUrl + '/api/polls2/';
    //var xyz = document.getElementById("polltitle");
    var asdasd = window.location.href.toString();
   var urlparam = asdasd.split('/');
   var pollName = urlparam[urlparam.length-1];

    function renderPolls(data) {
        var aux = JSON.parse(data);
        var auxStr = '';
        for(var i=0; i<aux[0].hola.length; i++){
            var aux3 = aux[0].hola[i].name;
            auxStr = auxStr.concat('<form action="/api/polls3/'+pollName+'/'+aux3+'" method="POST"><span>'+aux3+'</span><button type="submit">Vote</button><span>Votes: '+aux[0].hola[i].votes+'</span></form>');
        }
        pollSquare.innerHTML = auxStr; 
    }




// Profile Page
    
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl+pollName, renderPolls));

    testbtn.addEventListener('click', function(){
        campo.innerHTML = 'alaz'; 
    });

    tryget.addEventListener('click', function(){
        console.log("Trying gets");
         ajaxFunctions.ajaxRequest('GET', apiUrl, renderPolls);
    });


// Create Poll


})();
