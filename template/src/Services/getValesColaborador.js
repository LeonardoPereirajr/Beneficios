export default async function getPlanoSaudeAtualColaborador(numemp,tipcol,numcad) {
    var myHeaders = new Headers();
    myHeaders.append("user", "jonathan.borba");
    myHeaders.append("pass", "Jborba@2022");
    myHeaders.append("encryptionType", "0");
    myHeaders.append("Content-Type", "aplication/json");
    
    var raw = JSON.stringify({
        numemp:1,tipcol:1,numcad:13000063
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    let url = "https://portalrh.alliar.com:8183/SXI/G5Rest?service=com.senior.xplatform.bpm&server=https://portalrh.alliar.com:8183&module=bs&port=consulta_colaboradores_vales";

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

