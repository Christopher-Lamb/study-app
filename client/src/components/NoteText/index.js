import React, { useEffect, useRef, useState } from "react";
import NoteTextCSS from "./NoteText.module.css";
import storageFunct from "../../utils/localStorageFunct";

//First note is rendered
//The editor takes the height from the init note
//Whenever the text state is changed change the displayed items
//also when text state is changed apply height

const Editor = React.forwardRef(
  ({ text, type, onClose, onSave, onDel }, ref) => {
    const [editorState, setEditorState] = useState();
    const [textState, setTextState] = useState(text);
    const textareaRef = useRef();
    useEffect(() => {
      switch (type) {
        case "text":
          textareaRef.current.className = NoteTextCSS.editingTextarea;
          break;
        case "heading":
          textareaRef.current.className = NoteTextCSS.editingHeading;
          break;
        case "title":
          textareaRef.current.className = NoteTextCSS.editingHeading;
          break;
      }
      buildEditorTxt();
    }, []);
    const innerHtmlFormatter = (htmlString) => {
      //Replace every /p wiith except the last one
      const noDiv = htmlString.replaceAll("<div>", "");
      const noDivSlash = noDiv.replaceAll("</div>", "");
      const noP = noDivSlash.replaceAll("<p>", "");
      const noPSlash = noP.replaceAll("</p>", "\n");
      const changeSpace = noPSlash.replaceAll("&nbsp;", " ");
      const changeAmp = changeSpace.replaceAll("&amp;", "&");
      const changeLT = changeAmp.replaceAll("&lt;", "<");
      const changeGT = changeLT.replaceAll("&gt;", ">");
      const changeBr = changeGT.replaceAll("<br>", "\n");
      const StrArr = changeBr.split(/(\n)/);
      
      StrArr.pop();
      StrArr.pop();
      console.log(StrArr);
      const finalStr = StrArr.join("");
      return finalStr;
    };

    //Formats the editable p tag so it matches the acutal p tags
    const buildEditorTxt = () => {
      let array = textState.split("\n");
      const elementLayout = array.map((element, i) => {
        if (element === "") {
          return <br key={i} />;
        }
        return <p key={i}>{element}</p>;
      });

      //Render ediitor in divs so that you can edit it easier also let it account for \n / multips \ns
      setEditorState(<div>{elementLayout}</div>);
    };
    return (
      <div className={NoteTextCSS.container}>
        <div ref={ref}>
          <p>Editing</p>
          <div
            ref={textareaRef}
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            {editorState}
          </div>
          <br />
          <div className={NoteTextCSS.btnContainer}>
            <button
              className={`${NoteTextCSS.btn} ${NoteTextCSS.close}`}
              onMouseDown={(e) => {
                const edited = innerHtmlFormatter(
                  textareaRef.current.innerHTML
                );
                if (edited !== textState) {
                  //If input is changed
                  let answer = window.confirm(
                    "You didnt save would you still like to close?"
                  );
                  if (answer) {
                    //If they dont wanna save lose the changes and close
                    onClose();
                  }
                } else {
                  onClose();
                }
              }}
            >
              Close Editor
            </button>
            <button
              className={`${NoteTextCSS.btn} ${NoteTextCSS.save}`}
              onMouseDown={(e) => {
                const edited = innerHtmlFormatter(
                  textareaRef.current.innerHTML
                );
                setTextState(edited);
                onSave(edited);
              }}
            >
              Save
            </button>
            {type !== "title" && (
              <button
                onClick={() => {
                  onDel();
                }}
                className={`${NoteTextCSS.btn} ${NoteTextCSS.del}`}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

const Text = React.forwardRef(({ text }, ref) => {
  // (text)
  const pTag = () => {
    let array = text.split("\n");
    const elementLayout = array.map((element, i) => {
      if (element === "") {
        return <br key={i} />;
      }
      return (
        <p className={NoteTextCSS.pTag} key={i}>
          {element}
        </p>
      );
    });
    // (elementLayout);
    return (
      <div ref={ref} className={NoteTextCSS.pTagContainer}>
        {elementLayout}
      </div>
    );
    // return <p className={NoteTextCSS.text}> {textState}</p>;
  };

  return <>{pTag()}</>;
});

const Title = React.forwardRef(({ text }, ref) => {
  return <h1 ref={ref}>{text}</h1>;
});

const Heading = React.forwardRef(({ text }, ref) => {
  return <h2 ref={ref}>{text}</h2>;
});

export default function NoteText({ id, note, onDel, updateTitle }) {
  const [isEditingState, setIsEditingState] = useState(false);
  const [textState, setTextState] = useState(note.text);
  const [editorElement, setEditorElement] = useState();
  const [editingText, setEditingText] = useState(note.text);
  // const [editorHeight, setEditorHeight] = useState();
  let editorClass = useRef();
  const editorRef = useRef();
  const textAreaRef = useRef();
  const noteRef = useRef();

  //We need to export height of the component T H T  after each save and set it the height of the editor ref also do that on init

  const handleDelete = () => {
    onDel(note.noteId);
  };

  useEffect(() => {
    //Init Header or Text for note box
    switch (note.type) {
      case "text":
        editorClass.current = NoteTextCSS.editingTextarea;
        break;
      case "heading":
        editorClass.current = NoteTextCSS.editingHeading;
        break;
      case "title":
        editorClass.current = NoteTextCSS.editingHeading;
        break;
    }
    getCompHeight();
    noteChecker();
  }, []);

  useEffect(() => {}, [textState]);

  const noteChecker = () => {
    //switch statement would work better i think
    switch (note.type) {
      case "heading":
        return <Heading ref={noteRef} text={textState} />;

      case "text":
        return <Text ref={noteRef} text={textState} />;

      case "title":
        return <Title ref={noteRef} text={textState} />;
    }
  };

  //
  const handleSave = (updatedText) => {
    setTextState(updatedText);
    storageFunct.updateNote(note.boxId, note.noteId, updatedText, note.type);
    if (note.type === "title") {
      updateTitle(updatedText);
    }
    //Get INformation from db
    // setElementState(<p>{updatedText}</p>);
  };

  // Handle Item Click For Editing a box
  const handleClick = async () => {
    setIsEditingState(true);
    // editorRef.current.classList = "";
    if (noteRef.current !== undefined) {
      noteRef.current.className = NoteTextCSS.hidden;
    }
  };
  //Get the rendered component height so we can send that to size the editor which will then grow accoding to input
  //The textarea work around bc it doesnt grow to size
  const getCompHeight = () => {
    // textAreaRef.current.style.minHeight = `${noteRef.current.clientHeight}px`;
  };

  return (
    <>
      {!isEditingState ? (
        <div onClick={handleClick} className={NoteTextCSS.container}>
          {noteChecker()}
        </div>
      ) : (
        <Editor
          onDel={handleDelete}
          type={note.type}
          text={textState}
          onClose={() => {
            setIsEditingState(false);
          }}
          onSave={(text) => {
            handleSave(text);
          }}
        />
      )}
    </>
  );
}
