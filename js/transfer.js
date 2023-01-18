var allTransfer = []
var onlineUserTransactionDetails
var debitTransactions
var creditTransactions
let correctAccountNumber = false
let validAmount = false
let pinTyped = false
let findUser
let transactionId = (Math.floor(Math.random() * 10000000000 - 90000000000) + 1000000000) * -1
sendMoney.disabled = true
let enteredPin = ""

if (localStorage.usersList && localStorage.currentUser) {
    allUsers = JSON.parse(localStorage.getItem("usersList"))
    onlineUser = JSON.parse(localStorage.getItem("currentUser"))
    allTransfer = JSON.parse(localStorage.getItem("transferList"))
    console.log(allUsers)
    console.log(onlineUser)
    console.log("allTransfer")
    console.log(allTransfer)
}

transferTo.addEventListener("input", () => {
    let findUser = allUsers.find((item, index) => item.accountnumber == transferTo.value && item.accountnumber !== onlineUser.accountnumber)
    if (findUser) {
        accountName.innerText = `${findUser.firstname} ${findUser.lastname}`
        invalidUser.innerText = ""
        invalidUser.innerText = ""
        correctAccountNumber = true
    } else {
        invalidUser.innerText = "Invalid user"
        accountName.innerText = ""
        correctAccountNumber = false
    }
    if (correctAccountNumber && validAmount) {
        sendMoney.disabled = false
    }
    if (!correctAccountNumber || !validAmount) {
        sendMoney.disabled = true
    }
})

transferAmount.addEventListener("input", () => {
    if (transferAmount.value >= 100) {
        if (onlineUser.accountbalance < transferAmount.value) {
            insufficientBalance.innerText = `Insufficient Balance`
            sendMoney.classList.add('p-4')
            sendMoney.innerText = ""
            validAmount = false
        } else {
            insufficientBalance.innerText = ""
            validAmount = true
        }
        if (correctAccountNumber == true && validAmount == true) {
            sendMoney.disabled = false
            sendMoney.innerHTML = `Transfer &#8358;${transferAmount.value}`
            sendMoney.classList.remove('p-4')
        } if (correctAccountNumber == false || validAmount == false) {
            sendMoney.disabled = true
            sendMoney.innerText = ""
        }
    } else {
        sendMoney.classList.add('p-4')
        sendMoney.innerText = ""
        sendMoney.disabled = true
        validAmount = false
    }
    if (transferAmount.value < 100) {
        insufficientBalance.innerHTML = "You can only transfer from &#8358;100 upwards"
    }
})

const confirmRecieverDetails = () => {
    findUser = allUsers.find((item, index) => item.accountnumber == transferTo.value && item.accountnumber !== onlineUser.accountnumber)
    transferPrompt.innerHTML = `You are about to transfer &#8358; <span class="fw-bold">${transferAmount.value}</span> to <br><span class="fw-bold">${findUser.firstname} ${findUser.lastname} (${findUser.accountnumber})</span>`
}


btnSendMoney.disabled = true
const typePin = (e) => {
    if (pinTyped == false && pinDigitOne.innerText == "") {
        pinDigitOne.innerText = (e.target.innerText)
        enteredPin += pinDigitOne.innerText
        console.log(enteredPin)
        setTimeout(() => {
            pinDigitOne.innerText = "•"
        }, 300);
        btnSendMoney.disabled = true
        pinTyped = true
    } else if (pinTyped == true && pinDigitTwo.innerText == "") {
        pinDigitTwo.innerText = (e.target.innerText)
        enteredPin += pinDigitTwo.innerText
        setTimeout(() => {
            pinDigitOne.innerText = "•"
            pinDigitTwo.innerText = "•"
        }, 300);
        btnSendMoney.disabled = true
    } else if (pinTyped == true && pinDigitThree.innerText == "") {
        pinDigitThree.innerText = (e.target.innerText)
        enteredPin += pinDigitThree.innerText
        setTimeout(() => {
            pinDigitOne.innerText = "•"
            pinDigitTwo.innerText = "•"
            pinDigitThree.innerText = "•"
        }, 300);
        btnSendMoney.disabled = true
    } else if (pinTyped == true && pinDigitFour.innerText == "") {
        pinDigitFour.innerText = (e.target.innerText)
        enteredPin += pinDigitFour.innerText
        setTimeout(() => {
            pinDigitOne.innerText = "•"
            pinDigitTwo.innerText = "•"
            pinDigitThree.innerText = "•"
            pinDigitFour.innerText = "•"
        }, 300);
        btnSendMoney.disabled = true
        console.log(enteredPin)
    }
    if (pinDigitOne.innerText !== "" && pinDigitTwo.innerText !== "" && pinDigitThree.innerText !== "" && pinDigitFour.innerText !== "") {
        btnSendMoney.disabled = false
    }
}

