/* Profile details page */
    if (localStorage.currentUser && localStorage.usersList) {
        allUsers = JSON.parse(localStorage.getItem("usersList"))
        onlineUser = JSON.parse(localStorage.getItem("currentUser"))
        dispAccName.innerText = `${onlineUser.firstname} ${onlineUser.lastname}`
        console.log(onlineUser)
    }

    // Display user details in inputs
    const displayEditModal = () => {
        fname.value = onlineUser.firstname
        lname.value = onlineUser.lastname
        email.value = onlineUser.email
        phone.value = onlineUser.phoneNo
    }

    // Save edited details
    const edit = () => {
        onlineUser.firstname = fname.value
        onlineUser.lastname = lname.value
        onlineUser.email = email.value
        onlineUser.phoneNo = phone.value
        updateUser = allUsers.find((item, index) => item.accountnumber == onlineUser.accountnumber)
        if (onlineUser.password == pass.value) {
            updateUser.firstname = onlineUser.firstname
            updateUser.lastname = onlineUser.lastname
            updateUser.email = onlineUser.email
            updateUser.phone = onlineUser.phone
            updateUser.bvn = onlineUser.bvn
            localStorage.setItem("usersList", JSON.stringify(allUsers))
            localStorage.setItem('currentUser', JSON.stringify(onlineUser))
            alert("Changes Saved")
            window.location = "profile.html"
        } else {
            incorrectPassword.innerText = "Incorrect Password"
            pass.classList.add("is-invalid")
        }
    }

    // display BVN to users
    const viewBvn = () => {
        if (confirmBvn.value == onlineUser.password) {
            dispBvn.innerText = `BVN: ${onlineUser.bvn}`
            confirmBvn.value = ""
        } else {
            confirmBvn.classList.add("is-invalid")
            invalidpassword.innerHTML = "Incorrect password"
            alert("Incorrect Password")
            confirmBvn.value = ""

        }
    }