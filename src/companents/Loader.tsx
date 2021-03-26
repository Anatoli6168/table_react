import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 100px;
`;

export function Loader() {
    return (
        <Container>
            <ClipLoader />
        </Container>
    )
}