const clearPin = () => {
    if (pinDigitOne.innerText !== "" && pinDigitTwo.innerText == "" && pinDigitThree.innerText == "" && pinDigitFour.innerText == "") {
        pinDigitOne.innerText = ""
        enteredPin = ""
        console.log(enteredPin)
        pinTyped = false
        btnSendMoney.disabled = true
    } else if (pinDigitOne.innerText !== "" && pinDigitTwo.innerText !== "" && pinDigitThree.innerText == "" && pinDigitFour.innerText == "") {
        pinDigitTwo.innerText = ""
        enteredPin = enteredPin.slice(0, 1)
        console.log(enteredPin)
        btnSendMoney.disabled = true
    } else if (pinDigitOne.innerText !== "" && pinDigitTwo.innerText !== "" && pinDigitThree.innerText !== "" && pinDigitFour.innerText == "") {
        pinDigitThree.innerText = ""
        enteredPin = enteredPin.slice(0, 2)
        console.log(enteredPin)
        btnSendMoney.disabled = true
    } else if (pinDigitOne.innerText !== "" && pinDigitTwo.innerText !== "" && pinDigitThree.innerText !== "" && pinDigitFour.innerText !== ""){
        pinDigitFour.innerText = ""
        enteredPin = enteredPin.slice(0, 3)
        console.log(enteredPin)
        btnSendMoney.disabled = true
    }
}

const transfer = () => {
    if (enteredPin == onlineUser.transactionPin) {
        console.log("userfound")
        console.log(findUser.accountbalance)
        console.log(transferAmount.value)
        findUser.accountbalance += Number(transferAmount.value)
        console.log(findUser.accountbalance)
        onlineUser.accountbalance = ((onlineUser.accountbalance) - (transferAmount.value))
        console.log(onlineUser.accountbalance)
        updateAllUsers = allUsers.find((item, index) => item.accountnumber == onlineUser.accountnumber)
        updateAllUsers.accountbalance = onlineUser.accountbalance
        let date = new Date()

        var transferred = {
            amountTransferred: transferAmount.value,
            amountRecieved: transferAmount.value,
            recieverAccountNumber: findUser.accountnumber,
            recieverFirstname: findUser.firstname,
            recieverLastname: findUser.lastname,
            senderAccountNumber: onlineUser.accountnumber,
            senderFirstname: onlineUser.firstname,
            senderLastname: onlineUser.lastname,
            dateSent: date.toLocaleDateString(),
            timeSent: date.toLocaleTimeString(),
            transactionId,
            remark: remark.value
        }
        if (allTransfer) {
            allTransfer.push(transferred)
        } else {
            allTransfer = []
            allTransfer.push(transferred)
        }
        localStorage.setItem("usersList", JSON.stringify(allUsers))
        localStorage.setItem("transferList", JSON.stringify(allTransfer))
        localStorage.setItem('currentUser', JSON.stringify(onlineUser))
        pinTyped = false
        enteredPin = ""
        pinDigitOne.innerText = ""
        pinDigitTwo.innerText = ""
        pinDigitThree.innerText = ""
        pinDigitFour.innerText = ""
    } else {
        console.log(enteredPin)
        console.log(onlineUser.transactionPin)
        pinTyped = false
        enteredPin = ""
        pinDigitOne.innerText = ""
        pinDigitTwo.innerText = ""
        pinDigitThree.innerText = ""
        pinDigitFour.innerText = ""
        console.log(onlineUser)
        alert("Incorrect Transaction Pin")
        // incorrectPin.innerText ="Incorrect Pin"
    }
}