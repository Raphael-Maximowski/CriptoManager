import { errorNotification, successNotification } from "./notifications.js";

export const validateCoinData = (cryptoData, update) => {
    const objectKeys = Object.keys(cryptoData)

    for (const key of objectKeys) {
        if (!cryptoData[key]) {
            errorNotification("Todos os campos são obrigatórios")
            return false;
        }
    }

    if (cryptoData[objectKeys[3]] <= 0) {
        errorNotification("Liquidez Inválida")
        return false
    }

    if (cryptoData[objectKeys[2]].length > 5) {
        errorNotification("Símbolo deve ter até 5 caracteres")
        return false
    }

    update? successNotification("Crypto Moeda atualizada!"): successNotification("Crypto Moeda Registrada!")
    
    return true
}

export const validateCreateNewUser = (dataNewUser, datasUsers) => {

    const userExistInArray = datasUsers.length === 0 ? false : true

    if(userExistInArray){
        const resultValidationCPF = datasUsers.find(user => user.cpf === dataNewUser.cpf)
        const resultValidationEmail = datasUsers.find(user => user.email === dataNewUser.email)

        if(resultValidationCPF){
            errorNotification("Já existe um usuário com esse CPF")
            return false
        }

        if(resultValidationEmail){
            errorNotification("Já existe um usuário com esse E-mail")
            return false
        }
    }

    successNotification("Usuário registrado no sistema!")

    return true
}

export const validationLogin = (conta) => {

    if(conta.length < 6){
        errorNotification("Campo precisa ter pelo menos 6 caracteres!")
        return false
    }

    return true
}