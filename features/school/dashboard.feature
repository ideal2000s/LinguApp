@javascript
  Feature: Dashboard management
    Background:
      Given I am school member
      And the following languages:
        | system_name | name      | code | support |
        | norwegian   | Norwegian | nb   | true    |
        | english     | English   | en   | true    |

    Scenario: User can setup gdpr agreement
      When I go to school dashboard page
      Then I should see "Data processing agreement was successfully confirmed" on the current page

    Scenario: User can invite students
      When I go to school dashboard page
      And Click invite students link
      And I create new student with following and submit:
        | fname   |  lname    |  email             | native_language    | target_language  | level          |
        | john    |  Ahn      | johnahn@gmail.com  | norwegian          | english          | A1 - Beginner  |
      Then I should see "John Ahn" on the current page

    Scenario: User can invite users
      When I go to school dashboard page
      And Click invite team users link
      And I create new team user with following and submit:
        | fname   |  lname    |  email             |
        | john    |  Ahn      | johnahn@gmail.com  |
      Then I should see "John Ahn" on the current page