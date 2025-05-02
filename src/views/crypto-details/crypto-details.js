import {cryptoCoinsData, updateCoinInDataMockup} from "../../../data/CryptoData.js";
import { errorNotification } from "../../../utils/notifications.js";
import {validateCoinData} from "../../../utils/validators.js";

const cryptoCoins = cryptoCoinsData
const cryptoNameInputElement = document.getElementById('cryptoNameInputElement')
const cryptoTickerInputElement = document.getElementById('cryptoTickerInputElement')
const cryptoLiquidityInputElement = document.getElementById('cryptoLiquidityInputElement')
const cryptoNationalityInputElement = document.getElementById('cryptoNationatilityInputElement')
const cryptoDescriptionInputElement = document.getElementById('cryptoDescriptionInputElement')
const createOrUpdateCryptoModal = new bootstrap.Modal(document.getElementById('createOrUpdateCoin'));
const updateCryptoButton = document.getElementById('updateCryptoButton')
const redirectToCryptoListButton = document.getElementById('redirect-container-button')
const updateCoinButton = document.getElementById('updateCoinDataButton')
let cryptoData = null

const handleModalState = async (state) => {
    if (state) {
        await setModalDataToUpdate()
        createOrUpdateCryptoModal.show()
        return
    }

    createOrUpdateCryptoModal.hide()
}

const setModalDataToUpdate = () => {
    cryptoNameInputElement.value = cryptoData.name
    cryptoTickerInputElement.value = cryptoData.ticker
    cryptoLiquidityInputElement.value = cryptoData.liquidity
    cryptoNationalityInputElement.value = cryptoData.nationality
    cryptoDescriptionInputElement.value = cryptoData.description
}

const getCryptoData = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const cryptoId = urlParams.get('id')
    const cryptoInMainArray = cryptoCoins.find((c) => c.id === parseInt(cryptoId))
    cryptoInMainArray ?
        cryptoData = cryptoInMainArray
        : errorNotification("Nenhum registro encontrado!")
}

const updateCryptoData = async () => {
    let cryptoDataToUpdate = {
        name: cryptoNameInputElement.value,
        ticker: cryptoTickerInputElement.value,
        liquidity: cryptoLiquidityInputElement.value,
        nationality: cryptoNationalityInputElement.value,
        description: cryptoDescriptionInputElement.value,
    }

    if (!await validateCoinData(cryptoDataToUpdate)) return
    const  { name, ticker, liquidity, nationality, description, createdByUser, ...rest } = cryptoData
    cryptoDataToUpdate = {
        ...cryptoDataToUpdate,
        ...rest
    }

    cryptoData = {...cryptoDataToUpdate}
    await updateCoinInDataMockup(cryptoData)
    await handleModalState(false)
}

const notifyInvalidAction = () => {
    errorNotification("Não é permitido alterar a Liquidez Inicial!")
}

const redirectToCryptoListView = () => {
    window.location.href = `../crypto-list/crypto-list.html`;
}

updateCryptoButton && (updateCryptoButton.addEventListener('click', () => {
    handleModalState(true)
}))

redirectToCryptoListButton && (redirectToCryptoListButton.addEventListener('click', () => {
    redirectToCryptoListView()
}))

updateCoinButton && (updateCoinButton.addEventListener('click', () => {
    updateCryptoData()
}))

cryptoLiquidityInputElement && (cryptoLiquidityInputElement.addEventListener('click', () => {
    notifyInvalidAction()
}))

getCryptoData()