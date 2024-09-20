 
  // Example usage:
  const json =  `Describe your experience with Python web frameworks like Django or Flask. How would you structure a RESTful API using these frameworks?\n    * Explain how you would handle error handling and logging in a Python application.\n`;
  function getAllSubsectionQuestions(json) {
    const questions = [];
    const subsections = json.text.split("\n\n**");
    for (let i = 0; i < subsections.length; i++) {
      const questionsArray = subsections[i].split("\n\n*");
      for (let j = 1; j < questionsArray.length; j++) {
        questions.push({
          subsection: questionsArray[0],
          question: questionsArray[j].trim()
        });
      }
    }
    return questions;
  }
  
  const allQuestions = getAllSubsectionQuestions(json);
  console.log(allQuestions);
