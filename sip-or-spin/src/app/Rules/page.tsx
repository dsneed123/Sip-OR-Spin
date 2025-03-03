import React from "react";
const rules = () => {
    return (
        <>
            <div>
                <h1 className="pt-5 pb-10 text-5xl text-center">Rules</h1>
            </div>
            <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', alignItems: 'center'}}>
                <div className="flex-1 bg-[#FFECDC] rounded-3xl w-2/3">
                    <div style= {{ alignSelf: 'flex-start', zIndex: 1, top: 0}}>
                        <h2 style= {{ whiteSpace: 'nowrap' }}>How to Play</h2>
                    </div>
                    <p>div1</p>
                </div>
                <div className="flex-1 bg-[#FFECDC] rounded-3xl w-2/3">
                    <p>div2</p>
                </div>
            </div>
        </>
    );
}

export default rules;