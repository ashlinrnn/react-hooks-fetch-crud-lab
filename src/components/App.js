import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch questions once
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions)
      .catch(console.error);
  }, []);

  // Function to add a question to state
  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  // Function to update a question
  function handleUpdateQuestion(updated) {
    setQuestions(questions.map(q => q.id === updated.id ? updated : q));
  }

  // Function to delete a question
  function handleDeleteQuestion(deleted) {
    setQuestions(questions.filter(q => q.id !== deleted.id));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onUpdateQuestion={handleUpdateQuestion}
          onDeleteQuestion={handleDeleteQuestion}
        />
      )}
    </main>
  );
}

export default App;
