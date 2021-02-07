import React from 'react'
import ListGroup from "react-bootstrap/ListGroup";
import { BsPencilSquare, BsArrowRepeat } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import NotesListItem from '../Notes/NotesListItem'
import PropTypes from 'prop-types';


function renderNotesList(notes) {
    return (
        <>
            <LinkContainer to="/notes/new">
                <ListGroup.Item action className="py-3 text-nowrap text-truncate">
                    <BsPencilSquare size={17} />
                    <span className="ml-2 font-weight-bold">Create a new note</span>
                </ListGroup.Item>
            </LinkContainer>
            {notes.map(({ noteId, content, createdAt }) => (
                <NotesListItem key={noteId} noteId={noteId} createdAt={createdAt} content={content} />
            ))}
        </>
    );
}

const NotesContent = ({ notes, isLoading, isSaving, search }) => {
    return (
        <>
            {/* Added a message for no notes found */}
            {notes.length === 0 && !isLoading && <div className="pb-3">No notes found</div>}
            { isLoading ?
                <div className="center">
                    <BsArrowRepeat className="spinning" />
                    <div>{isSaving ? 'Saving' : search !== "" ? 'Searching' : 'Loading'}</div>
                </div> :
                <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>}
        </>
    )
}
NotesContent.defaultProps = {
    notes: [],
    isLoading: false,
    isSaving: false,
    search: ""
}
NotesContent.propTypes = {
    notes: PropTypes.array,
    isLoading: PropTypes.bool,
    isSaving: PropTypes.bool,
    search: PropTypes.string

}

export default NotesContent