//import { useFormik, Field } from 'formik';
import { Formik, Form, Field } from 'formik';
import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components'
import { fields, Line, schema } from '../config';



interface ButtonProps {
    column: number
}
interface Props {
    setData: React.Dispatch<React.SetStateAction<Line[]>>
}
interface CellProps {
    error: string | undefined
}
interface StyledTextareaAutosizeProps {
    error: string | undefined
}
type TypesFields = typeof fields[number]
type Fields = {
    [key in TypesFields]?: string | number
};
const StyledForm = styled(Form) <ButtonProps>`
    display: contents;
`;
const Cell = styled.div<CellProps>`
    @media(max-width: 767px) {
        margin: 5px 0;
    }
    padding: 3px;
    outline: 1px solid black;
    ${props => props.error ? "border: 1px solid red;" : "none"}
`;
const StyledTextareaAutosize = styled(TextareaAutosize) <StyledTextareaAutosizeProps>`
  box-sizing: border-box;
  border: none;
  ${props => props.error && "color: red;"}
  width: 100%;
  outline: none;
  resize: none;
  padding: 0;
`;
const Button = styled.button<ButtonProps>`
    display: flex;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    width: 100%;
    height: 70px;
    grid-column-start: 1;
    grid-column-end: ${props => props.column + 1};
    background-color: green;
    &:hover {
        font-size: 1.5rem;
    }
`;

export function NewRow({ setData }: Props) {
    const [validationChange, setValidationChange] = useState(false);


    return (
        <Formik
            initialValues={fields.reduce<Fields>((accumulator, currentValue) => {
                accumulator[currentValue] = '';
                return accumulator;
            }, {}) as Line}
            validationSchema={schema}
            onSubmit={(line: Line, actions) => {
                actions.resetForm();
                setData(prev => [...prev, line]);
            }}
            validateOnBlur={true}
            validateOnChange={validationChange}
        >
            {(props) => (
                
                <StyledForm column={fields.length} onSubmit={props.handleSubmit}>
                    {
                        fields.map(field => (
                                <Cell error={props.errors[field]} key={field}>
                                    <StyledTextareaAutosize
                                        name={field}
                                        onChange={props.handleChange}
                                        value={props.values[field]}
                                        placeholder={props.errors[field]}
                                        error={props.errors[field]}
                                    />
                                </Cell>
                        ))
                    }
                    <Button type="submit" column={fields.length} onClick={() => setValidationChange(true)}>Create</Button>
                </StyledForm>
            )}
        </Formik>
    );
}