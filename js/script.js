
window.onload = function () {
    let x = obj.logedUserDetailes();
    let user = JSON.parse(localStorage.getItem(x));
    document.getElementById("welcomeNote").innerHTML = ` welcome <span class="WelName">${user.fulName}</span>`


}
var debit = 0;
class Bank {
    createAccount() {
        let fulName = document.getElementById("fullName").value;
        let accNo = document.getElementById("AccountNumber").value;
        let password = document.getElementById("userPassword").value;
        let address = document.getElementById("address").value;
        let balance = 3000;

        if (fulName != "" || accNo != "" || password != "" || address != "") {
            if (this.validateAccount(accNo)) {
                alert("This account in already exists");

            } else {
                console.log(accNo);
                let account = {
                    fulName,
                    accNo,
                    password,
                    address,
                    balance,
                    transactions: [{ creditTransactions: [] }, { debitTransactions: [] }],
                }
                localStorage.setItem(accNo, JSON.stringify(account));
                alert("Account created Successfully");
                window.location = "login.html";
            }
        } else {
            alert("Please fill all feilds");
        }

    }
    validateAccount(acc) {
        if (acc in localStorage) {
            return true;
        } else {
            return false;
        }
    }
    accountSignin() {
        let accNo = document.getElementById("accNo").value;
        let pass = document.getElementById("loginPassword").value;
        console.log(accNo);
        if (accNo in localStorage) {

            let details = JSON.parse(localStorage.getItem(accNo));

            if (pass == details.password) {

                localStorage.setItem("session", accNo);

                window.location = "dashBord.html";


            } else {
                alert("Invalid password");
            }

        } else {
            alert("Account does not exist");
        }
    }
    checkBalance(bal, tranAmount) {
        if (bal >= tranAmount) {
            return true;
        } else {
            return false;
        }
    }

    getBalance(x) {

        let acDetails = JSON.parse(localStorage.getItem(x))
        return acDetails.balance;
    }

    BalanaceShow() {
        let x = localStorage.getItem("session");
        let details2 = JSON.parse(localStorage.getItem(x));
        document.getElementById("Balanace").innerHTML = details2.balance.toFixed(2);
    }
    BalanaceShowOf() {
        document.getElementById("Balanace").innerHTML = "";

    }
    transactionsHistoryShow() {
        let x = localStorage.getItem("session");
        let details2 = JSON.parse(localStorage.getItem(x));

        let DebitHtmlData = ""
        details2.transactions[1].debitTransactions.forEach(element => {
            let toAmount = element.amount.toFixed(2);
            let toAcc = element.to;
            let tranferTime = element.time;
            let combinedDate = element.date;
            let toUser = JSON.parse(localStorage.getItem(toAcc))
            let toUserName = toUser.fulName;


            //   console.log(userName);
            DebitHtmlData += `
        <tr>
        <th class="row ps-set">${toUserName}</th>
        <td>${toAcc} </td>
        <td class ="debitAmount">-${toAmount}</td>
        <td><h3 class="t-op-nextlvl label-tag">Sucess</h3></td>
        <td >${combinedDate} ${tranferTime} </td>

       </tr>`

            document.getElementById("htmlDisplay").innerHTML = DebitHtmlData;
        });
        let creditHtmlData = "";
        details2.transactions[0].creditTransactions.forEach(ele => {
            let fromAcc = ele.from;
            let fromAmount = ele.amout;
            let tranferTime = element.time;
            let combinedDate = element.date;
            let fromUser = JSON.parse(localStorage.getItem(fromAcc))
            let fromUserName = fromUser.fulName
            creditHtmlData += `
            <tr>
        <th class="row">${fromUserName}</th>
        <td >${fromAcc} </td>
        <td class="ps-3 creditAmount">${fromAmount}</td>
        <td><h3 class="t-op-nextlvl label-tag">Sucess</h3></td>
        <td >${combinedDate}  ${tranferTime} </td>
       </tr>`
            document.getElementById("htmlDisplaycredit").innerHTML = creditHtmlData;

        });
    }

    debitCount() {
        let x = localStorage.getItem("session");
        let userDetails = JSON.parse(localStorage.getItem(x));
        let debitCount = userDetails?.transactions[1]?.debitTransactions.length ?? 0;
        document.getElementById("debitCountShow").innerHTML = debitCount
    }
    debitCountShowOff() {
        document.getElementById("debitCountShow").innerHTML = "";
    }
    creditCount() {
        let x = localStorage.getItem("session");
        let userDetails = JSON.parse(localStorage.getItem(x));
        let creditCount = userDetails?.transactions[0]?.creditTransactions.length ?? 0;
        document.getElementById("creditCountShow").innerHTML = creditCount;
    }
    creditCountShowOff() {
        document.getElementById("creditCountShow").innerHTML = "";
    }
    debitCountShowOff() {
        document.getElementById("debitCountShow").innerHTML = "";
    }


