import React, { useEffect, useState } from 'react';

import styles from'./CourseGoalSubItem.module.css';

import Button from '../../UI/Button/Button'

const CourseGoalSubItem = props => {

  const [isDone, setIsDone] = useState(true);

  const doneHandler = () => {
    setIsDone(!isDone);
    props.onChangeStatus(props.id, props.text, isDone);
  }

  const deleteSubItemHandler = () => {
    props.onDelete(props.id);
  };

  const editSubItemHandler = () => {
    props.onEdit(props.id);
    setIsDone(true);
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