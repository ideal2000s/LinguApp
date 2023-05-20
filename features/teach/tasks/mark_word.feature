@javascript
Feature: new mark word task
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
      | name                 | type            |
      | Select the adjective | Tasks::MarkWord |

  Scenario: Create mark word task
    Given I am on the teach lesson page
    And I submit new task form for engage section with the following data:
      | Name                | Type       |
      | New Mark Words Task | Mark Words |
    Then I should be on edit teach task page

  Scenario: adding a task item
    Given I go to current teach lesson edit task page
    When I submit mark word task item form with "Where are all the *orange* cloud berries?" statement
    Then I should see "Where are all the *orange* cloud berries?" on the current page
