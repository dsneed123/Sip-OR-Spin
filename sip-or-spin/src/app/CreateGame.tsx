import React from 'react';
// import { Wheel } from 'react-custom-roulette';
// import { useState } from 'react';
import { Button } from '@mui/material';
import {Slider} from "@heroui/slider";


const CreateGame = () => {
    return (
        <div>
            <h1>Create Game</h1>
            <Slider
                aria-label="Temperature"
                className="max-w-md"
                defaultValue={0.4}
                maxValue={1}
                minValue={0}
                size="md"
                step={0.01}
            />
            <Button variant="contained" color="primary">Submit</Button>
        </div>
    );
}

export default CreateGame;