@javascript
Feature: Create Fill in blanks Task
  In order to create Fill in blanks task
  I need to fill in require data

  Background:
    Given I am team member
    And the following languages:
      | system_name | name      | code |
      | norwegian   | Norwegian | nb   |
      | english     | English   | en   |
    And I have a "Ruby for Dummies" lesson
    And the following task:
      | name     | type                |
      | New Task | Tasks::FillInBlanks |

  Scenario: create fill in blanks task
    Given I am on the teach lesson page
    And I submit new task form for test section with the following data:
      | Name     | Type           |
      | New Task | Fill In Blanks |
    And I should be on the edit teach task page

  Scenario: add fill in blanks task item
    Given I go to current teach lesson edit task page
    When I fill in fill in blanks task item form with "my fill in blanks"
    Then I should see "my fill in blanks" on the current page
