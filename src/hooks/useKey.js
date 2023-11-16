import { useEffect } from "react";

export function useKey(key,action){
    useEffect(()=>{
        document.addEventListener("keydown",callBack)

        function callBack (e){
          if(e.code.toLowerCase() === key.toLowerCase()){
            action()
          }
        }
    
    
        return function(){
          document.removeEventListener("keydown",callBack)
        }
      },[action,key])
}