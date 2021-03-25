@isTest
private class AccountTriggerTest {
    @testSetup
    static void testSetup(){
    List<Account> accounts = new List<Account>();
    for(Integer i = 0; i < 200; i++) {
        Account account = new Account(Name='Test Account ' + i);
        if (i < 50) {
            account.Rating = 'Hot';
        } else if (i >= 100 && i < 150) {
            account.Rating = 'Warm';
        } else {
            account.Rating = 'Cold';
        }
        accounts.add(account);
    }
    insert accounts;
}

    @isTest
    static void testCreateCasesTrigger() {
        Integer casesLow = [SELECT COUNT() 
        FROM Case 
        WHERE Priority 
        LIKE 'Low'];
        Integer casesMedium = [SELECT COUNT() 
        FROM Case 
        WHERE Priority 
        LIKE 'Medium'];
        Integer casesHigh = [SELECT COUNT() 
        FROM Case 
        WHERE Priority 
        LIKE 'High'];
        System.assertEquals(100, casesLow, 'Expected to get 100');
        System.assertEquals(50, casesMedium, 'Expected to get 50');
        System.assertEquals(50, casesHigh, 'Expected to get 50');
    }
}