@javascript
Feature: new dictation task
  In order to create a new task
  I need to submit form with valid data

  Background: initial data
    Given I am team member
    And the following languages:
      | system_name | name      | code |
      | norwegian   | Norwegian | nb   |
      | english     | English   | en   |
    And I have a "Ruby for Dummies" lesson
    And the following task:
      | name            | type                | subject |
      | My awesome task | Tasks::Dictation    | engage  |

  Scenario: Create Dictation task
    Given I am on the teach lesson page
    When I submit new task form for engage section with the following data:
      | Name     | Type       |
      | New Task | Dictation  |
    Then I should be on edit teach task page

  Scenario: editing task configuration
    Given I go to current teach lesson edit task page
    When I submit dictation form with "I love this city"
    And I submit dictation form with "A quick brown fox"
    Then I should see "I love this city" in the dictation task items list
    And I should see "A quick brown fox" in the dictation task items list
