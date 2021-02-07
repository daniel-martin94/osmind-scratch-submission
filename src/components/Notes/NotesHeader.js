import React from 'react'
import PropTypes from 'prop-types';

const NotesHeader = ({ title, searchValue, updateSearch, replaceValue, updateReplace, findAndReplace }) => {

    return (
        <div className="pb-3 mt-4 mb-3 border-bottom row-flex">
            <h2>{title}</h2>
            <div className="row-flex">
                <input className="mr-2" value={searchValue} placeholder="Search" onChange={(e) => { updateSearch(e.target.value) }} type="text" />
                {searchValue !== "" &&
                    <form onSubmit={findAndReplace}>
                        <input value={replaceValue} placeholder="Replace All With" onChange={(e) => { updateReplace(e.target.value) }} type="text" />
                    </form>
                }
            </div>
        </div>
    )
}

NotesHeader.defaultProps = {
    title: "Your Notes",
    searchValue: "",
    replaceValue: "",
    updateSearch: undefined,
    updateReplace: undefined,
    findAndReplace: undefined,

}

NotesHeader.propTypes = {
    title: PropTypes.string,
    searchValue: PropTypes.string,
    updateSearch: PropTypes.func,
    replaceValue: PropTypes.string,
    updateReplace: PropTypes.func,
    findAndReplace: PropTypes.func

}

export default NotesHeader