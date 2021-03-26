import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NewRow } from './NewRow';
import { Row } from './Row';
import { TableHead } from './TableHead';
import { url, Line, fields, searchs } from '../config';
import { Navigation } from './Navigation';
import { Loader } from './Loader';
import { connect } from 'react-redux';


interface Sort {
    name: string | null,
    reverse: boolean
}
interface TableAreaProps {
    reverse: boolean,
    column: number
}
type State = {
    [key in typeof searchs[number]]: string;
};
type Props = State
const TableArea = styled.div<TableAreaProps>`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.column}, 1fr)`};
    width: 100%;
    gap: 1px;
    @media(max-width: 767px) {
        display: block;
        padding: 0 10px;
        width: auto;
    }
`;

function compare(a: any, b: any, name: string, reverse: boolean) {
    if (!reverse) {
        if (a[name] > b[name]) return -1;
        if (a[name] > b[name]) return 1;
        return 0;
    } else {
        if (a[name] < b[name]) return -1;
        if (a[name] < b[name]) return 1;
        return 0;
    }
}

function Table(props: Props) {
    const [data, setData] = useState<Line[]>([]); //Загруженные данные
    const [currentData, setCurrentData] = useState<Line[]>([]); //
    const [list, setList] = useState(0)
    const [sort, setSort] = useState<Sort>({ name: null, reverse: true });

    useEffect(() => { //Загрузка данных
        async function fetchData() {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
            setCurrentData(data);
        }

        fetchData();
    }, []);
    useEffect(() => { //Фильтрация
        setCurrentData(() => {
            return data.filter(item => {
                const result = searchs.reduce((accumulator, currentValue) => {
                    return accumulator && Boolean(item[currentValue].toString().indexOf(props[currentValue]) + 1);
                }, true);
                return result;
            })
        })

    }, [props, data]);

    useEffect(() => { //Сортировка
        if (sort.name) {
            const name = sort.name;
            setData(data => {
                return data.slice().sort((a, b) => compare(a, b, name, sort.reverse));
            });
        }
    }, [sort])
    if (!data.length) return (<Loader />)
    return (
        <>
            <TableArea
                reverse={sort.reverse}
                column={fields.length}
            >
                <TableHead
                    sort={sort}
                    setSort={setSort}
                />
                {
                    currentData.slice(list * 50, list * 50 + 50).map((line, index) => (
                        <Row
                            line={line}
                            key={index}
                        />
                    ))
                }
                <NewRow setData={setData} />
            </TableArea>
            <Navigation setList={setList} length={currentData.length} list={list} />
        </>
    );
}
const mapState = (state: State) => {
    return state;
};
export default connect(mapState)(Table);