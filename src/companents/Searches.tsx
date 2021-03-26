import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { searchs } from '../config';
import { search } from '../redux/actions';


type Search = {
    search: typeof search
}
type State = {
    [key in typeof searchs[number]]: string;
};
type Props = Search & State
interface ContainerProps {
    count: number;
}

const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    @media(max-width: 1500px) {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      margin: 10px 0;
      justify-content: flex-end;
    }
    @media(max-width: 1000px) {
        flex-direction: column;
        align-items: center;
    }
    & * {
        ${props => ('flex-basis: ' + (100 / props.count) + '%;')}
        flex-basis: 33%;
        max-width: 230px;
    }
`;
const Input = styled.input`
    width: 220px;
    box-sizing: border-box;
    height: 30px;
`;

function Searches(props: Props) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const element = event.currentTarget;
        props.search(element.name, element.value);
    };

    return (
        <Container count={searchs.length + 1}>
            <div>Search</div>
            {
                searchs.map(item => <Input
                    name={item}
                    onChange={handleChange}
                    value={props[item]}
                    placeholder={item}
                    key={item}
                />)
            }
        </Container>
    )
};
const mapState = (state: State) => {
    return state;
};
export default connect(mapState, { search })(Searches);