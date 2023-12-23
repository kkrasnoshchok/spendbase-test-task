import React from 'react'
import styles from './HomePage.module.scss'
import { RenderTree, mockApiData } from '../../resources/api-data'
import { Search } from '../../components/Search'
import { TreeView } from '../../components/TreeView/TreeView'
import classnames from 'classnames'
import { FaPlus } from 'react-icons/fa6'
import { FaMinus } from 'react-icons/fa6'
import { FaExpand } from 'react-icons/fa6'

export const HomePage = (): JSX.Element => {
    const [expanded, setExpanded] = React.useState<string[]>(['0'])
    const [selected, setSelected] = React.useState<string[]>([])

    const searchNodeByName = (node: RenderTree, query: string) => {
        console.log('search called')
        if (node.name.toLowerCase().trim() === query.toLowerCase().trim()) {
            console.log('search found', node.name)
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
                    <div className={styles.headerControls}>
                        <div className={classnames(styles.headerControlsButton, styles.controlsClose)}>
                            <FaPlus size={8} />
                        </div>
                        <div className={classnames(styles.headerControlsButton, styles.controlsHide)}>
                            <FaMinus size={8} />
                        </div>
                        <div className={classnames(styles.headerControlsButton, styles.controlsExpand)}>
                            <FaExpand size={6} />
                        </div>
                    </div>
                    <h3 className={styles.headerTitle}>{mockApiData.name}</h3>
                    <div className={styles.headerSearch}>
                        <Search onSubmit={(value) => searchNodeByName(mockApiData, value)} />
                    </div>
                </div>
                <div className={styles.content}>
                    <TreeView
                        data={mockApiData.children}
                        expanded={expanded}
                        selected={selected}
                        onNodeToggle={(newExpanded) => setExpanded(newExpanded)}
                        onNodeSelect={(newSelected) => setSelected(newSelected)}
                    />
                </div>
            </div>
        </div>
    )
}
