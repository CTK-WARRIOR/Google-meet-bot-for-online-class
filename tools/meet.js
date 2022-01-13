const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const { promises } = require("dns")

module.exports = class Meet {
    constructor({path} = {}) {
        this.path = path
        this.meetings = []
    }

    /**
     * 
     * @param {string} url 
     * @returns {void}
     */
    async openClass(url, teacher) {
        const options = new firefox.Options();
        options.setProfile(this.path)

        const driver = await new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .build()

        await driver.get(url);

        try {
            await driver.wait(until.elementLocated(By.className("ZB88ed")), 30000)
            await this.sleep(3000)
            
            driver.findElement(By.className("ZB88ed")).click()
            driver.findElement(By.className("GOH7Zb")).click()
            driver.findElement(By.className("uArJ5e UQuaGc Y5sE8d uyXBBb xKiqt")).click()

            await this.sleep(3000)
            await driver.wait(until.elementLocated(By.className("r6xAKc")), 30000);
            await driver.findElements(By.className("r6xAKc"))
                .then((buttons) => buttons[1].click())

        } catch (err) {
            await this.exitClass({ driver, teacher, url })
            throw err;
        }

        this.log(`Joined the meeting by ${teacher}`)
        this.meetings.push({ url, teacher, driver })
    }


    /**
     * 
     * @param {object} meeting 
     * @returns {array}
     */
    async getMemberList(meeting) {
        const { driver } = meeting

        const elements = await driver.findElements(By.className("kvLJWc"))
        const members = await Promise.all(elements.map(x => {
            return x.getText()
        }))

        return members;
    }

    /**
     * 
     * @param {object} meeting
     * @returns {void} 
     */
    async exitClass(meeting) {
        const { driver } = meeting
        await driver.quit()

        this.meetings = this.meetings.filter(x => x.url !== meeting.url)
    }

    /**
     * 
     * @param {number} ms 
     * @returns {void}
     */
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * 
     * @param {string} content 
     * @returns {void}
     */
    log(content) {
        return console.log(`[${new Date().toLocaleTimeString()}] ${content}`)
    }

    /**
     * @returns {boolean} 
     */
    async isConnected() {
        return !!await promises.resolve('google.com').catch(()=>{});
    }

}