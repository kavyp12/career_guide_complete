# import json
# from typing import Dict, List, Union
# import os
# import logging

# class AssessmentManager:
#     def __init__(self):
#         # Complete trait_scores dictionary including all traits
#         self.trait_scores = {
#             # [Previous trait dictionary entries remain the same...]
#             'Logical Thinking': 0,
#             'Analytical Abilities': 0,
#             'Verbal Skills': 0,
#             'Creative Thinking': 0,
#             'Learning Speed': 0,
#             'Problem-solving Abilities': 0,
#             'Critical Thinking': 0,
#             'Spatial Reasoning': 0,
#             'People Skills': 0,
#             'Sports Participation': 0,
#             'Physical Activity': 0,
#             'Leadership Roles': 0,
#             'Teamwork': 0,
#             'Clubs/Interest Groups': 0,
#             'Technological Affinity': 0,
#             'Social Engagement': 0,
#             'Volunteering and Social Engagement': 0,
#             'Social Responsibility': 0,
#             'Awards and Recognitions': 0,
#             'Online Certifications': 0,
#             'Competitions/Olympiads': 0,
#             'Independence': 0,
#             'Risk-taking': 0,
#             'Communication Skills': 0,
#             'Work Ethic': 0,
#             'Planning': 0,
#             'Discipline': 0,
#             'Career Interest Surveys': 0,
#             'Digital Footprint': 0,
#             'Online Presence': 0,
#             'Nature Smartness': 0,
#             'Picture Smartness': 0,
#             'Music Smartness': 0,
#             'Memory Smartness': 0,
#             'Adaptability': 0,
#             'Resilience': 0,
#             'Empathy': 0,
#             'Decisiveness': 0,
#             'Passive Activity': 0,
#             'Grade Trends': 0,
#             'Interest in Specific Subjects': 0,
#             'Technical Skills': 0,
#             'Attention to Detail': 0,
#             'Creativity': 0,
#             'Artistic Skills': 0,
#             'Social Awareness': 0,
#             'Leadership': 0,
#             'Decision Making': 0,
#             'Collaboration': 0,
#             'Self-reliance': 0,
#             'Math Skills': 0,
#             'Writing Skills': 0,
#             'Physical Skills': 0,
#             'Hand-eye Coordination': 0,
#             'Stability Seeking': 0,
#             'Financial Management': 0,
#             'Solitary Work': 0,
#             'Sustainability': 0,
#             'Logic': 0,
#             'Curiosity': 0,
#             'Financial Literacy': 0,
#             'Conventional Thinking': 0,
#             'Independent Thinking': 0,
#             'Science and Research': 0,
#             'Public Speaking': 0,
#             'Networking': 0,
#             'Aesthetic Sense': 0,
#             'Market Dynamics': 0,
#             'Economics': 0,
#             'Artistic Expression': 0,
#             'Creative Freedom': 0,
#             'Emotional Intelligence': 0,
#             'Negotiation': 0,
#             'Humanitarian Work': 0,
#             'Research Skills': 0,
#             'Business Acumen': 0,
#             'Service Orientation': 0,
#             'Written Communication': 0,
#             'Physical Endurance': 0,
#             'Machine Learning': 0,
#             'Designing': 0,
#             'Comfort with Technology': 0,
#             'Social Interaction': 0,
#             'Confidence': 0,
#             'Creative Problem Solving': 0,
#             'Future-Oriented Thinking': 0,
#             'Listening Skills': 0,
#             'Crisis Management': 0,
#             'People Management': 0,
#             'Arts and Humanities': 0,
#             'Athletic Ability': 0,
#             'Data Analysis': 0,
#             'Mental Stamina': 0,
#             'Engineering': 0,
#             'Scientific Research': 0,
#             'Customer Relations': 0,
#             'Human Behavior Analysis': 0,
#             'Public Relations': 0,
#             'Budgeting Skills': 0,
#             'Interpersonal Skills': 0,
#             'Innovation': 0,
#             'Writing': 0,
#             'Entrepreneurial Spirit': 0,
#             'Social Skills': 0,
#             'Environmental Science': 0,
#             'Tradition': 0,
#             'Risk Taking': 0,
#             'Coding': 0,
#             'Technical Accuracy': 0,
#             'Precision': 0,
#             'Persuasion': 0,
#             'Market Analysis': 0,
#             'Psychology': 0,
#             'Artificial Intelligence': 0,
#             'Experimental Thinking': 0,
#             'Business': 0,
#             'Entrepreneurship': 0,
#             'Long-term Planning': 0,
#             'Compassion': 0,
#             'Big Picture Thinking': 0,
#             'Visionary Thinking': 0,
#             'Visual Skills': 0,
#             'Problem Solving': 0
#         }
        
#         try:
#             # Load scoring system
#             scoring_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'config', 'scoring_system.json')
#             if not os.path.exists(scoring_path):
#                 raise FileNotFoundError(f"Scoring system file not found at {scoring_path}")
                
