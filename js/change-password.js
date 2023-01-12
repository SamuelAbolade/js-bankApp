if (localStorage.usersList && localStorage.currentUser) {
    allUsers = JSON.parse(localStorage.getItem("usersList"))
    onlineUser = JSON.parse(localStorage.getItem("currentUser"))
} else {
    window.location = "index.html"
}

var passwords = []
var enteredOldPassword = false
var enterdedNewPassword = false

const changePassword = () => {
    let validatePassword = /^([\w]{1,10})+$/
    let checkPasswordValidation = validatePassword.test(passwordTyped.value)
    if (passwords.length == 0 && checkPasswordValidation) {
        passwords.push(passwordTyped.value)
        passwordToEnter.innerText = "Enter your New Password"
        enteredOldPassword = true
        passwordTyped.value = ""
        console.log(passwords)
    } else if (enteredOldPassword && enterdedNewPassword==false && passwords.length==1 && checkPasswordValidation){
        passwords.push(passwordTyped.value)
        passwordToEnter.innerText = "Confirm your New Password"
        enterdedNewPassword = true
        passwordTyped.value = ""
        console.log(passwords)
    }else if (enterdedNewPassword && enteredOldPassword && passwords.length==2 && checkPasswordValidation){
        passwords.push(passwordTyped.value)
        console.log(passwords)
        passwordTyped.value = ""
        if(passwords[1]== passwords[2] && passwords[0]==onlineUser.password){
            onlineUser.password = passwords[2]
            localStorage.setItem("usersList", JSON.stringify(allUsers))
            localStorage.setItem('currentUser', JSON.stringify(onlineUser))
            console.log(onlineUser.password)
            alert("Yay")
        }else{
            passwordToEnter.innerText = "Enter your New Password"
            passwords = []
            enteredOldPassword = false
            enterdedNewPassword = false
            // var enteredOldPassword = false
            // var enterdedNewPassword = false
            alert("Noo")
        }
    }
    if(checkPasswordValidation==false){
        passwordTyped.classList.add("is-invalid")
    }else{
        passwordTyped.classList.remove("is-invalid")
    }
}