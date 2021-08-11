 import {createUser,deleteUser,getUserById} from "./snakeAPI.js";

$( function() {

    var dialog, form,
 
      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      name = $( "#name" ),
      fullname = $( "#fullname" ),
      email = $( "#email" ),
      password = $( "#password" ),
      allFields = $( [] ).add( name ).add( fullname ).add( email ).add( password ),
      tips = $( ".validateTips" );

      // console.log("name dialog"+name.val());
 
    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
 
    function addUser() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
 
      valid = valid && checkLength( name, "username", 3, 16 );
      valid = valid && checkLength( fullname, "fullname", 3, 16 );
      valid = valid && checkLength( email, "email", 6, 80 );
      valid = valid && checkLength( password, "password", 5, 16 );
 
      valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( fullname, /^[a-z]([0-9a-z_\s])+$/i, "Fullname may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
      valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
 
      if ( valid ) {
        (async () => {
          // const username=$( "#name" );
          // const fullname=$( "#fullname" );
          // const email=$( "#email" )
          // const pass=$( "#password" )
        const result = await createUser(
                                          {
                                          username: name.val(),
                                          fullname:fullname.val(),
                                          email:email.val(),
                                          password:password.val()});
      window.alert("El usuario: " + name.val() + " se creó correctamente");
      })();
        $( "#users tbody" ).append(
        location.reload());

        // dialog.dialog( "close" );

      //   $( "#users tbody" ).append( "<tr>" +
      //   // "<td>" + id.val() + "</td>" +
      //   "<td>" + name.val() + "</td>" +
      //   "<td>" + fullname.val() + "</td>"+
      //   "<td>" + email.val() + "</td>" +
      //   // "<td>" + password.val() + "</td>" +
      // "</tr>");
      // dialog.dialog( "close" );

        
      }
      return valid;
      
    }
 
    dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 450,
      width: 350,
      modal: true,
       buttons: {
         "Confirmar": addUser,
         Cancelar: function() {
         dialog.dialog( "close" );
         }
       },
      close: function() {
        form[ 0 ].reset();
        allFields.removeClass( "ui-state-error" );
      }
    });
 
    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      addUser();
    });
 
    $( "#create-user" ).button().on( "click", function() {
      dialog.dialog( "open" );
    });

  } );

  // PARA MODIFICAR USUARIOS
  $( function() {
  
      var dialog, form,
   
        // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        id= $( "#userId" ),
        name = $( "#username" ),
        allFields = $( [] ).add( id ).add( name ),
        // fullname = $( "#fullname" ),
        // email = $( "#email" ),
        // password = $( "#password" ),
        // allFields = $( [] ).add( name ).add( fullname ).add( email ).add( password ),
        tips = $( ".modifiTips" );

        console.log("id dialog update"+id.val());
        console.log("name dialog update"+name.val());
   
      function updateTips( t ) {
        tips
          .text( t )
          .addClass( "ui-state-highlight" );
        setTimeout(function() {
          tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
      }
      console.log('funcion updateTips update' + tips.val());
   
      function checkLength( o, n, min, max ) {
        console.log('funcion checkLength update' + max);
        if ( o.val().length > max || o.val().length < min ) {
          o.addClass( "ui-state-error" );
          updateTips( "Length of " + n + " must be between " +
            min + " and " + max + "." );
          return false;
        } else {
          return true;
        }
     
      }

    
   
      function checkRegexp( o, regexp, n ) {
        console.log('funcion checkRegexp update' + o);
        if ( !( regexp.test( o.val() ) ) ) {
          o.addClass( "ui-state-error" );
          updateTips( n );
          return false;
        } else {
          return true;
        }
      }
   
      function addUser() {
        var valid = true;
        allFields.removeClass( "ui-state-error" );
        //console.log('valid update'+valid);

        //console.log('name'+name.val());

        if(valid){

           if(id.val()===""&& name.val()===""){

           window.alert('Debe ingresar el id o nombre de usuario');

           } else if (id.val()!=""&& name.val()===""){

            console.log('Ingreso el ID '+id.val());

            valid = valid && checkLength( id, "User id", 3, 16 );
            valid = valid && checkRegexp( id, /^([0-9])+$/i, "User id may consist of 0-9"  );
  
            console.log('id update'+ id.val());
          


            (async()=>{
              
              const result=await getUserById(id.val());

              console.log('resultado busqueda id'+JSON.stringify(result.id));

              if(JSON.stringify(result.id)){

                console.log('nombre'+ result.username);
                console.log('fullname'+ result.fullname);
                console.log('email'+ result.email);
                console.log('password'+ result.password);
          
               
              
              } 
               else  
               console.log('El usuario no existe');
              //windows.alert('El id ingresado no existe');
              //const username= result.username;
//                                       fullname:fullname.val(),
//                                       email:email.val(),
//                                       password:pass.val()});

              //console.log('username update'+username);

              //console.log('resultado busqueda'+ result.username);
          
            //  for (var i=0;i<result.length;i++){
            //   $( "#listaScore #list-it" ).append( "<ul>" +
            //   "<li>" + result[i].username + "</li>" +
            //   "<span>" + result[i].puntos+ "</span>" +
            //   "</ul>" 
            //   );
          // }
             
             })();
       
           }else if (id.val()==="" && name.val()!=""){

            valid = valid && checkLength( name, "Username", 3, 16 );
            valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );

            console.log('Ingreso el username'+name.val());

           }
           //console.log('valid salida'+ valid);

          
        //    if (valid)
        //   console.log('id_user'+id.val());


         }
   
        //  valid = valid && checkLength( id, "userID", 3, 16 );
        //  console.log("adduser id update " + id.val());
  
        // valid = valid && checkLength( fullname, "fullname", 3, 16 );
        // console.log("adduser fullname " + fullname.val());
        // valid = valid && checkLength( email, "email", 6, 80 );
        // console.log("adduser email " + email.val());
        // valid = valid && checkLength( password, "password", 5, 16 );
        // console.log("adduser password " + password.val());
   
        // valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
        // valid = valid && checkRegexp( fullname, /^[a-z]([0-9a-z_\s])+$/i, "Fullname may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
        // valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
        // valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
   
        // if ( valid ) {
        //   (async () => {
        //     console.log('valid'+ name.val());
        //     // const username=$( "#name" );
        //     // const fullname=$( "#fullname" );
        //     // const email=$( "#email" )
        //     // const pass=$( "#password" )
        //   const result = await createUser(
        //                                     {
        //                                     username: name.val(),
        //                                     fullname:fullname.val(),
        //                                     email:email.val(),
        //                                     password:password.val()});
        //   console.log('username' + username);
          
        // })();
  
        // window.alert("El usuario: " + name.val() + " se creó correctamente");
  
        //   $( "#users tbody" ).append(
        //   location.reload());
  
        //   // dialog.dialog( "close" );
  
        // //   $( "#users tbody" ).append( "<tr>" +
        // //   // "<td>" + id.val() + "</td>" +
        // //   "<td>" + name.val() + "</td>" +
        // //   "<td>" + fullname.val() + "</td>"+
        // //   "<td>" + email.val() + "</td>" +
        // //   // "<td>" + password.val() + "</td>" +
        // // "</tr>");
        // // dialog.dialog( "close" );
  
        //   console.log("name1" + name.val());
          
        // }
        // return valid;
        
      }
   
      dialog = $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 450,
        width: 350,
        modal: true,
         buttons: {
           "Buscar": addUser,
           Cancelar: function() {
           dialog.dialog( "close" );
           }
         },
        close: function() {
          form[ 0 ].reset();
          allFields.removeClass( "ui-state-error" );
        }
      });
   
      form = dialog.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        addUser();
      });
   
      $( "#modif-user" ).button().on( "click", function() {
        dialog.dialog( "open" );
      });
  
  
    } );

