import timeDiff from 'timediff';
import { useEffect, useState } from 'react';
import useStyles from './style';
import moment from 'moment';
import { textSpanContainsPosition } from 'typescript';

function renderDuration(difference, duration) {
  if (difference[duration]) {
    return (
      <div>
        {difference[duration]}
        {duration[0]}
      </div>
    );
  }
}
export default function Timer({
  startTime = null,
  endTime,
  showDurations = ['days', 'hours',],
  textForStart = '',
  textForEnd = '',
}) {
  function TimeDiff({ difference }) {
    return (
      <span>
        {Object.keys(difference)
          .filter(duration => difference[duration] && showDurations.includes(duration))
          .map(duration => renderDuration(difference, duration))}
      </span>
    );
  }
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const classes = useStyles();
  let text = '';

  useEffect(() => {
    setTimeout(() => setCurrentTime(new Date().getTime()), 1000);
  });

  let difference = null;
  if (startTime && moment(startTime).isSameOrAfter(currentTime)) {
    difference = timeDiff(currentTime, startTime);
    text = textForStart;
    return (
      <div className={classes.root}>
        {text} <TimeDiff difference={difference} />
      </div>
    );
  } else if (endTime && moment(endTime).isSameOrAfter(currentTime)) {
    difference = timeDiff(currentTime, endTime);
    text = textForEnd;
    if (difference && endTime) {
      return (
        <div className={classes.root}>
          <TimeDiff difference={difference} /> {text}
        </div>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
}
