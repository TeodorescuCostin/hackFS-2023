const fs = require('fs');
const infura = require('./infuraUtils');
const { send } = require('process');
const path = require('path');

async function sendFile(request, response)
{
    console.log("sunt aici si request ul e " + request)
    console.log(request);
    const filePath = turnReqBodyIntoFile(request);
    console.log("sent file path" + filePath)   
    
    try {
      let path = await infura.sendFile(filePath);
      removeFileAfterUse(filePath);
      response.setHeader("Content-Type", "application/json");
      response.json({
        path: path
      });
      return response;
    } catch (error) {
      return { success: false, error: error.message };
    }
}

function getFile(filePath)
{
    infura.getFile(filePath);
}
function removeFileAfterUse(filePath)
{

    //fs.unlinkSync(filePath);
}

function turnReqBodyIntoFile(request) {

    const fileName = request.name;
    const fileData = request.data;
    const tempDir = 'temp';
    const tempFilePath = path.join(tempDir, fileName);
    console.log(tempFilePath);
    let nrErrors = 0;
    while(nrErrors < 10)
    {try {
        fs.mkdirSync(tempDir, { recursive: true });
        fs.appendFileSync(tempFilePath, fileData);
        console.log(tempFilePath);
        return tempFilePath;
      } catch (error) {
        console.error('Error writing file:', error);
        nrErrors++;
        //throw error;
      }
    }
    if(nrErrors == 10)
        throw error;
  }
module.exports={sendFile, getFile}