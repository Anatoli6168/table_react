import React from 'react';
import styled from 'styled-components';
import { fields, Line } from '../config';

interface CellProps {
    lines: number;
}
const Cell = styled.div<CellProps>`
    padding: 0.2rem;
    outline: 1px solid black;
    @media(max-width: 767px) {
        text-align: center;
        margin: 5px 0;
        &:nth-child(${props => (props.lines + 'n')}) {
            margin-bottom: 10px;
        }
    }
`;

export function Row({ line }: { line: Line }) {
    return (
        <>
            {
                fields.map((field, index) => (
                    <Cell key={index} lines={fields.length}>{line[field as typeof fields[number]]}</Cell>
                ))
            }
        </>
    )
}