Feature: User Management

  Background:
    Given I am admin
    And these users:
      | fname   | lname    | email                   | role    | status  |
      | Stewie  | Griffin  | stewie@familyguy.com    | admin   | active  |
      | Meg     | Griffin  | shutupmeg@familyguy.com | basic   | closed  |
      | Joyce   | Kinney   | joyce@5.tv              | basic | closed |
      | Francis | Griffin  | francis@familyguy.com   | basic   | active  |
      | Glenn   | Quagmire | glenn@gigity.com        | basic | active  |
    And there are 3 active users
    And 3 more closed users

# TODO: test in policy
#  Scenario: Admin can edit all users
#    Given as admin I am on admin users page
#    Then I can edit all users
#
#  Scenario: Admin can edit all users
#    Given as teacher I am on admin users page
#    Then I can edit all users

  Scenario: Admin can set role for all users
    When I am on edit admin user page for user Stewie
    Then I change Stewie's role to basic

  Scenario: Admin can set pending users to active
    Given I am on admin users page
    When I toggle a user's status
    Then it becomes active

  Scenario: Admin can set role for all users
    Given I am admin
    When I am on edit admin user page for user Stewie
    Then I change Stewie's role to basic
