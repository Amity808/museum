const hre = require('hardhat')

async function main() {
    const factoryContract = hre.ethers.getContractFactory("MuseumFactory");

    const deploy = (await factoryContract).deploy();
    (await deploy).waitForDeployment();
    console.log("Contract deployed to:", (await deploy).target);
}


main().then(()  => {
    console.log("success")
}).catch((e) => {
    console.error("error", e)
})