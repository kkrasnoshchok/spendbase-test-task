import React, { useState } from 'react'
import styles from './HomePage.module.scss'
import { FaChevronRight } from 'react-icons/fa'
import { FaChevronDown } from 'react-icons/fa'
import { TreeView } from '@mui/x-tree-view/TreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import { RenderTree, mockApiData } from '../../resources/api-data'

const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
)

export const HomePage = (): JSX.Element => {
    const [expanded, setExpanded] = React.useState<string[]>(['0'])
    const [selected, setSelected] = React.useState<string[]>([])
    const [searchValue, setSearchValue] = useState('')

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

    const handleSearchClick = () => {
        searchNodeByName(mockApiData, searchValue)
    }

    return (
        <div className={styles.page}>
            {/* Search */}
            <div className={styles.search}>
                <h3>Search</h3>
                <input
                    type="text"
                    className={styles.searchInput}
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value)
                    }}
                />
                <button
                    onClick={() => {
                        handleSearchClick()
                        setSearchValue('')
                    }}
                >
                    Search
                </button>
            </div>
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
