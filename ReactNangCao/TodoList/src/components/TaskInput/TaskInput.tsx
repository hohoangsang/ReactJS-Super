import PropTypes from 'prop-types';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Todo } from '../../@types/todo.type';
import { connect2 } from '../../HOC/connect';
import { TodoType } from '../../PropTypes/todo.proptypes';
import styles from './taskInput.module.scss';

interface TaskInputProps {
  addTodo: (name: string) => void;
  currentTodo: Todo | null;
  updateTaskTodo: (newTodo: Todo) => void;
}

function TaskInput(props: TaskInputProps & typeof InjectedProps) {
  const { addTodo, currentTodo, updateTaskTodo } = props;

  const [taskName, setTaskName] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimedTaskName = taskName.trim();

    if (!trimedTaskName) {
      setTaskName('');
      return;
    }

    if (currentTodo) {
      updateTaskTodo({
        ...currentTodo,
        name: trimedTaskName
      });
    } else {
      addTodo(trimedTaskName);
    }

    setTaskName('');
  };

  const handleChangeTaskName = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  useEffect(() => {
    if (currentTodo) {
      setTaskName(currentTodo.name);
    } else {
      setTaskName('');
    }
  }, [currentTodo]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type='text'
        name='taskName'
        placeholder='Enter task...'
        value={taskName}
        onChange={handleChangeTaskName}
      />
      <button type='submit'>{currentTodo ? '✔' : '➕'}</button>
    </form>
  );
}

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([TodoType, PropTypes.oneOf([null])]),
  updateTaskTodo: PropTypes.func.isRequired
};

// export default connect(TaskInput);
const InjectedProps = {
  name: 'Sang',
  age: 24
};

export default connect2({
  name: 'Sang',
  age: 24
})(TaskInput);
