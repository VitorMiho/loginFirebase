function cadastrar() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const nome = document.getElementById("nome").value;

    const dbRef = firebase.database().ref().child("usuarios");

    const userData = {
        email: email,
        senha: senha,
        nome: nome
    };

    dbRef.push(userData)
        .then(function() {
            alert("Cadastro efetuado com sucesso!");
            window.location.reload();
            console.log("Cadastro efetuado com sucesso!");
        })
        .catch(function(error) {
            alert("Cadastro deu o erro: ", error);
            console.error("Cadastro deu o erro: ", error);
        });
}

function login() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    
    const dbRef = firebase.database().ref().child("usuarios");

    dbRef.orderByChild("email").equalTo(email).once("value")
        .then(function(snapshot) {
            if (snapshot.exists()) {
                snapshot.forEach(function(childSnapshot) {
                    const userData = childSnapshot.val();
                    if (userData.senha === senha) {
                        console.log("Login foi efetuado com sucesso!");

                        // Atribuir o nome do usuário ao elemento com o ID "nomeUsuario"
                        const nomeUsuarioElement = document.getElementById("nomeUsuario");
                        if (nomeUsuarioElement) {
                            console.log(userData.nome);
                            nomeUsuarioElement.textContent = userData.nome;
                        } else {
                            console.error("Elemento com ID 'nomeUsuario' não encontrado.");
                        }
                        
                        // Redirecionar o usuário para a página de login após o login bem-sucedido
                        window.location.href = "login.html";
                    } else {
                        console.log("Senha incorreta");
                        alert("Senha incorreta");
                    }
                });
            } else {
                console.log("Usuario não existe!");
            }
        })
        .catch(function(error) {
            console.error("Erro ao recuperar dados: ", error);
        });
}



// Function to update data in Firebase
function atualizar() {
    const emailToUpdate = document.getElementById("email").value;
    const newData = {
        // Define the properties you want to update
        // For example:
        // senha: "newPassword",
        // nome: "newName"
        // ...
    };

    // Get a reference to the Firebase database
    const dbRef = firebase.database().ref().child("usuarios");

    // Query the database for the user with the specified email
    dbRef.orderByChild("email").equalTo(emailToUpdate).once("value")
        .then(function(snapshot) {
            if (snapshot.exists()) {
                // User with the provided email exists in the database
                snapshot.forEach(function(childSnapshot) {
                    // Get the unique key of the user's data
                    const userKey = childSnapshot.key;

                    // Update the data for the user using the unique key
                    dbRef.child(userKey).update(newData)
                        .then(function() {
                            console.log("Data updated successfully");
                        })
                        .catch(function(error) {
                            console.error("Error updating data: " + error);
                        });
                });
            } else {
                console.log("User not found.");
            }
        })
        .catch(function(error) {
            console.error("Error retrieving data: " + error);
        });
}


//////////////////////////////////////////////METÓDO GOOGLE////////////////////////////////////////////////////////////////////

// Selecione o botão de login com o Google
var googleLoginButton = document.getElementById('google-login-button');

// Adicione um ouvinte de evento de clique ao botão
googleLoginButton.addEventListener('click', function() {
  // Crie uma instância do provedor de autenticação do Google
  var provider = new firebase.auth.GoogleAuthProvider();

  // Faça o login com o Google
  firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      // O usuário está autenticado com sucesso
      var user = result.user;
     alert('Usuário autenticado: ', user);
      console.log('Usuário autenticado: ', user);
      window.location.href = 'login.html';
    })
    .catch(function(error) {
      // Lidar com erros de autenticação
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('Erro de autenticação: ', errorMessage);
    });
});
