
var button = document.getElementById('button');

button.addEventListener('click', function enviar() {
    var nome = document.getElementById('nome');
    var email = document.getElementById('email');
    var mensagem = document.getElementById('msg');

    if (nome.value != "" && email.value != "") {
        alert('Enviado');
    }

    let data = {
        nome: nome.value,
        email: email.value,
        mensagem: mensagem.value
    }
    
    fetch('http://localhost:8080/contato', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(response => console.log(json))
    .catch(err => console.log(err))
});
