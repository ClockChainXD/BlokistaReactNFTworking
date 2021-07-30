import ipfsClient from 'ipfs-api';

//const projectId=process.env.REACT_APP_PROJECT_ID;
//const projectSecret=process.env.REACT_APP_PROJECT_SECRET
//const auth =
  //'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
const ipfs = new ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

export const getImageIpfsHash = async (data: any) => {
  console.log(ipfs);
  console.log("this is data: "+data);
  const result = await ipfs.files.add(data);
  const hash = result[0].hash;
  return hash;
};

export function readFileAsync(file: Blob) {
  console.log(file.text + " and " + file.size.toString())
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
    //  if(reader.result!=null && reader.result===typeof ArrayBuffer){
        console.log("This is working :"+reader.result.toString());
        resolve(Buffer.from(reader.result));
        
     // }
     // console.log("This is notttt working :"+reader.result.toString());
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  })
}