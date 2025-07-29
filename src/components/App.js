import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");

  const[questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then((r) => r.json())
    .then((data) => {
      setQuestions(data)
    })
  }, [])

  function handleQuestionAdd(newQuestion) {
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "prompt": newQuestion.prompt,
        "answers": [
          newQuestion.answer1,
          newQuestion.answer2,
          newQuestion.answer3,
          newQuestion.answer4,
        ],
        "correctIndex": parseInt(newQuestion.correctIndex)
      })
    })
    .then((r) => r.json())
    .then((newQuestion) => {
      setQuestions([...questions, newQuestion]);
    }); 
  }

  function handleDeleteQuestion(deletedId) {
    fetch(`http://localhost:4000/questions/${deletedId}`, {
      method: "DELETE",
    })
    .then(() => {
      setQuestions(questions.filter((q) => q.id !== deletedId));
    });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAdd={handleQuestionAdd}/> : <QuestionList questions={questions} onDelete={handleDeleteQuestion}/>}
    </main>
  );
}

export default App;
