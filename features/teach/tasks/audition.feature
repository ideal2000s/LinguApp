@javascript
Feature: new audition task
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
      | name                    | type            |
      | New audition with words | Tasks::Audition |

  Scenario: Create audition task
    Given I am on the teach lesson page
    And I submit new task form for engage section with the following data:
      | Name                    | Type     |
      | New audition with words | Audition |
    Then I should be on edit teach task page
