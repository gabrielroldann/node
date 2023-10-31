
fetch('http://localhost:8080/contatos', {
    method: "GET",
    headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json())
.then(data => {
    const contatosTable = document.getElementById('tabela');
    const tbody = contatosTable.querySelector('tbody');
    // console.log(tbody);
    data.forEach(contato => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contato.nome}</td>
            <td>${contato.email}</td>
            <td>${contato.mensagem}</td>
            <td><a href="contatodetail.html?email=${contato.email}">Ver</a></td>
            <td><a href="?email=${contato.email}" onclick="deletarContato('${contato.email}');">Deletar</a></td>
            <td><a href="#?email=${contato.email}" onclick="abrirModal('${contato.email}');">Editar</a></td>
        `;
        tbody.appendChild(row);
    });
})
.catch(error => console.error('Erro ao buscar dados:', error));
