var imageFile
var imageUrl
var onlineUser
var allUsers
const generateImageUrl = new FileReader()

const editDetailsModal = document.getElementById('editDetailsModal')
const uploadedPhoto1 = document.getElementById('fname')

/* Profile details page */
if (localStorage.currentUser && localStorage.usersList) {
    allUsers = JSON.parse(localStorage.getItem("usersList"))
    onlineUser = JSON.parse(localStorage.getItem("currentUser"))
    dispAccName.innerText = `${onlineUser.firstname} ${onlineUser.lastname}`
    console.log(onlineUser)
    if (onlineUser.profilePhoto !== "") {
        displayProfilePhoto()
    }else{
        profilePhoto.src = "../images/user-icon.png"
    }
    console.log(onlineUser)
    console.log(allUsers)
    // imageUrl = localStorage.getItem("thumbnail")
    // profilePhoto.src = onlineUser.profilePhoto
}else{
    window.location="signup.html"
}
// alert("Hello")



// Display user details in inputs
const displayEditModal = () => {
    email.value = onlineUser.email
    phone.value = onlineUser.phoneNo
}

// Save edited details
const edit = () => {
    onlineUser.email = email.value
    onlineUser.phoneNo = phone.value
    updateUser = allUsers.find((item, index) => item.accountnumber == onlineUser.accountnumber)
    if (onlineUser.password == pass.value) {
        updateUser.email = onlineUser.email
        updateUser.phone = onlineUser.phone
        updateUser.bvn = onlineUser.bvn
        localStorage.setItem("usersList", JSON.stringify(allUsers))
        localStorage.setItem('currentUser', JSON.stringify(onlineUser))
        window.location = "profile.html"
    } else {
        incorrectPassword.innerText = "Incorrect Password"
        pass.classList.add("is-invalid")
    }
}

// display BVN to user
dispBvn.addEventListener("click", () => {
    dispBvn.innerText = `BVN ${onlineUser.bvn}`
    setTimeout(() => {
        dispBvn.innerText = `View my BVN`
    }, 5000);
})


// Change profile photo
uploadedPhoto.addEventListener("change", (event) => {
    imageFile = uploadedPhoto.files[0]
    generateImageUrl.readAsDataURL(imageFile)
})

const updateDP = () => {
    onlineUser.profilePhoto = generateImageUrl.result
    updateUser = allUsers.find((item, index) => item.accountnumber == onlineUser.accountnumber)
    updateUser.profilePhoto = generateImageUrl.result
    console.log(generateImageUrl.result)
    localStorage.setItem('currentUser', JSON.stringify(onlineUser));
    console.log(allUsers)
    localStorage.setItem('usersList', JSON.stringify(allUsers));
    displayProfilePhoto()
}

function displayProfilePhoto() {
    if (onlineUser.profilePhoto !== "") {
        profilePhoto.src = onlineUser.profilePhoto
    } else {
        onlineUser.profilePhoto = ""
    }
    // imageUrl = localStorage.getItem()
}