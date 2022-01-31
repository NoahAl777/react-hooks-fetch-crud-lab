import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ url }) {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then((fetchedQuestions) => setQuestions(fetchedQuestions))
      .then(() => console.log("I just fetched"))
  }, [])

  function handleDeleteQuestion(id) {
    const deletedQuestion = questions.filter((question) => question.id === id);
    handleDeleteRequest(deletedQuestion)
  }

  function handleDeleteRequest(deletedQuestion) {
    fetch(url + `/${deletedQuestion[0].id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deletedQuestion[0])
    })
      .then(() => {
        console.log(deletedQuestion)
        const questionsToDisplay = questions.filter((question) => question.id !== deletedQuestion[0].id)
        setQuestions(questionsToDisplay)
      })
      .then(console.log("Succesfully deleted"))
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => <QuestionItem key={question.id} question={question} handleDeleteQuestion={handleDeleteQuestion} />)}</ul>
    </section>
  );
}

export default QuestionList;
