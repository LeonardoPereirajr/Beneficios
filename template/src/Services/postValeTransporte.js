export default async function getEscalaAtualColaborador(numemp, tipcol, numcad) {
    var myHeaders = new Headers();
    myHeaders.append("user", "jonathan.borba");
    myHeaders.append("pass", "Jborba@2022");
    myHeaders.append("encryptionType", "0");
    myHeaders.append("Content-Type", "aplication/json");

    var raw = "  {\r\n    \"numemp\" : 1,\r\n     \"tipcol\" : 1,\r\n     \"numcad\" : 14,\r\n     \"inievt\" : \"01/11/2022\",\r\n     \"escvtr\" :46,\r\n     \"linhas\":[{\r\n       \"codlin\":1,\r\n       \"numcar\":123456,\r\n       \"tipopelin\":\"I\"\r\n  }\r\n\r\n  /*Exemplo Alterar{\r\n     \"numemp\" : 1,\r\n     \"tipcol\" : 1,\r\n     \"numcad\" : 14,\r\n     \"inievt\" : \"01/02/2012\",\r\n     \"fimevt\" : \"30/10/2022\",\r\n     \"tipope\" : \"E\"\r\n  }*/\r\n /* Exemplo INCLUIR\r\n     \"numemp\" : 1,\r\n     \"tipcol\" : 1,\r\n     \"numcad\" : 14,\r\n     \"inievt\" : \"01/11/2022\",\r\n     \"escvtr\" :46,\r\n     \"linhas\":[{\r\n       \"codlin\":1,\r\n       \"numcar\":123456,\r\n       \"tipopelin\":\"I\"   \r\n\r\n     }],\r\n     \"tipope\" : \"I\"*/";

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://portalrh.alliar.com:8183/SXI/G5Rest?service=com.senior.xplatform.bpm&server=https://portalrh.alliar.com:8183&port=movimento_vale_transporte_colaborador&module=bs", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}