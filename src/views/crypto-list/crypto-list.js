import {createCoinInDataMockup, cryptoCoinsData, resetLocalStorage} from '../../../data/CryptoData.js';
import { successNotification } from '../../../utils/notifications.js';
import {validateCoinData} from "../../../utils/validators.js";

const getUserLogged = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const accountUserLogged = urlParams.get('account')
    let users = JSON.parse(localStorage.getItem('Users'))

    let response = users.filter(user => (user.number_account == accountUserLogged))
    response[0].access_last_account = new Date().toLocaleString("pt-BR")

    return response
}

const cryptoCoins = [...cryptoCoinsData]
const userLogged = getUserLogged()
let filter = "todas"

const cryptoTable = document.getElementById('cryptoTable')
const filterCoins = document.getElementById("filterCoins")
const searchCoins = document.getElementById("searchCoins")
const urlElement = document.getElementById("cryptoIconInputElement")
const saveCoinDataButton = document.getElementById('saveCoinDataButton')
const logoutButton = document.getElementById('buttonLogOut')
const cryptoNameInputElement = document.getElementById('cryptoNameInputElement')
const cryptoTickerInputElement = document.getElementById('cryptoTickerInputElement')
const cryptoLiquidityInputElement = document.getElementById('cryptoLiquidityInputElement')
const cryptoNationalityInputElement = document.getElementById('cryptoNationatilityInputElement')
const cryptoDescriptionInputElement = document.getElementById('cryptoDescriptionInputElement')
const createOrUpdateCoinModal = new bootstrap.Modal(document.getElementById('createOrUpdateCoin'));
const createCoinButton = document.getElementById('createCoinButton')
const closeCreateCoinModalButton = document.getElementById('closeModalTopButton')
const redirectToWalletButton = document.getElementById('wallet-redirect')

const redirectToCryptoView = (event) => {
    const tableRow = event.target.closest('tr')
    if (tableRow?.id) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const accountId = urlParams.get('account');

        window.location.href = `../crypto-details/crypto-details.html?id=${tableRow?.id}&account=${accountId}`;
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
        id_my_creator: userLogged[0].cpf
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
    const newTableRow = cryptoTable.insertRow();
    newTableRow.id = `${cryptoData.id}`;

    const coinTick = newTableRow.insertCell(0);
    coinTick.insertAdjacentHTML("beforeend", `<i class="fs-6 text-success bi bi-currency-bitcoin cursor-pointer"></i> `);
    coinTick.insertAdjacentHTML("beforeend", `<span class="cursor-pointer">${cryptoData.ticker}</span>`);
    coinTick.tabIndex = 0;

    const coinPrice = newTableRow.insertCell(1);
    coinPrice.innerHTML = `$${cryptoData.price}`;
    coinPrice.tabIndex = 0;

    const coinVolume = newTableRow.insertCell(2);
    coinVolume.innerHTML = `$${cryptoData.volume}`;
    coinVolume.tabIndex = 0;

    const coinPercentage = newTableRow.insertCell(3);
    coinPercentage.innerHTML = cryptoData.dayPercentage < 0
        ? `<i class="bi bi-chevron-down"></i> ${cryptoData.dayPercentage}%`
        : `<i class="bi bi-chevron-up"></i> ${cryptoData.dayPercentage}%`;
    coinPercentage.style.color = cryptoData.dayPercentage < 0 ? 'red' : '#198754';
    coinPercentage.tabIndex = 0;

    const allCells = newTableRow.querySelectorAll('td');
    const colunas = 4;

    allCells.forEach((cell, index) => {
        cell.addEventListener('keydown', (e) => {
            const allFocusable = document.querySelectorAll('#cryptoTable td');
            // Descobre a posição da célula atual no array global
            const currentIndex = Array.from(allFocusable).indexOf(e.target);

            if (e.key === 'ArrowRight' && allFocusable[currentIndex + 1]) {
                allFocusable[currentIndex + 1].focus();
            } else if (e.key === 'ArrowLeft' && allFocusable[currentIndex - 1]) {
                allFocusable[currentIndex - 1].focus();
            } else if (e.key === 'ArrowDown' && allFocusable[currentIndex + colunas]) {
                allFocusable[currentIndex + colunas].focus();
            } else if (e.key === 'ArrowUp' && allFocusable[currentIndex - colunas]) {
                allFocusable[currentIndex - colunas].focus();
            }
        });
    });
};


const clearCreateOrUpdateCryptoModalData = () => {
    cryptoNameInputElement.value = ''
    cryptoTickerInputElement.value = ''
    cryptoLiquidityInputElement.value = ''
    cryptoNationalityInputElement.value = ''
    cryptoDescriptionInputElement.value = ''
}

const redirectUserToWallet = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accountId = urlParams.get('account');

    window.location.href = `../wallet/wallet.html?&account=${accountId}`;
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
                const myCoin = arrayFiltered.filter(coin => coin.id_my_creator === userLogged[0].cpf)
                arrayFiltered = myCoin
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

logoutButton.addEventListener("click", () => {
    userLogged.pop()

    if(userLogged.length === 0){
        window.location.replace("../login/login.html")
    }
})

redirectToWalletButton && (redirectToWalletButton.addEventListener('click', () => {
    redirectUserToWallet()
}))



