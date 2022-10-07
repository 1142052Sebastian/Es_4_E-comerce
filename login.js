let users=[];
let dictAuthentication = [];
let api_url='https://dummyjson.com/users';

(()=>{
    fill_users();
})();

async function fill_users() {
    const res = await fetch(api_url);
    const obj = await res.json();
    users = obj.users;
    users.forEach(element => {
        dictAuthentication.push({
            username: element.username,
            email: element.email,
            password: element.password
        });
    });
    //utente aggiunto per comodità
    dictAuthentication.push({
        username: 'admin',
        username: 'admin',
        password: 'ciao'
    })
}

$('#tab-login').click( function(){
    dictAuthentication.forEach(element => {
       if(element.username==$('#loginName').val() || element.email==$('#loginName').val()){
           if(element.password==$('#loginPassword').val()){
                window.location = 'index.html?user=' + element.username;
           }
           else{
               console.log("nope");
           }
       }
    });
})