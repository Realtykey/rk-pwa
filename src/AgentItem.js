import React from 'react'

export default function AgentItem({hit}) {
    
    return (
        <div>
            {hit.name} {hit.lname}
        </div>
    )
}