#             with open(scoring_path, 'r') as f:
#                 self.scoring_system = json.load(f)
            
#             # Validate scoring system against trait_scores
#             self._validate_scoring_system()
            
#         except Exception as e:
#             logging.error(f"Failed to initialize AssessmentManager: {str(e)}")
#             raise

#     def _validate_scoring_system(self):
#         """Validate that all traits in scoring system exist in trait_scores."""
#         missing_traits = set()
        
#         for question, choices in self.scoring_system.items():
#             for choice, traits in choices.items():
#                 for trait in traits:
#                     if trait not in self.trait_scores:
#                         missing_traits.add(trait)
        
#         if missing_traits:
#             logging.error(f"Found undefined traits in scoring system: {missing_traits}")
#             raise ValueError(f"Scoring system contains undefined traits: {missing_traits}")

#     def calculate_scores(self, answers: Dict[str, Union[str, List[str]]]) -> Dict[str, float]:
#         """Calculate trait scores based on questionnaire answers."""
#         try:
#             # Reset scores
#             for trait in self.trait_scores:
#                 self.trait_scores[trait] = 0
                
#             # Process each answer
#             for question_id, answer in answers.items():
#                 # Skip questions that aren't meant for scoring
#                 if question_id in ['question27', 'question30', 'question32', 'question46', 
#                                  'question47', 'question48', 'question49', 'question50']:
#                     continue
                    
#                 if question_id not in self.scoring_system:
#                     continue
                    
#                 # Handle multiple choice answers
#                 if isinstance(answer, list):
#                     for choice in answer:
#                         if choice in self.scoring_system[question_id]:
#                             self._add_trait_scores(self.scoring_system[question_id][choice])
#                 # Handle single choice answers
#                 elif answer in self.scoring_system[question_id]:
#                     self._add_trait_scores(self.scoring_system[question_id][answer])
            
#             # Normalize scores
#             return self._normalize_scores()
            
#         except Exception as e:
#             logging.error(f"Score calculation failed: {str(e)}")
#             raise

#     def _add_trait_scores(self, trait_values: Dict[str, int]):
#         """Add trait scores from a single answer choice."""
#         for trait, value in trait_values.items():
#             if trait in self.trait_scores:
#                 self.trait_scores[trait] += value
#             else:
#                 logging.warning(f"Ignoring unknown trait: {trait}")

#     def _normalize_scores(self) -> Dict[str, float]:
#         """Normalize trait scores to 0-100 range."""
#         max_possible = {trait: 0 for trait in self.trait_scores}
        
#         # Calculate maximum possible score for each trait
#         for question in self.scoring_system.values():
#             for choice in question.values():
#                 for trait, value in choice.items():
#                     if trait in max_possible:
#                         max_possible[trait] = max(max_possible[trait], value)
        
#         # Normalize scores
#         normalized = {}
#         for trait, score in self.trait_scores.items():
#             if max_possible[trait] > 0:
#                 normalized[trait] = round((score / max_possible[trait]) * 100, 2)
#             else:
#                 normalized[trait] = 0.0
                
#         return normalized

#     def get_career_prediction_prompt(self, trait_scores: Dict[str, float], student_info: Dict) -> str:
#         """Generate prompt for career prediction based on trait scores."""
#         return f"""Based on the following comprehensive assessment of {student_info.get('name', 'the student')}:

# Trait Scores Analysis:
# {json.dumps(trait_scores, indent=2)}

# Student Profile:
# - Age: {student_info.get('age', 'Not provided')}
# - Academic Background: {student_info.get('academic_info', 'Not provided')}
# - Interests: {student_info.get('interests', 'Not provided')}
# - Notable Achievements: {student_info.get('achievements', 'Not provided')}

# Please provide a detailed career analysis including:
# 1. Top 5 recommended career paths based on the trait scores
# 2. Required skills and development roadmap for each career
# 3. Educational requirements and recommended certifications
# 4. Industry growth prospects and future outlook
# 5. Potential challenges and strategies to overcome them

# Format the response in clear sections with detailed explanations for each recommendation."""


# import json
# from typing import Dict, List, Union
# import os
# import logging

