if (localStorage.usersList && localStorage.currentUser) {
    allUsers = JSON.parse(localStorage.getItem("usersList"))
    onlineUser = JSON.parse(localStorage.getItem("currentUser"))
} else {
    window.location = "index.html"
}

var oldPassword = 0
var enteredOldPassword = false
const changePassword = () => {
    if (enteredOldPassword == false) {
        // passwords.push(passwordTyped.value)
        oldPassword = passwordTyped.value
        passwordToEnter.innerText = "Enter your New Password"
        enteredOldPassword = true
        passwordTyped.value = ""
        console.log(oldPassword)
    } else if (enteredOldPassword) {
        if(passwordTyped.value == onlineUser.password){
            alert("There")
        }else{
            alert("Incorrect")
        }
    }
}