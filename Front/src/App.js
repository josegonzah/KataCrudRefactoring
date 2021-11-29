import React, { Component, useState, useEffect } from 'react';

import CourseGoalList from './components/CourseGoals/CourseGoalList/CourseGoalList';
import CourseInput from './components/CourseGoals/CourseInput/CourseInput';
import Wrapper from './components/Helpers/Wrapper';
import InputModal from './components/UI/InputModal/InputModal';
import './App.css';

const HOST_API = "http://localhost:8080/api";

const App = () => {
  const [courseGoals, setCourseGoals] = useState([]);

  useEffect(() => {
    fetch(HOST_API + '/list')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const transformedList = data.map((listData) => {
      return {
        id: listData.id,
        text: listData.name
      };
    });
    setCourseGoals(transformedList);
    //console.log(transformedList);
  });
  }, [])

  // fetchCourseGoals();
  
  const [input, setInput] = useState('');
  var goalIdToChange = 0;

  const addGoalHandler = enteredText => {
    fetch(HOST_API + '/todolist', {
      method: 'POST',
      body: JSON.stringify({name: enteredText}),
      headers: { 'Content-Type': 'application/json'}
    })
    .then((response) => {
      return response.json();
    }).then((data) => {
      setCourseGoals(prevGoals => {
        const updatedGoals = [...prevGoals];
        updatedGoals.unshift({ text: data.name, id: data.id});
        return updatedGoals;
      });
    })
  };

  const addSubitemHandler = () => {
    console.log('Add handler');
    console.log(input);
    setInput({
      title: 'Add subItem',
      message: 'Put the name of the action you want to do'
    })
    
  }

  const deleteItemHandler = goalId => {
    fetch(HOST_API + '/' + goalId + '/todolist', {
      method: 'DELETE'
    });
    setCourseGoals(prevGoals => {
      const updatedGoals = prevGoals.filter(goal => goal.id !== goalId);
      return updatedGoals;
    });
  };

  const editItemHandler =  (goalId, inputUser) => {
    goalIdToChange = goalId;
    fetch(HOST_API + '/' + goalId +'/todolist', {
      method: 'PUT',
      body: JSON.stringify({name: inputUser}),
      headers: { 'Content-Type': 'application/json'}
    })
    setCourseGoals(prevGoals => {
      const updatedGoals = prevGoals.filter(goal => goal.id !== goalId);
      updatedGoals.unshift({ text: inputUser, id: goalId });
      return updatedGoals;
    })
    

  }

  const inputHandler = () => {
    setInput(null);
  }



  let content = (
    <p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
  );

  if (courseGoals.length > 0) {
    content = (
      <CourseGoalList items={courseGoals} onEditItem={editItemHandler} onDeleteItem={deleteItemHandler} onAddSubItem={addSubitemHandler}/>
    );
  }

  return (
    <Wrapper>
      {input && <InputModal title={input.title} message={input.message} onConfirm={inputHandler} />}
      <div>
        <section id="goal-form">
          <CourseInput onAddGoal={addGoalHandler} />
        </section>
        <section id="goals">
          {content}
        </section>
      </div>
    </Wrapper>
  );
};

export default App;