# class AssessmentManager:
#     def __init__(self):
#         # Complete trait_scores dictionary including all traits
#         self.trait_scores = {
#             'Logical Thinking': 0,
#             'Analytical Abilities': 0,
#             'Verbal Skills': 0,
#             'Creative Thinking': 0,
#             'Learning Speed': 0,
#             'Problem-solving Abilities': 0,
#             'Critical Thinking': 0,
#             'Spatial Reasoning': 0,
#             'People Skills': 0,
#             'Sports Participation': 0,
#             'Physical Activity': 0,
#             'Leadership Roles': 0,
#             'Teamwork': 0,
#             'Clubs/Interest Groups': 0,
#             'Technological Affinity': 0,
#             'Social Engagement': 0,
#             'Volunteering and Social Engagement': 0,
#             'Social Responsibility': 0,
#             'Awards and Recognitions': 0,
#             'Online Certifications': 0,
#             'Competitions/Olympiads': 0,
#             'Independence': 0,
#             'Risk Taking': 0,
#             'Communication Skills': 0,
#             'Work Ethic': 0,
#             'Planning': 0,
#             'Discipline': 0,
#             'Career Interest Surveys': 0,
#             'Digital Footprint': 0,
#             'Online Presence': 0,
#             'Nature Smartness': 0,
#             'Picture Smartness': 0,
#             'Music Smartness': 0,
#             'Memory Smartness': 0,
#             'Adaptability': 0,
#             'Resilience': 0,
#             'Empathy': 0,
#             'Decisiveness': 0,
#             'Passive Activity': 0,
#             'Grade Trends': 0,
#             'Interest in Specific Subjects': 0,
#             'Technical Skills': 0,
#             'Attention to Detail': 0,
#             'Creativity': 0,
#             'Artistic Skills': 0,
#             'Social Awareness': 0,
#             'Leadership': 0,
#             'Decision Making': 0,
#             'Collaboration': 0,
#             'Self-reliance': 0,
#             'Math Skills': 0,
#             'Writing Skills': 0,
#             'Physical Skills': 0,
#             'Hand-eye Coordination': 0,
#             'Stability Seeking': 0,
#             'Financial Management': 0,
#             'Solitary Work': 0,
#             'Sustainability': 0,
#             'Logic': 0,
#             'Curiosity': 0,
#             'Financial Literacy': 0,
#             'Conventional Thinking': 0,
#             'Independent Thinking': 0,
#             'Science and Research': 0,
#             'Public Speaking': 0,
#             'Networking': 0,
#             'Aesthetic Sense': 0,
#             'Market Dynamics': 0,
#             'Economics': 0,
#             'Artistic Expression': 0,
#             'Creative Freedom': 0,
#             'Emotional Intelligence': 0,
#             'Negotiation': 0,
#             'Humanitarian Work': 0,
#             'Research Skills': 0,
#             'Business Acumen': 0,
#             'Service Orientation': 0,
#             'Written Communication': 0,
#             'Physical Endurance': 0,
#             'Machine Learning': 0,
#             'Designing': 0,
#             'Comfort with Technology': 0,
#             'Social Interaction': 0,
#             'Confidence': 0,
#             'Creative Problem Solving': 0,
#             'Future-Oriented Thinking': 0,
#             'Listening Skills': 0,
#             'Crisis Management': 0,
#             'People Management': 0,
#             'Arts and Humanities': 0,
#             'Athletic Ability': 0,
#             'Data Analysis': 0,
#             'Mental Stamina': 0,
#             'Engineering': 0,
#             'Scientific Research': 0,
#             'Customer Relations': 0,
#             'Human Behavior Analysis': 0,
#             'Public Relations': 0,
#             'Budgeting Skills': 0,
#             'Interpersonal Skills': 0,
#             'Innovation': 0,
#             'Writing': 0,
#             'Entrepreneurial Spirit': 0,
#             'Social Skills': 0,
#             'Environmental Science': 0,
#             'Tradition': 0,
#             'Risk-taking': 0,
#             'Coding': 0,
#             'Technical Accuracy': 0,
#             'Precision': 0,
#             'Persuasion': 0,
#             'Market Analysis': 0,
#             'Psychology': 0,
#             'Artificial Intelligence': 0,
#             'Experimental Thinking': 0,
#             'Business': 0,
#             'Entrepreneurship': 0,
#             'Long-term Planning': 0,
#             'Compassion': 0,
#             'Big Picture Thinking': 0,
#             'Visionary Thinking': 0,
#             'Visual Skills': 0,  # Added missing trait
#             'Problem Solving': 0  # Added missing trait
#         }
        
#         try:
#             # Load scoring system
#             scoring_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'config', 'scoring_system.json')
#             if not os.path.exists(scoring_path):
#                 raise FileNotFoundError(f"Scoring system file not found at {scoring_path}")
                
#             with open(scoring_path, 'r') as f:
#                 self.scoring_system = json.load(f)
            
#             # Validate scoring system against trait_scores
#             self._validate_scoring_system()
            
#         except Exception as e:
#             logging.error(f"Failed to initialize AssessmentManager: {str(e)}")
#             raise
#     def _validate_scoring_system(self):
#         """Validate scoring system structure and traits."""
#         missing_traits = set()
#         invalid_questions = set()
        
#         for question, choices in self.scoring_system.items():
#             if not question.startswith('question'):
#                 invalid_questions.add(question)
#                 continue
                
#             for choice, traits in choices.items():
#                 if not isinstance(traits, dict):
#                     logging.error(f"Invalid trait format for {question}, choice {choice}")
#                     continue
                    
