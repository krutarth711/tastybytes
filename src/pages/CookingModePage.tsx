import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { mockRecipes } from '../data/mockRecipes';
import { Recipe } from '../types';
import { FaArrowDown, FaPlay, FaCheck, FaTimes } from 'react-icons/fa';

const FullscreenContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.neutralLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  z-index: 1000;
`;

const StepContent = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  text-align: center;
`;

const StepNumber = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  font-weight: 600;
`;

const StepDescription = styled.div`
  font-size: 2rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.neutralDark};
`;

const TimerDisplay = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin: 2rem 0;
  font-family: monospace;
`;

const NavigationButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  margin: 2rem auto 0;
  align-self: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const RecipeProgress = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.neutralDark};
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.neutralDark};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CookingModePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const foundRecipe = mockRecipes.find((r) => r.id === Number(id));
    if (foundRecipe) {
      setRecipe(foundRecipe);
    }
  }, [id]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerRunning && timer !== null && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            setTimerRunning(false);
            playNotificationSound();
          }
          return prev ? prev - 1 : null;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timer]);

  const playNotificationSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const startTimer = (duration: number) => {
    setTimer(duration * 60);
    setTimerRunning(true);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (!recipe) return;
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimer(null);
      setTimerRunning(false);
    }
  };

  const handleExit = () => {
    navigate(`/recipe/${id}`);
  };

  if (!recipe) return null;

  const currentInstruction = recipe.instructions[currentStep];
  const isLastStep = currentStep === recipe.instructions.length - 1;

  return (
    <FullscreenContainer>
      <RecipeProgress>
        Step {currentStep + 1} of {recipe.instructions.length}
      </RecipeProgress>
      
      <CloseButton onClick={handleExit}>
        <FaTimes />
      </CloseButton>

      <StepContent>
        <StepNumber>Step {currentStep + 1}</StepNumber>
        <StepDescription>{currentInstruction.description}</StepDescription>
        
        {currentInstruction.hasTimer && !timerRunning && timer === null && currentInstruction.timerDuration && (
          <NavigationButton onClick={() => startTimer(currentInstruction.timerDuration!)}>
            <FaPlay /> Start Timer ({currentInstruction.timerDuration}:00)
          </NavigationButton>
        )}
        
        {timer !== null && (
          <TimerDisplay>{formatTime(timer)}</TimerDisplay>
        )}
        
        {(!currentInstruction.hasTimer || timer === 0 || (!timerRunning && timer === null)) && (
          <NavigationButton onClick={isLastStep ? handleExit : handleNext}>
            {isLastStep ? (
              <>
                <FaCheck /> Finish
              </>
            ) : (
              <>
                Next Step <FaArrowDown />
              </>
            )}
          </NavigationButton>
        )}
      </StepContent>
    </FullscreenContainer>
  );
};

export default CookingModePage; 