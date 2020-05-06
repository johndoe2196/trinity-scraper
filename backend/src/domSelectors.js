// Simple object containing all of the required DOM selectors in order to
// navigate puppeteer through all required buttons, screens etc. Selector names
// are chosen according to their css selector, their function, or their id etc.
const selectors = {
    signInForm: "#i0281",
    emailInput: "#i0116",
    loginDescription: "#loginDescription",
    passwordInput: "#i0118",
    accountTypeSelector: "#aadTile",
    displayName: "#displayName",
    submitButton: "#idSIButton9",
    formDropdown: "#e2 > div > i",
    formSelect: form => {
        const formArray = [
            "U6BJP", "U6DPR", "U6DWC", "U6FXD", "U6KBM", "U6OJH", "U6RCB",
            "U6RDM", "U6RMB", "U6RMG", "U6SZT", "U6TAU", "U6TSL", "U6VCS",
            "L6BP", "L6CJW", "L6CSS", "L6JES", "L6JW", "L6MFB", "L6MM",
            "L6RMH", "L6RP", "L6SOO", "L6SWC", "L6TJD", "L6TMS", "L6TXE"    
        ]
        const formIndex = formArray.indexOf(form) + 1
        return `#e2 > ul > li:nth-child(${formIndex})`
    },
    workingTodayRadio: "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div:nth-child(2) > div:nth-child(2) > div.office-form-question-content.office-form-theme-focus-border > div.office-form-question-element > div > div:nth-child(1) > div > label > input[type=radio]",
    emailConfirmationCheckbox: "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-email-receipt-checkbox > div > div > label > input[type=checkbox]",
    completeRegistrationButton: "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-button-container > div > button > div",
    registrationConfirmationDiv: "#form-container > div > div > div.office-form-content.office-form-page-padding > div > div.office-form.thank-you-page-content > div:nth-child(1) > div.thank-you-page-container.thank-you-page-message"
}

// Exports
module.exports = selectors