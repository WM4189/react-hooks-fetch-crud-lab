import React, {useState} from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdatedQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedIndex, setSelectedIndex] = useState(correctIndex)
  console.log(selectedIndex)
  const options = answers.map((answer, index) => (
    <option key={index} value={selectedIndex} onChange={(e) =>setSelectedIndex(e.target.value) }>
      {answer}
    </option>
  ));

  function handleDelete(){
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"DELETE"
    })
    onDeleteQuestion(id)
  }

  
  // console.log(updatedIndex)
  // not correctIndex but new selected index
  // Selected Index of the array!!!!!!!!!!!!!!!!!!!
  // ***Selected Index(e.target.value?, selected index saved in state?)?****

  function handleChange(event){
    const updatedIndex = ({ correctIndex :parseInt(selectedIndex)})
    setSelectedIndex(event.target.value)
    fetch(`http://localhost:4000/questions/${id}`,{
      method:'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(updatedIndex)
    })
    .then(r=>r.json())
    .then(data => onUpdatedQuestion(data.id,data.correctIndex))
  }


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChange} value={selectedIndex} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
