import React from 'react';
import { circleConfigForCaseTypes } from '../utilities/utilities.json';
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox({ title, cases, overallCases, onClick, color, active }) {
    return (
        <Card className="info-box" onClick={ onClick }>
            <CardContent
                className="info-box-title"
                style={{
                    borderTop: active && `10px solid ${ circleConfigForCaseTypes[title.toLowerCase()].color }`,
                }}
            >
                <Typography color="textSecondary">{ title }</Typography>

                <h2 className="info-box-cases" style={{ color, marginBottom: '8px' }}>{ cases }</h2>

                <Typography
                    className="info-box-overall-cases"
                    color="textSecondary"
                >
                    { overallCases } Total</Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;
