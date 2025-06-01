import { successNotification, errorNotification } from "../../../utils/notifications.js";
import {registerCoinSell, walletData} from "../../../data/WalletData.js";

const totalValueWallet = document.getElementById('total-value-wallet')
const redirectContainer = document.getElementById('redirect-container-button')
const sellCoinModal = new bootstrap.Modal(document.getElementById('sellCoinModal'))
const closeSellModalButton = document.getElementById('close-sell-modal')
const modalTitle = document.getElementById('modal-title')
const amountCoinModalInput = document.getElementById('amount-coin')
const amountDollarCoin = document.getElementById('amount-dollar-coin')
const amountToSell = document.getElementById('amount-to-sell')
const amountToSellTotalValue = document.getElementById('amount-to-sell-total-value')
const sellCoinButton = document.getElementById('sell-button')
let userId = null
let userWalletData = null
let coinToSell = null
let amountToSellValue = null
let totalAmountToSell = null

const checkViewStatus = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const hasBoughtCoins = urlParams.get('boughtCoins');
    if (hasBoughtCoins) {
        successNotification("Compra realizada com sucesso!")
    }
}

const getUserId = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    userId = urlParams.get('account');
}

const getWalletData = () => {
    userWalletData = walletData[userId]
}

const renderCoinData = () => {
    const mainContainer = document.querySelector('main')

    if (!userWalletData) {
        mainContainer.innerHTML += '<div class="d-flex w-100 justify-content-center text-white">Nenhuma compra registrada em sua carteira até o momento!</div>'
        return
    }
    const walletKeys = Object.keys(userWalletData)

    if (walletKeys.length === 0) {
        mainContainer.innerHTML += '<div class="d-flex w-100 justify-content-center text-white">Nenhuma compra registrada em sua carteira até o momento!</div>'
        return
    }

    walletKeys.forEach((key) => {
        mainContainer.innerHTML += `<div class="px-3 gap-3 align-items-center py-3 rounded-2 coin-container d-flex flex-wrap w-100"> 
                                      <div class=" rounded-2">
                                           <img width="30px" height="30px" src="${userWalletData[key].coinImage}">
                                      </div>   
                                        <div class="d-flex gap-3">
                                           <p class="text-white mb-0 medium-content"><span class="fw-bold">Nome: </span> ${userWalletData[key].coinTicker}</p>   
                                           <p class="text-white mb-0 medium-content"><span class="fw-bold">Quantidade: </span> ${userWalletData[key].amountOfCoin}</p>
                                           <p class="text-white mb-0 medium-content"><span class="fw-bold">Valor Total: </span> U$${userWalletData[key].totalValue.toFixed(2)}</p>    
                                        </div>     
                                        
                                        <div class="d-flex justify-content-end flex-grow-1">
                                            <button id="${userWalletData[key].coinId}" class="sell-button small-content btn btn-success">
                                                <i class="bi bi-wallet-fill me-2"></i>
                                                Vender
                                            </button>
                                        </div>                
                                     </div>`
    })
}

const handleSellConfiguration = (event) => {
    const coinId = event.target.id
    coinToSell = userWalletData[coinId]
    modalTitle.innerText += `: ${coinToSell.coinTicker}`
    amountCoinModalInput.value = coinToSell.amountOfCoin.toFixed(2)
    amountDollarCoin.value = `U$ ${coinToSell.totalValue.toFixed(2)}`
}

const handleSellModalState = (state) => {
    state ? sellCoinModal.show()
        : sellCoinModal.hide()
}

const activeSellListeners = () => {
    const sellButtons = document.querySelectorAll('.sell-button')
    sellButtons.forEach((event) => {
        event.addEventListener('click', async (event) => {
            await handleSellConfiguration(event)
            handleSellModalState(true)
        })
    })
}

const calcTotalValueWallet = () => {
    if (!userWalletData) {
        totalValueWallet.innerText += `Total Carteira: U$ 0`
        return
    }
    const walletKeys = Object.keys(userWalletData)
    const totalValueInWallet = walletKeys.reduce((acc, key) => { return acc + userWalletData[key].totalValue }, 0)
    totalValueWallet.innerText += `Total Carteira: U$ ${totalValueInWallet.toFixed(2)}`
}

const redirectUserToListPage = () => {
    window.location.href = `../crypto-list/crypto-list.html?account=${userId}&boughtCoins=true`;
}

const handleSellInput = () => {
    amountToSellValue = amountToSell.value
    totalAmountToSell = amountToSell.value * coinToSell.coinValue
    amountToSellTotalValue.value = `U$ ${totalAmountToSell.toFixed(2)}`
}

const validateCoinToSell = () => {
    if (amountToSellValue > coinToSell.amountOfCoin || amountToSellValue <= 0) {
        errorNotification("Insira um valor a ser vendido válido!")
        return
    }

    const sellResponse = registerCoinSell({
        amountOfCoin: amountToSellValue,
        totalValue: totalAmountToSell,
        coinId: coinToSell.coinId,
        userId: userId
    })

    if (sellResponse) {
        const url = new URL(window.location.href);
        url.searchParams.delete('boughtCoins');
        window.history.replaceState({}, '', url);
        window.location.reload()
    }
}

checkViewStatus()
await getUserId()
await getWalletData()
await renderCoinData()
await calcTotalValueWallet()
activeSellListeners()

redirectContainer && (redirectContainer.addEventListener('click', () => {
    redirectUserToListPage()
}))

closeSellModalButton && (closeSellModalButton.addEventListener('click', () => {
    handleSellModalState(false)
}))

amountToSell && (amountToSell.addEventListener('input', () => {
    handleSellInput()
}))

sellCoinButton && (sellCoinButton.addEventListener('click', () => {
    validateCoinToSell()
}))