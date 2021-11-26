import React, { useState } from 'react';

import CourseGoalList from './components/CourseGoals/CourseGoalList/CourseGoalList';
import CourseInput from './components/CourseGoals/CourseInput/CourseInput';
import Wrapper from './components/Helpers/Wrapper';
import InputModal from './components/UI/InputModal/InputModal';
import './App.css';

const App = () => {
  const [courseGoals, setCourseGoals] = useState([
    { text: 'Do all exercises!', id: 'g1' },
    { text: 'Finish the course!', id: 'g2' }
  ]);

  const [input, setInput] = useState('');
  var goalIdToChange = 0;

  const addGoalHandler = enteredText => {
    setCourseGoals(prevGoals => {
      const updatedGoals = [...prevGoals];
      updatedGoals.unshift({ text: enteredText, id: Math.random().toString() });
      return updatedGoals;
    });
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
    setCourseGoals(prevGoals => {
      const updatedGoals = prevGoals.filter(goal => goal.id !== goalId);
      return updatedGoals;
    });
  };

  const editItemHandler =  (goalId, inputUser) => {
    goalIdToChange = goalId;
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
