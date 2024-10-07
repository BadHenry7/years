function login() {
  const vcorreo = document.getElementById("username").value;
  const vpasswpord = document.getElementById("password").value;
  axios({
    method: 'POST',
    url: 'http://127.0.0.1:3000/compare',
    data: {
      correo: vcorreo,
      password: vpasswpord,
      valido: true
    }

  }).then(function (response) {
    console.log(response.data.length)
    console.log(response);

    
    if (response.data.length > 0) {
      var id = response.data[0].correo//
    
      iniciar(id)
    }
    else {
      console.log("Usuario y/o contraseña incorrecta")
      alert("Usuario y/o contraseña incorrecta")
      document.getElementById("respuesta").innerHTML = 'El usuario no se encuentra registrado';
    }

    /*    
    for () {
        }
*/
  }).catch(err => console.log('Error: ', err))

}






function iniciar(id) {
  if (document.title === 'Login Cumpleaños') {

    let usuario = document.getElementById("username").value;
    let pas = document.getElementById("password").value;
    console.log(id)
    //let encontrado = (usuario)
    let encontrado={usuario, pas, id}//

    miStorage = window.localStorage;
    //No, ya veras,ven para abajo
    if (encontrado) {

      if (active = true) {
        window.localStorage.clear('usuario');
      }

      alert('Sesión Exitosa', ". Bienvenido ", usuario);

      miStorage.setItem('usuario', JSON.stringify(encontrado));//set colocla, get obtener
      //let usuarios1 = miStorage.getItem("usuario");
      let usuarios = JSON.parse(miStorage.getItem('usuario'));

      window.location.href = "/years";
      var active = true;

    } else {
      alert("Usuario o contraseña incorrecto")
      document.getElementById("respuesta").innerHTML = 'Usuario o contraseña incorrecto';
    }





    //Si intenta entrar desde un link y no inicio sesion        
  }
  else {
   const Admin = ['Administrador', 'Buscar usuario', 'Enviar reporte', 'Registrar Entrenador', 'Ver estado', 'Registro usuario', 'Generar reporte'];
    Admin.map(x => {
      if (document.title === x) {
      
        let usuarios = JSON.parse(window.localStorage.getItem('usuario'));
        console.log(usuarios.comprobar) 

        if (!usuarios || usuarios.comprobar=="User" || usuarios.comprobar=="Entrenador") {
          alert("Pagina no disponible, por favor iniciar sesion")
          window.location.href = "../html/";

        }
      }

    });


    const User = ['usuario', 'Valoracion', 'Ubicaciones', 'User'];
    User.map(y => {
      if (document.title === y) {
        let usuarios = JSON.parse(window.localStorage.getItem('usuario'));

        if (!usuarios || usuarios.comprobar=="Admin" || usuarios.comprobar=="Entrenador") {
          alert("Pagina no disponible, por favor iniciar sesion")
          window.location.href = "../html/";

        }
      }

    });



    const Entrenador = ['Entrenador'];
    Entrenador.map(y => {
      if (document.title === y) {
        let usuarios = JSON.parse(window.localStorage.getItem('usuario'));
       
        if (!usuarios || usuarios.comprobar=="Admin" || usuarios.comprobar=="User") {
          alert ("Pagina no disponible, por favor iniciar sesion")
          window.location.href = "../html/Login";
        }
      }

    });


  }

}


function cerrar() {
  window.localStorage.clear('usuario');
  window.location.href = "../html/Login.html";

}




//32


