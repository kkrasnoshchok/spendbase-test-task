import React, { ReactNode } from 'react'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import styles from './TreeItem.module.scss'
import classnames from 'classnames'

type CustomTreeItemProps = {
    nodeId: string
    label: string
    expanded: boolean
    selected: boolean
    onNodeToggle?: (nodeId: string) => void
    onNodeSelect?: (nodeIds: string[]) => void
    children?: ReactNode
}

export const TreeItem = (props: CustomTreeItemProps) => {
    const { nodeId, label, expanded, selected, onNodeToggle, onNodeSelect, children } = props

    return (
        <>
            <div
                onClick={() => {
                    onNodeSelect && onNodeSelect([nodeId])
                }}
                className={classnames(styles.header, {
                    [styles.headerSelected]: selected
                })}
            >
                {children && (
                    <div
                        className={classnames(styles.headerIcon, { [styles.headerIconSelected]: selected })}
                        onClick={() => onNodeToggle && onNodeToggle(nodeId)}
                    >
                        {expanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                    </div>
                )}

                <span className={styles.headerTitle}>{label}</span>
            </div>
            {expanded && <div className={styles.content}>{children}</div>}
        </>
    )
}