#                 for trait, value in traits.items():
#                     if trait not in self.trait_scores:
#                         missing_traits.add(trait)
#                     if not isinstance(value, (int, float)):
#                         logging.error(f"Invalid score value for trait {trait} in {question}")
        
#         if missing_traits or invalid_questions:
#             error_msg = []
#             if missing_traits:
#                 error_msg.append(f"Undefined traits: {missing_traits}")
#             if invalid_questions:
#                 error_msg.append(f"Invalid question IDs: {invalid_questions}")
#             raise ValueError(". ".join(error_msg))

#     def _normalize_answer(self, answer):
#         """Normalize answer to match scoring system format."""
#         if isinstance(answer, list):
#             # Convert answer values to lowercase for case-insensitive comparison
#             return [str(a).lower() for a in answer]
#         return str(answer).lower()

#     def _normalize_scoring_choices(self, choices):
#         """Normalize scoring system choices to lowercase."""
#         return {str(k).lower(): v for k, v in choices.items()}

#     def calculate_scores(self, answers: Dict[str, Union[str, List[str]]]) -> Dict[str, float]:
#         """Calculate and normalize trait scores based on questionnaire answers."""
#         try:
#             # Reset scores
#             for trait in self.trait_scores:
#                 self.trait_scores[trait] = 0
            
#             # Track questions answered for each trait
#             trait_question_counts = {trait: 0 for trait in self.trait_scores}
            
#             # Process each answer
#             for question_id, answer in answers.items():
#                 # Skip non-scoring questions
#                 if question_id in ['question10','question12','question13','question6', 'question27', 'question30', 'question32', 
#                                  'question46', 'question47', 'question48', 'question49', 'question50']:
#                     continue
                    
#                 if question_id not in self.scoring_system:
#                     logging.warning(f"Question {question_id} not found in scoring system")
#                     continue

#                 normalized_answer = self._normalize_answer(answer)
#                 normalized_choices = self._normalize_scoring_choices(self.scoring_system[question_id])
                
#                 # Handle multiple choice answers
#                 if isinstance(normalized_answer, list):
#                     valid_choices = [choice for choice in normalized_answer 
#                                    if choice in normalized_choices]
#                     if not valid_choices:
#                         logging.warning(f"No valid choices found for {question_id}")
#                         continue
                        
#                     # Calculate average score for multiple selections
#                     for trait in self.trait_scores:
#                         trait_scores = []
#                         for choice in valid_choices:
#                             if trait in normalized_choices[choice]:
#                                 trait_scores.append(
#                                     normalized_choices[choice][trait]
#                                 )
#                         if trait_scores:
#                             self.trait_scores[trait] += sum(trait_scores) / len(trait_scores)
#                             trait_question_counts[trait] += 1
                
#                 # Handle single choice answers
#                 elif normalized_answer in normalized_choices:
#                     for trait, value in normalized_choices[normalized_answer].items():
#                         self.trait_scores[trait] += value
#                         trait_question_counts[trait] += 1
            
#             # Calculate normalized scores
#             return self._normalize_scores(trait_question_counts)
            
#         except Exception as e:
#             logging.error(f"Score calculation failed: {str(e)}")
#             raise

#     def _normalize_scores(self, question_counts: Dict[str, int]) -> Dict[str, float]:
#         """Normalize trait scores based on number of relevant questions answered."""
#         normalized = {}
        
#         for trait in self.trait_scores:
#             if question_counts[trait] > 0:
#                 max_per_question = max(
#                     max(
#                         traits.get(trait, 0) 
#                         for traits in choice.values()
#                     )
#                     for choice in self.scoring_system.values()
#                     if any(trait in traits for traits in choice.values())
#                 )
                
#                 max_possible = max_per_question * question_counts[trait]
                
#                 if max_possible > 0:
#                     normalized[trait] = round(
#                         (self.trait_scores[trait] / max_possible) * 100, 2
#                     )
#                 else:
#                     normalized[trait] = 0.0
#             else:
#                 normalized[trait] = 0.0
                
#         return normalized

#     def get_career_prediction_prompt(self, trait_scores: Dict[str, float], student_info: Dict) -> str:
#         """Generate prompt for career prediction based on trait scores."""
#         return f"""Based on the following comprehensive assessment of {student_info.get('studentName', 'the student')}:

# Trait Scores Analysis:
# {json.dumps(trait_scores, indent=2)}

# Student Profile:
# - Age: {student_info.get('age', 'Not provided')}
# - Academic Background: {student_info.get('academicInfo', 'Not provided')}
# - Interests: {student_info.get('interests', 'Not provided')}

# Please provide a detailed career analysis including:
# 1. Top 5 recommended career paths based on the trait scores
# 2. Required skills and development roadmap for each career
# 3. Educational requirements and recommended certifications
# 4. Industry growth prospects and future outlook
# 5. Potential challenges and strategies to overcome them

