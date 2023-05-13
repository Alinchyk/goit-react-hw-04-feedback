import { useState, useEffect } from 'react';
import Section from './Sections/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Stastistics/Statistics';
import Notification from './Notification/Notification';
import s from './App.module.css';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = (option) => {
    switch (option) {
      case 'good':
        setGood((prevGood) => prevGood + 1);
        break;
      case 'neutral':
        setNeutral((prevNeutral) => prevNeutral + 1);
        break;
      case 'bad':
        setBad((prevBad) => prevBad + 1);
        break;
      default:
        console.log('Unknown option');
    }
  };

  const [totalFeedback, setTotalFeedback] = useState(0);
  const [positiveFeedbackPercentage, setPositiveFeedbackPercentage] = useState(0);

  useEffect(() => {
    setTotalFeedback(good + neutral + bad);
  }, [good, neutral, bad]);

  useEffect(() => {
    if (totalFeedback > 0) {
      setPositiveFeedbackPercentage(Math.round((good / totalFeedback) * 100));
    }
  }, [good, totalFeedback]);

  const options = ['good', 'neutral', 'bad'];

  return (
    <div className={s.container}>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>

      <Section title="Statistics">
        {totalFeedback > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={positiveFeedbackPercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
}
