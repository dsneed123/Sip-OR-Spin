import React from "react";
const rules = () => {
    return (
        <>
            <div>
                <h1 style={{ fontSize: '50px', textAlign: 'center' }}>Rules</h1>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{ alignItems: 'stretch', flex: 1, backgroundColor: 'black' }}>
                    <p style= {{ color: 'white' }}>div1</p>
                </div>
                <div style= {{ alignItems: 'stretch', flex: 2, backgroundColor: 'pink' }}>
                    <p>div2</p>
                </div>
            </div>
        </>
    );
}

export default rules;