# Format the response in clear sections with detailed explanations for each recommendation."""

# import json
# from typing import Dict, List, Union
# import os
# import logging

# class AssessmentManager:
#     def __init__(self):
#         # Complete trait_scores dictionary including all traits
#         self.trait_scores = {
#             'Logical Thinking': 0,
#             'Analytical Abilities': 0,
#             'Verbal Skills': 0,
#             'Creative Thinking': 0,
#             'Learning Speed': 0,
#             'Problem-solving Abilities': 0,
#             'Critical Thinking': 0,
#             'Spatial Reasoning': 0,
#             'People Skills': 0,
#             'Sports Participation': 0,
#             'Physical Activity': 0,
#             'Leadership Roles': 0,
#             'Teamwork': 0,
#             'Clubs/Interest Groups': 0,
#             'Technological Affinity': 0,
#             'Social Engagement': 0,
#             'Volunteering and Social Engagement': 0,
#             'Social Responsibility': 0,
#             'Awards and Recognitions': 0,
#             'Online Certifications': 0,
#             'Competitions/Olympiads': 0,
#             'Independence': 0,
#             'Risk Taking': 0,
#             'Communication Skills': 0,
#             'Work Ethic': 0,
#             'Planning': 0,
#             'Discipline': 0,
#             'Career Interest Surveys': 0,
#             'Digital Footprint': 0,
#             'Online Presence': 0,
#             'Nature Smartness': 0,
#             'Picture Smartness': 0,
#             'Music Smartness': 0,
#             'Memory Smartness': 0,
#             'Adaptability': 0,
#             'Resilience': 0,
#             'Empathy': 0,
#             'Decisiveness': 0,
#             'Passive Activity': 0,
#             'Grade Trends': 0,
#             'Interest in Specific Subjects': 0,
#             'Technical Skills': 0,
#             'Attention to Detail': 0,
#             'Creativity': 0,
#             'Artistic Skills': 0,
#             'Social Awareness': 0,
#             'Leadership': 0,
#             'Decision Making': 0,
#             'Collaboration': 0,
#             'Self-reliance': 0,
#             'Math Skills': 0,
#             'Writing Skills': 0,
#             'Physical Skills': 0,
#             'Hand-eye Coordination': 0,
#             'Stability Seeking': 0,
#             'Financial Management': 0,
#             'Solitary Work': 0,
#             'Sustainability': 0,
#             'Logic': 0,
#             'Curiosity': 0,
#             'Financial Literacy': 0,
#             'Conventional Thinking': 0,
#             'Independent Thinking': 0,
#             'Science and Research': 0,
#             'Public Speaking': 0,
#             'Networking': 0,
#             'Aesthetic Sense': 0,
#             'Market Dynamics': 0,
#             'Economics': 0,
#             'Artistic Expression': 0,
#             'Creative Freedom': 0,
#             'Emotional Intelligence': 0,
#             'Negotiation': 0,
#             'Humanitarian Work': 0,
#             'Research Skills': 0,
#             'Business Acumen': 0,
#             'Service Orientation': 0,
#             'Written Communication': 0,
#             'Physical Endurance': 0,
#             'Machine Learning': 0,
#             'Designing': 0,
#             'Comfort with Technology': 0,
#             'Social Interaction': 0,
#             'Confidence': 0,
#             'Creative Problem Solving': 0,
#             'Future-Oriented Thinking': 0,
#             'Listening Skills': 0,
#             'Crisis Management': 0,
#             'People Management': 0,
#             'Arts and Humanities': 0,
#             'Athletic Ability': 0,
#             'Data Analysis': 0,
#             'Mental Stamina': 0,
#             'Engineering': 0,
#             'Scientific Research': 0,
#             'Customer Relations': 0,
#             'Human Behavior Analysis': 0,
#             'Public Relations': 0,
#             'Budgeting Skills': 0,
#             'Interpersonal Skills': 0,
#             'Innovation': 0,
#             'Writing': 0,
#             'Entrepreneurial Spirit': 0,
#             'Social Skills': 0,
#             'Environmental Science': 0,
#             'Tradition': 0,
#             'Risk-taking': 0,
#             'Coding': 0,
#             'Technical Accuracy': 0,
#             'Precision': 0,
#             'Persuasion': 0,
#             'Market Analysis': 0,
#             'Psychology': 0,
#             'Artificial Intelligence': 0,
#             'Experimental Thinking': 0,
#             'Business': 0,
#             'Entrepreneurship': 0,
#             'Long-term Planning': 0,
#             'Compassion': 0,
#             'Big Picture Thinking': 0,
#             'Visionary Thinking': 0,
#             'Visual Skills': 0,
#             'Problem Solving': 0
#         }
        
#         try:
#             # Load scoring system
#             scoring_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'config', 'scoring_system.json')
#             if not os.path.exists(scoring_path):
#                 raise FileNotFoundError(f"Scoring system file not found at {scoring_path}")
                
