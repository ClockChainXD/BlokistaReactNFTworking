import { useEffect, useState } from 'react';

export const useSearchTerm = ({ searchTerm = ''}) => {

    const [searchT,setSearchT]=useState("");
    
useEffect( () => {

    if(searchTerm!='')
    {
setSearchT(searchT);
console.log("Use search: " + searchT)    
}


},[searchTerm]);

return searchT;

};