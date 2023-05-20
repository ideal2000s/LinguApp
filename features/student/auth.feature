@javascript
@wip
Feature: Student Authentication
  Background:
    Given I am on main domain

  Scenario: Sign in with google oauth
    Given I am student
    When I sign in with google
#    Then I should see "Welcome to Lingu, Student!" on the current page
    Then I should see "Sorry, Tor couldn't find this page" on the current page

  Scenario: Sign Up with google oauth
    Given I sign up with google
#    Then I should see "Welcome to Lingu, Student!" on the current page
    Then I should see "Sorry, Tor couldn't find this page" on the current page

  Scenario: Sign Up with google auth, missing name
    Given I sign up with google and get blank name
    Then I should see "Create account" on the current page
    And I should be able to finish student sign up
