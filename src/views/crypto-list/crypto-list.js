import {createCoinInDataMockup, cryptoCoinsData, resetLocalStorage} from '../../../data/CryptoData.js';
import { successNotification } from '../../../utils/notifications.js';
import {validateCoinData} from "../../../utils/validators.js";

const cryptoCoins = [...cryptoCoinsData]

let filter = "todas"

const cryptoTable = document.getElementById('cryptoTable')
const filterCoins = document.getElementById("filterCoins")
const searchCoins = document.getElementById("searchCoins")
const urlElement = document.getElementById("cryptoIconInputElement")
const saveCoinDataButton = document.getElementById('saveCoinDataButton')
const cryptoNameInputElement = document.getElementById('cryptoNameInputElement')
const cryptoTickerInputElement = document.getElementById('cryptoTickerInputElement')
const cryptoLiquidityInputElement = document.getElementById('cryptoLiquidityInputElement')
const cryptoNationalityInputElement = document.getElementById('cryptoNationatilityInputElement')
const cryptoDescriptionInputElement = document.getElementById('cryptoDescriptionInputElement')
const createOrUpdateCoinModal = new bootstrap.Modal(document.getElementById('createOrUpdateCoin'));
const createCoinButton = document.getElementById('createCoinButton')
const closeCreateCoinModalButton = document.getElementById('closeModalTopButton')

const redirectToCryptoView = (event) => {
    const tableRow = event.target.closest('tr')
    if (tableRow?.id) {
        window.location.href = `../crypto-details/crypto-details.html?id=${tableRow?.id}`;
    }
}

const handleCreateOrUpdateCryptoModalState = (state) => {
    state ?
        createOrUpdateCoinModal.show()
        : createOrUpdateCoinModal.hide()
}

const createNewCoin = async () => {
    let newCryptoData = {
        iconUrl: urlElement.value,
        name: cryptoNameInputElement.value,
        ticker: cryptoTickerInputElement.value,
        liquidity: cryptoLiquidityInputElement.value,
        nationality: cryptoNationalityInputElement.value,
        description: cryptoDescriptionInputElement.value,
        createdByUser: true
    }

    if (!await validateCoinData(newCryptoData, false)) return
        newCryptoData = {
            id: cryptoCoins.length === 0 ? 0
                : cryptoCoins[cryptoCoins.length - 1].id + 1,
            ...newCryptoData,
            volume: "0",
            dayPercentage: 0,
            price: 0.10
    }

    await createCoinInDataMockup(newCryptoData)
    await renderCryptoInTemplate(newCryptoData)
    await handleCreateOrUpdateCryptoModalState(false)
    await clearCreateOrUpdateCryptoModalData()


    cryptoCoins.push(newCryptoData);
    applyFilters();

}

const renderCryptoInTemplate = (cryptoData) => {
    const newTableRow = cryptoTable.insertRow()
    newTableRow.id = `${cryptoData.id}`

    const coinTick = newTableRow.insertCell(0)
    coinTick.insertAdjacentHTML("beforeend", `<i class="fs-6 text-success bi bi-currency-bitcoin"/> `);
    coinTick.insertAdjacentHTML("beforeend", `${cryptoData.ticker}`);

    const coinPrice = newTableRow.insertCell(1)
    coinPrice.innerHTML = `$${cryptoData.price}`

    const coinVolume = newTableRow.insertCell(2)
    coinVolume.innerHTML = `$${cryptoData.volume}`

    const coinPercentage = newTableRow.insertCell(3)
    coinPercentage.innerHTML = cryptoData.dayPercentage < 0 ?
        `<i class="bi bi-chevron-down"></i> ${cryptoData.dayPercentage}%`
        : `<i class="bi bi-chevron-up"></i> ${cryptoData.dayPercentage}%`
    coinPercentage.style.color = cryptoData.dayPercentage < 0 ? 'red' : '#198754'
}

const clearCreateOrUpdateCryptoModalData = () => {
    cryptoNameInputElement.value = ''
    cryptoTickerInputElement.value = ''
    cryptoLiquidityInputElement.value = ''
    cryptoNationalityInputElement.value = ''
    cryptoDescriptionInputElement.value = ''
}

const renderCryptoTableRows = (data) => {
    cryptoTable.innerHTML = '';
    data.forEach((cryptoData, index) => {
        renderCryptoInTemplate(cryptoData, index)
    })
}

saveCoinDataButton && (saveCoinDataButton.addEventListener('click', (event) => {
    event.preventDefault()
    createNewCoin()
}))

createCoinButton && (createCoinButton.addEventListener('click', () => {
    handleCreateOrUpdateCryptoModalState(true)
}))

closeCreateCoinModalButton && (closeCreateCoinModalButton.addEventListener('click', () => {
    handleCreateOrUpdateCryptoModalState(false)
}))

cryptoTable && (cryptoTable.addEventListener('click', (event) => {
    redirectToCryptoView(event)
}))

renderCryptoTableRows(cryptoCoins)


// Alan
let searchTerm = ''

function applyFilters() {
    let arrayFiltered = [...cryptoCoins]

    switch(filter){
        case "em-alta":
            arrayFiltered = arrayFiltered.filter(coin => coin.dayPercentage >= 0)
            break;
        case "em-baixa":
            arrayFiltered = arrayFiltered.filter(coin => coin.dayPercentage < 0)
            break;
            case "my-coin":
                arrayFiltered = arrayFiltered.filter(coin => coin.createdByUser == true)
                break;
        default:
            arrayFiltered = [...cryptoCoins]
    }

    if(searchTerm.trim() !== ''){
        const search = searchTerm.toLowerCase();

        arrayFiltered = arrayFiltered.filter(coin =>
            coin.name.toLowerCase().includes(search) ||
            coin.ticker.toLowerCase().includes(search) ||
            coin.nationality.toLowerCase().includes(search)
        )
    }

    renderCryptoTableRows(arrayFiltered)
}

filterCoins.addEventListener('input', (event) => {
    filter = event.target.value;

    localStorage.setItem("filter", filter)

    applyFilters();
})

searchCoins.addEventListener('input', (event) => {
    searchTerm = event.target.value;
    
    applyFilters();
})

window.addEventListener("DOMContentLoaded", () => {
    const mensagem = localStorage.getItem("mensagemSuccess")
    const savedfilter = localStorage.getItem("filter")

    if(savedfilter){
        filterCoins.value = savedfilter
        filter = savedfilter
        applyFilters()
    }

    if(mensagem){
        successNotification(mensagem)

        localStorage.removeItem("mensagemSuccess")
    }
})
