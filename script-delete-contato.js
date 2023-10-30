
function deletar() {
    
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    console.log(email);

    fetch(`http://localhost:8080/contato/${email}`, {
        method: "DELETE",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .catch(error => console.error('Erro ao buscar dados:', error));
}
