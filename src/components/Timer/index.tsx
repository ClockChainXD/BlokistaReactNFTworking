import timeDiff from 'timediff';
import { useEffect, useState } from 'react';
import useStyles from './style';
import moment from 'moment';

/* <div className={classes.timer}>
<div>02</div>
<div>15</div>
<div>33</div>
<div>12</div>
</div> */
function renderDuration(difference, duration) {
  if (difference[duration]) {
    return (
      <div>
        {difference[duration]} 
      </div>
    );
  }
}
export default function Timer({
  startTime = null,
  endTime,
  showDurations = ['days', 'hours', 'minutes','seconds',],
  textForStart = '',
  textForEnd = '',
}) {
  function TimeDiff({ difference }) {
    return (
      <span className={classes.timer}>
        {Object.keys(difference)
          .filter(duration => difference[duration] && showDurations.includes(duration))
          .map(duration => renderDuration(difference, duration))}
      </span>
    );
  }
  const [currentTime, setCurrentTime] = useState(Date.now());
  const classes = useStyles();
  let text = '';

  useEffect(() => {
    setTimeout(() => setCurrentTime(Date.now()), 1000);
  });
 
  let difference = null;
  
 
    

    difference = timeDiff(currentTime, endTime);
    text = textForEnd;
    if (difference && endTime) {
      return (
        <div className={classes.root}>
         <p> {text} </p> <TimeDiff difference={difference} />  
            {/* difference */}
        </div>
      );
    } else {
      return null;
    }
   
}
