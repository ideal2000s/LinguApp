@javascript @wip
Feature: new select image task
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
      | name        | type               |
      | My New Task | Tasks::SelectImage |

  Scenario: Create select image task
    Given I am on the teach lesson page
    And I submit new task form for test section with the following data:
      | Name     | Type         |
      | New Task | Select Image |
    Then I should be on edit teach task page

  Scenario: adding a task item
    Given I go to current teach lesson edit task page
    When I submit select image task item form with "My awesome question"
    Then I should see "My awesome question" on the page

  Scenario: adding a image option
    Given I have added selected image task item "My awesome question"
    When I submit image option form with "image.jpg" image attached
    Then I should see the image "image.jpg"
