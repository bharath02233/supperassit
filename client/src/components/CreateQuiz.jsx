// import React, { useRef, useState } from 'react'
// import { IoMdClose } from "react-icons/io";
// import { CgMenuGridO } from "react-icons/cg";
// import Select from 'react-select';

// function CreateQuiz() {

//   const [questions, setQuestions] = useState([""]);
//   const [answers,setAnswers]=useState([""]);
//   const [bothQA,setBothQA]=useState([]);
//   function xyz(ev, index,type) {
    
   
//     if(type=='questions')
//     {
//       const val = [...questions];
   
//     if (index == questions.length - 1) {
//       val.push('');
//     }
//       setQuestions((prevQuestions) => {

//         val[index] = ev.target.value;
//         return val;
//       });
//     }
//     if(type=='answers')
//     {
//       const val = [...answers];
   
//     if (index == answers.length - 1) {
//       val.push('');
//     }
//       setAnswers((prevQuestions) => {

//         val[index] = ev.target.value;
//         return val;
//       });
//     }
//   }
//   function xyz1(index,type) {
//     if(type=='questions')
//     {
//     setQuestions((prevQuestions) => {
//       const updatedQuestions = [...prevQuestions];
//       updatedQuestions.splice(index, 1); // Remove 1 item at the specified index
//       return updatedQuestions;
//     });
//     }
//     if(type=='answers')
//     {
//       setAnswers((prevQuestions) => {
//         const updatedQuestions = [...prevQuestions];
//         updatedQuestions.splice(index, 1); // Remove 1 item at the specified index
//         return updatedQuestions;
//       }); 
//     }

//   }
//   const dragStart = useRef(0);
//   const dragEnter = useRef(0);

//   function handleSort() {

//     const sor = [...questions];
//     const temp = sor[dragStart.current];
//     sor[dragStart.current] = sor[dragEnter.current];
//     sor[dragEnter.current] = temp;
//     setQuestions((prevQuestions) => {
//       return sor;
//     })
//   }
//   console.log(questions);

  
//   const options = questions?.map((obj) => ({
//     value: obj, // The property you want to use as the value
//     label: obj, // The property you want to display
    
//   }));


//   function handleChange(option,index)
//   {
//        const temp=[...bothQA];
//        temp[index]={question:`${option.value}`,answer:`${answers[index]}`};
       
//        setBothQA((prev)=>{
//         return temp;
//        })
//   }
//   console.log(bothQA)
  
 

//   return (
//     <div style={{ border: 'solid green', display: 'flex', flexDirection: 'column' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '4vw' }}>
//         <div style={{ display: 'flex', flexDirection: 'column', flex: 2, border: "solid red", padding: '4vw' }}>
//           <div style={{ marginBottom: '1vw' }}>Questions:</div>

//           {questions?.map((val, index) => {
//             return (
//               <div draggable onDragStart={() => (dragStart.current = index)} onDragEnter={() => (dragEnter.current = index)}
//                 onDragEnd={handleSort}
//                 onDragOver={(e) => e.preventDefault()}
//               >

//                 <CgMenuGridO />
//                 <input
//                   value={val}
//                   onChange={(ev) => xyz(ev, index,'questions')}
//                   style={{
//                     padding: "10px",
//                     border: "1px solid #ccc",
//                     borderRadius: "5px",
//                     outline: "none",
//                     // width: "100%",

//                     fontSize: "16px",
//                     transition: "border-color 0.3s ease, box-shadow 0.3s ease",
//                   }}
//                   onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
//                   onBlur={(e) => (e.target.style.borderColor = "#ccc")}
//                   placeholder='enter questions'
//                 />
//                 {val ? <IoMdClose style={{ color: 'red' }} onClick={() => xyz1(index,'questions')} /> : ""}

//               </div>
//             )
//           })}
//           <div style={{ display: 'flex', marginTop: '1vw' }}>
//             <div style={{ flex: 1 }}>
//               <div>Items:</div>
//               {answers?.map((val, index) => {
//             return (
//               <div >
              

//                 <CgMenuGridO />
//                 <input
                
//                   value={val}
//                   onChange={(ev) => xyz(ev, index,'answers')}
//                   style={{
//                     padding: "10px",
//                     border: "1px solid #ccc",
//                     borderRadius: "5px",
//                     outline: "none",
//                     // width: "100%",

