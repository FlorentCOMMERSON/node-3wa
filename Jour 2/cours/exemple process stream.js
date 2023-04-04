process.stdin.setEncoding('utf8');

process.stdin.on('data', (input) => {
    input = input.toString();

    input.includes('stop') ? process.stdin.pause() : console.log(input);
})

process.stdin.on('pause', () => process.stdout.write("C'est fini"));