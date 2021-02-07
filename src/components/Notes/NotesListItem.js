import React, { memo } from 'react'
import ListGroup from "react-bootstrap/ListGroup";
import { LinkContainer } from "react-router-bootstrap";
import PropTypes from 'prop-types'

const NotesListItem = ({ noteId, createdAt, content }) => {
    return (
        <>
            <LinkContainer to={`/notes/${noteId}`}>
                <ListGroup.Item action>
                    <span className="font-weight-bold">
                        {content.trim().split("\n")[0]}
                    </span>
                    <br />
                    <span className="text-muted">
                        Created: {new Date(createdAt).toLocaleString()}
                    </span>
                </ListGroup.Item>
            </LinkContainer>
        </>
    )
}

//Added a memo here to slighly improve performance by preventing rerenders of list items
function areEqual(prevProps, nextProps) {
    if (prevProps === nextProps) return true
    return false
}

NotesListItem.defaultProps = {
    noteId: "",
    createdAt: null,
    content: ""
}

NotesListItem.propTypes = {
    noteId: PropTypes.string,
    createdAt: PropTypes.number,
    content: PropTypes.string
}

export default memo(NotesListItem, areEqual)