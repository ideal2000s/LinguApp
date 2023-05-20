@javascript
Feature: new image hotspot task
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
      | name                 | type                |
      | Select images        | Tasks::ImageHotspot |

  Scenario: Create image hotspot task
    Given I am on the teach lesson page
    And I submit new task form for engage section with the following data:
      | Name                   | Type          |
      | New Image Hotspot Task | Image hotspot |
    Then I should be on edit teach task page
