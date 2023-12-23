import React, { useState } from 'react'
import styles from './Search.module.scss'
import { BsSearch } from 'react-icons/bs'

type SearchProps = {
    onSubmit: (value: string) => void
}

export const Search = (props: SearchProps) => {
    const { onSubmit } = props
    const [searchValue, setSearchValue] = useState('')
    const [expanded, setExpanded] = useState(false)

    return (
        <div className={styles.search}>
            {!expanded && (
                <div
                    className={styles.searchIcon}
                    onClick={() => {
                        setExpanded(true)
                    }}
                    role='searchIcon'
                >
                    {/* 15 was chosen to match apple folder design */}
                    <BsSearch size={15} />
                </div>
            )}
            {expanded && (
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        role="searchInput"
                        className={styles.searchContainerInput}
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                        }}
                        placeholder="Search folder or file..."
                    />
                    <button
                        role="searchSubmitButton"
                        disabled={!searchValue.length}
                        onClick={() => {
                            onSubmit(searchValue)
                            setSearchValue('')
                            setExpanded(false)
                        }}
                        className={styles.searchContainerButton}
                    >
                        Search
                    </button>
                </div>
            )}
        </div>
    )
}
