import React from 'react'
import styles from './HomePage.module.scss'
import { RenderTree, mockApiData } from '../../resources/api-data'
import { Search } from '../../components/Search'
import { TreeView } from '../../components/TreeView/TreeView'

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
            <Search onSubmit={(value) => searchNodeByName(mockApiData, value)} />
            <h3>{mockApiData.name}</h3>
            <TreeView
                data={mockApiData.children}
                expanded={expanded}
                selected={selected}
                onNodeToggle={(nodeId) => setExpanded([...expanded, nodeId])}
                onNodeSelect={(nodeIds) => setSelected(nodeIds)}
            />
        </div>
    )
}
