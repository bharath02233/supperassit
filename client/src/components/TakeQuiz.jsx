// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// function TakeQuiz() {
//   const [quiz,setQuiz]=useState();
//   const [quiz1,setQuiz1]=useState();
//   useEffect(()=>{
//     axios.get('http://localhost:4300/quiz')
//   .then((response) => {
//     setQuiz((prev)=>response.data)
    
//   })
//   axios.get('http://localhost:4300/quiz1')
//   .then((response) => {
//     setQuiz1((prev)=>response.data)
//   })
//   },[])


//   const items=document.getElementsByClassName("ans");
//   let selctedItem;
//   for(const item of items)
//   {
//     item.addEventListener("dragstart",function(event){
//       selctedItem=event.target;
//     })
//   }
//   const items1=document.getElementsByClassName("quest");
//   for(const item of items1)
//   {
//     item.addEventListener('dragover', (event) => {
//       event.preventDefault();
//       event.dataTransfer.dropEffect = 'move';
//     });
   
//     item.addEventListener('drop', (event) => {
    
//       event.preventDefault();
//       const targetQuestion = event.target;
      
//       targetQuestion.appendChild(selctedItem);
//     });


//   }
  
//   const items4=document.getElementsByClassName("options");
//   let selctedItem1;
//   for(const item of items4)
//   {
//     item.addEventListener("dragstart",function(event){
//       selctedItem1=event.target;
//     })
//   }
  
//   const items3=document.getElementsByClassName("blank");
//   console.log(items3);
//   for(const item of items3)
//   {
//     item.addEventListener('dragover', (event) => {
//       event.preventDefault();
//       event.dataTransfer.dropEffect = 'move';
//     });
   
//     item.addEventListener('drop', (event) => {
    
//       event.preventDefault();
//       const targetQuestion = event.target;
      
//       targetQuestion.appendChild(selctedItem1);
//     });


//   }

//   console.log(items3,items4)
//   return (
//     <div>
//       <div style={{display:'flex',gap:"3vw",flexDirection:'column',margin:"2vw",background:'brown',minHeight:'10vw',borderRadius:'1vw',padding:'2vw'}}> 
//         <div style={{display:'flex',justifyContent:"center"}}>
//         {
        
//         quiz?.map((obj,i)=>{
//           return (<div draggable className="ans" style={{borderRadius:"1vw",border:"solid",flex:0.1,height:'5vw',textAlign:'center',backgroundColor:(i%2==0)?'red':'green'}}>{obj.answer}</div>)
//         })
//       }
//         </div>
//         <div style={{display:'flex',justifyContent:"center"}}>
//         {
//         quiz?.map((obj,i)=>{
//           return (<div className="quest" style={{borderRadius:"1vw",border:"solid",flex:0.1,height:'10vw',textAlign:'center',backgroundColor:(i%2==0)?'red':'green'}}>{obj.question}</div>)
//         })
//       }
//       </div>
        
//       </div>
//       <div style={{display:'flex',gap:"3vw",justifyContent:'center',alignItems:'center',flexDirection:'column',margin:"2vw",background:'yellow',minHeight:'10vw',borderRadius:'1vw',padding:'2vw'}}>
//         <div style={{fontSize:'2vw'}}>
//         {
          
//           quiz1?.map((ob)=>{
//             return ob.question.split(" ").map((val)=>{
//              return  val=='______'?<div className="blank" style={{display:'inline-block',border:"solid",minWidth:"5vw",background:'grey',minHeight:'2vw'}}></div>:<div style={{display:"inline-block",verticalAlign:'top'}}>{val}</div>
//             })
//          })
//       }
//       </div>
//       <div style={{display:'flex'}}>
//         {
//           quiz1?.map((ob)=>{
//             return <div className="options" draggable style={{border:"solid",minHeight:'2vw',minWidth:'5vw',background:"orange",textAlign:'center'}}>{ob.answer}</div>
             
//          })
//         }
//       </div>
//       </div>
//     </div>
//   )
// }

// export default TakeQuiz



