const http = require('http');
const url = require('url');
const fs = require('fs');
​
const webrootPath = process.env.CERTBOT_WEBROOT_PATH;
const port = process.env.CERTSERVER_PORT || 80;
​
console.log(`Listening on port :80. PID: ${process.pid}`);
​
//Create a certificate renewal server 
const certServer = http.createServer((req, res) => {
    console.log('Cert request:', req.url);
​
    function resolveCertCode(req, res) {
        let urlParts = url.parse(req.url);
        let path = urlParts.pathname;
        let matches = path.match(/(\/.well-known\/acme-challenge\/)(.+)/)
        if (matches) {
            return matches[2]; //returns challenge code
        } else {
            return;
        }
    }
​
    //Get the cert challenge code if there is one - reject everything else
    let certCode = resolveCertCode(req, res);
    if (certCode) {

        //Look for a file created by certbot in the configured path
        let challengePath = `${webrootPath}/.well-known/acme-challenge/${certCode}`
        console.log(`Certificate challenge: ${challengePath}`);

        if (fs.existsSync(challengePath)) {

            //Read the renewal data file
            const certData = fs.readFileSync(challengePath, 'ascii');
            console.log('Certificate data found!', certData);

            //respond with the contents
            res.statusCode = 200;
            res.write(certData);
            res.end();
            return;
        }
        console.log('Certificate data NOT found');
    }

    console.log('Cert request rejected');

    res.statusCode = 405;
    res.statusMessage = "NotSupported";
    res.write("");
    res.end();
})

//start listening for requests
certServer.listen(port);