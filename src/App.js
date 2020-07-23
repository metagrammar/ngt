import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app'
import 'firebase/database';
import { firebaseConfig } from './Config'
import './App.css';


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const App = () => {
  // Set the states
  const [ameliaBrown, setAmeliaBrown] = useState({})
  const [subfundOne, setSubfundOne] = useState([])

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
  setSubfundOne(Object.values(ameliaBrown).filter(item => item.subfund_id === 'high_volatility'))
    }, [ameliaBrown])

  return (
    <>
    <div className='header'>
      <div className='header-cont contain'> NGT </div>
    </div>
    <div className="App">
      <div className='contain'>
        <div id='fundNameList'>

          <div className='table-grid table-header table-columns'>
            <div>Fund Name</div>
            <div>Subfund Name</div>
            <div>Share Class Name</div>
            <div>Alerts</div>
            <div>Report</div>
          </div>

          {ameliaBrown && subfundOne &&
            
            subfundOne.map(item => {
              return (
                <div className='table-grid table-columns' key={item.index}>
                  <div>{item.fund_name}</div>
                  <div>{item.subfund_name}</div>
                  <div>{item.share_class_name}</div>
                  <div>{item.nb_alerts}</div>
                  <div>{item.report_status}</div>
                </div>
              )})

            }
        </div>
      </div>
    </div>
    </>
  );


}

export default App;
