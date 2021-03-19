@isTest
    private class AccountControllerTests {
        @testSetup
        static void testSetup(){
        List<Account> accts = new List<Account>();
        for(Integer i = 0; i < 200; i++) {
            if(i < 50) {
                Account acct = new Account(Name='Test Account ' + i, Rating = 'Hot');
                accts.add(acct);
            } else if(i >= 100 && i <= 150) {
            Account acct = new Account(Name='Test Account ' + i, Rating = 'Warm');
                accts.add(acct);
            } else {
            Account acct = new Account(Name='Test Account ' + i, Rating = 'Cold');
                accts.add(acct);   
            }
            
        }
            insert accts;
    }

    @isTest
    static void testGetAccounts() {
        List<Account> accs = new List<Account>();
        accs = AccountController.getAccounts(0, 'Name', 'asc');
        System.assertEquals(10, accs.size(), 'Error');
        
    }

    @isTest
    static void testSearchAccounts() {
        List<Account> account = new List<Account>();
        account = AccountController.searchAccounts('Test Account 20');
        System.assertEquals(1, account.size(), 'Error');
        
    }

}
