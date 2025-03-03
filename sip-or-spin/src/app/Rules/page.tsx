import React from "react";
const rules = () => {
    return (
        <>
            <div>
                <h1 className="pt-5 pb-10 text-5xl text-center">Rules</h1>
            </div>
            <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', alignItems: 'center'}}>
                <div className="flex-1 bg-[#FFECDC] rounded-3xl pt-50 pb-50 pr-150 pl-150">
                    <p>div1</p>
                </div>
                <div className="flex-1 bg-[#FFECDC] rounded-3xl pt-50 pb-50 pr-150 pl-150">
                    <p>div2</p>
                </div>
            </div>
        </>
    );
}

export default rules;