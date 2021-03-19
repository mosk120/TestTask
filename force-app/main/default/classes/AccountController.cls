public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts( Integer offset, String field, String sortOrder ) {
        String query = 'SELECT Id, Name, Type, Industry, CustomerPriority__c, OwnerId, Owner.Name, CreatedById, CreatedBy.Name, CreatedDate FROM Account';
        query += ' ORDER BY '+ field +' '+ sortOrder + ' LIMIT 10 OFFSET '+ offset;
        return Database.query( query );
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String searchKey) {
        String key = '%' + searchKey + '%';
        return [
            SELECT Id, Name, Type, Industry, CustomerPriority__c, OwnerId, Owner.Name, CreatedById, CreatedBy.Name, CreatedDate
            FROM Account
            WHERE Name LIKE :key
            WITH SECURITY_ENFORCED
            LIMIT 10
        ];
    }   
}
