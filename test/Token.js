const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

const { deployTokenFixture, transferFromTokenFixture } = require("./helpers/TokenFixtures")

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 18)
}

describe("Token", () => {
  describe("Deployment", () => {
    const NAME = "Dapp University"
    const SYMBOL = "DAPP"
    const DECIMALS = 18
    const TOTAL_SUPPLY = tokens("1000000")
  
    it("has correct name", async () => {
      const { token } = await loadFixture(deployTokenFixture)
      expect(await token.name()).to.equal(NAME)
    })
  
    it("has correct symbol", async () => {
      const { token } = await loadFixture(deployTokenFixture)
      expect(await token.symbol()).to.equal(SYMBOL)
    })
  
    it("has correct decimals", async () => {
      const { token } = await loadFixture(deployTokenFixture)
      expect(await token.decimals()).to.equal(DECIMALS)
    })
  
    it("has correct total supply", async () => {
      const { token } = await loadFixture(deployTokenFixture)
      expect(await token.totalSupply()).to.equal(TOTAL_SUPPLY)
    })
  
    it("assigns total supply to deployer", async () => {
      const { token, deployer } = await loadFixture(deployTokenFixture)
      expect(await token.balanceOf(deployer.address)).to.equal(TOTAL_SUPPLY)
    })
  })

  describe("Sending Tokens", () => {
    const AMOUNT = tokens(100)

    describe("Sucess", () => {
      it("transfers token balances", async () => {
        const { token, deployer, receiver } = await loadFixture(deployTokenFixture)
  
        const transaction = await token.connect(deployer).transfer(receiver.address, AMOUNT)
        await transaction.wait()
  
        expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900))
        expect(await token.balanceOf(receiver.address)).to.equal(AMOUNT)
      })
  
      it("emits a transfer event", async () => {
        const { token, deployer, receiver } = await loadFixture(deployTokenFixture)
  
        const transaction = await token.connect(deployer).transfer(receiver.address, AMOUNT)
        await transaction.wait()
  
        await expect(transaction).to.emit(token, "Transfer")
          .withArgs(deployer.address, receiver.address, AMOUNT)
      })
    })

    describe("Failure", () => {
      it("rejects insufficient balances", async () => {
        const { token, deployer, receiver } = await loadFixture(deployTokenFixture)
  
        const INVALID_AMOUNT = tokens(100000000)
        const ERROR = "Token: Insufficent Funds"
  
        await expect(token.connect(deployer).transfer(receiver.address, INVALID_AMOUNT))
          .to.be.revertedWith(ERROR)
      })
  
      it("rejects invalid recipient", async () => {
        const { token, deployer, receiver } = await loadFixture(deployTokenFixture)
  
        const INVALID_ADDRESS = "0x0000000000000000000000000000000000000000"
        const ERROR = "Token: Recipient is address 0"
    
        await expect(token.connect(deployer).transfer(INVALID_ADDRESS, AMOUNT))
          .to.be.revertedWith(ERROR)
      })
    })
  })

  describe("Approving Tokens", () => {
    const AMOUNT = tokens(100)

    describe("Sucess", () => {
      it("allocates an allowance for delegated token spending", async () => {
        const { token, deployer, exchange } = await loadFixture(deployTokenFixture)
  
        const transaction = await token.connect(deployer).approve(exchange.address, AMOUNT)
        await transaction.wait()
  
        expect(await token.allowance(deployer.address, exchange.address)).to.equal(AMOUNT)
      })

      it("emits an approval event", async () => {
        const { token, deployer, exchange } = await loadFixture(deployTokenFixture)
  
        const transaction = await token.connect(deployer).approve(exchange.address, AMOUNT)
        await transaction.wait()
  
        await expect(transaction).to.emit(token, "Approval")
          .withArgs(deployer.address, exchange.address, AMOUNT)
      })
    })

    describe("Failure", () => {
      it("rejects invalid spenders", async () => {
        const { token, deployer } = await loadFixture(deployTokenFixture)
  
        const INVALID_ADDRESS = "0x0000000000000000000000000000000000000000"
        const ERROR = "Token: Recipient is address 0"
    
        await expect(token.connect(deployer).approve(INVALID_ADDRESS, AMOUNT))
          .to.be.revertedWith(ERROR)
      })
    })
  })

  describe("Delegated Token Transfers", () => {
    const AMOUNT = tokens(100)

    describe("Sucess", () => {
      it("transfers token balances", async () => {
        const { token, deployer, receiver } = await loadFixture(transferFromTokenFixture)
        expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900))
        expect(await token.balanceOf(receiver.address)).to.equal(AMOUNT)
      })

      it("resets the allowance", async () => {
        const { token, deployer, exchange } = await loadFixture(transferFromTokenFixture)
        expect(await token.allowance(deployer.address, exchange.address)).to.equal(0)
      })

      it("emits a transfer event", async () => {
        const { token, deployer, receiver, transaction } = await loadFixture(transferFromTokenFixture)
        await expect(transaction).to.emit(token, "Transfer")
          .withArgs(deployer.address, receiver.address, AMOUNT)
      })
    })

    describe("Failure", () => {
      it("rejects insufficeint amounts", async () => {
        const { token, deployer, receiver, exchange } = await loadFixture(transferFromTokenFixture)
  
        const INVALID_AMOUNT = tokens(100000000)
        const ERROR = "Token: Insufficent Funds"
    
        await (await token.connect(deployer).approve(exchange.address, INVALID_AMOUNT)).wait()
        await expect(token.connect(exchange).transferFrom(deployer.address, receiver.address, INVALID_AMOUNT))
          .to.be.revertedWith(ERROR)
      })

      it("Rejects insufficient allowance", async () => {
        const { token, deployer, receiver, exchange } = await loadFixture(deployTokenFixture)

        const ALLOWANCE_AMOUNT = tokens(100)
        const INVALID_AMOUNT = tokens(1000000)
        const ERROR = "Token: Insufficient allowance"

        await (await token.connect(deployer).approve(exchange.address, ALLOWANCE_AMOUNT)).wait()
        await expect(token.connect(exchange).transferFrom(deployer.address, receiver.address, INVALID_AMOUNT))
          .to.be.revertedWith(ERROR)
      })
    })
  })
})
