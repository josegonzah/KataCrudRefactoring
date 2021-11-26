import React, { useState } from 'react';

import styles from'./CourseGoalSubItem.module.css';

import Button from '../../UI/Button/Button'

const CourseGoalSubItem = props => {

  const [isDone, setIsDone] = useState(true);

  const doneHandler = () => {
    setIsDone(!isDone);
    console.log(isDone);
  }

  const deleteSubItemHandler = () => {
    props.onDelete(props.id);
  };

  const editSubItemHandler = () => {
    props.onEdit(props.id);
  }

  return (
    <li className={`${styles['goal-subitem']} ${!isDone && styles.isDone}`} onClick={doneHandler}>
      {props.children}
      <Button type="submit" onClick={editSubItemHandler}>Edit</Button>
      <Button type="submit" onClick={deleteSubItemHandler}>Delete</Button>
    </li>
  );
};

export default CourseGoalSubItem;