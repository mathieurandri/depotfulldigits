// console.log('premier') ;
var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open( 'GET', aUrl, true ); 
        anHttpRequest.send( null ); 
    }
}
var total = [] ;
var client = new HttpClient() ;
var user = ['fulldigits','mathieurandri','sylvain261','ranaivoarivaojl','robinhajatiana','tOkido','andryhub','ravorona','cerzzwiz','Tandzone','tokiniainah','TahinaMananjara'] ;
var userFechted = 0 ;
_.forEach (user , function(value, index){
    // console.log('2hfheuehfuvzuehf');
    var theurl ='https://api.github.com/users/'+value+'/starred' ;
    var client = new HttpClient () ;
    
    client.get(
        theurl ,
        function (response) { 
            if (response) {
                var response1 = JSON.parse(response) ;
                total= total.concat(response1) ;
                userFechted ++ ;

                if(user.length===userFechted){
                    render(total);
                }
        
            }
            else {
                console.log('une erreur s\'est produit') ;
            }
        }
    )

} ) ;

function render(total){
    tab2 = [] ;
    for ( var i=0 ; i<total.length; i++) {
        tab2.push(
            {
                name : total[i].name ,
                full_name : total[i].full_name ,
                description : total[i].description,
                stargazers_count :total[i].stargazers_count

            }
        );
    }   
    console.log("tab2",tab2) ;
    var tabUnique = {};
    for (var k=0 ; k<tab2.length ; k++) {
        if (tabUnique[tab2[k].name]) {
            tabUnique[tab2[k].name]['stars'] ++;
        } else {
            tabUnique[tab2[k].name] = [];
            tabUnique[tab2[k].name]['stars'] = 1;
            tabUnique[tab2[k].name]['full_name'] = tab2[k].full_name ;
            tabUnique[tab2[k].name]['description'] = tab2[k].description ;
            tabUnique[tab2[k].name]['stargazers_count'] = tab2[k].stargazers_count ;
        }
        tabUnique[tab2[k].name]['name']=tab2[k].name ;
    }

       console.log("ty le tab unique",tabUnique);
       
    var secondDiv = document.getElementById('second');
    var htmltext = '';
    var tabUniq3 = {} ;
   
        var tabUniq2 = _.orderBy(tabUnique,[ 'stars','stargazers_count'],['desc', 'desc']) ;
        console.log("ty le izz ",tabUniq2) ;
        var example1 = new Vue({
            el: '.items',
            data: {
              items: tabUniq2
            }
        });
    

}