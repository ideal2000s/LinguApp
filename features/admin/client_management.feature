@wip
Feature: Client management

  Background:
    Given these clients:
      | name     | org_id      |
      | lingu    | 992 345 567 |
      | hogwarts | 892 123 345 |
      | rosenhof | 901 788 345 |
    And there are 3 clients with 5 students in each

# TODO: test in policy
#  Scenario: Admin can edit all clients
#    Given as admin I am on admin clients page
#    Then I can edit all clients
#
#  Scenario: Admin can add users to client
#    Given as admin I am on "lingu" admin client page
#    Then I can add users to client
#    And I can update client properties
#    And I can deactivate client
#    And I can create licenses to any exam
#
#  Scenario: Admin can add students to client
#    Given as admin I am on 'hogwarts' admin client students page
#    And I can add students to client
#
#  Scenario: User without admin role cannot edit client
#    Given as basic user I visit edit admin client page for "lingu" client
#    Then I should be redirected to root page
#    And I see a not authorized message

  Scenario: Create client
    Given as admin I am on the new admin client page
    When I submit new client form with the following data:
      | name                                       | org_id      | billing info                                 |
      | Hogwarts school of witchcraft and wizardry | 896 633 555 | King's cross station, Platform 9 3/4, London |
    Then I should be on admin clients page with success notice
