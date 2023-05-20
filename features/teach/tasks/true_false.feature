@javascript
Feature: new true/false task
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
      | name                         | type             |
      | Language learning statements | Tasks::TrueFalse |

  Scenario: Create true/false task
    Given I am on the teach lesson page
    And I submit new task form for test section with the following data:
      | Name     | Type       |
      | New Task | True/False |
    Then I should be on edit teach task page

  Scenario: adding a task item
    Given I go to current teach lesson edit task page
    When I submit true/false task item form with "I am a polyglot" statement as true
    Then I should see "I am a polyglot" on the page with "true" as correct answer
