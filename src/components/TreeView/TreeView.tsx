import React from 'react'
import { TreeItem } from '../TreeItem'
import { RenderTree } from '../../resources/api-data'
import { AccessLevel } from '../../types'

type TreeViewProps = {
    data?: RenderTree[]
    onNodeToggle: (nodeIds: string[]) => void
    onNodeSelect: (nodeIds: string[]) => void
    expanded: string[]
    selected: string[]
}

export const TreeView = (props: TreeViewProps): (JSX.Element | null)[] | null => {
    const { data, onNodeToggle, onNodeSelect, expanded = [], selected = [] } = props
    const handleNodeToggle = (nodeId: string) => {
        const updatedExpanded = expanded.includes(nodeId) ? expanded.filter((id) => id !== nodeId) : [...expanded, nodeId]

        onNodeToggle(updatedExpanded)
    }

    const handleNodeSelect = (nodeIds: string[]) => {
        onNodeSelect(nodeIds)
    }

    //? In case user is admin, he has access to all the files and folders
    //? user who has `write` access, has access both for `write` and `read` elements.
    //? user who has `read` access, has only access for `read` elements
    const checkAccess = (access: AccessLevel, userAccess: AccessLevel): boolean => {
        switch (userAccess) {
            case 'admin':
                return true
            case 'write':
                return access === 'read' || access === 'write'
            case 'read':
                return access === 'read'
            default:
                return false
        }
    }

    //? Recursive function which goes through all the nested elements and renders each file & folder as `TreeItem`
    // which then separates on file / folder via existense of `children` in current version

    const renderTree = (nodes?: RenderTree[], parentIds: string[] = []): (JSX.Element | null)[] | null => {
        if (!nodes?.length) {
            return null
        }
        return nodes?.map((node) => {
            const isNonEmptyFolder = Array.isArray(node.children) && node.children.length > 0
            const mockUserAccessLevel = 'admin' // To be changed for testing purposes

            if (!checkAccess(node.access, mockUserAccessLevel)) {
                return null
            }

            return (
                <TreeItem
                    expanded={expanded.includes(node.id)}
                    selected={selected.includes(node.id)}
                    key={node.id}
                    nodeId={node.id}
                    label={node.name}
                    onNodeToggle={handleNodeToggle}
                    onNodeSelect={handleNodeSelect}
                >
                    {isNonEmptyFolder && renderTree(node.children, [...parentIds, node.id])}
                </TreeItem>
            )
        })
    }

    return renderTree(data)
}
