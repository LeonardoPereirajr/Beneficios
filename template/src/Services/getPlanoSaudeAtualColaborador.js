export default async function getPlanoSaudeAtualColaborador(numemp,tipcol,numcad) {
    var myHeaders = new Headers();
    myHeaders.append("user", "jonathan.borba");
    myHeaders.append("pass", "Jborba@2022");
    myHeaders.append("encryptionType", "0");
    myHeaders.append("Content-Type", "aplication/json");

    var raw = JSON.stringify({
        numemp,tipcol,numcad:14000355
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    let url = "https://portalrh.alliar.com:8183/SXI/G5Rest?module=rubi&service=com.senior.xplatform.bpm&server=https://portalrh.alliar.com:8183&port=consulta_colaboradores_planos";

    let retorno;
    try {
        let response = await fetch(url, requestOptions)
        response = await response.json();
        retorno = response;
    } catch (error) {
        retorno = error;
        console.log(error);
    }
    return retorno;
}