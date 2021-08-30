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
    const data = await res.json();
    return data;

}

(async () => {
    //console.log('API');
    const result = await getUsers();
    // console.log(result);

    // //Ejemplo para hacerlo programaticamente
    // let tabla = document.createElement("div"); //table
    // tabla.classList.add("clasecss");
    // tabla.setAttribute("scr",'');
    // tabla.textContent = "texto dentro del div";
    // tabla.innerHTML ="codigo html";

    for (var i = 0; i < result.length; i++) {
        $("#users tbody").append("<tr>" +
            "<td>" + result[i].id + "</td>" +
            "<td>" + result[i].username + "</td>" +
            "<td>" + result[i].fullname + "</td>" +
            "<td>" + result[i].email + "</td>" +
            "</tr>");
    }

})();


//Búsqueda de usuario por ID


const getUserById = async (user) => {
    const url = 'http://localhost:3000/v1/users/' + user;
    const parameters = {};
    const res = await callAPISnake(url, parameters);
    const data = await res.json();
    console.log('datagetid' + data);
    return data;

}

const createUser = async (user) => {
    const url = 'http://localhost:3000/v1/users/create';
    const parameters = { method: 'POST' };
    const res = await callAPISnake(url, parameters, user);
    const data = await res.json();
    return data;
    //console.log("data" + data);
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

//para modificar
const updateUser = async (user) => {
    console.log("user" + user);
    const url = "http://localhost:3000/v1/users/" + user.id;
    console.log("url" + url);
    const parameters = { method: 'PUT', body: user };
    //console.log("user parameters"+body);
    const res = await callAPISnake(url, parameters, user);
    //console.log("res"+res);
    const data = await res.json();
    //console.log('data :'+ JSON.stringify(data));
    return data;
}
//Para borrar un usuario
const deleteUser = async (user) => {
    const url = 'http://localhost:3000/v1/users/' + user.id;
    const parameters = { method: 'DELETE' };
    const res = await callAPISnake(url, parameters, user);
    console.log("pase por aca");
    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
    //console.log("data" + data);
}

//para el ranking
const getScores = async () => {
    const url = 'http://localhost:3000/v1/scores';
    const parameters = {};
    const res = await callAPISnake(url, parameters);
    const data = await res.json();
    return data;

}


(async () => {
    const result = await getScores();

    for (var i = 0; i < result.length; i++) {
        $("#listaScore #list-it").append("<ul>" +
            "<li>" + result[i].username + "</li>" +
            "<span>" + result[i].puntos + "</span>" +
            "</ul>"
        );
    }

})();

//Para guardar el puntaje
const createScore = async (score) => {
    console.log("pasa por aqui creacion puntaje" + score);
    const url = 'http://localhost:3000/v1/scores/create';
    const parameters = { method: 'POST' };
    const res = await callAPISnake(url, parameters, score);
    const data = await res.json();
    return data;
}


export { createUser, getUserById, deleteUser, updateUser, createScore };