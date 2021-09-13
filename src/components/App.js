import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [question, setQuestion] = useState([])

  useEffect(() =>{
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(data => setQuestion(data))
  },[])
  // console.log(question)

  function handleSubmit(newQuestion){
    setQuestion([...question,newQuestion])
    console.log(`Submitting new question: ${question}`)
  }

  function deleteQuestion(id){
    const deletedQuestion = question.filter(q => q.id !== id)
    setQuestion(deletedQuestion)
    console.log(`Deleting Question : ${deletedQuestion}`)
  }

  function updateQuestions(id, correctIndex){
    // console.log(id, correctIndex)
    const updatedQuestion = question.map(q => {
      if (q.id === id) {
        return {...q, correctIndex }
      } else{
        return q
      }
    })
    setQuestion(updatedQuestion)
    console.log(`Updated Question : ${updatedQuestion} `)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onQuestionSubmit={handleSubmit} /> : <QuestionList onUpdatedQuestion={updateQuestions} onDeleteQuestion={deleteQuestion} question={question} />}
    </main>
  );
}

export default App;
