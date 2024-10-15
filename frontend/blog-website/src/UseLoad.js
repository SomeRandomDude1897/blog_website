import { useEffect, useState } from "react";
import axios from 'axios'

const useLoad = (url) => {
    const [data, setData] = useState(null);
    const [receivedData, setReceivedData] = useState("Pending");
  
    useEffect(() => {
      const fetchData = async () => {
        try{
          const response = await axios.get(url)
          setData(response.data);
          setReceivedData("Success");
        }
        catch (e)
        {
          console.log(e);
          setReceivedData("Fail");
        }
      };
  
      setTimeout(fetchData, 1000);
    }, [url]);
    return {data, receivedData};
}
 
export default useLoad;