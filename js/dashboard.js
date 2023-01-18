var allUsers = []
var onlineUser = {}
var allTransfer = []
var hideBalance = false
var onlineUserTransactionDetails = []
var debitTransactions
var creditTransactions


if (localStorage.usersList && localStorage.currentUser) {
    allUsers = JSON.parse(localStorage.getItem("usersList"))
    onlineUser = JSON.parse(localStorage.getItem("currentUser"))
    if (localStorage.transferList) {
        allTransfer = JSON.parse(localStorage.getItem("transferList"))
        onlineUserTransactionDetails = allTransfer.filter((item, index) => item.senderAccountNumber == onlineUser.accountnumber || item.recieverAccountNumber == onlineUser.accountnumber)
        debitTransactions = onlineUserTransactionDetails.filter((item, index) => item.senderAccountNumber == onlineUser.accountnumber)
        creditTransactions = onlineUserTransactionDetails.filter((item, index) => item.recieverAccountNumber == onlineUser.accountnumber)
        console.log("onlineUserTransDetails")
        console.log(onlineUserTransactionDetails)
    } else {
        onlineUserTransactionDetails = []
    }
    console.log(onlineUser)
    console.log("All Users")
    console.log(allUsers)
    console.log("All Transfer Made")
    console.log(allTransfer)
    console.log(debitTransactions)
    displayUserDetails()
} else {
    onlineUser = {}
    window.location = "index.html"
}

function displayUserDetails() {
    helloUser.innerHTML = `Hello, ${onlineUser.firstname}`
    accountBalance.innerHTML = `${onlineUser.accountbalance}.00`
    dispAccNo.innerText = `${onlineUser.accountnumber}`
    if (onlineUserTransactionDetails.length > 0) {
        onlineUserTransactionDetails.reverse()
        onlineUserTransactionDetails.map((item, index) => {
            if (item.senderAccountNumber == onlineUser.accountnumber) {
                dispHistory.innerHTML += `                            
                <div class="p-3 mt-3 bg-light rounded" style="border-left:2px solid red"> 
                     <div class="d-flex justify-content-between">
                         <small class="fw-bold" style="color:#590140">Transfer &#8358;${item.amountRecieved} to ${item.recieverFirstname}</small>
                         <small class="fw-bold" style="color:#590140">${item.dateSent} ${item.timeSent}</small>
                     </div>
                     <details>
                         <div class="d-flex justify-content-between">
                             <span >STATUS:</span> 
                             <span class="fw-bold">SUCCESS</span>
                         </div>
                         <div class="d-flex justify-content-between">
                             <span class="">Transferred to:</span>
                             <span class="fw-bold"> ${item.recieverFirstname} ${item.recieverLastname}<span>
                         </div>
                         <div class="d-flex justify-content-between"> 
                             <span class="">Account Number:</span>
                             <span class="fw-bold">${item.recieverAccountNumber}</span>
                         </div>
                         <div class="d-flex justify-content-between">
                             <span class="">Amount Transferred:</span>
                             <span class="fw-bold">&#8358;${item.amountTransferred}.00</span>
                         </div>
                         <div class="d-flex justify-content-between">
                             <span class="" style="color:#590140">Transaction ID:</span>
                             <span class="fw-bold" style="color:#590140">${item.transactionId}000</span>
                         </div>
                     </details>
                </div>
                `
            } else {
                dispHistory.innerHTML += `
                <div class="p-3 mt-3 rounded bg-light" style="border-left:2px solid green">
                <div class="d-flex justify-content-between">
                    <small class="fw-bold" style="color:#590140">Recieved &#8358;${item.amountRecieved} from ${item.senderFirstname}</small>
                    <small class="fw-bold" style="color:#590140">${item.dateSent} ${item.timeSent}</small>
                </div>
                <details class="">
                    <div class="d-flex justify-content-between">
                        <span>STATUS:</span> 
                        <span class="fw-bold">SUCCESS</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span >Recieved from:</span>
                        <span class="fw-bold"> ${item.senderFirstname} ${item.senderLastname}<span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span>Account Number:</span>
                        <span class="fw-bold">${item.senderAccountNumber}</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span>Amount Recieved:</span>
                        <span class="fw-bold">&#8358;${item.amountRecieved}.00</span>
                    </div>
                    <div class="d-flex justify-content-between" >
                        <span>Transaction ID:</span>
                        <span>${item.transactionId}000</span>
                    </div>
                </details>
            </div>`
            }
        })
        console.log("debitTransactions")
        console.log(debitTransactions)
        console.log("creditTransactions")
        console.log(creditTransactions)
        // debitTransactions.reverse()
        // creditTransactions.reverse()
    }
    if (onlineUserTransactionDetails.length == 0) {
        dispHistory.innerHTML = `No recent History`
    }
}


// Hide and displayUserDetails user account balance
const displayBalance = () => {
    if (hideBalance == false) {
        accountBalance.innerHTML = "******"
        dispBalance.innerHTML = `<i class="fa-solid fa-eye-slash btn text-light"></i>`
        hideBalance = true
    } else {
        accountBalance.innerHTML = `${onlineUser.accountbalance}.00`
        hideBalance = false
        dispBalance.innerHTML = `<i class="fa-solid fa-eye btn text-light"></i>`
        console.log(onlineUser.accountbalance)
    }
}   

//copy account number
copyAccNo.addEventListener("click", () => {
    navigator.clipboard.writeText(dispAccNo.innerText)
})
