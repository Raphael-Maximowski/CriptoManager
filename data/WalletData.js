
const defaultWalletData = {}
const walletDataFromLocalStorage = localStorage.getItem('walletData')

export const walletData = walletDataFromLocalStorage ? JSON.parse(walletDataFromLocalStorage) : defaultWalletData

export const registerCoinBought = (coinsData) => {
    const userAlreadyIsRegistered = !!walletData[coinsData.userId]
    if (!userAlreadyIsRegistered) {
        walletData[coinsData.userId] = {}
    }

    const userAlreadyBoughtCoin = !!walletData[coinsData.userId][coinsData.coinId]
    if (!userAlreadyBoughtCoin) {
        walletData[coinsData.userId][coinsData.coinId] = {...coinsData}
        udpateWalletDataInLocalStorage(walletData)
        return true
    }

    walletData[coinsData.userId][coinsData.coinId].amountOfCoin += parseFloat(coinsData.amountOfCoin)
    walletData[coinsData.userId][coinsData.coinId].totalValue += parseFloat(coinsData.totalValue)
    udpateWalletDataInLocalStorage(walletData)
    return true
}

export const registerCoinSell = (sellData) => {
    walletData[sellData.userId][sellData.coinId].amountOfCoin -= parseFloat(sellData.amountOfCoin)
    walletData[sellData.userId][sellData.coinId].totalValue -= parseFloat(sellData.totalValue)

    if (walletData[sellData.userId][sellData.coinId].amountOfCoin === 0) {
        delete walletData[sellData.userId][sellData.coinId]
    }

    udpateWalletDataInLocalStorage(walletData)
    return true
}

const udpateWalletDataInLocalStorage = (walletData) => {
    localStorage.setItem('walletData', JSON.stringify(walletData));
}