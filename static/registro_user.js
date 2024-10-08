document.addEventListener('DOMContentLoaded', function () {

    const formulario = document.getElementById("register-form");


    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const vnombres = document.getElementById("username").value;
        const vcontraseña = document.getElementById("password").value;
    
            axios({
                method: 'POST',
                url: 'https://years.onrender.com/add_usuario',
                data: {
                    name: vnombres,
                    password: vcontraseña,
        
                 
    
                },
            }).then(function (response) {
                if (response.data[0].Informacion == "Ya_existe") {
                    alert("Ya existe una cuenta con ese nombre de usuario")
                } else {
                    alert("usuario agregado ")
                    document.getElementById("username").value = "";               
                    document.getElementById("password").value = "";
                }
            }).catch(err => console.log('Error: ', err)) 
       


    });
});

