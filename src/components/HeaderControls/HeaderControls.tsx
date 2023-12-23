import React from 'react'
import styles from './HeaderControls.module.scss'
import { FaPlus } from 'react-icons/fa6'
import { FaMinus } from 'react-icons/fa6'
import { FaExpand } from 'react-icons/fa6'
import classnames from 'classnames'

// It's UI-Only component to mock UI of MacOS Folder ;)
export const HeaderControls = () => {
    return (
        <div className={styles.controls}>
            <div className={classnames(styles.controlsButton, styles.controlsClose)}>
                <FaPlus size={8} />
            </div>
            <div className={classnames(styles.controlsButton, styles.controlsHide)}>
                <FaMinus size={8} />
            </div>
            <div className={classnames(styles.controlsButton, styles.controlsExpand)}>
                <FaExpand size={6} />
            </div>
        </div>
    )
}
