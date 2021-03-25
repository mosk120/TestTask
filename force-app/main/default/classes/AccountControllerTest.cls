@isTest
    private class AccountControllerTest {
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
    static void testGetAccounts() {
        List<Account> accounts = AccountController.getAccounts(0, 'Name', 'asc');
        System.assertEquals(10, accounts.size(), 'Expected to get 10');
    }

    @isTest
    static void testSearchAccounts() {
        List<Account> account = AccountController.searchAccounts('Test Account 20');
        System.assertEquals(1, account.size(), 'Expected to get 1');
    }

}