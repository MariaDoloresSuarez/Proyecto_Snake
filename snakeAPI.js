const callAPISnake = async (url, parameters, data) => {

    let _parameters = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: ''// body data type must match "Content-Type" header
    };
    _parameters = Object.assign(_parameters, parameters);
    _parameters.body = JSON.stringify(data);

    return fetch(url, _parameters);
}

const getUsers = async () => {
    const url = 'http://localhost:3000/v1/users';
    const parameters = {};
    const res = await callAPISnake(url, parameters);
    const data =await res.json();
    return data;

}
(async()=>{
 console.log('API');
 const result=await getUsers();
 console.log(result);

 for (var i=0;i<result.length;i++){
     const resu_username=result[i].username;
     const resu_fullname=result[i].fullname;
     const resu_email=result[i].email;

    console.log(resu_username,resu_fullname,resu_email);
    

    document.getElementById('nombre').innerHTML = resu_username;
    document.getElementById('fullname').innerHTML = resu_fullname;
    document.getElementById('email').innerHTML = resu_email;

    
    }
   
  


})();

// const createUser = async (user) => {
//     const url = 'http://localhost:3000/v1/users/create';
//     const parameters = {method:'POST'};
//     const res = await callAPISnake(url, parameters,user);
//     const data = await res.json();
//     return data;
//   }

//   (async () => {
//     const result = await createUser(
//                                       {
//                                       username:'gggg',
//                                       fullname:'gggg',
//                                       email:'fggg@gmail.com',
//                                       password:'123456'});
//     console.log(result);
//   })();

  