
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const email = urlParams.get('email');
console.log(email);

fetch(`http://localhost:8080/contato/${email}`, {
    method: "GET",
    headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json())
.then(data => {
    const tabela = document.getElementById('tabela-contato');
    const tbody = document.querySelector('tbody');
    data.forEach(contato => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${contato.nome}</td>
            <td>${contato.email}</td>
            <td>${contato.mensagem}</td>
        `;
        tbody.appendChild(linha);
    });
})
