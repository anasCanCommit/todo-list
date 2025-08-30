'use client';   
import { useRef } from "react";
import styles from "./Note.module.css"
export default function EditableNote() {
  const noteRef = useRef(null);

  
  return (
    
    <div className={styles.note}>
        <div className={styles.title}>
            <h3>Note</h3>
        </div>
        <div className={styles.content}>
          <div ref={noteRef}
        contentEditable={true}
        suppressContentEditableWarning={true} >This note is editable. Click here to start writing.</div>

        </div>
      </div>
  );
}
