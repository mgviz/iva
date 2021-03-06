let config = require('../../nightwatch.conf.js');
module.exports = {
    'Login_Logout_test_success' : function (browser) {
        browser
            .url(config.URL_TEST)
            .windowMaximize()
            .waitForElementVisible('body', 1000)
            .assert.title('IVA')
            .assert.visible('a[id="loginButton"]')
            .pause(500)
            .click('a[id="loginButton"]')
            .pause(500)
            .assert.visible('input[id="opencgaUser"]')
            .setValue('input[id="opencgaUser"]', config.USER)
            .assert.visible('input[id="opencgaPassword"]')
            .setValue('input[id="opencgaPassword"]', config.PASSWORD)
            .assert.visible('button[type="submit"]')
            .click('button[type="submit"]')
            .waitForElementVisible('span[data-notify="message"]', 1000)
            .assert.containsText('span[data-notify="message"]', 'Welcome '+ config.USER +'. Your session is valid until')
            .pause(500)
            .saveScreenshot(config.imgpath(browser) + "login.png")
            .assert.visible('a[id="logoutButton"]')
            .assert.containsText('a[id="logoutButton"]', 'Logout')
            .click('a[id="logoutButton"]')
            .waitForElementVisible('a[id="loginButton"]',1000)
            .pause(500)
            .saveScreenshot(config.imgpath(browser) + "logout.png")
            .end()
    },
    'Login_test_fail' : function (browser) {
        browser
            .url(config.URL_TEST)
            .windowMaximize()
            .waitForElementVisible('body', 1000)
            .assert.title('IVA')
            .assert.visible('a[href$="#login"]')
            .pause(500)
            .click('a[href$="#login"]')
            .pause(500)
            .assert.visible('input[id="opencgaUser"]')
            .setValue('input[id="opencgaUser"]', config.USER + "FAIL")
            .assert.visible('input[id="opencgaPassword"]')
            .setValue('input[id="opencgaPassword"]', config.PASSWORD)
            .assert.visible('button[type="submit"]')
            .click('button[type="submit"]')
            .waitForElementVisible('span[data-notify="message"]', 1000)
            .assert.containsText('span[data-notify="message"]', 'The user id ' + config.USER + 'FAIL does not exist.')
            .pause(500)
            .saveScreenshot(config.imgpath(browser) + "loginFail.png")
            .end()
    }
}