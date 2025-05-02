import { errorNotification, successNotification } from "./notifications.js";

export const validateCoinData = (cryptoData) => {
    const objectKeys = Object.keys(cryptoData)
    for (const key of objectKeys) {
        if (!cryptoData[key]) {
            errorNotification("Todos os campos são obrigatórios")
            return false;
        }
    }

    if (cryptoData[objectKeys[2]] <= 0) {
        errorNotification("Liquidez Inválida")
        return false
    }

    if (cryptoData[objectKeys[1]].length > 5) {
        errorNotification("Símbolo deve ter até 5 caracteres")
        return false
    }

    successNotification("Crypto Moeda Registrada!")
    return true
}