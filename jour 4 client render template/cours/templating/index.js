const pug = require('pug');

//exemple de template PUG

const template = `
if age >= 18
    h1 Access granted !
else
    h1 Permission denied!`;

// compile
const compileTemplate = pug.compile(template);    

compileTemplate({ age : 1});

// compileFile pour un fichier externe pug
const compileTemplate2 = pug.compileFile('template.pug');

compileTemplate2({ age : 19});

// Render

pug.render(template, {age : 19}, (err, data) => {
    if (err) throw err;
    console.log(data);
})

// RenderFile pour un fichier externe pug

pug.renderFile('template.pug', {age : 1}, (err, data) => {
        if (err) throw err;
        console.log(data);
    })

//gestion erreur compile

try {
    const compileTemplate = pug.compile(template);
    //......
}catch (err){
    res.writeHead(500, { 'Content-Type' : 'text/plain'});
    res.end(err.message);
}

