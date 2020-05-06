// Simple object containing all of the required urls in order to
// navigate puppeteer through all required buttons, screens etc.
const urls = {
    fireflycloud: "https://trinity.fireflycloud.net/",
    microsoftSignIn: "https://login.microsoftonline.com/common/wsfed?wa=wsignin1.0&wtrealm=https%3a%2f%2fo365-integration.fireflycloud.net&wctx=rm%3d0%26id%3d%26ru%3d%252fHrdAuthentication%252fLogin%253fReturnUrl%253d%25252f%25253fmode%25253dmaplogin%252526prelogin%25253dhttps%2525253a%2525252f%2525252ftrinity.fireflycloud.net%2525252f%252526tokenId%25253d153154394%252526secret%25253d6IcU2tfOOfM0IZpL82jZLffJ1vyCNQCjdNsW8OSXFdnTGPKfD1rE_jZt4pgZNJWOnZ3navXOzzabT7uU0%252526host%25253dtrinity.fireflycloud.net%2526mode%253dmaplogin%2526prelogin%253dhttps%25253a%25252f%25252ftrinity.fireflycloud.net%25252f%2526tokenId%253d153154394%2526secret%253d6IcU2tfOOfM0IZpL82jZLffJ1vyCNQCjdNsW8OSXFdnTGPKfD1rE_jZt4pgZNJWOnZ3navXOzzabT7uU0%2526host%253dtrinity.fireflycloud.net&wct=2020-04-28T16%3a10%3a04Z&whr=",
    registrationForm: "https://forms.office.com/Pages/ResponsePage.aspx?id=bhM764t7nk6if6PnXtbqzEDUloFuTm1KhaaYDadS2OpURDMyUEJPUEhMWEg1NzhNSkdPUFFUNDBOVi4u"    
}

// Exports
module.exports = urls