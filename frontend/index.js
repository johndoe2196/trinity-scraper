// Custom imports
const authEncrypt = require("./src/authEncrypt")

const formSelect = document.getElementById("form")
const formArray = [
    "U6BJP", "U6DPR", "U6DWC", "U6FXD", "U6KBM", "U6OJH", "U6RCB",
    "U6RDM", "U6RMB", "U6RMG", "U6SZT", "U6TAU", "U6TSL", "U6VCS",
    "L6BP", "L6CJW", "L6CSS", "L6JES", "L6JW", "L6MFB", "L6MM",
    "L6RMH", "L6RP", "L6SOO", "L6SWC", "L6TJD", "L6TMS", "L6TXE"    
]
formArray.map(form => {
    const option = document.createElement("option")
    option.innerHTML = form
    option.setAttribute("value", form)
    formSelect.appendChild(option)
})

const encrypt = () => {
    const name = document.getElementById("name").value
    const accessNumber = document.getElementById("accessNumber").value
    const email = `${accessNumber}@trinity.croydon.sch.uk`
    const password = document.getElementById("password").value
    const form = document.getElementById("form").value.toUpperCase()
    if(accessNumber.match(/^\d{4}$/) && formArray.includes(form)) {
        const encryptedAuthString = authEncrypt.encrypt(email, password, form)
        const userObject = {
            name: name,
            number: accessNumber,
            encryptedAuthString: encryptedAuthString
        }
        return userObject
    } else {
        throw new Error("Invalid auth credentials supplied!")
    }
}

document.getElementById("encrypt").addEventListener("click", () => {
    const textField = document.getElementById("encryptedAuthString")
    try {
        const userObject = encrypt()
        document.getElementById("name").value = ""
        document.getElementById("accessNumber").value = ""
        document.getElementById("password").value = ""
        textField.innerHTML = userObject.encryptedAuthString
    } catch(err) {
        console.log(err)
        textField.innerHTML = "Invalid auth credentials supplied!"
    }    
})

document.getElementById("submit").addEventListener("click", () => {
    const textField = document.getElementById("encryptedAuthString")
})