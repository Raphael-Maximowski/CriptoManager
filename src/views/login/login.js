import { errorNotification, successNotification } from "../../../utils/notifications.js";
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
        numConta_or_cpf: inputConta.value,
        password: inputPassword.value
    }

    const responseValidation = validationLogin(userLog.numConta_or_cpf, userLog.password)

    if(responseValidation){
       const users_BD = JSON.parse(localStorage.getItem("Users"))
       console.log(users_BD)
       
       if(users_BD === null){
        localStorage.setItem("Users", JSON.stringify([]))
       }

       const userLogged = users_BD.find(user => user.numConta_or_pf === userLog.numConta_or_cpf|| user.cpf === userLog.numConta_or_cpf)

       if(userLogged === undefined){
            errorNotification("Usuário não existe no sistema!")
       }

       console.log(userLogged.number_account)

       window.location.replace(`../crypto-list/crypto-list.html?account=${userLogged.number_account}`)
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
