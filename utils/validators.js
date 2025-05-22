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