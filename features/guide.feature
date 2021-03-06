
Feature: Guide
  As a new user
  To explore plugin features
  I should be able to see small guide

  Scenario: Big hello help text
    Given I am watch "toDEHZzsIGw" video
    And I skip In-Stream ad if it needed
    When I wait "3" seconds
    Then I should see ".adr-guide-container .screen-image" element

  Scenario: Pulsating AD button
    Given I am watch "toDEHZzsIGw" video
    And I skip In-Stream ad if it needed
    When I wait "3" seconds
    And I click ".adr-guide-container .screen-image" element
    And I pause the video
    Then I should see ".adr-mark-ad-button.adr-pulse" element

  Scenario: Highlight clickable area
    Given I am watch "toDEHZzsIGw" video
    And I skip In-Stream ad if it needed
    When I wait "2" seconds
    And I click ".adr-guide-container .screen-image" element
    And I skip In-Stream ad if it needed
    And I click ".adr-mark-ad-button.adr-pulse" element
    Then I should see ".adr-ad-help-text.highlight" element
    And I wait "2" seconds
    And I should see ".adr-ad-help-text.highlight.inactive" element
    And I should not see ".adr-mark-ad-button.adr-pulse" element

  Scenario: Click AD button and reload page
    Given I am watch "8ZtInClXe1Q" video
    And I skip In-Stream ad if it needed
    When I wait "3" seconds
    And I click ".adr-guide-container .screen-image" element
    And I reload the page
    # Because guide won't be visible until I skip ad
    And I skip In-Stream ad if it needed
    And I pause the video
    Then I should see ".adr-mark-ad-button.adr-pulse" element

  Scenario: Playhead help text
    Given I am watch "8ZtInClXe1Q" video
    And I skip In-Stream ad if it needed
    When I wait "3" seconds
    And I click ".adr-guide-container .screen-image" element
    And I skip In-Stream ad if it needed
    And I click AD button
    And I wait "5" seconds
    And I click ".adr-ad-help-text" element
    And I wait "10" seconds
    And I click ".adr-ad-help-text" element
    Then I should see ".adr-guide-container .tip-image" element