// // ELIMINAR USUARIOS
// $( function() {
  
//   var dialog, form,

//     // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
//     emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
//     // name = $( "#name" ),
//     // fullname = $( "#fullname" ),
//     // email = $( "#email" ),
//     // password = $( "#password" ),
//     // allFields = $( [] ).add( name ).add( fullname ).add( email ).add( password ),
//     id= $( "#userId" ),
//     name = $( "#username" ),
//     allFields = $( [] ).add( id ).add( name ),
//     tips = $( ".deleteTips" );

//      console.log("id dialog delete"+id.val());
//      console.log("name dialog delete"+name.val());

//   function updateTips( t ) {
//     tips
//       .text( t )
//       .addClass( "ui-state-highlight" );
//     setTimeout(function() {
//       tips.removeClass( "ui-state-highlight", 1500 );
//     }, 500 );
//   }

//   function checkLength( o, n, min, max ) {
//     if ( o.val().length > max || o.val().length < min ) {
//       o.addClass( "ui-state-error" );
//       updateTips( "Length of " + n + " must be between " +
//         min + " and " + max + "." );
//       return false;
//     } else {
//       return true;
//     }
//   }

//   function checkRegexp( o, regexp, n ) {
//     if ( !( regexp.test( o.val() ) ) ) {
//       o.addClass( "ui-state-error" );
//       updateTips( n );
//       return false;
//     } else {
//       return true;
//     }
//   }

