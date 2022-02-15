
let code;

exports.generateCode = () => {
    code = Math.floor(Math.random() * 50034) + 1;
    return code
}


exports.validarCode = (codigo) => {

    if(code == codigo){
        return true
    }else{
        return false
    }
}