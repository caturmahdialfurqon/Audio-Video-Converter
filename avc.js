const { execSync, spawn } = require('child_process');
const readline = require('readline');

const supportedFormats = {
    "Video Formats": ["MP4", "AVI", "MKV", "MOV", "WMV", "FLV", "3GP", "WEBM", "MPEG", "VOB", "DAT", "TS"],
    "Audio Formats": ["MP3", "WAV", "AAC", "OGG", "FLAC", "AC3", "WMA"],
};

function printSupportedFormats() {
    console.log("Supported Formats:");
    for (const [category, formats] of Object.entries(supportedFormats)) {
        console.log(`\x1b[1;32m${category}:\x1b[0m`);
        formats.forEach(format => {
            console.log(`\x1b[1;33m- ${format}\x1b[0m`);
        });
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function pulsingDots() {
    let dots = "";
    for (let i = 0; i < 5; i++) {
        process.stdout.write(`\r\x1b[1;33mStill Processing ${dots}\x1b[0m`);
        dots += ".";
        await sleep(500);
    }
}

async function loadingBar() {
    const chars = ['🔴','🔵','🟡','🟢'];
    for (let i = 0; i < 20; i++) {
        process.stdout.write(`\r\x1b[1;37m[${'🟩'.repeat(i)}${chars[i % 4]}]\x1b[0m`);
        await sleep(500);
    }
    console.log();
}

async function spinningWheel() {
    const chars = ['|', '/', '-', '\\'];
    for (let i = 0; i < 10; i++) {
        process.stdout.write(`\r\x1b[1;37mConverting ${chars[i % 4]}\x1b[0m`);
        await sleep(200);
    }
}

async function convertMedia(inputPath, outputPath) {
    const startTime = Date.now();
    const command = `ffmpeg -i ${inputPath} ${outputPath}`;
    
    const ffmpeg = spawn('ffmpeg', ['-i', inputPath, outputPath], { stdio: 'ignore' });

    while (ffmpeg.exitCode === null) {
        await pulsingDots();
        await loadingBar();
        await spinningWheel();
    }
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    console.log(`\n\x1b[1;32mConversion completed in ${duration.toFixed(2)} seconds. on \x1b[0m${inputPath}`);
}

async function main() {
    printSupportedFormats();
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const inputPath = await new Promise(resolve => {
        rl.question('\n\x1b[1;34mEnter the path of the video or audio file to convert: \x1b[0m', resolve);
    });

    const outputFormat = await new Promise(resolve => {
        rl.question('\x1b[1;34mEnter the desired output format (with extension): \x1b[0m', resolve);
    });

    rl.close();

    const outputPath = `${inputPath.split('.').slice(0, -1).join('.')}.${outputFormat}`;
    console.clear();
    console.log(`

╭━━━╮╱╱╱╱╱╱╱╱╱╱╱╱╱╭━━━┳╮
┃╭━━╯╱╱╱╱╱╱╱╱╱╱╱╱╱┃╭━━┫┃
┃╰━━┳╮╭┳━┳━━┳━━┳━╮┃╰━━┫┃╭╮╱╭┳━╮╭━╮
┃╭━━┫┃┃┃╭┫╭╮┃╭╮┃╭╮┫╭━━┫┃┃┃╱┃┃╭╮┫╭╮╮
┃┃╱╱┃╰╯┃┃┃╰╯┃╰╯┃┃┃┃┃╱╱┃╰┫╰━╯┃┃┃┃┃┃┃
╰╯╱╱╰━━┻╯╰━╮┣━━┻╯╰┻╯╱╱╰━┻━╮╭┻╯╰┻╯╰╯
╱╱╱╱╱╱╱╱╱╱╱┃┃╱╱╱╱╱╱╱╱╱╱╱╭━╯┃
╱╱╱╱╱╱╱╱╱╱╱╰╯╱╱╱╱╱╱╱╱╱╱╱╰━━╯
    `);
    console.log('\x1b[1;33mStarting conversion...\x1b[0m');
    await convertMedia(inputPath, outputPath);
}

main();

