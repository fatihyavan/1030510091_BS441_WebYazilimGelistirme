import React, { useEffect, useState } from 'react'
import paper from '../images/paper.png'
import rock from '../images/rock.png'
import scissors from '../images/scissors.png'
import axios from 'axios'
import Footer from "../components/Footer"

export default function Game({user}) {
  const [choice,setChoice] = useState("");
  const [robotChoice,setRobotChoice] = useState("");
  const [result,setResult] = useState("");
  const [win,setWin]= useState(0);
  const [totalPlayed,setTotalPlayed] = useState(0);


  const getUserInfo =async ()=>{
     await axios
        .post('/score/getscore',{user_name:user})
        .then((res)=>{
          console.log(res);
          setWin(res.data.win);
          setTotalPlayed(res.data.totalPlayed);
        })
        .catch((err)=>{console.log(err);})

  }


  const choiceList = [
    'rock','paper','scissors'
  ];
  
  useEffect(()=>{
    getUserInfo();
  },[]);

  useEffect(()=>{
    setTotalPlayed(totalPlayed+1);
    calculateWin();
  },[choice,robotChoice]);

  const updateUserInfo = async ()=>{
   await axios
    .post("/score/updatescore",{win:win,totalPlayed:totalPlayed,user_name:user})
    .then((res)=>{console.log(res);})
    .catch((err)=>console.log(err))
  };


  const makeChoice = (e)=>{
     setChoice(e.target.getAttribute('data-id'));
     makeRobotChoice();
     
  };
  const makeRobotChoice = ()=>{
    setRobotChoice(choiceList[Math.floor(Math.random()*choiceList.length)]);
  }


  function calculateWin(){
  if(choice==="rock"){
    switch(robotChoice){
      case 'paper':
         setResult("Kaybettin!")
        break
      case 'scissors':
         setResult('Kazandın!')
         setWin(win + 1)
        break
      default:
         setResult('Berabere...')
        break
    }
  }
  else if (choice === 'paper'){
    switch(robotChoice){
      case 'scissors':
         setResult('Kaybettin!')
        break
      case 'rock':
         setResult('Kazandın!')
         setWin(win + 1 )
        break
      default:
         setResult('Berabere...')
        break
    }
  }
  else if(choice === 'scissors'){
    switch(robotChoice){
      case 'rock':
         setResult('Kaybettin!')
        break
      case 'paper':
         setResult('Kazandın!')
         setWin(win+1)
        break
      default:
         setResult('Berabere...')
        break
    }
  }
  }

  return (
    <div>
      <div className=' text-2xl flex justify-center items-center h-32 '> Taş,kağıt,makastan birini seç {user}. Tekte biter!!!</div>
      <div className='flex justify-center space-x-20 '>
        <div className='pt-10 rounded-full'><img src={rock} alt={rock} data-id="rock" onClick={makeChoice} /></div>
        <div><img src={paper} alt={paper} data-id="paper" onClick={makeChoice} /></div>
        <div className='pt-10'><img src={scissors} alt={scissors}  data-id="scissors" onClick={makeChoice} /></div>
        
      </div>
      <div className='grid  row-span-1 pt-8 h-48 justify-items-center '>
       
        <div className='text-xl'>Sizin seçiminiz : {choice}</div>
        <div className='text-xl'>Robotun seçimi : {robotChoice}</div>
        <div className='text-xl text-amber-900'>Sonuç : {result}</div>
        <button className='text-2xl text-amber-800 pb-6' onClick={updateUserInfo}>Skorumu kaydet!</button>
      </div>
     <Footer user={user} win={win} totalPlayed={totalPlayed} />
    </div>
     
  )
}
