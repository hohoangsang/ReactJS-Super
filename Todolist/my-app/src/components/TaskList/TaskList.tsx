import React from 'react';
import styles from './taskList.module.scss';

interface TaskListProps {
  taskListDone?: boolean;
}

export default function TaskList(props: TaskListProps) {
  const { taskListDone } = props;

  return (
    <div className={styles.taskListContainer}>
      <h3 className={styles.title}>{taskListDone ? 'Hoàn thành' : 'Chưa hoàn thành'}</h3>

      <div className={styles.taskList}>
        <div className={styles.task}>
          <input type='checkbox' name='taskCheckBox' className={styles.taskCheckBox} />
          <span className={styles.taskName}>Hoc HTML</span>
          <div className={styles.taskAction}>
            <button className={`${styles.taskBtn}`}>🖋</button>
            <button className={styles.taskBtn}>🗑</button>
          </div>
        </div>

        <div className={styles.task}>
          <input type='checkbox' name='taskCheckBox' className={styles.taskCheckBox} />
          <span className={`${styles.taskName} ${styles['taskName-done']}`}>Hoc HTML</span>
          <div className={styles.taskAction}>
            <button className={styles.taskBtn}>🖋</button>
            <button className={styles.taskBtn}>🗑</button>
          </div>
        </div>

        <div className={styles.task}>
          <input type='checkbox' name='taskCheckBox' className={styles.taskCheckBox} />
          <span className={styles.taskName}>Hoc HTML</span>
          <div className={styles.taskAction}>
            <button className={styles.taskBtn}>🖋</button>
            <button className={styles.taskBtn}>🗑</button>
          </div>
        </div>
      </div>
    </div>
  );
}
