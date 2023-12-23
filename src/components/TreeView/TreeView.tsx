import React, { useState } from 'react'
import { TreeItem } from '../TreeItem'
import { RenderTree } from '../../resources/api-data'

type TreeViewProps = {
    data?: RenderTree[]
    onNodeToggle?: (nodeId: string) => void
    onNodeSelect?: (nodeIds: string[]) => void
    expanded?: string[]
    selected?: string[]
}

export const TreeView = (props: TreeViewProps) => {
    const { data, onNodeToggle, onNodeSelect, expanded = [], selected = [] } = props
    const [internalExpanded, setInternalExpanded] = useState<string[]>(expanded)
    const [internalSelected, setInternalSelected] = useState<string[]>(selected)

    const handleNodeToggle = (nodeId: string) => {
        const isNodeExpanded = internalExpanded.includes(nodeId)
        const updatedExpanded = isNodeExpanded ? internalExpanded.filter((id) => id !== nodeId) : [...internalExpanded, nodeId]

        setInternalExpanded(updatedExpanded)
        onNodeToggle && onNodeToggle(nodeId)
    }

    const handleNodeSelect = (nodeIds: string[]) => {
        setInternalSelected(nodeIds)
        onNodeSelect && onNodeSelect(nodeIds)
    }

    const renderTree = (nodes?: RenderTree[], parentIds: string[] = []) =>
        nodes?.map((node) => {
            const isNonEmptyFolder = Array.isArray(node.children) && node.children.length > 0

            return (
                <TreeItem
                    key={node.id}
                    {...{
                        nodeId: node.id,
                        label: node.name,
                        expanded: internalExpanded.includes(node.id),
                        selected: internalSelected.includes(node.id),
                        onNodeToggle: handleNodeToggle,
                        onNodeSelect: handleNodeSelect,
                        parentIds: [...parentIds, node.id]
                    }}
                >
                    {isNonEmptyFolder && renderTree(node.children, [...parentIds, node.id])}
                </TreeItem>
            )
        })

    return <div>{renderTree(data)}</div>
}
