document.getElementById('btn-search').addEventListener('click', function(){
    const userName = document.getElementById('input-search').value
    getUserProfile(userName)
})

async function usuario(userName){
    const response = await fetch(`https://api.github.com/users/${userName}`)
    return await response.json()
}

function getUserProfile(userName){
    usuario(userName).then(usuarioDado => {
        let usuarioInfo = `<img src = "${usuarioDado.avatar_url}" alt ="Foto de perfil do usuário" />
        <div class = "data">
        <h1>${usuarioDado.name ?? 'Não possui nome cadastrado 😢'}</h1>
        <p>${usuarioDado.bio ?? 'Não possui bio no seu perfil 😢'}</p>
        </div>`

        document.querySelector('.profile-data').innerHTML = usuarioInfo
    })
}