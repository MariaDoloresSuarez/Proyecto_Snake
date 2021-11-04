
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

    valid = valid && checkLength(name, "Username", 3, 16);
    valid = valid && checkLength(fullname, "Fullname", 3, 16);
    valid = valid && checkLength(email, "Email", 6, 80);
    valid = valid && checkLength(password, "Password", 5, 16);

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

          Toast.fire({
            icon: 'success',
            title: 'El usuario: ' + name.val() + ' se creó correctamente :)'

          });

          setTimeout(() => {
            $("#users tbody").append(
              location.reload());
          }, 1000);


        } catch (err) {

          Toast.fire({
            icon: 'error',
            title: 'Ya existe un usuario con mail: ' + email.val()
          });
          $("#email").val("");
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
      "Confirm": addUser,
      Cancel: function () {
        dialog.dialog("close");
      }
    },
    Close: function () {
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

  function buscarUser() {
    let valid = true;
    allFields.removeClass("ui-state-error");

    if (valid) {
      if (id.val() === "") {
        Toast.fire({
          icon: 'warning',
          title: 'Debe ingresar el id de usuario'
        });

      } else if (id.val() != "") {

        valid = valid && checkRegexp(id, /^([0-9])+$/i, "User id may consist of 0-9");

        if (valid) {
          (async () => {

            try {

              const result = await getUserById(id.val());

              $("#usernameUpdate").val(result.username);
              $("#fullnameUpdate").val(result.fullname);
              $("#emailUpdate").val(result.email);
              $("#passwordUpdate").val(result.password);

            } catch (err) {

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

    let valid = true;
    id = $("#userIdUpdate");
    name = $("#usernameUpdate");
    fullname = $("#fullnameUpdate");
    email = $("#emailUpdate");
    password = $("#passwordUpdate");

    valid = valid && checkLength(name, "Username", 3, 16);
    valid = valid && checkLength(fullname, "Fullname", 3, 16);
    valid = valid && checkLength(email, "Email", 6, 80);
    valid = valid && checkLength(password, "Password", 5, 66);

    valid = valid && checkRegexp(name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
    valid = valid && checkRegexp(fullname, /^[a-z]([0-9a-z_\s])+$/i, "Fullname may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
    valid = valid && checkRegexp(email, emailRegex, "eg. ui@jquery.com");
    //valid = valid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9");


    if (valid) {
      // id=id.val();

      id = $("#userIdUpdate").val();
      name = $("#usernameUpdate").val();
      fullname = $("#fullnameUpdate").val();
      email = $("#emailUpdate").val();
      password = $("#passwordUpdate").val();

      (async () => {

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

          })
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

          return (err);
        };

      })();

    };

  };
  dialog = $("#dialog-form").dialog({
    autoOpen: false,
    height: 450,
    width: 350,
    modal: true,
    buttons: {
      "Search": buscarUser,
      "Confirm": modUser,
      Cancel: function () {
        dialog.dialog("close");
      }
    },
    Close: function () {
      form[0].reset();
      allFields.removeClass("ui-state-error");
    }
  });

  // dialog = $("#dialog-form").dialog({
  //   autoOpen: false,
  //   height: 450,
  //   width: 350,
  //   modal: true,
  //   buttons: {
  //     "Buscar": buscarUser,
  // ncuentra user habilita boton buscar 
  //  $("#userIdUpdate").val("");

  // "Confirmar": modUser,


  //     Cancelar: function () {
  //       dialog.dialog("close");
  //     }
  //   },
  //   close: function () {
  //     form[0].reset();
  //     allFields.removeClass("ui-state-error");
  //   }
  // });
  // me parece que a esta funcion no la usa
  // form = dialog.find("form").on("submit", function (event) {
  //   event.preventDefault();
  //   addUser();
  // });

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

        Toast.fire({
          icon: 'success',
          title: 'El usuario: ' + id + ' se borro correctamente '
        });

        $("#userIdDelete").val("");
        $("#usernameDelete").val("");
        $("#fullnameDelete").val("");
        $("#emailDelete").val("");
        $("#passwordDelete").val("");

        setTimeout(() => {
          $("#users tbody").append(
            location.reload());
        }, 2000);
      } catch (err) {

        console.log("Problemas al borrar el usuario" + err);
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
      "Search": buscarUser,
      "Confirm": delUser,
      Cancel: function () {
        dialog.dialog("close");
      }
    },
    close: function () {
      // form[0].reset();
      allFields.removeClass("ui-state-error");
    }
  });

  $("#delete-user").button().on("click", function () {
    dialog.dialog("open");
  });

});



