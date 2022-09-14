export default async function getColaborador(user) {
    let myHeaders = new Headers();
    myHeaders.append("user", "jonathan.borba");
    myHeaders.append("pass", "Jborba@2022");
    myHeaders.append("encryptionType", "0");
    myHeaders.append("Content-Type", "aplication/json");

    var raw = JSON.stringify({
        "solicitante": user
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let url = "https://portalrh.alliar.com:8183/SXI/G5Rest?module=rubi&service=com.senior.xplatform.bpm&server=https://portalrh.alliar.com:8183&port=retorno_lider";
   
    let retorno;
    try {
        let response = await fetch(url, requestOptions)
        response = await response.json();
        retorno = {
            lider: {
                email: response.emaillider,
                numCad: response.numcadlider,
                nome: response.lider,
                tiCol: response.tipcollider,
                numEmp: response.numemplider
            },
            usuario: {
                nomFun: response.nomfun,
                solicitante: response.solicitante,
                numCad: response.numcad,
                numEmp: response.numemp,
                tipCol: response.tipcol,
                cargo: "Desenvolvedor",
                escala: "24/8"
            },
            empresa: {
                numEmp: response.numemp,
                codFil: response.codfil,
                nomFil: response.nomfil
            }
        }
    } catch (error) {
        retorno = error;
        console.log(error);
    }
    return retorno;
}