#             with open(scoring_path, 'r') as f:
#                 self.scoring_system = json.load(f)
            
#             # Validate scoring system against trait_scores
#             self._validate_scoring_system()
            
#         except Exception as e:
#             logging.error(f"Failed to initialize AssessmentManager: {str(e)}")
#             raise

#     def _validate_scoring_system(self):
#         """Validate scoring system structure and traits."""
#         missing_traits = set()
#         invalid_questions = set()
        
#         for question, choices in self.scoring_system.items():
#             # Validate question format
#             if not question.startswith('question'):
#                 invalid_questions.add(question)
#                 continue
                
#             for choice, traits in choices.items():
#                 # Validate trait format
#                 if not isinstance(traits, dict):
#                     logging.error(f"Invalid trait format for {question}, choice {choice}")
#                     continue
                    
#                 for trait, value in traits.items():
#                     if trait not in self.trait_scores:
#                         missing_traits.add(trait)
#                     if not isinstance(value, (int, float)):
#                         logging.error(f"Invalid score value for trait {trait} in {question}")
        
#         if missing_traits or invalid_questions:
#             error_msg = []
#             if missing_traits:
#                 error_msg.append(f"Undefined traits: {missing_traits}")
#             if invalid_questions:
#                 error_msg.append(f"Invalid question IDs: {invalid_questions}")
#             raise ValueError(". ".join(error_msg))

#     def _normalize_array_answer(self, answer: List[str]) -> List[str]:
#         """Normalize array answers by handling string representations."""
#         if isinstance(answer, str):
#             # Try to evaluate string representation of array
#             try:
#                 import ast
#                 answer = ast.literal_eval(answer)
#             except:
#                 answer = [answer]
#         return [str(a).strip().lower() for a in answer]

#     def _normalize_answer(self, answer: Union[str, List[str]]) -> Union[str, List[str]]:
#         """Normalize answer to match scoring system format."""
#         if isinstance(answer, list) or (isinstance(answer, str) and answer.startswith('[')):
#             return self._normalize_array_answer(answer)
#         return str(answer).strip().lower()

#     def calculate_scores(self, answers: Dict[str, Union[str, List[str]]]) -> Dict[str, float]:
#         """Calculate trait scores based on questionnaire answers."""
#         try:
#             # Reset scores
#             for trait in self.trait_scores:
#                 self.trait_scores[trait] = 0
                
#             # Process each answer
#             for question_id, answer in answers.items():
#                 # Skip non-scoring questions
#                 if question_id in ['question10','question12','question13','question6', 'question27', 'question30', 'question32', 
#                                  'question46', 'question47', 'question48', 'question49', 'question50']:
#                     continue
                    
#                 if question_id not in self.scoring_system:
#                     logging.warning(f"Question {question_id} not found in scoring system")
#                     continue

#                 normalized_answer = self._normalize_answer(answer)
                
#                 # Handle multiple choice answers
#                 if isinstance(normalized_answer, list):
#                     for choice in normalized_answer:
#                         if choice in self.scoring_system[question_id]:
#                             self._add_trait_scores(self.scoring_system[question_id][choice])
#                         else:
#                             logging.debug(f"Choice '{choice}' not found in scoring system for {question_id}")
#                 # Handle single choice answers
#                 elif normalized_answer in self.scoring_system[question_id]:
#                     self._add_trait_scores(self.scoring_system[question_id][normalized_answer])
#                 else:
#                     logging.debug(f"Answer '{normalized_answer}' not found in scoring system for {question_id}")
            
#             # Normalize scores
#             return self._normalize_scores()
            
#         except Exception as e:
#             logging.error(f"Score calculation failed: {str(e)}")
#             raise

#     def _add_trait_scores(self, trait_values: Dict[str, int]):
#         """Add trait scores from a single answer choice."""
#         for trait, value in trait_values.items():
#             if trait in self.trait_scores:
#                 self.trait_scores[trait] += value
#             else:
#                 logging.warning(f"Ignoring unknown trait: {trait}")

#     def _normalize_scores(self) -> Dict[str, float]:
#         """Normalize trait scores to 0-100 range."""
#         max_possible = {trait: 0 for trait in self.trait_scores}
        
#         # Calculate maximum possible score for each trait
#         for question in self.scoring_system.values():
#             for choice in question.values():
#                 for trait, value in choice.items():
#                     if trait in max_possible:
#                         max_possible[trait] = max(max_possible[trait], value)
        
#         # Normalize scores
#         normalized = {}
#         for trait, score in self.trait_scores.items():
#             if max_possible[trait] > 0:
#                 normalized[trait] = round((score / max_possible[trait]) * 100, 2)
#             else:
#                 normalized[trait] = 0.0
                
#         return normalized

#     def get_career_prediction_prompt(self, trait_scores: Dict[str, float], student_info: Dict) -> str:
#         """Generate prompt for career prediction based on trait scores."""
#         return f"""Based on the following comprehensive assessment of {student_info.get('studentName', 'the student')}:

