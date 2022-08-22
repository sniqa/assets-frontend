import React, { useEffect, useState } from 'react'
import { _fetch } from '../../apis/fetch'
import Table from '../../components/table'
import AnimateWraper from '../../components/transition/AnimateWraper'

const columns = [{
    label: 'ip_address', field: 'ip_address'
}, 
{ label: 'user', field: 'username'},
{
    label: 'network_type', field: 'network_type'
},
{   label: 'is_used', field: 'is_used'}
]

const IpAddress = () => {

    const [ipRows, setIpRows] = useState([])

    useEffect(() => {
        const getIps = async () => {
            const {findIps} = await _fetch({findIps: {}})
 
            console.log(findIps);
            
            if(findIps) {
                const {success, data} = findIps

                success && setIpRows(data)
            }

        }
        getIps()

    }, [])


  return (
    <AnimateWraper className='w-full'>
        <Table columns={columns} rows={ipRows} />
    </AnimateWraper>
  )
}

export default IpAddress