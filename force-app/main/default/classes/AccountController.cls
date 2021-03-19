public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(Integer offset, Integer cap, String field, String sortOrder) {
        return Database.query('SELECT Id, Name, Type, Industry, CustomerPriority__c, OwnerId, Owner.Name, CreatedById, CreatedBy.Name, CreatedDate FROM Account ORDER BY '+field+' '+sortOrder+ ' LIMIT '+cap+' OFFSET '+offset);
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
