@javascript
Feature: new select text task
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
      | name            | type              |
      | My awesome task | Tasks::SelectText |

  Scenario: Create select text task
    Given I am on the teach lesson page
    And I submit new task form for test section with the following data:
      | Name     | Type            |
      | New Task | Multiple Choice |
    Then I should be on edit teach task page

  Scenario: adding a task item
    Given I go to current teach lesson edit task page
    When I submit select text task item form with "My awesome question"
    Then I should see "My awesome question" on the page

  Scenario: adding a task item option
    Given I have added a "Boooo question" select text task item
    When I submit select text task item option form with "Boooo answer"
    Then I should see "Boooo answer" on the page
