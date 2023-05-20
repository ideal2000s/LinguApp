@javascript
  Feature: Team groups management
    Background:
      Given I am school member
      And the following languages:
        | system_name | name      | code | support |
        | norwegian   | Norwegian | nb   | true    |
        | english     | English   | en   | true    |
      And the following team groups:
        | name              |
        | beginner's class  |
        | Basic class       |
        | Pro's class       |

    Scenario: Team groups filtered by language
      When I go to school team groups page
      And I check target language code "en" and submit
      Then I should not see "Basic class" on the current page

    Scenario: Team users ordered by name case insensitively default
      When I go to school team groups page
      Then I should see the "Pro's class" name under the "beginner's class" name
