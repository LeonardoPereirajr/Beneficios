export default async function getColaborador(user) {
    let myHeaders = new Headers();
    myHeaders.append("user", "jonathan.borba");
    myHeaders.append("pass", "Jborba@2022");
    myHeaders.append("encryptionType", "0");
    myHeaders.append("Content-Type", "aplication/json");

    // TODO : MUDAR ALTENTICAÇÃO
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
                escala: response.nomesc,
                endcep: response.endcep,
                endrua: response.endrua,
                endcpl: response.endcpl,
                nombai: response.nombai,
                nomcid: response.nomcid
            },
            empresa: {
                numEmp: response.numemp,
                codFil: response.codfil,
                nomFil: response.nomfil,
                datfil: response.datfil
            },
            dependentes: {
                nomdep: response.nomdep,
                numcad: response.numcad,
                numemp: response.numemp,
                tipcol: response.tipcol,
                grapar: response.grapar,
                coddep: response.coddep
            }
        }
    } catch (error) {
        retorno = error;
        console.log(error);
    }
    return retorno;
}