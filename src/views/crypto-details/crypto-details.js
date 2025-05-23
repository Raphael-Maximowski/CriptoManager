import {cryptoCoinsData, updateDataInLocalStorage, updateCoinInDataMockup} from "../../../data/CryptoData.js";
import { errorNotification, successNotification } from "../../../utils/notifications.js";
import {validateCoinData} from "../../../utils/validators.js";

const cryptoCoins = cryptoCoinsData
const cryptoNameInputElement = document.getElementById('cryptoNameInputElement')
const cryptoTickerInputElement = document.getElementById('cryptoTickerInputElement')
const cryptoLiquidityInputElement = document.getElementById('cryptoLiquidityInputElement')
const cryptoNationalityInputElement = document.getElementById('cryptoNationatilityInputElement')
const cryptoDescriptionInputElement = document.getElementById('cryptoDescriptionInputElement')
const cryptoIconInputElement = document.getElementById('cryptoIconInputElement')
const createOrUpdateCryptoModal = new bootstrap.Modal(document.getElementById('createOrUpdateCoin'))
const updateCryptoButton = document.getElementById('updateCryptoButton')
const redirectToCryptoListButton = document.getElementById('redirect-container-button')
const updateCoinButton = document.getElementById('updateCoinDataButton')
const openModalExclused = document.getElementById('openModalExclused')
const deleteCrypto = document.getElementById('deleteCoin')
const modalExclusedCoin = document.getElementById('modalExclusedCoin')
const closeModalExclused = document.getElementById('closeModalExclused')
let cryptoData = null

const informationCrypto = {
    img: document.getElementById("iconCrypto"),
    name: document.getElementById("nameCrypto"),
    ticker: document.getElementById("tickerCrypto"),
    dayPercentage: document.getElementById("dayPorcentagemCrypto"),
    price: document.getElementById("priceCrypto"),
    volume: document.getElementById("volumeCrypto"),
    liquidity: document.getElementById("liquidityCrypto"),
    description: document.getElementById("descriptionCrypto"),
    nationality: document.getElementById("nationalityCrypto"),
}

const handleModalState = async (state) => {
    if (state) {
        await setModalDataToUpdate()
        createOrUpdateCryptoModal.show()
        return
    }

    createOrUpdateCryptoModal.hide()
}

const setModalDataToUpdate = () => {
    cryptoIconInputElement.value = cryptoData.iconUrl
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
        iconUrl: cryptoIconInputElement.value,
        name: cryptoNameInputElement.value,
        ticker: cryptoTickerInputElement.value,
        liquidity: cryptoLiquidityInputElement.value,
        nationality: cryptoNationalityInputElement.value,
        description: cryptoDescriptionInputElement.value,
        createdByUser: true
    }

    if (!await validateCoinData(cryptoDataToUpdate, true)) return 
        const  {  iconUrl, name, ticker, liquidity, nationality, description, createdByUser, ...rest } = cryptoData
        cryptoDataToUpdate = {
            ...cryptoDataToUpdate,
            ...rest
        }

    cryptoData = {...cryptoDataToUpdate}
    await updateCoinInDataMockup(cryptoData)
    await handleModalState(false)

    renderInformationsCoin(cryptoData, informationCrypto)
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

//
const limpaNumero = (str) => {
    return Number(str.replace(/\./g, ''));
}

const liquidityNumber = limpaNumero(cryptoData.liquidity);
const volumeNumber = limpaNumero(cryptoData.volume);

function renderInformationsCoin (dataCoin, informationFieldCurrencies) {
    informationFieldCurrencies.img.src = dataCoin.iconUrl,
    informationFieldCurrencies.name.innerText = dataCoin.name,
    informationFieldCurrencies.ticker.innerText = dataCoin.ticker,
    informationFieldCurrencies.dayPercentage.innerText = `${dataCoin.dayPercentage}%`,
    informationFieldCurrencies.price.innerText = `U$ ${dataCoin.price}`,
    informationFieldCurrencies.volume.innerText = dataCoin.volume,
    informationFieldCurrencies.liquidity.innerText = dataCoin.liquidity,
    informationFieldCurrencies.description.innerText = dataCoin.description,
    informationFieldCurrencies.nationality.innerText = dataCoin.nationality
}

const myChart = document.getElementById('myChart').getContext('2d')

new Chart (myChart, {
    type: 'bar',
    data:{
        labels: ['Preço (USD)', 'Volume', 'Liquidez'],
        datasets: [{
            label: `indicadores - ${cryptoData.name}`,
            data: [parseFloat(cryptoData.price), parseFloat(liquidityNumber), parseFloat(volumeNumber)],
            backgroundColor: ["#36a2eb", "#ffcd56", "#4bc0c0"]
        }]
    },
    options: {
    indexAxis: 'y', // horizontal
    responsive: true,
    scales: {
        x: {
        beginAtZero: true
        }
    },
    plugins: {
        legend: {
        display: false
        },
        tooltip: {
        callbacks: {
            label: (context) => {
            if (context.parsed.x > 1000000) {
                return (context.parsed.x / 1000000).toFixed(2) + 'M';
            }
            return context.parsed.x;
            }
        }
        }
    }
    }
})

function renderModalExclused() {
    document.getElementById("iconCryptoModal").src = cryptoData.iconUrl
    document.getElementById("titleModalExclused").innerHTML = cryptoData.name
}

const setCoinsNotExclused = (coins, coinExclused) => {
    return coins.filter(coin => coin.id != coinExclused.id)
}


window.addEventListener("DOMContentLoaded", () => {
    renderInformationsCoin(cryptoData, informationCrypto)

    if(!cryptoData.createdByUser){
        document.getElementById('updateCryptoButton').classList.add('hidden')
        document.getElementById('openModalExclused').classList.add('hidden')
        console.log("CryptoData: ", cryptoData)

        const buyCoin = document.createElement('button')
        buyCoin.classList.add("btn", "btn-success", "col-md-2")
        buyCoin.textContent = "Comprar"
        document.getElementById('buttons').appendChild(buyCoin)
    }
})


openModalExclused.addEventListener('click', () => {
    const modal = new bootstrap.Modal(document.getElementById('modalExclusedCoin'))

    modal.show()
    renderModalExclused()
})

deleteCrypto.addEventListener("click", () => {
    const newValueCoinsData = setCoinsNotExclused(cryptoCoins, cryptoData)

    updateDataInLocalStorage(newValueCoinsData)

    localStorage.setItem("mensagemSuccess", "Item excluído com sucesso")

    window.location.href = "../crypto-list/crypto-list.html"
    
})

closeModalExclused.addEventListener("click", () => {
    modalExclusedCoin.hide()
})






