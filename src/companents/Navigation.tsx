import React, { useCallback } from 'react';
import styled from 'styled-components';

interface Props {
    length: number,
    list: number,
    setList: React.Dispatch<React.SetStateAction<number>>
}
interface NumberProps {
    active: boolean
}
const Numbers = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px 0;
`;
const Number = styled.div<NumberProps>`
    margin: 0 10px;
    color: blue;
    ${props => props.active ? "cursor: default;" : "cursor: pointer;"}
    ${props => props.active ? "font-weight: 500; color: black;" : null}
`;

export function Navigation({ length, list, setList }: Props) {

    const count = useCallback(() => {
        return Math.ceil(length / 50);
    }, [length]);

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setList(+event.currentTarget.innerHTML);
    };
    if (!(count() - 1)) return null;
    return (
        <Numbers>
            {
                Array(count()).fill(null).map((item, index) => (
                    <Number onClick={handleClick} active={index === list} key={index}>{index}</Number>
                ))
            }
        </Numbers>
    );
}