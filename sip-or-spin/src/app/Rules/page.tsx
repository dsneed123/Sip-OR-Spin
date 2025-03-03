import React from "react";
const rules = () => {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{ flex: 1, backgroundColor: 'black' }}>
                    <p style= {{ flex: 2, color: 'white'}}>div1</p>
                </div>
                <div style= {{ backgroundColor: 'pink' }}>
                    <p>div2</p>
                </div>
            </div>
        </>
    );
}

export default rules;