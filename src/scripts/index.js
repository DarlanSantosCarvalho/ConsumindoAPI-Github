import {baseUrl} from '/src/scripts/variables.js'

document.getElementById('btn-search').addEventListener('click', function () {
    const userName = document.getElementById('input-search').value
    if(userName.length === 0){
        alert('Preencha o campo com o nome de usuário do Github')
        return 
    }
    getUserProfile(userName)
    getUserRepositories(userName)
})


document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13
    if (isEnterKeyPressed) {
        if(userName.length === 0){
            alert('Preencha o campo com o nome de usuário do Github')
            return 
        }
        getUserProfile(userName)
    }
})

async function usuario(userName) {
    const response = await fetch(`${baseUrl}${userName}`)
    return await response.json()
}

async function repos(userName) {
    const response = await fetch(`${baseUrl}${userName}/repos?per_page=6`)
    return await response.json()
}


function getUserProfile(userName) {
    usuario(userName).then(usuarioDado => {
        let usuarioInfo = 
        `<div class = "info"> 
        <img src = "${usuarioDado.avatar_url}" alt ="Foto de perfil do usuário" />
        <div class = "data">
        <h1>${usuarioDado.name ?? 'Não possui nome cadastrado 😢'}</h1>
        <p>${usuarioDado.bio ?? 'Não possui bio no seu perfil 😢'}</p>
        </div>
        </div>`

        document.querySelector('.profile-data').innerHTML = usuarioInfo
    })
}

function getUserRepositories(userName){
    repos(userName).then(reposData => {
        let repositoriesItens = ""
        reposData.forEach(repo => {
            repositoriesItens += `<li><a href="${repo.html_url}">${repo.name}</a> </li>`
        });

        document.querySelector('.profile-data').innerHTML +=
         `<div class = "repositories section"> 
        <h2> Repositórios Github </h2>
        <ul>${repositoriesItens}</ul>
        </div>`
    })
}

getUserRepositories()