import styles from "./page.module.css";
import Todo from "./components/Todo";
import Note from "./components/Note";
export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>  
        <h1>Taskly</h1>  
        <p>Todo list for everyone</p>  

      </div>
      <div className={styles.todo}>
        <Todo />
      </div>
      <div className={styles.note}>
        <Note />
      </div>
      


    </div>
  );
}
