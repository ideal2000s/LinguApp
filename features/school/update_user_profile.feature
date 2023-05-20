@javascript
Feature: Student management
  Background:
    Given I am school member

  Scenario: User updates the profile
    When I go to school dashboard page
    And Click open main dropdown menu
    And Click my profile button
    And Fill in the user form with following and submit:
      | fname   |  lname    |  email             | mobile             |
      | john    |  Ahn      | johnahn@gmail.com  | +1234567890        |
    Then I should see "John Ahn" on the current page

  Scenario: User updates the profile with duplicated email and see the error
    When I go to school dashboard page
    When There's user with email "johnahn@gmail1.com"
    And Click open main dropdown menu
    And Click my profile button
    And Fill in the user form with following and submit:
      | fname   |  lname    |  email             | mobile             |
      | john    |  Ahn      | johnahn@gmail1.com  | +1234567890        |
    Then I should see the error "has already been taken"