    isLogedIn() {
        if ("session" in localStorage) {
            return true;
        } else {
            return false;
        }
    }
    logedUserDetailes() {
        let x = localStorage.getItem("session");
        return x;
    }

    // debitCount(ac,getToAcc){
    //     document.getElementById("debitCountShow").innerHTML = getToAcc.transactions[1].debitTransactions.length
    // }

    //     detilsShow(){
    //         let x = localStorage.getItem("session");
    // let details2 = JSON.parse(localStorage.getItem(x));  
    // // console.log(details2);  
    //    console.log(details2.balance);
    //    console.log(details2.fulName);

    // document.getElementById("name").innerHTML = "shabbeb";

    //     }
    transactions() {
        let tranAmount = document.getElementById('amount').value;
        let toAcc = document.getElementById("toAcc").value;
        let x = this.logedUserDetailes();
        let user = JSON.parse(localStorage.getItem(x));
        let getToAcc = JSON.parse(localStorage.getItem(toAcc));
        // console.log(user);

        // console.log(tranAmount);



        if (this.validateAccount(toAcc) && toAcc != user.accNo) {
            let bal = this.getBalance(x);
            let balanceCondition = this.checkBalance(bal, tranAmount);

            if (balanceCondition) {
                let tranAmountN = Number(tranAmount);
                console.log(tranAmountN);
                user.balance -= tranAmountN;
                getToAcc.balance += tranAmountN;
                //-------------------Transation time set -------------------------------


                // Set the timezone to Indian Standard Time (IST);

                const currentDate = new Date();

                // Create an instance of DateTimeFormat with 'en-IN' locale and time options
                const indianTimeFormatter = new Intl.DateTimeFormat('en-IN', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                    timeZone: 'Asia/Kolkata',
                });

                // Format the current date in Indian time
                const indianTime = indianTimeFormatter.format(currentDate);

                console.log(`Indian Time: ${indianTime}`);
                //-------Transation time set End ----------------------------------------------
                // set as date -------------------------------------------------------
                const currentDates = new Date();

                const currentDay = currentDates.getDate();
                const currentMonth = currentDates.getMonth() + 1; // Adding 1 because months are 0-indexed (0 is January)
                const currentYear = currentDates.getFullYear();

                // Extract the last two digits of the year
                const lastTwoDigitsOfYear = currentYear % 100;

                // Combine day, month, and the last two digits of the year
                const combinedDate = `${currentDay}-${currentMonth}-${lastTwoDigitsOfYear}`;

                console.log(`Combined Date: ${combinedDate}`);

                // set date end ===================================================

                this.view(user, tranAmountN, toAcc, getToAcc, indianTime, combinedDate)

            } else {
                alert("Insufficient balance");
            }

        } else {

            alert("You Enterd Wrong to account number ");

        }

    }

    view(ac, tranAmountN, toAcc, getToAcc, indianTime, combinedDate) {
        // console.log(ac);
        // console.log(toAcc);
        // console.log(tranAmountN);
        console.log(indianTime);
        getToAcc.transactions[0].creditTransactions.push({ from: ac.accNo, amout: tranAmountN, time: indianTime, date: combinedDate })

        ac.transactions[1].debitTransactions.push({ to: getToAcc.accNo, amount: tranAmountN, time: indianTime, date: combinedDate });
        this.balanceSetInLocalStorage(ac, getToAcc);
        this.display(ac, tranAmountN, getToAcc)
    }
    display(ac, tranAmount, toAcc, getToAcc) {
        console.log(ac.transactions);

    }

    balanceSetInLocalStorage(ac, getToAcc) {

        localStorage.setItem(ac.accNo, JSON.stringify(ac));
        localStorage.setItem(getToAcc.accNo, JSON.stringify(getToAcc));

        alert("Transation successfull");

        this.debitCount(ac, getToAcc);

    }

}


var obj = new Bank();

let url = window.location.pathname;

console.log(url);
let pathName = url.split("/");

console.log(pathName, "5555555");
let path = pathName.pop();
console.log(path);




if (path == "dashBord.html" && obj.isLogedIn() == false) {
    window.onpaint = window.location.replace("login.html");
} else {

}

if (path == "transactions.html" && obj.isLogedIn() == false) {
    window.onpaint = window.location.replace("login.html");
} else {

}

if (path == "TransationHistroy.html" && obj.isLogedIn() == false) {
    window.onpaint = window.location.replace("login.html");
} else {

}


// details page //

function trasationDetailsPage() {
    window.location = "TransationHistroy.html"
}
function trasationPage() {
    window.location = "transactions.html"
}
function homePage() {
    window.location = "dashBord.html"
}

function logOutButton() {
    if (confirm("You log out your account ") == true) {
        localStorage.removeItem("session");
        window.location = "login.html"

    } else {
        return false;
    }
}

function selColor() {
    document.getElementsByClassName("colorS").css = `<span class = "option1"></span>`
}


// ammount validation 
