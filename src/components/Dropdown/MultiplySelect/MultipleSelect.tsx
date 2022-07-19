import React, {KeyboardEvent, useEffect, useRef, useState} from 'react';
import styles from './css/MultipleSelect.module.scss'
import {Option} from "./Option";
import {SelectedItems} from "./SelectedItems";

//types//
export type ItemsType = {
    title: string,
    value: string | number
}

export type SelectPropsType = {
    options: ItemsType[],
    handlerChange: (values: Array<string | number>) => void;
}

export interface ISelected {
    title: string;
    value: string | number;
}


const MultipleSelect = ({options=[], handlerChange}: SelectPropsType) => {
    const noFocusRef = useRef<HTMLHeadingElement>(null)


    const [items, setItems] = useState<ISelected[]>([])
    const [value, setValue] = useState<number | string>(1)
    const [active, setActive] = useState(false)
    const [hoveredElementValue, setHoveredElementValue] = useState<string | number>(value)
    const selectedItem = items.find(i => i.value === value)

    useEffect(() => {
        setHoveredElementValue(value)
    }, [value])

    const showItems = () => {
        setActive(!active)
    }

    React.useEffect(() => {

        const handleClickOutside = (event: any) => {
            if (!event.path.includes(noFocusRef.current)) {
                setActive(!active)

            }
        }
        document.body.addEventListener('click', handleClickOutside)
        return () => {
            document.body.removeEventListener('click', handleClickOutside)
        }
    },[])

    const handlerSelectedAdd = (selectedValue: ISelected) => {

        setValue(value)
        const added = [...items, selectedValue];
        setItems(added);
        handlerChange(added.map((select) => {

            setActive(true)
            return select.value;
        }));

    }

    const handlerSelectedRemove = (e: React.MouseEvent<HTMLImageElement>, title: string) => {
        e.stopPropagation()
        const filteredItems = items.filter(i => i.title !== title)
        setItems(filteredItems)

        handlerChange(filteredItems.map((select) => {
            return select.value;
        }));
    }

    const optionsSelectedTitles = items.map((select) => {
        return select.title;
    });

    const optionsToRender = options.filter((option) => {
        return !optionsSelectedTitles.includes(option.title);
    });

    const onKeyUpHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {

            for (let i = 0; i < optionsToRender.length; i++) {
                if (optionsToRender[i].value === hoveredElementValue) {
                    const pretendentElement = e.key === "ArrowDown"
                        ? optionsToRender[i + 1]
                        : optionsToRender[i - 1];

                    if (pretendentElement) {
                        setValue(pretendentElement.value)
                        return;
                    }
                }
            }
            if (!selectedItem) {
                setValue(optionsToRender[0].value)
            }
        }
        if (e.key === 'Enter') {

            // if(hoveredElementValue) {
            //     handlerSelectedAdd(optionsToRender.find(k => k.value === hoveredElementValue) as ISelected)
            //     setHoveredElementValue(value => +value + 1)
            // }
                }


        if (e.key === "Escape") {
            setActive(false)
        }

    }


    return (
        <>
            <div   onKeyUp={onKeyUpHandler} ref={noFocusRef}    tabIndex={-1} className={styles.select}>
                <div className={styles.main}  onClick={showItems}>
                    <div className={styles.current}>
                        {!items.length ? <span>Please, select</span>
                            : items.map(select =>
                                <>
                                    <SelectedItems title={select.title} handlerSelectedRemove={handlerSelectedRemove}/>
                                </>
                            )}

                    </div>
                    <div className={styles.svg}>
                        <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false"
                             className={styles.svg_close}>
                            <path
                                d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695
                                4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"/>
                        </svg>
                    </div>
                </div>
                {active ?
                    <div  className={styles.items}>

                        {optionsToRender.length<=0 ?
                            <span  className={styles.item}>You selected all</span>
                            :
                            optionsToRender.map(el =>
                        <Option key={el.value} value={el.value} title={el.title} hoveredElementValue={hoveredElementValue}

                                setHoveredElementValue={setHoveredElementValue}
                                handlerSelectedAdd={handlerSelectedAdd}
                                />

                    )} </div> : null
                }
            </div>

        </>

    )
}
export default MultipleSelect;





