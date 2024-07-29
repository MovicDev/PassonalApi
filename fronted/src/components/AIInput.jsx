import React, { useEffect, useState } from "react";
import axios from "axios";

const AIInput = () => {
  const [message, setMessage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const url = "http://localhost:8000/";

  const sendMessage = () => {
    const formData = { message };
    axios
      .post(url, formData)
      .then((res) => {
        const newQuestion = { message };
        const newAnswer = { answer: res.data.prompt.answer };
        setQuestions([...questions, newQuestion]);
        setAnswers([...answers, newAnswer]);
        setMessage("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setQuestions(res.data.geminiUser);
        setAnswers(res.data.prompt);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="h-56 overflow-y-auto bg-black text-white p-4">
        {isLoading ? (
          <div className="loaderOne ml-auto me-3 mt-2"></div>
        ) : (
          questions.map((question, index) => (
            <div key={index} className="py-2">
              <div className="bg-[#333] drop-shadow-2xl px-2 w-56 text-start my-2 py-2 rounded-lg ml-auto me-3">
                <p>{question.message}</p>
              </div>
              {answers[index] && (
                <div className="py-2 text-balance break-normal font-mono text-sm text-green-600 px-3">
                  <p>{answers[index].answer}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="p-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Ask me anything..."
          name="message"
          id="message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <div className="mt-2">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            type="submit"
            onClick={sendMessage}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default AIInput;
