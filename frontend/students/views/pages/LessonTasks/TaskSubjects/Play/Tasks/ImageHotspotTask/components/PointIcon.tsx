import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import LottieIcon from 'students/views/shared/components/LottieIcon';
import CorrectPointAnimationData from '../assets/CorrectPointAnimationData.json';
import DefaultPointAnimationData from '../assets/DefaultPointAnimationData.json';
import ActivePointAnimationData from '../assets/ActivePointAnimationData.json';
import SelectPointAnimationData from '../assets/SelectPointAnimationData.json';
import DiselectPointAnimationData from '../assets/DiselectPointAnimationData.json';
import IncorrectPointAnimationData from '../assets/IncorrectPointAnimationData.json';

interface IProps {
  active: boolean;
  succeed: boolean;
  fails: number;
}

type AnimationState =
  | 'activeAppear'
  | 'reset'
  | 'active'
  | 'inactive'
  | 'selected'
  | 'deselected'
  | 'incorrect';

const PointIcon: React.FC<IProps> = (props) => {
  const { active, succeed, fails } = props;

  const [status, setStatus] = useState<AnimationState>('inactive');
  const transitionTimeout = useRef<number | null>(null);
  const failsRef = useRef<number>(0);

  const delayStateUpdate = useCallback(
    (newState: AnimationState, delay: number) => {
      if (!succeed && transitionTimeout.current) clearTimeout(transitionTimeout.current);
      transitionTimeout.current = window.setTimeout(() => setStatus(newState), delay);
    },
    [succeed]
  );

  useEffect(() => {
    return () => {
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    };
  }, [transitionTimeout]);

  useEffect(() => {
    if (fails !== failsRef.current) {
      setStatus('reset');
      delayStateUpdate('incorrect', 0);
    }
    failsRef.current = fails;
  }, [fails, delayStateUpdate]);

  useEffect(() => {
    if (active) return setStatus('selected');
    setStatus((prevState) => (prevState !== 'inactive' ? 'deselected' : 'inactive'));
  }, [active]);

  useEffect(() => {
    if (status === 'incorrect') delayStateUpdate('activeAppear', 2000);
    if (status === 'activeAppear') delayStateUpdate('active', 1000);
    if (status === 'selected') delayStateUpdate('active', 1000);
    if (status === 'deselected') delayStateUpdate('inactive', 1000);
  }, [status, delayStateUpdate]);

  const animationData = useMemo(() => {
    switch (status) {
      case 'selected':
        return SelectPointAnimationData;
      case 'deselected':
        return DiselectPointAnimationData;
      case 'active':
        return ActivePointAnimationData;
      case 'inactive':
        return DefaultPointAnimationData;
      case 'incorrect':
        return IncorrectPointAnimationData;
      default:
        return DefaultPointAnimationData;
    }
  }, [status]);

  const isLooped = status === 'active' || status === 'inactive';

  if (status === 'reset') return null;
  if (succeed)
    return (
      <LottieIcon
        animationJSONData={CorrectPointAnimationData}
        loop={false}
        autoPlay={true}
      />
    );

  if (status === 'activeAppear')
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <LottieIcon
          animationJSONData={ActivePointAnimationData}
          loop={false}
          autoPlay={true}
        />
      </motion.div>
    );

  return <LottieIcon animationJSONData={animationData} loop={isLooped} autoPlay={true} />;
};

export default PointIcon;
