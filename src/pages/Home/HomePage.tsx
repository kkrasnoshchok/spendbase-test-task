import React, { useState } from 'react'
import styles from './HomePage.module.scss'
import { RenderTree, mockApiData } from '../../resources/api-data'
import { Search } from '../../components/Search'
import { TreeView } from '../../components/TreeView/TreeView'
import { HeaderControls } from '../../components/HeaderControls'

export const HomePage = (): JSX.Element => {
    const [data] = useState(mockApiData)
    const [expanded, setExpanded] = React.useState<string[]>(['0'])
    const [selected, setSelected] = React.useState<string[]>([])

    const searchNodeByName = (node: RenderTree, query: string) => {
        if (node.name.toLowerCase().trim() === query.toLowerCase().trim()) {
            setExpanded([...node.parentIds])
            return setSelected([node.id])
        }

        if (Array.isArray(node.children)) {
            node.children.forEach((child) => {
                searchNodeByName(child, query)
            })
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.folder}>
                <div className={styles.header}>
                    <HeaderControls />
                    <h3 className={styles.headerTitle}>{data.name}</h3>
                    <div className={styles.headerSearch}>
                        <Search onSubmit={(value) => searchNodeByName(data, value)} />
                    </div>
                </div>
                <div className={styles.content}>
                    <TreeView
                        data={data.children}
                        {...{
                            expanded,
                            selected,
                            onNodeSelect: setSelected,
                            onNodeToggle: setExpanded
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