import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TakeQuiz() {
  const [quiz, setQuiz] = useState([]);
  const [quiz1, setQuiz1] = useState([]);
  let selectedItem = null; // **Fixed scope of selectedItem**

  useEffect(() => {
    // Fetch data from APIs
    axios.get('https://supperassit-api.vercel.app/quiz').then((response) => {
      setQuiz(response.data);
    });

    axios.get('https://supperassit-api.vercel.app/quiz1').then((response) => {
      setQuiz1(response.data);
    });
  }, []);

  useEffect(() => {
    // **Highlight Change: Add event listeners after DOM updates**
    const items = document.querySelectorAll('.ans'); // Drag source for the first container
    const questItems = document.querySelectorAll('.quest'); // Drop target for the first container
    const options = document.querySelectorAll('.options'); // Drag source for the second container
    const blanks = document.querySelectorAll('.blank'); // Drop target for the second container

    // Add dragstart listener to `.ans` items
    items.forEach((item) => {
      item.addEventListener('dragstart', (event) => {
        selectedItem = event.target; // Save the dragged element
      });
    });

    // Add dragover and drop listeners to `.quest` items
    questItems.forEach((item) => {
      item.addEventListener('dragover', (event) => {
        event.preventDefault();
      });

      item.addEventListener('drop', (event) => {
        event.preventDefault();
        if (selectedItem) {
          item.appendChild(selectedItem);
          selectedItem = null; // Clear selectedItem after drop
        }
      });
    });

    // Add dragstart listener to `.options` items
    options.forEach((item) => {
      item.addEventListener('dragstart', (event) => {
        selectedItem = event.target; // Save the dragged element
      });
    });

    // Add dragover and drop listeners to `.blank` items
    blanks.forEach((item) => {
      item.addEventListener('dragover', (event) => {
        event.preventDefault();
      });

      item.addEventListener('drop', (event) => {
        event.preventDefault();
        if (selectedItem) {
          item.appendChild(selectedItem);
          selectedItem = null; // Clear selectedItem after drop
        }
      });
    });

    // **Highlight Change: Cleanup listeners to prevent memory leaks**
    return () => {
      items.forEach((item) => item.removeEventListener('dragstart', () => {}));
      questItems.forEach((item) => {
        item.removeEventListener('dragover', () => {});
        item.removeEventListener('drop', () => {});
      });
      options.forEach((item) => item.removeEventListener('dragstart', () => {}));
      blanks.forEach((item) => {
        item.removeEventListener('dragover', () => {});
        item.removeEventListener('drop', () => {});
      });
    };
  }, [quiz, quiz1]); // Dependencies: Ensure it runs after quiz and quiz1 are updated

  return (
    <div>
      <div style={{ display: 'flex', gap: '3vw', flexDirection: 'column', margin: '2vw', background: 'brown', minHeight: '10vw', borderRadius: '1vw', padding: '2vw' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {
            quiz?.map((obj, i) => (
              <div draggable className="ans" style={{ borderRadius: '1vw', border: 'solid', flex: 0.1, height: '5vw', textAlign: 'center', backgroundColor: (i % 2 === 0) ? 'red' : 'green' }}>{obj.answer}</div>
            ))
          }
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {
            quiz?.map((obj, i) => (
              <div className="quest" style={{ borderRadius: '1vw', border: 'solid', flex: 0.1, height: '10vw', textAlign: 'center', backgroundColor: (i % 2 === 0) ? 'red' : 'green' }}>{obj.question}</div>
            ))
          }
        </div>
      </div>

      <div style={{ display: 'flex', gap: '3vw', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: '2vw', background: 'yellow', minHeight: '10vw', borderRadius: '1vw', padding: '2vw' }}>
        <div style={{ fontSize: '2vw' }}>
          {
            quiz1?.map((ob) => (
              ob.question.split(' ').map((val) => (
                val.includes('_')? <div className="blank" style={{ display: 'inline-block', border: 'solid', minWidth: '5vw', background: 'grey', minHeight: '2vw' }}></div> : <div style={{ display: 'inline-block', verticalAlign: 'top' }}>{val}</div>
              ))
            ))
          }
        </div>
        <div style={{ display: 'flex',gap:"2vw"}}>
          {
            quiz1?.map((ob) => (
              ob.answer.map((val)=>{
                return <div className="options" draggable style={{ border: 'solid', minHeight: '2vw', minWidth: '5vw', background: 'orange', textAlign: 'center' }}>{val}</div>
           
              })
              ))
          }
        </div>
      </div>
    </div>
  );
}

export default TakeQuiz;
