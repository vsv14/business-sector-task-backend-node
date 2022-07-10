import { existsSync, mkdir } from "fs";
import path from "path";


const makeFolders = (folder:string)=>{
    let st = '../..'

     folder.split('/').forEach(async str=>{
        st+= '/'+str;
        const dir = path.resolve(__dirname, st);
        const mydirname = ''+st;

        if(!existsSync(dir)){
            await mkdir(dir,(err) => {
                if (err) {
                    return console.error(err);
                }
                // console.log('Directory created successfully!', mydirname);
            });
        }
    })
}


export {
    makeFolders,
}