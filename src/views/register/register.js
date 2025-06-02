import { validateCreateNewUser } from "../../../utils/validators.js";

const inputName = document.getElementById("inputName")
const inputCPF = document.getElementById("inputCPF")
const inputEmail = document.getElementById("inputEmail")
const inputTelefone = document.getElementById("inputTelefone")
const inputNacionalidade = document.getElementById("inputNacionalidade")
const inputComplemento = document.getElementById("inputComplemento")
const inputPassword = document.getElementById("inputPassword")
const inputCEP = document.getElementById("inputCEP")

const createNewUser = () => {
    const numberAccount = () => {
        return Math.floor(100000 + Math.random() * 900000)
    }

    return {
        name: inputName.value,
        email: inputEmail.value,
        cpf: inputCPF.value,
        address: {
            cep: inputCEP.value,
            complemento: inputComplemento.value
        },
        tel: inputTelefone.value,
        nacionalidade: inputNacionalidade.value,
        password: inputPassword.value,
        number_account: numberAccount(),
        carteira: [],
        create_data: new Date().toLocaleDateString("pt-BR"),
    }

}

function clearInputValue() {
    inputName.value = ""
    inputCPF.value = ""
    inputCEP.value = ""
    inputComplemento.value = ""
    inputEmail.value = ""
    inputTelefone.value = ""
    inputNacionalidade.value = ""
    inputPassword.value = ""
}

function redirectToRouter(){
    window.location.replace("../login/login.html")
}

IMask(inputCPF, {
    mask: '000.000.000-00'
})

IMask(inputCEP, {
    mask: '00000-000'
})

IMask(inputTelefone, {
    mask: '(00) 00000-0000'
}) 

document.addEventListener("DOMContentLoaded", () => {
    const dataUsers = localStorage.getItem("Users");
    const data =  dataUsers == null || " "? []: JSON.parse(dataUsers)
})

const getLocalstorage = (key) => {
    try{
        const datas = localStorage.getItem(key)

        if(!datas || datas.trim() === ""){
            return []
        }

        const dataToArray = JSON.parse(datas)

        return dataToArray
    }catch(erro){
        console.log("Erro ao ler localStorage", erro)
    }

}


document.getElementById("formCreateNewUser").addEventListener("submit", (event) => {
    event.preventDefault()
    const newUser = createNewUser()
    const data = getLocalstorage("Users")

    const validacao = validateCreateNewUser(newUser, data)

    if(validacao){
        data.push(newUser)
        localStorage.setItem("Users", JSON.stringify(data))
        setTimeout(redirectToRouter, 1000)
    }

    setTimeout(clearInputValue, 2000)
})