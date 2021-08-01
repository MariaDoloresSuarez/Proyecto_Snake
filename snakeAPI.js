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
 //console.log('API');
 const result=await getUsers();
// console.log(result);

 for (var i=0;i<result.length;i++){
    $( "#users tbody" ).append( "<tr>" +
          "<td>" + result[i].id+ "</td>" +
          "<td>" + result[i].username+ "</td>" +
          "<td>" + result[i].fullname + "</td>" +
          "<td>" + result[i].email+ "</td>" +
        "</tr>" );
 }

})();

const createUser = async (user) => {
    const url = 'http://localhost:3000/v1/users/create';
    const parameters = {method:'POST'};
    const res = await callAPISnake(url, parameters,user);
    const data = await res.json();
    //return data
    console.log("data" + data);
  }

//   (async () => {
//       const username=$( "#name" );
//       const fullname=$( "#fullname" );
//       const email=$( "#email" )
//       const pass=$( "#password" )
//     const result = await createUser(
//                                       {
//                                       username: username.val(),
//                                       fullname:fullname.val(),
//                                       email:email.val(),
//                                       password:pass.val()});
//     console.log(result);
//   })();

export {createUser};