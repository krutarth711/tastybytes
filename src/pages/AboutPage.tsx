import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.accentFont};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.neutralDark};
  margin-bottom: 2rem;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.headingFont};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.neutralDark};
  margin-bottom: 1rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.neutralDark};
  
  &:before {
    content: "•";
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
  }
`;

const AboutPage: React.FC = () => {
  return (
    <AboutContainer>
      <Title>About TastyBytes</Title>
      
      <Section>
        <SectionTitle>Our Mission</SectionTitle>
        <Paragraph>
          TastyBytes is your go-to destination for discovering and creating delicious recipes. 
          We believe that cooking should be accessible, enjoyable, and inspiring for everyone, 
          from beginners to experienced chefs.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>What We Offer</SectionTitle>
        <FeatureList>
          <FeatureItem>Diverse collection of recipes from quick meals to gourmet dishes</FeatureItem>
          <FeatureItem>Dark mode support for comfortable cooking in any lighting</FeatureItem>
          <FeatureItem>Intuitive recipe cards with flip animation for ingredient preview</FeatureItem>
          <FeatureItem>Smart search functionality to find recipes by name, ingredients, or category</FeatureItem>
          <FeatureItem>Built-in cooking timers for precise preparation</FeatureItem>
          <FeatureItem>Detailed nutritional information for health-conscious cooking</FeatureItem>
        </FeatureList>
      </Section>

      <Section>
        <SectionTitle>How to Use TastyBytes</SectionTitle>
        <Paragraph>
          Start your culinary journey on our home page, where you can explore our curated collection 
          of recipes. Use the intuitive search bar to find specific dishes or ingredients, or browse 
          through our carefully organized categories. Each recipe card provides a quick preview of 
          ingredients on hover, and clicking anywhere on the card takes you to detailed instructions.
        </Paragraph>
        <Paragraph>
          Once you've selected a recipe, you'll find comprehensive step-by-step instructions, 
          precise measurements, and integrated timers to help you achieve perfect results. Our 
          recipes include detailed nutritional information and serving size adjustments to suit 
          your needs.
        </Paragraph>
      </Section>
    </AboutContainer>
  );
};

export default AboutPage; 