import React from 'react'
import styles from './HomePage.module.scss'
import { FaChevronRight } from 'react-icons/fa'
import { FaChevronDown } from 'react-icons/fa'
import { TreeView } from '@mui/x-tree-view/TreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import { RenderTree, mockApiData } from '../../resources/api-data'
import { Search } from '../../components/Search'

const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
)

export const HomePage = (): JSX.Element => {
    const [expanded, setExpanded] = React.useState<string[]>(['0'])
    const [selected, setSelected] = React.useState<string[]>([])

    const searchNodeByName = (node: RenderTree, query: string) => {
        if (node.name.toLowerCase().trim() === query.toLowerCase().trim()) {
            setExpanded([...node.parentIds])
            setSelected([node.id])
        }

        if (Array.isArray(node.children)) {
            node.children.forEach((child) => {
                searchNodeByName(child, query)
            })
        }
    }

    return (
        <div className={styles.page}>
            {/* Search */}
            <Search onSubmit={(value) => searchNodeByName(mockApiData, value)} />
            {/* Tree List */}
            <TreeView
                defaultCollapseIcon={<FaChevronDown />}
                defaultExpandIcon={<FaChevronRight />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={(event, nodeIds) => {
                    setExpanded(nodeIds)
                }}
                onNodeSelect={(event, nodeIds) => setSelected(nodeIds)}
                multiSelect
            >
                {renderTree(mockApiData)}
            </TreeView>
        </div>
    )
}
