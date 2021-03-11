public with sharing class ContactController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Type, Industry, CustomerPriority__c, OwnerId, Owner.Name, CreatedById, CreatedBy.Name, CreatedDate FROM Account];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> findAccounts(String searchKey) {
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
