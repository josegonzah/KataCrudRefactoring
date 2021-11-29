import React, { useState, useEffect } from 'react';

import './CourseGoalItem.css';
import Button from '../../UI/Button/Button'
import Wrapper from '../../Helpers/Wrapper'
import InputModal from '../../UI/InputModal/InputModal';
import CourseGoalSubItem from '../CourseGoalSubItem/CourseGoalSubItem'

const HOST_API = 'http://localhost:8080/api';

const CourseGoalItem = props => {
  const [subItemID, setSubItemID] = useState('');
  const [input, setInput] = useState('');
  const [courseSubGoals, setCourseSubGoals] = useState([]);

  useEffect(() => {
    fetch(HOST_API + '/' + props.id + '/todos')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const transformedList = data.map((todoItemData) => {
      return {
        id: todoItemData.id,
        text: todoItemData.name,
        done: todoItemData.completed
      };
    });
    setCourseSubGoals(transformedList);
    console.log(transformedList)
  
  });
  }, [])

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
    fetch(HOST_API + '/' + props.id + '/todo', {
      method: "PUT",
      body: JSON.stringify({id: subItemID, name: text, completed: isDone}),
      headers: { 'Content-Type': 'application/json'}
    })
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
      fetch(HOST_API + '/' + props.id + '/todo', {
        method: 'POST',
        body: JSON.stringify({name: userInputText}),
        headers: { 'Content-Type': 'application/json'}
      }).then((response) => {
        return response.json();
      }).then((data) => {
        setCourseSubGoals(prevSubGoals => {
          const updatedSubGoals = [...prevSubGoals];
          updatedSubGoals.unshift({text: data.name, id: data.id});
          return updatedSubGoals;
        })
      })
    }


    if(input.title === "Edit SubItem"){
      console.log(props.id);
      fetch(HOST_API + '/' + props.id + '/todo', {
        method: "PUT",
        body: JSON.stringify({id: subItemID, name: userInputText, completed: true}),
        headers: { 'Content-Type': 'application/json'}
      })
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
              isDone={subgoal.isDone}
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