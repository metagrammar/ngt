import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app'
import 'firebase/database';
import { firebaseConfig } from './Config'
import './App.css';


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const App = () => {
  // Set the states
  const [ameliaBrown, setAmeliaBrown] = useState()
  const [subfundOne, setSubfundOne] = useState()

useEffect(() => {
  const fund_pac = firebase.database().ref().orderByChild('fund_id').equalTo('park_avenue_capital');
  fund_pac.once('value')
  .then((snapshot) => {
    var data = Object.values(snapshot.val())
    var subName = snapshot.child('subfund_name').key;
    console.log(data)
    console.log(subName)
  })
  
}, [])
  

useEffect(() => {
  const fund_abf = firebase.database().ref().orderByChild('fund_id').equalTo('amelia_brown_fund')
  fund_abf.once("value")
  .then( (snapshot) => { setAmeliaBrown(snapshot.val()) } )
}, [])



useEffect( () => {
  ameliaBrown &&
  // console.log([... new Set(ameliaBrown.map(data => data.subfund_name))] )
  setSubfundOne(Object.values(ameliaBrown).filter(item => item.subfund_id === 'high_volatility'))
    }, [ameliaBrown])

    // console.log(subfundOne)

// const unique = (val, ind, self) => {
//   return self.indexOf(val) === ind;
// }

// const uniqSubFund = threeSigma.filter(item => item[unique])


// let subFund = [...new Set(threeSigma.map(x => x.subfund_name))]
// console.log(subFund)
  return (
    <>
    <div className="App">
        <div id='fundNameList'>
          {ameliaBrown && subfundOne &&
            subfundOne.map(item => {
              return (
                <div key={item.index}>
                
                 <p> Sub fund: {item.subfund_name}</p>
                </div>
              )})
            }
        </div>
    </div>
    </>
  );


}

export default App;
