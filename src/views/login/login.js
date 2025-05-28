import { validationLogin } from "../../../utils/validators.js";

const inputConta = document.getElementById("inputNumContaOrCpf")
const inputPassword = document.getElementById("inputPassword")
const buttonShowPassword = document.getElementById("toggleSenha")

IMask(inputConta, {
    mask: [
        {
            mask: '00000-0',
            lazy: true
        },
        {
            mask: '000.000.000-00',
            lazy: true
        }
    ]
})

document.getElementById("formValidationUsuario").addEventListener("submit", (event) => {
    event.preventDefault()

    const userLog = {
        numConta_or_pf: inputConta.value,
        password: inputPassword.value
    }

    const responseValidation = validationLogin(userLog.numConta_or_pf)

    if(responseValidation){
        window.location.href = `../crypto-list/crypto-list.html?account=${userLog.numConta_or_pf}`
    }
})

buttonShowPassword.addEventListener("click", () => {
    const typeCurrent = inputPassword.getAttribute("type")

    if(typeCurrent === "password"){
        inputPassword.setAttribute("type", "text");
        buttonShowPassword.innerHTML = '<i class="bi bi-eye" id="iconeSenha"></i>'
    }else{
        inputPassword.setAttribute("type", "password");
        buttonShowPassword.innerHTML = '<i class="bi bi-eye-slash" id="iconeSenha"></i>'
    }
})
