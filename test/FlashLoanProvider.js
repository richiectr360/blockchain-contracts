const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

const { deployExchangeFixture, depositExchangeFixture } = require("./helpers/ExchangeFixtures")

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 18)
}

// This fixture is very small and we don't need it
// anywhere else, so we'll just leave it here.
async function flashLoanFixture() {
  const { tokens, exchange, accounts } = await loadFixture(depositExchangeFixture)

  const FlashLoanUser = await ethers.getContractFactory("FlashLoanUser")
  const flashLoanUser = await FlashLoanUser.connect(accounts.user1).deploy(await exchange.getAddress())

  return { tokens, exchange, accounts, flashLoanUser }
}

describe("FlashLoanProvider", () => {
  describe("Calling flashLoan from FlashLoanUser", () => {
    const AMOUNT = tokens(100)

    describe("Success", () => {
      it("Emits FlashLoanReceived event", async () => {
        const { tokens: { token0 }, accounts, flashLoanUser } = await loadFixture(flashLoanFixture)

        await expect(flashLoanUser.connect(accounts.user1).getFlashLoan(
          await token0.getAddress(),
          AMOUNT,
        )).to.emit(flashLoanUser, "FlashLoanReceived")
      })

      it("Emits FlashLoan event", async () => {
        const { tokens: { token0 }, exchange, accounts, flashLoanUser } = await loadFixture(flashLoanFixture)

        await expect(flashLoanUser.connect(accounts.user1).getFlashLoan(
          await token0.getAddress(),
          AMOUNT,
        )).to.emit(exchange, "FlashLoan")
      })
    })

    describe("Failure", () => {
      it("Rejects on insufficient funds", async () => {
        const { tokens: { token1 }, exchange, accounts } = await loadFixture(deployExchangeFixture)

        await expect(exchange.connect(accounts.user1).flashLoan(
          await token1.getAddress(),
          tokens(100),
          "0x"
        )).to.be.revertedWith("FlashLoanProvider: Insufficent funds to loan")
      })
    })
  })
})
