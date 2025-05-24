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
        return Math.floor(100000 + Math.random() * 900000); // garante 6 dígitos
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
        carteira: []
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
    window.location.href = "../login/login.html"
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

document.getElementById("formCreateNewUser").addEventListener("submit", (event) => {
    event.preventDefault()
    const dataUsers = localStorage.getItem("Users");
    const newUser = createNewUser()
    const data =  dataUsers == ""? []: JSON.parse(dataUsers)

    const validacao = validateCreateNewUser(newUser, data)

    if(validacao){
        data.push(newUser)
        localStorage.setItem("Users", JSON.stringify(data))
        setInterval(redirectToRouter, 3000)
    }

    setInterval(clearInputValue, 3000)
})