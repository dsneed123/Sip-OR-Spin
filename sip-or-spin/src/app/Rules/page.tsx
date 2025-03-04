import React from "react";
const rules = () => {
    return (
        <>
            <div>
                <h1 className="text-center font-bold pt-5 pb-10 text-5xl">Rules</h1>
            </div>
            <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', alignItems: 'center' }}>
                <div className="bg-[#FFECDC] rounded-3xl w-9/10 relative p-5">
                    <div>
                        <h2 className="text-center font-semibold text-2xl overflow-auto whitespace-nowrap pb-2">Game Rules</h2>
                    </div>
                    <li>Who goes first? - The player with the longest hair spins first.</li>
                    <li>Spin the wheel - Players take turns spinning the wheel to receive a random challenge.</li>
                    <li>Complete the challenge - Successful completion of the challenge increases your score.</li>
                    <li>Penalty sip - Failing a challenge means you take a sip of your drink.</li>
                    <li>Scoring - The player with the highest score wins!</li>
                </div>
                <div className="bg-[#FFECDC] rounded-3xl w-9/10 relative p-5">
                    <div>
                        <h2 className="text-center font-semibold text-2xl overflow-auto whitespace-nowrap pb-2">Life Rules</h2>
                    </div>
                    <li>No underage drinking - This one is self explanatory.</li>
                    <li>Know your limits - The goal is to have fun, not overdo it. Sip, don't chug!</li>
                    <li>Stay hydrated - We recommend drinking 8 to 12 ounces of water for every standard alcoholic drink to stay hydrated.</li>
                    <li>Don't drink and drive - Have a designated driver or arrange for a safe ride home.</li>
                </div>
            </div>
        </>
    );
}

export default rules;