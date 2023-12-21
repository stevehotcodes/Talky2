import mssql from 'mssql';
import { dbConfig } from '../config/dbConfig';

 export default class DatabaseHelper{
    // Singleton

    // private static instance: DatabaseHelper;
    // private pool: Promise<mssql.ConnectionPool>
  
    // private constructor() {
    //     this.pool = mssql.connect(dbConfig)
    // }
  
    // public static getInstance(): DatabaseHelper {
    //   if (!DatabaseHelper.instance) {
    //     DatabaseHelper.instance = new DatabaseHelper();
    //   }
    //   return DatabaseHelper.instance;
    // }

    
    // private static addInputsToRequest(request:mssql.Request, data:{[x:string]:string|number|null}={}){
    //     const keys = Object.keys(data)
    //     keys.map(keyName=>{
    //         return request.input(keyName, data[keyName])
    //     })
    //     return request
    // }
    
  static  async exec (storedProcedure:string, data:{[x:string]:string|number|null}={}){
        // let  request :mssql.Request= await (await this.pool).request()
        const pool = mssql.connect(dbConfig) as Promise<mssql.ConnectionPool>;
        // request= DatabaseHelper.addInputsToRequest(request,data)
        let request = ((await pool).request()) as mssql.Request

        for(let key in data){
            request.input(key, data[key])
        }
        const result= await request.execute(storedProcedure)
        return result
    }

   static async query(queryString:string){
        // return (await this.pool).request().query(queryString)   

        const pool = mssql.connect(dbConfig) as Promise<mssql.ConnectionPool>;
        const results = (await pool).request().query(queryString)

        return results

    }
}