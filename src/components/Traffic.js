import React,{useState,useEffect}  from 'react';
import axios from 'axios'
export default function Traffic() {
    const [json,setJson]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/data')
        .then(res=>{
            // console.log(res.data)
            setJson(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    return (
        <div className='traffic'>
            <table>
                {/* <tr>
                    {Object.keys(json[0]).map((key) => (
                    <th>{key}</th>
                    ))}
                </tr> */}
                    {json.map((obj) => (
                        <tr>
                          {Object.values(obj).map((val) => (
                            <td>{val}</td>
                          ))}
                        </tr>
                      ))}
                        
            </table>
        </div>
    );
}
