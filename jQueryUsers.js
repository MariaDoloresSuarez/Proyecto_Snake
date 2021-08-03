 import {createUser} from "./snakeAPI.js";

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

      console.log("name dialog"+name.val());
 
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
      console.log("adduser name " + name.val());

      valid = valid && checkLength( fullname, "fullname", 3, 16 );
      console.log("adduser fullname " + fullname.val());
      valid = valid && checkLength( email, "email", 6, 80 );
      console.log("adduser email " + email.val());
      valid = valid && checkLength( password, "password", 5, 16 );
      console.log("adduser password " + password.val());
 
      valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( fullname, /^[a-z]([0-9a-z_\s])+$/i, "Fullname may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
      valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
 
      if ( valid ) {
        (async () => {
          console.log('valid'+ name.val());
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
        console.log('username' + username);
        
      })();

      window.alert("El usuario: " + name.val() + " se creó correctamente");

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

        console.log("name1" + name.val());
        
      }
      return valid;
      
    }
 
    dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 450,
      width: 350,
      modal: true,
       buttons: {
         "Create an account": addUser,
         Cancel: function() {
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

    $( "#modif-user" ).button().on( "click", function() {
      dialog.dialog( "open" );
    });


  } );

