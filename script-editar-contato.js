
function abrirModal(email) {

    const modal = document.querySelector('dialog');
    modal.showModal();

    fetch(`http://localhost:8080/contato/${email}`, {
    method: "GET",
    headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => console.log(data))
}

function fecharModal() {
    const modal = document.querySelector('dialog');
    modal.close();
}

function editarContato(email) {

    fetch(`http://localhost:8080/contato/${email}`, {
    method: "PUT",
    headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    
}