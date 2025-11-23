import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleChange(e) {
    const newIndex = Number(e.target.value);
    onUpdateQuestion({ ...question, correctIndex: newIndex });
  }

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(() => onDeleteQuestion(question))
      .catch(console.error);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleChange}>
          {answers.map((ans, i) => (
            <option key={i} value={i}>
              {ans}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
