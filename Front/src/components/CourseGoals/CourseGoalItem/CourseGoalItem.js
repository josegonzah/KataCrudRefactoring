import React, { useState } from 'react';

import './CourseGoalItem.css';
import Button from '../../UI/Button/Button'
import Wrapper from '../../Helpers/Wrapper'
import InputModal from '../../UI/InputModal/InputModal';
import CourseGoalSubItem from '../CourseGoalSubItem/CourseGoalSubItem'

const HOST_API = 'http://localhost:8080/api';

const CourseGoalItem = props => {
  const [subItemID, setSubItemID] = useState('');
  const [input, setInput] = useState('');
  const [courseSubGoals, setCourseSubGoals] = useState([
    {text: 'Aqui hay un subItem', id: 's1', done: false},
    {text: 'Aqui hay un segundo subItem', id:'s2', done: false}
  ]);

  const deleteSubItemHandler = goalId => {
    setCourseSubGoals(prevSubGoals => {
      const updatedSubGoals = prevSubGoals.filter(subGoal => subGoal.id !== goalId);
      return updatedSubGoals;
    });
  }

  const editSubItemHandler = goalId => {
    setInput({
      title: 'Edit SubItem',
      message: 'Put the text you want to change to'
    })
    setSubItemID(goalId);
    
  }

  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  const editHandler = () => {
    setInput({
      title: 'Edit Item',
      message: 'Type the value that you want to change to: '
    })
  }

  const addHandler = () =>{
    setInput({
      title: 'Add SubItem',
      message: 'Type the new action you want to do'
    })
  }

  const changeStatusHandler= (subItemID, text, isDone) => {
    setCourseSubGoals(prevSubGoals => {
    const updatedSubGoals = prevSubGoals.filter(goal => goal.id !== subItemID);
    updatedSubGoals.unshift({ id: subItemID, text: text, done: isDone });
    return updatedSubGoals;
    })
  }

  const inputHandler = userInputText => {
    if(input.title === "Edit Item"){
      props.onEdit(props.id, userInputText);
    }
    if(input.title === "Add SubItem"){
      setCourseSubGoals(prevSubGoals => {
        const updatedSubGoals = [...prevSubGoals];
        updatedSubGoals.unshift({text: userInputText, id: Math.random().toString()});
        return updatedSubGoals;
      })
    }
    if(input.title === "Edit SubItem"){
      setCourseSubGoals(prevSubGoals => {
        const updatedSubGoals = prevSubGoals.filter(goal => goal.id !== subItemID);
        updatedSubGoals.unshift({ text: userInputText, id: subItemID });
        return updatedSubGoals;
      })

    }
    setInput(null);
  }

  return (
    <Wrapper>
      {input && <InputModal title={input.title} message={input.message} onConfirm={inputHandler}/>}
      <li className="goal-item">
        {props.children}
        <Button type="submit" onClick={editHandler}>Edit</Button>
        <Button type="submit" onClick={deleteHandler}>Delete</Button>
        <Button type="submit" onClick={addHandler}>Add</Button>
        <ul className="subGoal-list">
          {courseSubGoals.map(subgoal =>(
            <CourseGoalSubItem
              key={subgoal.id}
              id={subgoal.id}
              text={subgoal.text}
              onDelete={deleteSubItemHandler}
              onEdit={editSubItemHandler}
              onChangeStatus={changeStatusHandler}
            >
              {subgoal.text}
            </CourseGoalSubItem>
          ))}
        </ul>
      </li>
    </Wrapper>
  );
};

export default CourseGoalItem;