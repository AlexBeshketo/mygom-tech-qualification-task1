import React from "react";
import styles from "./css/MultipleSelect.module.scss";
import close_icon from "../../img/icon_close.png";

type SelectedItemsType = {
    title: string,
    handlerSelectedRemove: (e: React.MouseEvent<HTMLImageElement>, title: string) => void
}

export const SelectedItems = ({title, handlerSelectedRemove}: SelectedItemsType) => {
    return (

        <div className={styles.flex}>
            <div className={styles.option}>{title}</div>
            <div className={styles.img_container}>
                <img className={styles.img_icon} src={close_icon} alt={'closeIcon'}
                     onClick={(e) => {
                         handlerSelectedRemove(e, title)
                     }}>
                </img>
            </div>
        </div>
    );
};