//                     fontSize: "16px",
//                     transition: "border-color 0.3s ease, box-shadow 0.3s ease",
//                   }}
//                   onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
//                   onBlur={(e) => (e.target.style.borderColor = "#ccc")}
//                   placeholder='enter questions'
//                 />
//                 {val ? <IoMdClose style={{ color: 'red' }} onClick={() => xyz1(index,'answers')} /> : ""}

//               </div>
//             )
//           })}

//             </div>
//             <div style={{ flex: 1 }}>
//               <div>
//                 Drag For Questions
//                 {answers.map((ele, index) => {
//                   return (
//                     <div key={index}>
//                       <Select
                     
//                       onChange={(option)=>handleChange(option,index)}
//                         options={options}
//                         placeholder="Select a questions..."
//                       />
//                     </div>

//                   )
//                 })

//                 }


//               </div>

//             </div>
//           </div>
//         </div>

//         <div style={{ flex: 1 }}>Categorize</div>
//       </div>
//       <div>
//         <div></div>
//         <div>Categorize</div>
//       </div>
//       <div>
//         <div></div>
//         <div>Categorize</div>
//       </div>
//     </div>
//   )
// }

// export default CreateQuiz

import React, { useRef, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import Select from 'react-select';
import ReactQuill from 'react-quill'; // Import the ReactQuill component
import 'react-quill/dist/quill.snow.css';
import { htmlToText } from "html-to-text";
import axios from 'axios';


function CreateQuiz() {
  const [questions, setQuestions] = useState([""]);
  const [answers, setAnswers] = useState([""]);
  const [bothQA, setBothQA] = useState([]);
  const [editorValue, setEditorValue] = useState('');
  const [underlinedWords, setUnderlinedWords] = useState([]);

  // Handle input change for questions and answers
  function xyz(ev, index, type) {
    if (type === 'questions') {
      const val = [...questions];
      if (index === questions.length - 1) {
        val.push('');
      }
      setQuestions((prevQuestions) => {
        val[index] = ev.target.value;
        return val;
      });
    }
    if (type === 'answers') {
      const val = [...answers];
      if (index === answers.length - 1) {
        val.push('');
      }
      setAnswers((prevAnswers) => {
        val[index] = ev.target.value;
        return val;
      });
    }
  }

  // Handle question or answer deletion
  function xyz1(index, type) {
    if (type === 'questions') {
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions.splice(index, 1); // Remove 1 item at the specified index
        return updatedQuestions;
      });
    }
    if (type === 'answers') {
      setAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers.splice(index, 1); // Remove 1 item at the specified index
        return updatedAnswers;
      });
      // Also update bothQA to remove the respective question-answer pair
      setBothQA((prevBothQA) => {
        const updatedBothQA = [...prevBothQA];
        updatedBothQA.splice(index, 1); // Remove the corresponding question-answer pair
        return updatedBothQA;
      });
    }
  }

  const dragStart = useRef(0);
  const dragEnter = useRef(0);

  function handleSort() {
    const sor = [...questions];
    const temp = sor[dragStart.current];
    sor[dragStart.current] = sor[dragEnter.current];
    sor[dragEnter.current] = temp;
    setQuestions((prevQuestions) => {
      return sor;
    });
  }

  const options = questions?.map((question) => ({
    value: question, // The question itself as value
    label: question, // Display the question as label
  }));

  function handleChange(option, index) {
    const temp = [...bothQA];
    temp[index] = { question: option.value, answer: answers[index] };
    setBothQA(temp);
  }

  


  
  const handleEditorChange = (value) => {
    console.log('hi')
    const underlinedElements = document.querySelectorAll(
      'u'
    );
    if(underlinedElements.length>0)
    {
      
      const temp=[];
      underlinedElements.forEach((ob)=>{
        if(ob.innerHTML!='______')
        {
           temp.push(ob.innerHTML);
        }
      })
     

       
  
     
       
      const plainText = htmlToText(value, {
        wordwrap: false, // Prevents line breaks
      });
        setEditorValue((prev)=>plainText);
        setUnderlinedWords((prev) => [...prev,...temp]);

         underlinedElements.forEach((ob)=>{
          ob.innerHTML="______";
         }) 
  
    }
    

  };

  const dragStart1 = useRef(0);
  const dragEnter1 = useRef(0);

  function handleSort1() {
    const sor = [...underlinedWords];
    const temp = sor[dragStart1.current];
    sor[dragStart1.current] = sor[dragEnter1.current];
    sor[dragEnter.current] = temp;
    setUnderlinedWords((prevQuestions) => {
      return sor;
    });
  }
 
  console.log(bothQA);
  console.log(editorValue);
  console.log(underlinedWords);

  function handleSub()
  {
    axios.post("http://localhost:4300/submit",bothQA, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response)=>console.log(response))
    
    const temp={question:editorValue,answer:underlinedWords}
    axios.post("http://localhost:4300/submit1",temp, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response)=>console.log(response))


  }
  
  return (
    <div style={{ border: 'solid green', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '4vw' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 2,borderLeft:'8px solid #0096FF',borderRadius:'0.2vw', padding: '4vw',borderTop:'solid #0096FF',borderBottom:'solid #0096FF',borderRight:'solid #0096FF'}}>
          <div style={{ marginBottom: '1vw' }}>Questions:</div>

          {questions?.map((val, index) => {
            return (
              <div
                draggable
                onDragStart={() => (dragStart.current = index)}
                onDragEnter={() => (dragEnter.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                key={index}
              >
                <CgMenuGridO />
                <input
                  value={val}
                  onChange={(ev) => xyz(ev, index, 'questions')}
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    outline: "none",
                    fontSize: "16px",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                  placeholder='Enter question'
                />
                {val ? <IoMdClose style={{ color: 'red' }} onClick={() => xyz1(index, 'questions')} /> : ""}
              </div>
            );
          })}

          <div style={{ display: 'flex', marginTop: '1vw' }}>
            <div style={{ flex: 1 }}>
              <div>Answers:</div>
              {answers?.map((val, index) => {
                return (
                  <div key={index}>
                    <CgMenuGridO />
                    <input
                      value={val}
                      onChange={(ev) => xyz(ev, index, 'answers')}
                      style={{
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        outline: "none",
                        fontSize: "16px",
                        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
                      onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                      placeholder='Enter answer'
                    />
                    {val ? <IoMdClose style={{ color: 'red' }} onClick={() => xyz1(index, 'answers')} /> : ""}
                  </div>
                );
              })}
            </div>

            <div style={{ flex: 1 }}>
              <div>Drag for Questions</div>
              {answers.map((ele, index) => {
                return (
                  <div key={index}>
                    <Select
                      onChange={(option) => handleChange(option, index)} // Pass the index to handleChange
                      options={options} // Use the options populated from questions
                      placeholder="Select a question..."
                      value={{ value: bothQA[index]?.question || '', label: bothQA[index]?.question || '' }} // Set the selected question
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>Categorize</div>

      </div>

      <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '4vw'}}>
       <div style={{flex:2.3,borderLeft:'8px solid #0096FF',borderRadius:'0.2vw',borderTop:'solid #0096FF',borderBottom:'solid #0096FF',borderRight:'solid #0096FF',padding:'1vw'}}>
        <div>{editorValue}</div>
       <ReactQuill
        value={editorValue}
        onChange={handleEditorChange}
        modules={{
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'], // Include underline in the toolbar
            ['link'],
            [{ 'align': [] }],
            ['clean'], // Clean button to remove formatting
          ],
        }}
      />
       <div style={{margin:'2vw'}}>
       {
        
        underlinedWords.map((ele,index)=>{
          return(
            <div  draggable
            onDragStart={() => (dragStart1.current = index)}
            onDragEnter={() => (dragEnter1.current = index)}
            onDragEnd={handleSort1}
            onDragOver={(e) => e.preventDefault()} >
              <CgMenuGridO />
              <input disabled value={ele} style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    outline: "none",
                    fontSize: "16px",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")}/>
              </div>
          )

        })
        
       }
       </div>
       </div>
       <div style={{flex:1}}>Close</div>
      </div>
      <div>
        <button onClick={handleSub}>Submit</button>
      </div>
    </div>
  );
}

export default CreateQuiz;
