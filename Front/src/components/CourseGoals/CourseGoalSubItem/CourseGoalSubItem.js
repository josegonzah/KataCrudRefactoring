import React from 'react';

import './CourseGoalSubItem.css';

import Button from '../../UI/Button/Button'

const CourseGoalSubItem = props => {
  // const [deleteText, setDeleteText] = useState('');

  const deleteSubItemHandler = () => {
    // setDeleteText('(Deleted!)');
    console.log("borro");
    props.onDelete(props.id);
  };

  const editSubItemHandler = () => {
    console.log("edito");
    props.onEdit(props.id);
  }

  return (
    <li className="goal-subitem">
      {props.children}
      <Button type="submit" onClick={editSubItemHandler}>Edit</Button>
      <Button type="submit" onClick={deleteSubItemHandler}>Delete</Button>
    </li>
  );
};

export default CourseGoalSubItem;