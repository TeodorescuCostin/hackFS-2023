const https = require('https');
const ipfsClient = require('ipfs-http-client');

const projectId = '2Q8zOxzolwrGIwAWAcNHbjC07uE';
const projectSecret = '992c618f3871ca508f6ca6371f14cc14';

const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});


const options = {
    host: 'ipfs.infura.io',
    port: 5001,
    path: '/api/v0/pin/add?arg=QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn',
    method: 'POST',
    auth: projectId + ':' + projectSecret,
};


async function sendFile(filePath)
{
    console.log("reached this");

  //  const ipf = await ipfs.create()
    let x = null

    for await (const file of client.addAll(ipfsClient.globSource(filePath, '**/*'))) {
        console.log(file)
        x=file
    }
    return x.path;
}



module.exports= {sendFile};
