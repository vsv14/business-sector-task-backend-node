export function isProduction():boolean{
    const f = ( process.env.NODE_ENV == 'production')? true:false;
    console.log(process.env.NODE_ENV);
    return f;
}