@javascript
Feature: Create Inline Dropdown Task
  In order to create Inline task
  I need to fill in require data

  Background:
    Given I am team member
    And the following languages:
      | system_name | name      | code |
      | norwegian   | Norwegian | nb   |
      | english     | English   | en   |
    And I have a "Ruby for Dummies" lesson
    Given the following task:
      | name     | type                  |
      | New Task | Tasks::InlineDropdown |

  Scenario: create inline dropdown task
    Given I am on the teach lesson page
    And I submit new task form for test section with the following data:
      | Name     | Type            |
      | New Task | Inline Dropdown |
    And I should be on the edit teach task page

  Scenario: add inline dropdown task item
    Given I go to current teach lesson edit task page
    When I fill in inline dropdown task item form with "my inline dropdown"
    Then I should see "my inline dropdown" on the current page
