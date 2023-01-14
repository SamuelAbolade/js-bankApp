
/* Profile details page */
var imageUrl
if (localStorage.currentUser && localStorage.usersList) {
    allUsers = JSON.parse(localStorage.getItem("usersList"))
    onlineUser = JSON.parse(localStorage.getItem("currentUser"))
    dispAccName.innerText = `${onlineUser.firstname} ${onlineUser.lastname}`
    console.log(onlineUser)
    imageUrl = localStorage.getItem("thumbnail")
    profilePhoto.src = onlineUser.profilePhoto
}else{
    imageUrl
}

console.log(imageUrl)

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
// display BVN to user
dispBvn.addEventListener("click", () => {
    dispBvn.innerText = `BVN ${onlineUser.bvn}`
    setTimeout(() => {
        dispBvn.innerText = `View my BVN`
    }, 5000);
})
    var imageFile
    uploadedPhoto.addEventListener("change", (event)=>{
        imageFile = event.target.files[0]
        const generateUrl = new FileReader()
        generateUrl.readAsDataURL(imageFile)
        generateUrl.addEventListener('load', () => {
            onlineUser.profilePhoto = generateUrl.result
            console.log(generateUrl.result)
            localStorage.setItem('currentUser',JSON.stringify(onlineUser));
            window.location="profile.html"
            // profilePhoto.src = generateUrl.result
        });
    })

    $(document).ready(function(){
        $("#myBtn").click(function(){
          $("#updateProfilePhoto").modal();
        });
      });