    var allUsers = []
    var onlineUser = {}
    var allTransfer = []
    var turnOnDarkMode = false
    var hideBalance = false
    var onlineUserTransactionDetails
    var debitTransactions
    var creditTransactions


    if (localStorage.usersList && localStorage.currentUser) {
        allUsers = JSON.parse(localStorage.getItem("usersList"))
        onlineUser = JSON.parse(localStorage.getItem("currentUser"))
        if (localStorage.transferList) {
            onlineUserTransactionDetails = allTransfer.filter((item, index) => item.senderAccountNumber == onlineUser.accountnumber || item.recieverAccountNumber == onlineUser.accountnumber)
            allTransfer = JSON.parse(localStorage.getItem("transferList"))
            debitTransactions = JSON.parse(localStorage.getItem("debitTrans"))
            creditTransactions = JSON.parse(localStorage.getItem("creditTrans"))
            console.log("onlineUserTransDetails")
            console.log(onlineUserTransactionDetails)
        }
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
        if (localStorage.transferList) {
            onlineUserTransactionDetails = allTransfer.filter((item, index) => item.senderAccountNumber == onlineUser.accountnumber || item.recieverAccountNumber == onlineUser.accountnumber)
            console.log("dips")
            console.log(onlineUserTransactionDetails)

            if (onlineUserTransactionDetails !== null) {
                debitTransactions = onlineUserTransactionDetails.filter((item, index) => item.senderAccountNumber == onlineUser.accountnumber)
                creditTransactions = onlineUserTransactionDetails.filter((item, index) => item.recieverAccountNumber == onlineUser.accountnumber)
                console.log("debitTransactions")
                console.log(debitTransactions)
                console.log("creditTransactions")
                console.log(creditTransactions)
                debitTransactions.reverse()
                creditTransactions.reverse()
                if (debitTransactions !== "") {
                    debitTransactions.map((item) => {
                        console.log("f")
                        console.log(item.transactionId)
                        dispHistory.innerHTML +=
                            `
                            <div class="p-3 mt-3 bg-light rounded" style="border-left:2px solid red"> 
                                <div class="d-flex justify-content-between">
                                    <small class="fw-bold" style="color:#590140">Transfer to ${item.recieverFirstname}</small>
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
                    })
                }

                if (creditTransactions !== "") {
                    creditTransactions.map((item, index) => {
                        dispHistory.innerHTML +=
                            `
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
                        </div>
                        `
                    })
                }
            }
            if (onlineUserTransactionDetails == "") {
                dispHistory.innerHTML = `No recent History`

            }
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
    

    // checks if entered account number exists
    transferTo.addEventListener('input', () => {
        let findUser = allUsers.find((item) => item.accountnumber == (
            transferTo.value))
            // findUser
            findUser? accountName.innerText =`${findUser.firstname} ${findUser.lastname}` : accountName.innerText = ""
    })


    transferAmount.addEventListener('input', () => {
        if (onlineUser.accountbalance < transferAmount.value) {
            insufficientBalance.innerText = `Insufficient Balance`
        } else {
            insufficientBalance.innerText = ``
        }
    })


    const profileDetails = () => {
        userDetails.innerHTML = `
            <div class="">
                <div class="mt-4 d-flex justify-content-between" ><span class="fw-bold">ACCOUNT NAME:</span> <span class="text-uppercase">${onlineUser.firstname} ${onlineUser.lastname}</div>
                <div class="mt-4 d-flex justify-content-between" ><span class="fw-bold">ACCOUNT NUMBER:</span> <span class="text-uppercase"> ${onlineUser.accountnumber}</div>
                <div class="mt-4 d-flex justify-content-between" ><span class="fw-bold">EMAIL:</span> <span class="text-lowercase"> ${onlineUser.email}</div>
                    <div class="mt-4 d-flex justify-content-between" ><span class="fw-bold">PHONE NUMBER:</span> <span class="text-uppercase"> ${onlineUser.phoneNo}</div>
                <div class="mt-4 d-flex justify-content-between" ><small class="fw-bold">BANK VERIFICATION NUMBER(BVN):</small> <span class="text-uppercase"> ${onlineUser.bvn}</div>
                
            </div>
            
            `
    }