//   function addUser() {
//     var valid = true;
//     allFields.removeClass( "ui-state-error" );

//     if(valid){

//       //valida si no ingresa id o nombre
//       if(id.val()===""&& name.val()===""){

//       window.alert('Debe ingresar el id o nombre de usuario que desea eliminar');

//       //si ingresa id
//       } else if (id.val()!=""&& name.val()===""){

//        console.log('Ingreso el ID para borrar'+id.val());

//        valid = valid && checkLength( id, "User id", 3, 16 );
//        valid = valid && checkRegexp( id, /^([0-9])+$/i, "User id may consist of 0-9"  );

//          const uid=id.val();
//          console.log('id delete'+ id.val());
//          console.log('uid'+uid);

         

//          (async () => {
       
//           const result=await deleteUser(uid);
//           console.log('result delete' + result.val());
        
//           })();

//       }else if (id.val()==="" && name.val()!=""){

//        valid = valid && checkLength( name, "Username", 3, 16 );
//        valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );

//        console.log('Ingreso el username'+name.val());

//       }
//       //console.log('valid salida'+ valid);

     
//    //    if (valid)
//    //   console.log('id_user'+id.val());


//     }

//    //  valid = valid && checkLength( id, "userID", 3, 16 );
//    //  console.log("adduser id update " + id.val());

//    // valid = valid && checkLength( fullname, "fullname", 3, 16 );
//    // console.log("adduser fullname " + fullname.val());
//    // valid = valid && checkLength( email, "email", 6, 80 );
//    // console.log("adduser email " + email.val());
//    // valid = valid && checkLength( password, "password", 5, 16 );
//    // console.log("adduser password " + password.val());

//    // valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
//    // valid = valid && checkRegexp( fullname, /^[a-z]([0-9a-z_\s])+$/i, "Fullname may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
//    // valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
//    // valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );

//    // if ( valid ) {
//    //   (async () => {
//    //     console.log('valid'+ name.val());
//    //     // const username=$( "#name" );
//    //     // const fullname=$( "#fullname" );
//    //     // const email=$( "#email" )
//    //     // const pass=$( "#password" )
//    //   const result = await createUser(
//    //                                     {
//    //                                     username: name.val(),
//    //                                     fullname:fullname.val(),
//    //                                     email:email.val(),
//    //                                     password:password.val()});
//    //   console.log('username' + username);
     
//    // })();

//    // window.alert("El usuario: " + name.val() + " se creó correctamente");

//    //   $( "#users tbody" ).append(
//    //   location.reload());

//    //   // dialog.dialog( "close" );

//    // //   $( "#users tbody" ).append( "<tr>" +
//    // //   // "<td>" + id.val() + "</td>" +
//    // //   "<td>" + name.val() + "</td>" +
//    // //   "<td>" + fullname.val() + "</td>"+
//    // //   "<td>" + email.val() + "</td>" +
//    // //   // "<td>" + password.val() + "</td>" +
//    // // "</tr>");
//    // // dialog.dialog( "close" );

//    //   console.log("name1" + name.val());
     
//    // }
//    // return valid;
   
//  }

//   dialog = $( "#dialog-form" ).dialog({
//     autoOpen: false,
//     height: 450,
//     width: 350,
//     modal: true,
//      buttons: {
//        "Confirmar": addUser,
//        Cancelar: function() {
//        dialog.dialog( "close" );
//        }
//      },
//     close: function() {
//       form[ 0 ].reset();
//       allFields.removeClass( "ui-state-error" );
//     }
//   });

//   form = dialog.find( "form" ).on( "submit", function( event ) {
//     event.preventDefault();
//     addUser();
//   });

//   $( "#delete-user" ).button().on( "click", function() {
//     dialog.dialog( "open" );
//   });


// } );