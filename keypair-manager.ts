import { Keypair } from "@solana/web3.js";
import { writeFileSync, readFileSync, existsSync } from "fs";

const KEYPAIR_FILE = "my-wallet.json";

export function saveKeypair(keypair: Keypair, filename: string = KEYPAIR_FILE) {
    try {
        // Convert secret key to array and save as JSON
        const secretKeyArray = Array.from(keypair.secretKey);
        writeFileSync(filename, JSON.stringify(secretKeyArray));
        console.log(`✅ Keypair saved to ${filename}`);
        console.log(`📍 Public Key: ${keypair.publicKey.toBase58()}`);
    } catch (error) {
        console.error("❌ Error saving keypair:", error);
    }
}

export function loadKeypair(filename: string = KEYPAIR_FILE): Keypair | null {
    try {
        if (!existsSync(filename)) {
            console.log(`📝 ${filename} not found. Creating new keypair...`);
            return null;
        }

        const secretKeyString = readFileSync(filename, "utf8");
        const secretKeyArray = JSON.parse(secretKeyString);
        const keypair = Keypair.fromSecretKey(new Uint8Array(secretKeyArray));
        
        console.log(`✅ Loaded keypair from ${filename}`);
        console.log(`📍 Public Key: ${keypair.publicKey.toBase58()}`);
        return keypair;
    } catch (error) {
        console.error("❌ Error loading keypair:", error);
        return null;
    }
}

export function getOrCreateKeypair(filename: string = KEYPAIR_FILE): Keypair {
    let keypair = loadKeypair(filename);
    
    if (!keypair) {
        console.log("🔑 Generating new keypair...");
        keypair = Keypair.generate();
        saveKeypair(keypair, filename);
    }
    
    return keypair;
}
