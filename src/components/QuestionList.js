import React from "react";
import QuestionItem from "./QuestionItem"

function QuestionList({question, onDeleteQuestion, onUpdatedQuestion}) {
  // console.log(question)
  const questionItem = question.map( q => {
    return(
      <div key={q.id}>
      <QuestionItem onUpdatedQuestion={onUpdatedQuestion} onDeleteQuestion={onDeleteQuestion} question={q} />
      </div>
    )
}) 
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItem}</ul>
    </section>
  );
}

export default QuestionList;