# Trait Scores Analysis:
# {json.dumps(trait_scores, indent=2)}

# Student Profile:
# - Age: {student_info.get('age', 'Not provided')}
# - Academic Background: {student_info.get('academicInfo', 'Not provided')}
# - Interests: {student_info.get('interests', 'Not provided')}

# Please provide a detailed career analysis including:
# 1. Top 5 recommended career paths based on the trait scores
# 2. Required skills and development roadmap for each career
# 3. Educational requirements and recommended certifications
# 4. Industry growth prospects and future outlook
# 5. Potential challenges and strategies to overcome them

# Format the response in clear sections with detailed explanations for each recommendation."""


import json
from typing import Dict, List, Union
import os
import logging

class AssessmentManager:
    def __init__(self):
        self.trait_scores = {
            'Logical Thinking': 0,
            'Analytical Abilities': 0,
            'Verbal Skills': 0,
            'Creative Thinking': 0,
            'Learning Speed': 0,
            'Problem-solving Abilities': 0,
            'Critical Thinking': 0,
            'Spatial Reasoning': 0,
            'People Skills': 0,
            'Sports Participation': 0,
            'Physical Activity': 0,
            'Leadership Roles': 0,
            'Teamwork': 0,
            'Clubs/Interest Groups': 0,
            'Technological Affinity': 0,
            'Social Engagement': 0,
            'Volunteering and Social Engagement': 0,
            'Social Responsibility': 0,
            'Awards and Recognitions': 0,
            'Online Certifications': 0,
            'Competitions/Olympiads': 0,
            'Independence': 0,
            'Risk Taking': 0,
            'Communication Skills': 0,
            'Work Ethic': 0,
            'Planning': 0,
            'Discipline': 0,
            'Career Interest Surveys': 0,
            'Digital Footprint': 0,
            'Online Presence': 0,
            'Nature Smartness': 0,
            'Picture Smartness': 0,
            'Music Smartness': 0,
            'Memory Smartness': 0,
            'Adaptability': 0,
            'Resilience': 0,
            'Empathy': 0,
            'Decisiveness': 0,
            'Passive Activity': 0,
            'Grade Trends': 0,
            'Interest in Specific Subjects': 0,
            'Technical Skills': 0,
            'Attention to Detail': 0,
            'Creativity': 0,
            'Artistic Skills': 0,
            'Social Awareness': 0,
            'Leadership': 0,
            'Decision Making': 0,
            'Collaboration': 0,
            'Self-reliance': 0,
            'Math Skills': 0,
            'Writing Skills': 0,
            'Physical Skills': 0,
            'Hand-eye Coordination': 0,
            'Stability Seeking': 0,
            'Financial Management': 0,
            'Solitary Work': 0,
            'Sustainability': 0,
            'Logic': 0,
            'Curiosity': 0,
            'Financial Literacy': 0,
            'Conventional Thinking': 0,
            'Independent Thinking': 0,
            'Science and Research': 0,
            'Public Speaking': 0,
            'Networking': 0,
            'Aesthetic Sense': 0,
            'Market Dynamics': 0,
            'Economics': 0,
            'Artistic Expression': 0,
            'Creative Freedom': 0,
            'Emotional Intelligence': 0,
            'Negotiation': 0,
            'Humanitarian Work': 0,
            'Research Skills': 0,
            'Business Acumen': 0,
            'Service Orientation': 0,
            'Written Communication': 0,
            'Physical Endurance': 0,
            'Machine Learning': 0,
            'Designing': 0,
            'Comfort with Technology': 0,
            'Social Interaction': 0,
            'Confidence': 0,
            'Creative Problem Solving': 0,
            'Future-Oriented Thinking': 0,
            'Listening Skills': 0,
            'Crisis Management': 0,
            'People Management': 0,
            'Arts and Humanities': 0,
            'Athletic Ability': 0,
            'Data Analysis': 0,
            'Mental Stamina': 0,
            'Engineering': 0,
            'Scientific Research': 0,
            'Customer Relations': 0,
            'Human Behavior Analysis': 0,
            'Public Relations': 0,
            'Budgeting Skills': 0,
            'Interpersonal Skills': 0,
            'Innovation': 0,
            'Writing': 0,
            'Entrepreneurial Spirit': 0,
            'Social Skills': 0,
            'Environmental Science': 0,
            'Tradition': 0,
            'Risk-taking': 0,
            'Coding': 0,
            'Technical Accuracy': 0,
            'Precision': 0,
            'Persuasion': 0,
            'Market Analysis': 0,
            'Psychology': 0,
            'Artificial Intelligence': 0,
            'Experimental Thinking': 0,
            'Business': 0,
            'Entrepreneurship': 0,
            'Long-term Planning': 0,
            'Compassion': 0,
            'Big Picture Thinking': 0,
            'Visionary Thinking': 0,
            'Visual Skills': 0,
            'Problem Solving': 0
        }
        
        try:
            scoring_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'config', 'scoring_system.json')
            if not os.path.exists(scoring_path):
                raise FileNotFoundError(f"Scoring system file not found at {scoring_path}")
                
            with open(scoring_path, 'r') as f:
                self.scoring_system = json.load(f)
            
            self._validate_scoring_system()
            
        except Exception as e:
            logging.error(f"Failed to initialize AssessmentManager: {str(e)}")
            raise

    def _validate_scoring_system(self):
        missing_traits = set()
        invalid_questions = set()
        
        for question, choices in self.scoring_system.items():
            if not question.startswith('question'):
                invalid_questions.add(question)
                continue
                
            for choice, traits in choices.items():
                if not isinstance(traits, dict):
                    logging.error(f"Invalid trait format for {question}, choice {choice}")
                    continue
                    
                for trait, value in traits.items():
                    if trait not in self.trait_scores:
                        missing_traits.add(trait)
                    if not isinstance(value, (int, float)):
                        logging.error(f"Invalid score value for trait {trait} in {question}")
        
        if missing_traits or invalid_questions:
            error_msg = []
            if missing_traits:
                error_msg.append(f"Undefined traits: {missing_traits}")
            if invalid_questions:
                error_msg.append(f"Invalid question IDs: {invalid_questions}")
            raise ValueError(". ".join(error_msg))

    def _normalize_array_answer(self, answer: List[str]) -> List[str]:
        if isinstance(answer, str):
            try:
                import ast
                answer = ast.literal_eval(answer)
            except:
                answer = [answer]
        return [str(a).strip().lower() for a in answer]

    def _normalize_answer(self, answer: Union[str, List[str]]) -> Union[str, List[str]]:
        if isinstance(answer, list) or (isinstance(answer, str) and answer.startswith('[')):
            return self._normalize_array_answer(answer)
        return str(answer).strip().lower()

    def calculate_scores(self, answers: Dict[str, Union[str, List[str]]]) -> Dict[str, float]:
        try:
            for trait in self.trait_scores:
                self.trait_scores[trait] = 0
                
            for question_id, answer in answers.items():
                if question_id in ['question10','question12','question13','question6', 'question27', 'question30', 'question32', 
                                 'question46', 'question47', 'question48', 'question49', 'question50']:
                    continue
                    
                if question_id not in self.scoring_system:
                    logging.warning(f"Question {question_id} not found in scoring system")
                    continue

                normalized_answer = self._normalize_answer(answer)
                
                if isinstance(normalized_answer, list):
                    for choice in normalized_answer:
                        if choice in self.scoring_system[question_id]:
                            self._add_trait_scores(self.scoring_system[question_id][choice])
                        else:
                            logging.debug(f"Choice '{choice}' not found in scoring system for {question_id}")
                elif normalized_answer in self.scoring_system[question_id]:
                    self._add_trait_scores(self.scoring_system[question_id][normalized_answer])
                else:
                    logging.debug(f"Answer '{normalized_answer}' not found in scoring system for {question_id}")
            
            return self._normalize_scores()
            
        except Exception as e:
            logging.error(f"Score calculation failed: {str(e)}")
            raise

    def _add_trait_scores(self, trait_values: Dict[str, int]):
        for trait, value in trait_values.items():
            if trait in self.trait_scores:
                self.trait_scores[trait] += value
            else:
                logging.warning(f"Ignoring unknown trait: {trait}")

    def _normalize_scores(self) -> Dict[str, float]:
        max_possible = {trait: 0 for trait in self.trait_scores}
        
        for question in self.scoring_system.values():
            for choice in question.values():
                for trait, value in choice.items():
                    if trait in max_possible:
                        max_possible[trait] = max(max_possible[trait], value)
        
        normalized = {}
        for trait, score in self.trait_scores.items():
            if max_possible[trait] > 0:
                normalized[trait] = round((score / max_possible[trait]) * 100, 2)
            else:
                normalized[trait] = 0.0
                
        return normalized

    def get_career_prediction_prompt(self, trait_scores: Dict[str, float], student_info: Dict) -> str:
        return f"""Based on the following comprehensive assessment of {student_info.get('studentName', 'the student')}:

Trait Scores Analysis:
{json.dumps(trait_scores, indent=2)}

Student Profile:
- Age: {student_info.get('age', 'Not provided')}
- Academic Background: {student_info.get('academicInfo', 'Not provided')}
- Interests: {student_info.get('interests', 'Not provided')}

Please provide a detailed career analysis including:
1. Top 5 recommended career paths based on the trait scores
2. Required skills and development roadmap for each career
3. Educational requirements and recommended certifications
4. Industry growth prospects and future outlook
5. Potential challenges and strategies to overcome them

Format the response in clear sections with detailed explanations for each recommendation."""