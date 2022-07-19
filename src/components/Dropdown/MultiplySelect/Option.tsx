import styles from "./css/MultipleSelect.module.scss";
import React, {useRef} from "react";
import {ISelected} from "./MultipleSelect";

type OptionsType = {
    setHoveredElementValue: (value: string | number) => void,
    hoveredElementValue: number | string,
    handlerSelectedAdd: (selected: ISelected) => void,

    title: string,
    value: string | number,

}

export const Option = ({
                           handlerSelectedAdd,
                           title,
                           value,
                           hoveredElementValue,


                           setHoveredElementValue
                       }: OptionsType) => {


    const optionsRef = useRef<HTMLHeadingElement>(null)

    return (

        <div
            className={styles.item + " " + (hoveredElementValue === value ? styles.item_hover : '')}
            onMouseEnter={() => {
                setHoveredElementValue(value);
            }}

            onClick={() => {
                handlerSelectedAdd({value, title})
            }}

            key={value}>{title}</div>
    );
};