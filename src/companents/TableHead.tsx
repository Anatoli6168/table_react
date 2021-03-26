import React from 'react';
import styled from 'styled-components';
import { fields } from '../config';

import arrowImg from '../public/arrow.png'


interface Sort {
    name: string | null,
    reverse: boolean
}
interface Props {
    sort: Sort | null,
    setSort: React.Dispatch<React.SetStateAction<Sort>>
}
interface ArrowProps {
    reverse: boolean
}
type HandleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
interface CellProps {
    name: string,
    handleClick: HandleClick,
    sort: Sort | null
}

const StyledCell = styled.div`
  padding: 0.2rem;
  font-weight: bold;
  flex-basis: 20%;
  cursor: pointer;
  user-select: none;
  outline: 1px solid black;
  @media(max-width: 767px) {
        display: none;
    }
`;
const Arrow = styled.img<ArrowProps>`
    transform: ${props => props.reverse ? 'rotate(180deg)' : 'none'};
`;

export function TableHead({ sort, setSort }: Props) {

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        const name = event.currentTarget.getAttribute('data-name');
        if (sort?.name === name) setSort(prev => ({ ...prev, reverse: !prev.reverse }));
        else setSort({ name, reverse: true });
    };

    return (
        <>
            {
                fields.map((field, index) => (
                    <Cell
                        key={index}
                        name={field}
                        handleClick={handleClick}
                        sort={sort}
                    />
                ))
            }
        </>
    );
}

function Cell({ name, handleClick, sort }: CellProps) {
    return (
        <StyledCell data-name={name} onClick={handleClick}>
            {name}
            {sort?.name === name ? <Arrow src={arrowImg} reverse={sort.reverse} /> : null}
        </StyledCell>
    );
}