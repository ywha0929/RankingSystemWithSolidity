const EventEmitter = require('events')
class sendLowLevelTx extends EventEmitter {
  command (address, value, callData, callback) {
    this.api.perform((client, done) => {
      this.api.execute(function (value) {
        browser.waitForElementVisible("deployAndRunLLTxSendTransaction", 1000)
        .getElementById("deployAndRunLLTxCalldata").value = callData
        .waitForElementVisible("deployAndRunTransferValue")
        .getElementById("deployAndRunTransferValue").value = value
        .click('deployAndRunLLTxSendTransaction', callback)
        .done()
        if (callback) {
          callback.call(this.api)
        }
        this.emit('complete')
      })
    })
    return this
  }
}

module.exports = sendLowLevelTx
