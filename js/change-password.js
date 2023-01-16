if (localStorage.usersList && localStorage.currentUser) {
    allUsers = JSON.parse(localStorage.getItem("usersList"))
    onlineUser = JSON.parse(localStorage.getItem("currentUser"))
} else {
    window.location = "signup.html"
}

var passwords = []
var enteredOldPassword = false
var enteredNewPassword = false

const changePassword = () => {
    let validatePassword = /^([\w]{3,10})+$/
    let checkPasswordValidation = validatePassword.test(passwordTyped.value)
    if (passwords.length == 0 && checkPasswordValidation) {
        passwords.push(passwordTyped.value)
        passwordToEnter.innerText = "Enter your New Password"
        enteredOldPassword = true
        passwordTyped.value = ""
        console.log(passwords)
    } else if (enteredOldPassword && enteredNewPassword==false && passwords.length==1 && checkPasswordValidation){
        passwords.push(passwordTyped.value)
        passwordToEnter.innerText = "Confirm your New Password"
        enteredNewPassword = true
        passwordTyped.value = ""
        console.log(passwords)
    }else if (enteredNewPassword && enteredOldPassword && passwords.length==2 && checkPasswordValidation){
        passwords.push(passwordTyped.value)
        console.log(passwords)
        passwordTyped.value = ""
        if(passwords[1]== passwords[2] && passwords[0]==onlineUser.password){
            onlineUser.password = passwords[2]
            updateUser = allUsers.find((item, index) => item.accountnumber == onlineUser.accountnumber)
            updateUser.password = onlineUser.password
            localStorage.setItem("usersList", JSON.stringify(allUsers))
            localStorage.setItem('currentUser', JSON.stringify(onlineUser))
            console.log(onlineUser.password)
            alert("Password Changed")
            changePasswordSuccess.innerHTML=`
            <div class="text-center col-8 m-auto mt-5">
                <i class="fa-solid fa-check fs-1 text-light p-3 rounded-circle" style="background-color:#590140"></i>
                <h2 class="m-2 lh-base">Password successfully changed</h2>
                <a href="/html/dashboard.html" class="btn text-light" style="background-color: #590140;">Go back to HOME</a>
            </div>`
        }else{
            passwordToEnter.innerText = "Enter your New Password"
            passwords = []
            enteredOldPassword = false
            enteredNewPassword = false
            // var enteredOldPassword = false
            // var enteredNewPassword = false
            alert("Passwords does not match")
        }
    }

}