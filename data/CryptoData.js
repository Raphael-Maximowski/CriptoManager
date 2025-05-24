const originalArray = [
    {
    "id": 1,
    "name": "Bitcoin",
    "ticker": "BTC",
    "dayPercentage": 2.34,
    "price": 65432.1,
    "volume": "28.500.000.000",
    "liquidity": "120.000.000.000",
    "description": "Primeira criptomoeda descentralizada do mundo, criada como uma alternativa ao sistema financeiro tradicional. Funciona como \"ouro digital\" e reserva de valor.",
    "nationality": "Japão (pseudônimo do criador, Satoshi Nakamoto)",
    "createdByUser": false,
    "iconUrl": "https://servidor-estaticos-omega-liard.vercel.app/bitcoin.png"
    },
    {
    "id": 2,
    "name": "Ethereum",
    "ticker": "ETH",
    "dayPercentage": 1.87,
    "price": 3521.45,
    "volume": "12.300.000.000",
    "liquidity": "45.000.000.000",
    "description": "Plataforma de contratos inteligentes que permitiu a criação de tokens, NFTs e aplicações descentralizadas (DApps). Considerada a \"internet do blockchain\".",
    "nationality": "Suíça (fundação Ethereum) / Canadá (Vitalik Buterin)",
    "createdByUser": false,
    "iconUrl": "https://servidor-estaticos-omega-liard.vercel.app/ethereum.png"
    },
    {
    "id": 3,
    "name": "Solana",
    "ticker": "SOL",
    "dayPercentage": 5.21,
    "price": 142.78,
    "volume": "3.800.000.000",
    "liquidity": "15.000.000.000",
    "description": "Blockchain de alta velocidade e baixo custo, focada em escalabilidade. Concorrente direta da Ethereum, com forte adoção em DeFi e NFTs.",
    "nationality": "Estados Unidos",
    "createdByUser": false,
    "iconUrl": "https://servidor-estaticos-omega-liard.vercel.app/solana.png"
    },
    {
    "id": 4,
    "name": "XRP",
    "ticker": "XRP",
    "dayPercentage": -0.87,
    "price": 0.58,
    "volume": "980.000.000",
    "liquidity": "4.500.000.000",
    "description": "Criado pela Ripple Labs, é voltado para transações bancárias rápidas e de baixo custo entre instituições financeiras. Polemico por processos da SEC.",
    "nationality": "Estados Unidos (Ripple Labs)",
    "createdByUser": false,
    "iconUrl": "https://servidor-estaticos-omega-liard.vercel.app/xrp.png"
    },
    {
    "id": 5,
    "name": "Dogecoin",
    "ticker": "DOGE",
    "dayPercentage": 3.45,
    "price": 0.12,
    "volume": "750.000.000",
    "liquidity": "3.200.000.000",
    "description": "Criptomoeda meme criada como brincadeira, mas que ganhou popularidade graças a Elon Musk e uma comunidade engajada. Usada para gorjetas e pagamentos.",
    "nationality": "Internacional (criadores: Billy Markus (EUA) e Jackson Palmer (Austrália))",
    "createdByUser": false,
    "iconUrl": "https://servidor-estaticos-omega-liard.vercel.app/dogecoin.png"
    },
    {
    "id": 6,
    "name": "Cardano",
    "ticker": "ADA",
    "dayPercentage": -1.23,
    "price": 0.45,
    "volume": "420.000.000",
    "liquidity": "2.800.000.000",
    "description": "Blockchain de terceira geração com foco em segurança e escalabilidade, usando prova de participação (PoS). Conhecida por sua abordagem acadêmica e desenvolvimento lento, porém metódico.",
    "nationality": "Suíça (Input Output Hong Kong - IOHK) / Fundador: Charles Hoskinson (EUA)",
    "createdByUser": false,
    "iconUrl": "https://servidor-estaticos-omega-liard.vercel.app/cardano.png"
    }

]

export const updateDataInLocalStorage = (cryptoData) => {
    localStorage.setItem('cryptoCoinsData', JSON.stringify(cryptoData));
}

const savedData = localStorage.getItem('cryptoCoinsData');
export const cryptoCoinsData = savedData ? JSON.parse(savedData) : originalArray

export const createCoinInDataMockup = (cryptoData) => {
    if(cryptoData) {
        cryptoCoinsData.push(cryptoData)
        updateDataInLocalStorage([...cryptoCoinsData])
    }
}

export const updateCoinInDataMockup = (cryptoData) => {
    const cryptoIndex = cryptoCoinsData.findIndex((c) => c.id === cryptoData.id)
    if (cryptoIndex !== -1) {
        cryptoCoinsData[cryptoIndex] = cryptoData;
        updateDataInLocalStorage([...cryptoCoinsData])
    }
}


export const resetLocalStorage = (array) => {

    if("cripto"){
        localStorage.setItem("cryptoCoinsData", JSON.stringify(originalArray))
    }

    if("users"){
        localStorage.setItem("Users", [])
    }
}


