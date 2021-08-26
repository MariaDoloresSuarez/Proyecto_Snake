
import { createUser, deleteUser, getUserById, updateUser } from "./snakeAPI.js";

$(function () {

  var dialog, form,

    // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
    emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    name = $("#name"),
    fullname = $("#fullname"),
    email = $("#email"),
    password = $("#password"),
    allFields = $([]).add(name).add(fullname).add(email).add(password),
    tips = $(".validateTips");

  //Funcion para las ventanas alert
  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {

      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  // console.log("name dialog"+name.val());


  function updateTips(t) {
    tips
      .text(t)
      .addClass("ui-state-highlight");
    setTimeout(function () {
      tips.removeClass("ui-state-highlight", 1500);
    }, 500);
  }

  function checkLength(o, n, min, max) {
    if (o.val().length > max || o.val().length < min) {
      o.addClass("ui-state-error");
      updateTips("Length of " + n + " must be between " +
        min + " and " + max + ".");
      return false;
    } else {
      return true;
    }
  }

  function checkRegexp(o, regexp, n) {
    if (!(regexp.test(o.val()))) {
      o.addClass("ui-state-error");
      updateTips(n);
      return false;
    } else {
      return true;
    }
  }

  function addUser() {
    var valid = true;
    allFields.removeClass("ui-state-error");

    valid = valid && checkLength(name, "username", 3, 16);
    valid = valid && checkLength(fullname, "fullname", 3, 16);
    valid = valid && checkLength(email, "email", 6, 80);
    valid = valid && checkLength(password, "password", 5, 16);

    valid = valid && checkRegexp(name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
    valid = valid && checkRegexp(fullname, /^[a-z]([0-9a-z_\s])+$/i, "Fullname may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
    valid = valid && checkRegexp(email, emailRegex, "eg. ui@jquery.com");
    valid = valid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9");

    if (valid) {
      (async () => {
        try {
          const result = await createUser(
            {
              username: name.val(),
              fullname: fullname.val(),
              email: email.val(),
              password: password.val()
            });
          console.log("result" + result);

          Toast.fire({
            icon: 'success',
            title: 'El usuario: ' + name.val() + ' se creó correctamente :)'

          });

          setTimeout(() => {
            $("#users tbody").append(
              location.reload());
          }, 1000);


        } catch (err) {

          console.log("Error al crear el usuario" + err);
        }
      })();

    }
    return valid;

  }
  dialog = $("#dialog-form").dialog({
    autoOpen: false,
    height: 450,
    width: 350,
    modal: true,
    buttons: {
      "Confirmar": addUser,
      Cancelar: function () {
        dialog.dialog("close");
      }
    },
    close: function () {
      form[0].reset();
      allFields.removeClass("ui-state-error");
    }
  });

  form = dialog.find("form").on("submit", function (event) {
    event.preventDefault();
    addUser();
  });

  $("#create-user").button().on("click", function () {
    dialog.dialog("open");
  });

});

// PARA MODIFICAR USUARIOS
$(function () {

  var dialog, form,

    // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
    emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    id = $("#userIdUpdate"),
    name = $("#usernameUpdate"),
    allFields = $([]).add(id).add(name),
    fullname = $("#fullnameUpdate"),
    email = $("#emailUpdate"),
    password = $("#passwordUpdate"),
    // allFields = $( [] ).add( name ).add( fullname ).add( email ).add( password ),
    tips = $(".modifiTips");

  //Funcion para las ventanas alert
  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {

      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  function updateTips(t) {
    tips
      .text(t)
      .addClass("ui-state-highlight");
    setTimeout(function () {
      tips.removeClass("ui-state-highlight", 1500);
    }, 500);
  }
  console.log('funcion updateTips update' + tips.val());

  function checkLength(o, n, min, max) {
    console.log('funcion checkLength update' + max);
    if (o.val().length > max || o.val().length < min) {
      o.addClass("ui-state-error");
      updateTips("Length of " + n + " must be between " +
        min + " and " + max + ".");
      return false;
    } else {
      return true;
    }

  }

  function checkRegexp(o, regexp, n) {
    console.log('funcion checkRegexp update' + o);
    if (!(regexp.test(o.val()))) {
      o.addClass("ui-state-error");
      updateTips(n);
      return false;
    } else {
      return true;
    }
  }

  function buscarUser() {
    var valid = true;
    allFields.removeClass("ui-state-error");

    if (valid) {
      //console.log("ID" + id.val());
      if (id.val() === "") {
        // window.alert('Debe ingresar el id de usuario');
        Toast.fire({
          icon: 'warning',
          title: 'Debe ingresar el id de usuario'
        });

      } else if (id.val() != "") {

        console.log('Ingreso el ID ' + id.val());

        //valid = valid && checkLength(id, "User id", 3, 16);
        valid = valid && checkRegexp(id, /^([0-9])+$/i, "User id may consist of 0-9");

        console.log('id update' + id.val());

        if (valid) {
          (async () => {

            try {
              console.log("valida antes de la busqueda" + id.val());

              const result = await getUserById(id.val());

              //console.log('resultado busqueda id' + result.id);

              $("#usernameUpdate").val(result.username);
              $("#fullnameUpdate").val(result.fullname);
              $("#emailUpdate").val(result.email);
              $("#passwordUpdate").val(result.password);
              //ACA CREO QUE DEBERIA ACTIVAR EL BOTON CONFIMRAR


            } catch (err) {
              // window.alert("El usuario " + id.val() +" no existe");
              // $("#userIdUpdate").val("");

              Toast.fire({
                icon: 'warning',
                title: 'El usuario: ' + id.val() + ' no existe'

              });
              $("#userIdUpdate").val("");
              return (err);
            }
          })();

        }

      }
    }

  }

  function modUser() {

    var valid = true;
    id = $("#userIdUpdate");
    name = $("#usernameUpdate");
    fullname = $("#fullnameUpdate");
    email = $("#emailUpdate");
    password = $("#passwordUpdate");

    console.log("ingresa el name" + name);

    valid = valid && checkLength(name, "usernameUpdate", 3, 16);
    valid = valid && checkLength(fullname, "fullnameUpdate", 3, 16);
    valid = valid && checkLength(email, "emailUpdate", 6, 80);
    valid = valid && checkLength(password, "passwordUpdate", 5, 16);

    valid = valid && checkRegexp(name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
    valid = valid && checkRegexp(fullname, /^[a-z]([0-9a-z_\s])+$/i, "Fullname may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
    valid = valid && checkRegexp(email, emailRegex, "eg. ui@jquery.com");
    valid = valid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9");

    console.log("valida nuevos datos" + valid);

    if (valid) {
      // id=id.val();

      id = $("#userIdUpdate").val();
      name = $("#usernameUpdate").val();
      fullname = $("#fullnameUpdate").val();
      email = $("#emailUpdate").val();
      password = $("#passwordUpdate").val();

      (async () => {
        console.log("name2" + id + name + fullname + email + password);
        try {
          const result = await updateUser({
            id: id,
            username: name,
            fullname: fullname,
            email: email,
            password: password
          });
          Toast.fire({
            icon: 'success',
            title: 'El usuario: ' + id + ' se modificó correctamente '

          });
          // window.alert("El usuario " + id + " se modificó correctamente");
          $("#userIdUpdate").val("");
          $("#usernameUpdate").val("");
          $("#fullnameUpdate").val("");
          $("#emailUpdate").val("");
          $("#passwordUpdate").val("");

          setTimeout(() => {
            $("#users tbody").append(
              location.reload());
          }, 2000);
          return result;

        } catch (err) {
          Toast.fire({
            icon: 'error',
            title: 'Error al modificar el usuario '

          });
          // window.alert("Error al modificar el usuario") 
          return (err);
        };

      })();

    };

  };
  // $("input").prop('disabled', false);
  //$(".ui-dialog-buttonpane button:contains('Confirm')").button("disable");
  dialog = $("#dialog-form").dialog({
    autoOpen: false,
    height: 450,
    width: 350,
    modal: true,
    buttons: {
      "Buscar": buscarUser,
      "Confirmar": modUser,
      Cancelar: function () {
        dialog.dialog("close");
      }
    },
    close: function () {
      form[0].reset();
      allFields.removeClass("ui-state-error");
    }
  });

  form = dialog.find("form").on("submit", function (event) {
    event.preventDefault();
    addUser();
  });

  $("#modif-user").button().on("click", function () {
    dialog.dialog("open");
  });

});

// ELIMINAR USUARIOS
$(function () {

  var dialog, form,

    // // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
    //emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    id = $("#userIdDelete"),
    name = $("#usernameDelete"),
    fullname = $("#fullnameDelete"),
    email = $("#emailDelete"),
    password = $("#passwordDelete"),
    allFields = $([]).add(name).add(fullname).add(email).add(password),

    tips = $(".deleteTips");
  // funcion para las ventanas alert
  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000,
    // theme:'dark',
    timerProgressBar: true,
    didOpen: (toast) => {

      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });
  // console.log("id dialog delete" + id.val());
  // console.log("name dialog delete" + name.val());

  function updateTips(t) {
    tips
      .text(t)
      .addClass("ui-state-highlight");
    setTimeout(function () {
      tips.removeClass("ui-state-highlight", 1500);
    }, 500);
  }

  // function checkLength(o, n, min, max) {
  //   if (o.val().length > max || o.val().length < min) {
  //     o.addClass("ui-state-error");
  //     updateTips("Length of " + n + " must be between " +
  //       min + " and " + max + ".");
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  function checkRegexp(o, regexp, n) {
    if (!(regexp.test(o.val()))) {
      o.addClass("ui-state-error");
      updateTips(n);
      return false;
    } else {
      return true;
    }
  }

  function buscarUser() {
    var valid = true;
    //allFields.removeClass("ui-state-error");

    if (valid) {
      console.log("ID" + id.val());
      if (id.val() === "") {
        // window.alert('Debe ingresar el id de usuario');

        Toast.fire({
          icon: 'success',
          title: 'Debe ingresar el id de usuario'

        });
      } else if (id.val() != "") {

        valid = valid && checkRegexp(id, /^([0-9])+$/i, "User id may consist of 0-9");

        console.log('id update' + id.val());

        if (valid) {
          (async () => {
            try {

              console.log("valida antes de la busqueda" + id.val());

              const result = await getUserById(id.val());

              console.log('resultado busqueda id' + result.id);

              $("#usernameDelete").val(result.username);
              $("#fullnameDelete").val(result.fullname);
              $("#emailDelete").val(result.email);
              $("#passwordDelete").val(result.password);

            } catch (err) {
              // window.alert("El usuario " + id.val() + " no existe");


              Toast.fire({
                icon: 'success',
                title: 'El usuario: ' + id.val() + ' no existe'
              });
              $("#userIdDelete").val("");
              return (err);
            }
          })();

        } else ("el usuario no es valido");

      }
    }

  }

  function delUser() {

    id = $("#userIdDelete").val();
    name = $("#usernameDelete").val();
    fullname = $("#fullnameDelete").val();
    email = $("#emailDelete").val();
    password = $("#passwordDelete").val();
    (async () => {

      console.log("nameBorrar" + id + name + fullname + email + password);
      try {

        console.log("id" + id);
        const result = await deleteUser({ id: id });
        console.log("result" + result);

      } catch (err) {

        console.log("Problemas al borrar el usuario" + err.text);
        return err;

      }

    })();

  };

  dialog = $("#dialog-form").dialog({
    autoOpen: false,
    height: 450,
    width: 350,
    modal: true,
    buttons: {
      "Buscar": buscarUser,
      "Confirmar": delUser,
      Cancelar: function () {
        dialog.dialog("close");
      }
    },
    close: function () {
      form[0].reset();
      allFields.removeClass("ui-state-error");
    }
  });

  form = dialog.find("form").on("submit", function (event) {
    event.preventDefault();
    addUser();
  });

  $("#delete-user").button().on("click", function () {
    dialog.dialog("open");
  });

});



