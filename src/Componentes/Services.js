import axios from "axios";
export function POST(url,data){
    
    
      
      const response =  axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((result)=>{
        return result;
      });
}