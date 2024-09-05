const hre = require("hardhat");
const readline = require("readline");

// Crear una interfaz de readline para la entrada de la consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    // Obtener la dirección del contrato desde la consola
    const getContractAddress = () => {
        return new Promise((resolve) => {
            rl.question('Ingrese la dirección del contrato desplegado: ', (address) => {
                resolve(address);
            });
        });
    };

    // Obtener el ID del token desde la consola
    const getTokenId = () => {
        return new Promise((resolve) => {
            rl.question('Ingrese el ID del token que desea verificar: ', (id) => {
                resolve(id);
            });
        });
    };

    const contractAddress = await getContractAddress();
    const tokenId = await getTokenId();
    rl.close();

    // Obtener la fábrica del contrato
    const Mamus = await hre.ethers.getContractFactory("Mamus");

    // Conectar con el contrato desplegado
    const mamus = Mamus.attach(contractAddress);

    // Verificar el tokenURI y el propietario del token
    const uri = await mamus.tokenURI(tokenId);
    const owner = await mamus.ownerOf(tokenId);

    console.log(`Token ID: ${tokenId}`);
    console.log(`Token URI: ${uri}`);
    console.log(`Propietario del Token ID ${tokenId}: ${owner}`);
}

// Manejo de errores
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
