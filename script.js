const URL = 'https://randomuser.me/api/?nat=br';

async function getUserData() {
    let response = await fetch(URL);
    
    if(response.ok) {
        let jsonUser = await response.json();
        
        showUserData(jsonUser.results[0]);
        
        return;
    }
}

function showUserData(user) {
    let img = document.querySelector("#foto_pessoa");
    let h2 = document.querySelector("#nome_pessoa");
    let pRua = document.querySelector('#rua_numero');
    let pCida = document.querySelector('#cidade');
    let pEsta = document.querySelector('#estado');
    let pCod = document.querySelector('#codigo_postal');
    let pSexo = document.querySelector('#sexo');
    let pEmail = document.querySelector('#email');
    let pTel = document.querySelector('#telefone');

    let usuario = trataDadosUser(user);

    img.src = usuario.imgSrc;
    h2.innerHTML = usuario.nomeCompleto;
    pRua.innerHTML = usuario.rua;
    pCida.innerHTML = usuario.cidade;
    pEsta.innerHTML = usuario.estado;
    pCod.innerHTML = usuario.codigo_postal;
    pSexo.innerHTML = usuario.sexo;
    pEmail.innerHTML = usuario.email;
    pTel.innerHTML = usuario.telefone;
}

function trataDadosUser(user) {
    let sexoUser = user.gender === 'female' ? 'Feminino' : 'Masculino';

    return {
        imgSrc: user.picture.large,
        nomeCompleto: `${user.name.first} ${user.name.last}`,
        sexo: `<strong>Sexo:</strong> ${sexoUser}`,
        rua: `<strong>Endereço:</strong> ${user.location.street.name}, ${user.location.street.number}`,
        cidade: `<strong>Cidade:</strong> ${user.location.city}`,
        estado: `<strong>Estado:</strong> ${user.location.state}`,
        codigo_postal: `<strong>Código postal:</strong> ${user.location.postcode}`,
        email: `<strong>Email:</strong> ${user.email}`,
        telefone: `<strong>Telefone:</strong> ${user.phone}`
    };
}

getUserData();

document.querySelector('#botao').onclick = getUserData;