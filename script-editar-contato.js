
function abrirModal(email) {

    const modal = document.querySelector('dialog');
    modal.showModal();

    fetch(`http://localhost:8080/contato/${email}`, {
    method: "GET",
    headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const nome = document.getElementById('nome-editar');
        const email = document.getElementById('email-editar');
        const mensagem = document.getElementById('msg-editar');
        console.log(nome);
        console.log(email);
        console.log(mensagem);
        data.forEach(contato => {
            console.log(contato.nome);
            console.log(contato.email);
            console.log(contato.mensagem);
            nome.value = `${contato.nome}`;
            email.value = `${contato.email}`;
            mensagem.value = `${contato.mensagem}`;
        });
    })

    const botaoEditar = document.getElementById('button-editar');
    console.log(botaoEditar);
    botaoEditar.addEventListener('click', () => {
        editarContato(email);
        modal.close();
    })
}



function editarContato(email) {
    
    const nomeNovo = document.getElementById('nome-editar');
    console.log(nomeNovo);
    const emailNovo = document.getElementById('email-editar');
    console.log(emailNovo);
    const mensagemNova = document.getElementById('msg-editar');
    console.log(mensagemNova);
    
    if (nomeNovo.value != "" && emailNovo.value != "") {
        alert('Editado');
    }
    
    let data = {
        nome: nomeNovo.value,
        email: emailNovo.value,
        mensagem: mensagemNova.value
    }
    
    fetch(`http://localhost:8080/contato/${email}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
    
    return false;
}


function fecharModal() {
    const modal = document.querySelector('dialog');
    modal.close();
}