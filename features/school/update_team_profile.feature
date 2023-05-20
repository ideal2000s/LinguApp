@javascript
Feature: Team management
  Background:
    Given I am school member
    And the following languages:
      | system_name | name      | code | support |
      | norwegian   | Norwegian | nb   | true    |
      | english     | English   | en   | true    |

  Scenario: User updates the school general profile
    When I go to school dashboard page
    And Click open main dropdown menu
    And Click school settings button
    And Fill in the general form with following and submit:
      | name              | language |
      | Superstar Team    | English  |
    Then I should see "Superstar Team" on the current page

  Scenario: User updates the school billing profile
    When I go to school dashboard page
    And Click open main dropdown menu
    And Click school settings button
    And Click school billing tab
    And Fill in the billing form with following and submit:
      | business_registration_id  | street_address | city     | postal_code |
      | 1234567890                | Street1, 54321 | NewYork  | 987654      |
    And Click open main dropdown menu
    And Click school settings button
    And Click school billing tab
    Then I should see "1234567890" in the input field business_registration_id
