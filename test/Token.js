const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const {deployTokenFixture} = require("./helpers/TokenFixtures");

const tokens = (n) => {
    return ethers.parseUnits(n.toString(), 18)
}

//Testing SOL file
describe("Token", () => {

    const NAME = "Dapp University"
    const SYMBOL = "DAPP"
    const DECIMALS = 18
    const TOTAL_SUPPLY = tokens(1000000)
    
    it("has correct name", async () => {
        const {token} = await loadFixture(deployTokenFixture);
        expect(await token.name()).to.equal(NAME)
    })

    it("has correct symbol", async () => {
        const {token} = await loadFixture(deployTokenFixture)
        expect(await token.symbol()).to.equal(SYMBOL)
    })

    it("has correct decimals", async () => {
        const {token} = await loadFixture(deployTokenFixture)
        expect(await token.decimals()).to.equal(DECIMALS)
    })

    it("has correct total supply", async () => {
        const {token} = await loadFixture(deployTokenFixture)
        expect(await token.totalSupply()).to.equal(TOTAL_SUPPLY)
    })
    it("assigns total supply to deployer", async () => {
        const {token, deployer} = await loadFixture(deployTokenFixture)
        expect(await token.balanceOf(deployer.address)).to.equal(TOTAL_SUPPLY)
    })
})