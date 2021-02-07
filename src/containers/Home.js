import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import NotesHeader from '../components/Notes/NotesHeader'
import NotesContent from '../components/Notes/NotesContent'

export default function Home() {
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [search, updateSearch] = useState("")
  const [replace, updateReplace] = useState("")

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadNotes() {
    return API.get("notes", "/notes");
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p className="text-muted">A simple note taking app</p>
        <div className="pt-3">
          <Link to="/login" className="btn btn-info btn-lg mr-3">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  // Use a filter function to query through the notes and set notes to matching results
  // Used an effect here to search when the search term changes
  useEffect(() => {
    setIsLoading(true)
    async function getNotes() {
      try {
        const notes = await loadNotes();

        if (search === "") {
          setNotes(notes);
          setIsLoading(false)
        } else {
          // Decided to make the search case insensitive,
          // since users don't search content with case in mind
          setNotes(notes.filter((val) => {
            return val.content.toLowerCase().indexOf(search.toLowerCase()) !== -1
          }))
          setIsLoading(false)
        }

      } catch (e) {
        onError(e);
      }
    }
    getNotes()
  }, [search])

  // Wait for each call to be made to the backend using promises
  function findAndReplace(event) {
    event.preventDefault()

    function saveNote(body, id) {
      return API.put("notes", `/notes/${id}`, {
        body: body
      });
    }

    // Replace the string, case insensitive
    function replaceAll(str, srch, rplc) {
      var esc = srch.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
      var reg = new RegExp(esc, 'ig');
      return str.replace(reg, rplc)
    }

    try {
      setIsSaving(true)
      return Promise.all(notes.map(async (note) => {
        await saveNote({
          content: replaceAll(note.content, search, replace)
        }, note.noteId);
      })).then(() => {
        updateSearch("")
        updateReplace("")
        setIsSaving(false)
      })

    } catch (e) {
      onError(e);
      setIsSaving(false)
    }

  }

  function renderNotes() {
    return (
      <div className="notes">

        {/* For a cleaner codebase, separated the components  */}
        <NotesHeader
          title={'Your Notes'}
          findAndReplace={findAndReplace}
          searchValue={search}
          updateSearch={updateSearch}
          replaceValue={replace}
          updateReplace={updateReplace} />

        <NotesContent
          isLoading={isLoading}
          isSaving={isSaving}
          notes={notes}
          search={search}
        />
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
