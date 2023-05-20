@wip
Feature: Candidate Management

  Background:
    Given these students:
      | first_name | last_name | email                 |
      | Stewie     | Griffin   | stewie@familyguy.com  |
      | Joyce      | Kinney    | joyce@5.tv            |
      | Francis    | Griffin   | francis@familyguy.com |
      | Glenn      | Quagmire  | glenn@gigity.com      |

# TODO: test in policy
#  Scenario: Admin and Examiner can edit all studentss
#    Given as admin I am on admin studentss page
#    Then I can edit all students
#
#    Given as examiner I am on admin students page
#    Then I can edit all students
#
#  Scenario: Client manager can edit client's students
#    Given I am manager for a client
#    When I am on edit student page
#    Then I can edit all fields
#
#  Scenario: Manager can remove student from client
#    Given as manager I am on admin students page
#    Then I can remove student from client's student list
