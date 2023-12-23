import React, { useState } from 'react'
import styles from './Search.module.scss'

type SearchProps = {
    onSubmit: (value: string) => void
}

export const Search = (props: SearchProps) => {
    const { onSubmit } = props
    const [searchValue, setSearchValue] = useState('')

    return (
        <div className={styles.search}>
            <h3 role='searchTitle'>Search</h3>
            <input
                type="text"
                role='searchInput'
                className={styles.searchInput}
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value)
                }}
                placeholder="Search by folder or file name..."
            />
            <button
            role='searchSubmitButton'
                onClick={() => {
                    onSubmit(searchValue)
                    setSearchValue('')
                }}
            >
                Search
            </button>
        </div>
    )
}
