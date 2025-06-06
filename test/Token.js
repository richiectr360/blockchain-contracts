const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const {deployTokenFixture} = require("./helpers/TokenFixtures");

const tokens = (n) => {
    return ethers.parseUnits(n.toString(), 18)
}

//Testing SOL file
describe("Token", () => {
    
    it("has correct name", async () => {
        const {token} = await loadFixture(deployTokenFixture);
        expect(await token.name()).to.equal("Dapp University")
    })

    it("has correct symbol", async () => {
        const {token} = await loadFixture(deployTokenFixture)
        expect(await token.symbol()).to.equal("DAPP")
    })

    it("has correct decimals", async () => {
        const {token} = await loadFixture(deployTokenFixture)
        expect(await token.decimals()).to.equal(18)
    })

    it("has correct total supply", async () => {
        const {token} = await loadFixture(deployTokenFixture)
        expect(await token.totalSupply()).to.equal(tokens(1000000))
    })
})

