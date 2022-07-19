import React, {KeyboardEvent, useEffect, useRef, useState} from 'react';
import styles from './css/SimpleSelect.module.scss'
//types//
export type ItemsType = {
    title: string,
    value: null | number
}

export type SelectPropsType = {
    value?: number | null,
    onSelected: (value: number | null) => void,
    items: ItemsType[]
}


export const SimpleSelect = ({items, value, onSelected }: SelectPropsType) => {
    const sortRef = useRef<HTMLHeadingElement>(null)
    const selectedItem = items.find(i => i.value === value)
    const [active, setActive] = useState(true)
    const [howeredElementValue, setHoweredElementValue] = useState(value)

    useEffect(() => {
        setHoweredElementValue(value)
    }, [value])

    useEffect(() => {

        const handleClickOutside = (event: any) => {
            if (!event.path.includes(sortRef.current)) {
                setActive(false)
                console.log('click outside')
            }
        }
        document.body.addEventListener('click', handleClickOutside)
        return () => {
            console.log('Sort unmount')
            document.body.removeEventListener('click', handleClickOutside)
        }
    },[])

    const showItems = () => {
        setActive(!active)
    }
    const onItemClick = (value: number | null) => {
        onSelected(value)
        showItems()

    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {

            for (let i = 0; i < items.length; i++) {
                if (items[i].value === howeredElementValue) {
                    const pretendentElement = e.key === "ArrowDown"
                        ? items[i + 1]
                        : items[i - 1];

                    if (pretendentElement) {
                        onSelected(pretendentElement.value)
                        return;
                    }
                }
            }
            if (!selectedItem) {
                onSelected(items[0].value)
            }
        }
        if (e.key === "Enter") {
            showItems()
        }
        if (e.key === "Escape") {
            setActive(false)
        }

    }

    return (
        <>
            <div onKeyUp={onKeyUpHandler} tabIndex={0}
                 className={styles.select}>
                <div className={styles.main} onClick={showItems} ref={sortRef}>
                    <span className={styles.current}>{selectedItem && selectedItem.title}</span>
                    <div className={styles.select_icon}>  <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false"
                                                               className={styles.svg_close}>
                        <path
                            d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"/>
                    </svg></div>
                </div>

                {active ?

                    <div className={styles.items}>
                        {items.map(el =>
                            <div
                                className={styles.item + " " + (howeredElementValue === el.value ? styles.item_hover : '')}
                                onMouseEnter={() => setHoweredElementValue(el.value)}
                                onClick={() => onItemClick(el.value)} key={el.value}>{el.title}</div>)}
                    </div>
                    : null
                }
            </div>
        </>
    )
}


