let users=[];
let dictAuthentication = [];
let api_url='https://dummyjson.com/users';

(()=>{
    fill_users();
    localStorage.setItem("loggedUserIndex", -1)
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
        email: 'admin',
        password: 'ciao'
    })

    console.log(dictAuthentication);
}


function signin_click(){
    for(var i=0; i<dictAuthentication.length; i++){
        if(dictAuthentication[i].username == $("#email").val() || dictAuthentication[i].email == $("#email").val()){
            if(dictAuthentication[i].password == $("#password").val())
            {
                localStorage.setItem("loggedUsername", dictAuthentication[i].username);
                localStorage.setItem("loggedUserIndex", i);
                window.location = "chart.html";
            }
        }
    }
}
