import {Keypair, Connection, LAMPORTS_PER_SOL} from "@solana/web3.js"

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

async function requestAirdrop(){
    try{
        //gen a wallet keypair
        const keypair = Keypair.generate();
        console.log("Wallet", keypair.publicKey.toBase58());

        //chelk bal
        const initialBalance = await connection.getBalance(keypair.publicKey);
        console.log("Balance: ", initialBalance);

        // add 1 SOL to the wallet 
        const airdropRequest = await connection.requestAirdrop(
            keypair.publicKey,
            1 * LAMPORTS_PER_SOL
        );
        console.log("Confirnming Tx...");

        const afterBalance = await connection.getBalance(keypair.publicKey);
        console.log("Balance: ", afterBalance);
        

    } catch(e){
        console.error("❌ Error requesting airdrop:", e);
    }
}

requestAirdrop();