// Custom imports
const selectors = require("./domSelectors")
const urls = require("./urls")
const authEncrypt = require("./authEncrypt")

// General imports
const puppeteer = require("puppeteer")

// Note: all waitFor actions in registration process are not strictly
// required - they simply provide a safety margin from the server throwing an
// error should the page/element required for action not yet be loaded
// Note: no error handling is performed here - the register endpoint calls this
// function and handles any errors it may throw, for example not finding a 
// requested selector
const register = async encryptedAuthString => {

    // Fetch and bundle auth details for user - at no point is the provided auth
    // data sanitized on the basis that only known and trusted users will have
    // access to this service, and any malicious data that could be injected into
    // the auth object is NEVER used to change parts of this server or data
    // within (not that there is an associated database anyway), and is ONLY
    // used to inject as strings into the registration service of the site being
    // scraped ... at this point it is the responsibility of the scraped site to
    // sanitize any input
    const auth = authEncrypt.decrypt(encryptedAuthString)

    // Launch browser
    const browser = await puppeteer.launch({ 
        headless: true, 
        args: ["--no-sandbox"] 
    })
    const page = await browser.newPage()

    // Navigate to sign in page
    await page.goto(urls.microsoftSignIn)    

    // Enter and submit user email
    await page.waitForSelector(selectors.signInForm)
    await page.waitFor(1000)
    await page.type(selectors.emailInput, auth.email)
    await page.click(selectors.submitButton)

    // Select account type - using try catch blocks, as some users do not require
    // this step?!?
    try {
        await page.waitForSelector(selectors.loginDescription, { 
            timeout: 1000 
        })
        await page.waitFor(1000)
        await page.click(selectors.accountTypeSelector)
    } catch(err) {
        const errObject = {
            user: auth.email,
            message: err.message
        }
        console.log(errObject)
    }

    // Enter and submit user password
    await page.waitForSelector(selectors.displayName)
    await page.waitFor(1000)
    await page.type(selectors.passwordInput, auth.password)
    await page.click(selectors.submitButton)

    // Re-direct to registration page for morning registration
    await page.goto(urls.registrationForm)

    // Fill out registration details
    await page.waitFor(1000)
    await page.click(selectors.formDropdown)
    await page.click(selectors.formSelect(auth.form))
    await page.click(selectors.workingTodayRadio)
    await page.click(selectors.emailConfirmationCheckbox)

    // Submit registration details and wait briefly before closing browser
    await page.click(selectors.completeRegistrationButton)
    await page.waitForSelector(selectors.registrationConfirmationDiv)
    await page.waitFor(1000)

    // Clean up, and close browser
    await page.close()
    await browser.close()

    // Log successful user registration to server console
    console.log(`Registered user ${auth.email}`)
}

// Exports
module.exports = register  