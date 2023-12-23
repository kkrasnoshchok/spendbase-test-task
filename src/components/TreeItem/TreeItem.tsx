import React, { ReactNode } from 'react'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'

type CustomTreeItemProps = {
    nodeId: string
    label: string
    expanded: boolean
    selected: boolean
    onNodeToggle?: (nodeId: string) => void
    onNodeSelect?: (nodeIds: string[]) => void
    parentIds?: string[]
    children?: ReactNode
}

export const TreeItem = (props: CustomTreeItemProps) => {
    const { nodeId, label, expanded, selected, onNodeToggle, onNodeSelect, children, parentIds = [] } = props

    return (
        <div>
            <div
                onClick={() => {
                    onNodeToggle && onNodeToggle(nodeId)
                    onNodeSelect && onNodeSelect(parentIds)
                }}
                style={{ cursor: 'pointer' }}
            >
                {children && (expanded ? <FaChevronDown /> : <FaChevronRight />)}
                <span style={{ marginLeft: '5px', fontWeight: selected ? 'bold' : 'normal' }}>{label}</span>
            </div>
            {expanded && <div style={{ marginLeft: '20px' }}>{children}</div>}
        </div>
    )
}
